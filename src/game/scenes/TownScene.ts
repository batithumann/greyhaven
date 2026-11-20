import Phaser from "phaser";
import type { GameSnapshot } from "../../app/App";
import {
  addItem,
  inventoryToList,
  type Inventory,
} from "../../domain/inventory";

type Reporter = (snapshot: GameSnapshot) => void;

type Interactable = {
  x: number;
  y: number;
  radius: number;
  kind: "npc" | "board" | "item" | "timetable";
  id?: string;
  label: string;
  gameObject?: Phaser.GameObjects.GameObject;
};

const WORLD_WIDTH = 640;
const WORLD_HEIGHT = 416;
const PLAYER_SPEED = 65;

const COLORS = {
  grass: 0x849676,
  grassDark: 0x627b61,
  path: 0xb8ae89,
  pathDetail: 0x9a9678,
  wall: 0xd0c49d,
  roof: 0x6d7564,
  roofDark: 0x465b50,
  outline: 0x344b42,
  wood: 0x82694f,
  paper: 0xe1d5ab,
  skin: 0xe4b990,
  gold: 0xe3c76b,
};

export class TownScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private obstacles!: Phaser.Physics.Arcade.StaticGroup;
  private interactables: Interactable[] = [];
  private inventory: Inventory = {};
  private message =
    "Welcome to Greyhaven. Find the noticeboard or speak with Mara.";
  private reporter: Reporter;

  constructor(reporter: Reporter) {
    super("TownScene");
    this.reporter = reporter;
  }

  create() {
    this.drawTown();
    this.createPlayerTexture();

    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    this.obstacles = this.physics.add.staticGroup();

    // A compact town with a few recognizable locations.
    this.addBuilding(115, 105, 48, 40, "STORE");
    this.addBuilding(260, 105, 48, 40, "POST");
    this.addBuilding(425, 105, 64, 44, "STATION");
    this.addBuilding(110, 325, 48, 40, "INN");
    this.addBuilding(455, 325, 64, 40, "DEPOT");

    for (const [x, y] of [
      [40, 55],
      [185, 55],
      [355, 60],
      [560, 115],
      [45, 285],
      [285, 365],
      [560, 365],
    ]) {
      this.addTree(x, y);
    }

    this.player = this.physics.add.sprite(160, 205, "greyhaven-player");

    this.player.setCollideWorldBounds(true);
    this.player.setDepth(10);

    // Only the character's feet collide with obstacles.
    this.player.body?.setSize(10, 7);
    this.player.body?.setOffset(3, 9);

    this.physics.add.collider(this.player, this.obstacles);

    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1);

    this.addPerson(210, 184, "Mara");
    this.addBoard(265, 185);
    this.addTimeTable(330, 185);
    this.addItem(115, 245, "Field notes", "notes");
    this.addItem(500, 245, "Brass token", "token");

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();

      this.keys = this.input.keyboard.addKeys("W,A,S,D,E") as Record<
        string,
        Phaser.Input.Keyboard.Key
      >;
    }

    this.publish();
  }

  update() {
    if (!this.player || !this.keys || !this.cursors) {
      return;
    }

    let x = 0;
    let y = 0;

    if (this.cursors.left.isDown || this.keys.A.isDown) x--;
    if (this.cursors.right.isDown || this.keys.D.isDown) x++;
    if (this.cursors.up.isDown || this.keys.W.isDown) y--;
    if (this.cursors.down.isDown || this.keys.S.isDown) y++;

    const direction = new Phaser.Math.Vector2(x, y)
      .normalize()
      .scale(PLAYER_SPEED);

    this.player.setVelocity(direction.x, direction.y);

    if (Phaser.Input.Keyboard.JustDown(this.keys.E)) {
      this.interact(this.getNearbyInteractable());
    }
  }

  private drawTown() {
    const g = this.add.graphics();

    // Ground
    g.fillStyle(COLORS.grass);
    g.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    // Main roads
    g.fillStyle(COLORS.path);
    g.fillRect(0, 190, WORLD_WIDTH, 42);
    g.fillRect(292, 0, 40, WORLD_HEIGHT);

    // Road edges
    g.fillStyle(COLORS.pathDetail);
    g.fillRect(0, 190, WORLD_WIDTH, 2);
    g.fillRect(0, 230, WORLD_WIDTH, 2);
    g.fillRect(292, 0, 2, WORLD_HEIGHT);
    g.fillRect(330, 0, 2, WORLD_HEIGHT);

    // Small patches of grass
    g.fillStyle(COLORS.grassDark);
    for (let y = 20; y < WORLD_HEIGHT; y += 32) {
      for (let x = 20; x < WORLD_WIDTH; x += 48) {
        if ((y > 185 && y < 237) || (x > 287 && x < 337)) {
          continue;
        }

        g.fillRect(x, y, 3, 1);
        g.fillRect(x + 5, y + 3, 2, 1);
      }
    }

    g.setDepth(-10);
  }

  private createPlayerTexture() {
    const g = this.add.graphics();

    // 16x16 placeholder pixel-art adventurer.
    g.fillStyle(COLORS.outline);
    g.fillRect(4, 1, 8, 4);

    // Hair
    g.fillStyle(COLORS.roofDark);
    g.fillRect(5, 2, 6, 3);

    // Face
    g.fillStyle(COLORS.skin);
    g.fillRect(5, 5, 6, 4);

    // Jacket
    g.fillStyle(COLORS.wood);
    g.fillRect(4, 9, 8, 4);

    // Arms
    g.fillStyle(COLORS.skin);
    g.fillRect(3, 9, 1, 4);
    g.fillRect(12, 9, 1, 4);

    // Legs
    g.fillStyle(COLORS.outline);
    g.fillRect(5, 13, 2, 3);
    g.fillRect(9, 13, 2, 3);

    g.generateTexture("greyhaven-player", 16, 16);
    g.destroy();
  }

  private addBuilding(
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
  ) {
    this.add.rectangle(x + 2, y + 3, w, h, COLORS.outline).setDepth(1);

    this.add.rectangle(x, y, w, h, COLORS.wall).setDepth(2);

    this.add.rectangle(x, y - h / 2 + 10, w, 20, COLORS.roof).setDepth(3);

    this.add.rectangle(x, y - h / 2 + 1, w, 3, COLORS.roofDark).setDepth(4);

    // Door
    this.add.rectangle(x, y + h / 2 - 8, 12, 16, COLORS.wood).setDepth(4);

    this.add
      .text(x, y - 2, label, {
        fontFamily: "monospace",
        fontSize: "8px",
        color: "#344b42",
      })
      .setOrigin(0.5)
      .setDepth(5);

    const zone = this.add.zone(x, y, w, h);
    this.physics.add.existing(zone, true);
    this.obstacles.add(zone);
  }

  private addTree(x: number, y: number) {
    this.add.rectangle(x, y + 8, 5, 12, COLORS.wood).setDepth(2);

    this.add
      .rectangle(x - 10, y - 10, 20, 20, COLORS.outline)
      .setOrigin(0, 0)
      .setDepth(3);

    this.add
      .rectangle(x - 8, y - 8, 16, 16, COLORS.grassDark)
      .setOrigin(0, 0)
      .setDepth(4);

    const zone = this.add.zone(x, y + 6, 12, 10);
    this.physics.add.existing(zone, true);
    this.obstacles.add(zone);
  }

  private addPerson(x: number, y: number, label: string) {
    this.add.rectangle(x, y - 5, 8, 7, COLORS.skin).setDepth(6);

    this.add.rectangle(x, y + 3, 10, 9, COLORS.roofDark).setDepth(6);

    this.add.rectangle(x - 2, y + 10, 3, 4, COLORS.outline).setDepth(6);

    this.add.rectangle(x + 2, y + 10, 3, 4, COLORS.outline).setDepth(6);

    this.interactables.push({
      x,
      y,
      radius: 25,
      kind: "npc",
      label,
    });
  }

  private addBoard(x: number, y: number) {
    this.add.rectangle(x, y, 18, 16, COLORS.wood).setDepth(5);

    this.add.rectangle(x, y - 2, 14, 10, COLORS.paper).setDepth(6);

    this.interactables.push({
      x,
      y,
      radius: 24,
      kind: "board",
      label: "noticeboard",
    });
  }

  private addTimeTable(x: number, y: number) {
    this.add.rectangle(x, y, 18, 16, COLORS.wood).setDepth(5);

    this.add.rectangle(x, y - 2, 14, 10, COLORS.paper).setDepth(6);

    this.add
      .text(x, y - 2, "T", {
        fontFamily: "monospace",
        fontSize: "8px",
        color: "#344b42",
      })
      .setOrigin(0.5)
      .setDepth(7);

    this.interactables.push({
      x,
      y,
      radius: 24,
      kind: "timetable",
      label: "timetable",
    });
  }

  private addItem(x: number, y: number, label: string, id: string) {
    const item = this.add
      .rectangle(x, y, 7, 7, COLORS.gold)
      .setStrokeStyle(1, COLORS.wood)
      .setDepth(5);

    this.interactables.push({
      x,
      y,
      radius: 20,
      kind: "item",
      id,
      label,
      gameObject: item,
    });
  }

  private interact(target?: Interactable) {
    if (!target) {
      this.message = "Nothing nearby to interact with.";
      this.publish();
      return;
    }

    switch (target.kind) {
      case "npc":
        this.message =
          "Mara: Trains still run, but fewer people are getting off than getting on.";
        break;

      case "board":
        this.message =
          "NOTICE: The Northbridge service is delayed. Report unusual lights.";
        break;

      case "timetable":
        this.message = "RAILWAY TIMETABLE — Northbridge, Eastwick, Greyhaven.";
        break;

      case "item":
        if (target.id) {
          this.inventory = addItem(this.inventory, target.id);

          this.message = `Collected ${target.label}.`;
          target.gameObject?.destroy();

          this.interactables = this.interactables.filter(
            (object) => object !== target,
          );
        }
        break;
    }

    this.publish();
  }

  private getNearbyInteractable(): Interactable | undefined {
    return this.interactables
      .map((interactable) => ({
        interactable,
        distance: Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          interactable.x,
          interactable.y,
        ),
      }))
      .filter(({ interactable, distance }) => distance < interactable.radius)
      .sort((a, b) => a.distance - b.distance)[0]?.interactable;
  }

  private publish() {
    this.reporter({
      message: this.message,
      inventory: inventoryToList(this.inventory, {
        notes: "Field notes",
        token: "Brass token",
      }),
    });
  }
}
