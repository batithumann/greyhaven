import Phaser from 'phaser';
import { addItem, inventoryToList, type Inventory } from '../../domain/inventory';
import type { GameSnapshot } from '../../app/App';

type Reporter = (snapshot: GameSnapshot) => void;

export class TownScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private obstacles!: Phaser.Physics.Arcade.StaticGroup;
  private interactables: Array<{ x: number; y: number; radius: number; kind: 'npc'|'board'|'item'; id?: string; label: string }> = [];
  private inventory: Inventory = {};
  private message = 'Welcome to Greyhaven. Find the noticeboard or speak with Mara.';
  private reporter: Reporter;

  constructor(reporter: Reporter) {
    super('TownScene');
    this.reporter = reporter;
  }

  create() {
    this.drawTown();
    this.physics.world.setBounds(0, 0, 1500, 1100);

    this.obstacles = this.physics.add.staticGroup();
    this.addBuilding(230, 170, 210, 120, 'GENERAL STORE');
    this.addBuilding(660, 150, 230, 140, 'POST OFFICE');
    this.addBuilding(1120, 190, 230, 130, 'DEPOT');
    this.addBuilding(420, 700, 250, 140, 'INN');
    this.addBuilding(1030, 760, 210, 120, 'WAREHOUSE');
    for (const [x,y] of [[120,420],[330,470],[850,430],[1260,500],[780,900],[250,900]]) this.addTree(x,y);

    this.player = this.physics.add.sprite(520, 500, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(10);
    this.physics.add.collider(this.player, this.obstacles);
    this.cameras.main.setBounds(0, 0, 1500, 1100);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(1);

    this.addPerson(600, 460, 'MARA');
    this.addBoard(720, 520);
    this.addItem(390, 570, 'Field notes', 'notes');
    this.addItem(1180, 570, 'Brass token', 'token');

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.keys = this.input.keyboard.addKeys('W,A,S,D,E') as Record<string, Phaser.Input.Keyboard.Key>;
    }
    this.publish();
  }

  update() {
    if (!this.player || !this.keys) return;
    const speed = 190;
    let x = 0, y = 0;
    if (this.cursors.left.isDown || this.keys.A.isDown) x -= 1;
    if (this.cursors.right.isDown || this.keys.D.isDown) x += 1;
    if (this.cursors.up.isDown || this.keys.W.isDown) y -= 1;
    if (this.cursors.down.isDown || this.keys.S.isDown) y += 1;
    const vector = new Phaser.Math.Vector2(x, y).normalize().scale(speed);
    this.player.setVelocity(vector.x, vector.y);

    if (Phaser.Input.Keyboard.JustDown(this.keys.E)) this.interact();
  }

  private drawTown() {
    const g = this.add.graphics();
    g.fillStyle(0x71836b); g.fillRect(0,0,1500,1100);
    g.fillStyle(0x9a987c); g.fillRect(0,350,1500,125);
    g.fillRect(560,0,130,1100);
    g.fillStyle(0xb6aa88); g.fillRect(0,520,1500,14); g.fillRect(0,840,1500,12);
    g.lineStyle(3,0xd2c59b,0.6);
    for(let x=0;x<1500;x+=50){g.lineBetween(x,410,x+25,410);g.lineBetween(x,450,x+25,450);}
    g.fillStyle(0x687d61); g.fillRect(0,0,1500,18); g.fillRect(0,1082,1500,18);
    g.setDepth(-10);
  }

  private addBuilding(x:number,y:number,w:number,h:number,label:string) {
    const shadow=this.add.rectangle(x+8,y+10,w,h,0x354238).setDepth(1);
    const body=this.add.rectangle(x,y,w,h,0xc9b98f).setStrokeStyle(5,0x5c5948).setDepth(2);
    this.add.rectangle(x,y-h/2+18,w-10,26,0x8b6047).setDepth(3);
    this.add.text(x,y,{text:label,style:{fontFamily:'monospace',fontSize:'16px',color:'#3b4034',fontStyle:'bold'}}).setOrigin(.5).setDepth(4);
    this.obstacles.add(this.physics.add.existing(this.add.zone(x,y,w,h)) as Phaser.GameObjects.Zone);
    const zone = this.obstacles.getChildren().at(-1) as Phaser.GameObjects.Zone;
    (zone.body as Phaser.Physics.Arcade.StaticBody).setSize(w,h).updateFromGameObject();
    void shadow; void body;
  }

  private addTree(x:number,y:number) {
    this.add.circle(x,y+10,20,0x4c5942).setDepth(2);
    this.add.circle(x,y-12,25,0x526d50).setStrokeStyle(3,0x344b3a).setDepth(3);
    const zone=this.add.zone(x,y,36,36);
    this.physics.add.existing(zone,true);
    this.obstacles.add(zone);
  }

  private addPerson(x:number,y:number,label:string) {
    this.add.circle(x,y+12,13,0x34443b).setDepth(6);
    this.add.circle(x,y-8,11,0xd8b18a).setDepth(7);
    this.add.rectangle(x,y+8,22,23,0x9b6655).setDepth(6);
    this.add.text(x,y-40,label,{fontFamily:'monospace',fontSize:'13px',color:'#fff4d7',backgroundColor:'#34443b',padding:{x:5,y:3}}).setOrigin(.5).setDepth(8);
    this.interactables.push({x,y,radius:55,kind:'npc',label:'Mara'});
  }

  private addBoard(x:number,y:number) {
    this.add.rectangle(x,y,50,42,0x7d5238).setDepth(5);
    this.add.rectangle(x,y-4,42,30,0xe1d7b7).setDepth(6);
    this.add.text(x,y-4,'?',{fontFamily:'serif',fontSize:'24px',color:'#4a5143'}).setOrigin(.5).setDepth(7);
    this.interactables.push({x,y,radius:55,kind:'board',label:'noticeboard'});
  }

  private addItem(x:number,y:number,label:string,id:string) {
    this.add.star(x,y,5,7,14,0xe2c46f).setStrokeStyle(2,0x775d2e).setDepth(5);
    this.interactables.push({x,y,radius:48,kind:'item',id,label});
  }

  private interact() {
    const target=this.interactables.find(o=>Phaser.Math.Distance.Between(this.player.x,this.player.y,o.x,o.y)<o.radius);
    if(!target){this.message='Nothing nearby to interact with.';this.publish();return;}
    if(target.kind==='npc') this.message='Mara: “Trains still run, but fewer people are getting off than getting on.”';
    if(target.kind==='board') this.message='NOTICE: The 8:40 train to Northbridge is delayed. Report unusual lights to the county office.';
    if(target.kind==='item' && target.id){
      this.inventory=addItem(this.inventory,target.id);
      this.message=`Collected ${target.label}.`;
      this.interactables=this.interactables.filter(o=>o!==target);
      this.children.list.filter(o=>o instanceof Phaser.GameObjects.Arc && Math.abs((o as Phaser.GameObjects.Arc).x-target.x)<1 && Math.abs((o as Phaser.GameObjects.Arc).y-target.y)<1).forEach(o=>o.destroy());
    }
    this.publish();
  }

  private publish() {
    this.reporter({message:this.message,inventory:inventoryToList(this.inventory,{notes:'Field notes',token:'Brass token'})});
  }
}
