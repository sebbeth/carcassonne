import { hasCloister, TILE_KEYS } from "./data.js";
import { TILE_SIZE } from "./game.js";

const PADDING = 2;
const origin = { x: 300, y: 300 };
// yellow
const CLOISTER_COLOR = 0xffff00;
// green
const FARM_COLOR = 0x00ff00;
// orange
const CITY_COLOR = 0xffa500;
// light blue
const ROAD_COLOR = 0xadd8e6;

function addClickDetector(tile, callback, app) {
  const sprite = PIXI.Sprite.from("assets/square.png");
  const { x, y } = convertTileToRealCoordinates(tile);
  sprite.x = x;
  sprite.y = y;
  sprite.width = TILE_SIZE;
  sprite.height = TILE_SIZE;
  sprite.eventMode = "static";
  sprite.cursor = "pointer";
  sprite.on("pointerdown", () => callback(tile));
  app.stage.addChild(sprite);
}

function renderTileBackground(tile, app) {
  const graphics = new PIXI.Graphics();

  // Rectangle
  graphics.lineStyle(2, 0x004000, 1);
  graphics.beginFill(0xff0000);
  const { x, y } = convertTileToRealCoordinates(tile);
  graphics.drawRect(x, y, TILE_SIZE, TILE_SIZE);
  graphics.endFill();
  app.stage.addChild(graphics);
}

function renderSimpleTileCloister(tile, app) {
  const graphics = new PIXI.Graphics();

  graphics.lineStyle(2, 0xfeeb77, 1);
  graphics.beginFill(CLOISTER_COLOR, 1);
  const { x, y } = convertTileToRealCoordinates(tile);
  graphics.drawCircle(x + TILE_SIZE / 2, y + TILE_SIZE / 2, TILE_SIZE / 4);
  graphics.endFill();
  app.stage.addChild(graphics);
}

function renderSimpleSegment(tile, location, app) {
  const graphics = new PIXI.Graphics();
  graphics.beginFill(getLandColor(tile, location), 1);
  const { x, y } = convertTileToRealCoordinates(tile);
  switch (location) {
    case TILE_KEYS.north:
      graphics.moveTo(x + TILE_SIZE / 2, y + TILE_SIZE / 2);
      graphics.lineTo(x, y);
      graphics.lineTo(x + TILE_SIZE, y);
      break;
    case TILE_KEYS.east:
      graphics.moveTo(x + TILE_SIZE / 2, y + TILE_SIZE / 2);
      graphics.lineTo(x + TILE_SIZE, y);
      graphics.lineTo(x + TILE_SIZE, y + TILE_SIZE);
      break;
    case TILE_KEYS.south:
      graphics.moveTo(x + TILE_SIZE / 2, y + TILE_SIZE / 2);
      graphics.lineTo(x + TILE_SIZE, y + TILE_SIZE);
      graphics.lineTo(x, y + TILE_SIZE);
      break;
    case TILE_KEYS.west:
      graphics.moveTo(x + TILE_SIZE / 2, y + TILE_SIZE / 2);
      graphics.lineTo(x, y);
      graphics.lineTo(x, y + TILE_SIZE);
      break;

    default:
      break;
  }
  graphics.closePath();
  graphics.endFill();
  app.stage.addChild(graphics);
}

function renderSegment(tile, location, app) {
  const graphics = new PIXI.Graphics();
  graphics.beginFill(getLandColor(tile, location), 1);
  const { x, y } = convertTileToRealCoordinates(tile);
  switch (location) {
    // case TILE_KEYS.north:
    //   graphics.moveTo(x + TILE_SIZE / 2, y + TILE_SIZE / 2);
    //   graphics.lineTo(x, y);
    //   graphics.lineTo(x + TILE_SIZE, y);
    //   break;
    case TILE_KEYS.east:
      graphics.moveTo(x + TILE_SIZE / 2, y + TILE_SIZE / 2);
      graphics.lineTo(x + TILE_SIZE, y);
      graphics.lineTo(x + TILE_SIZE, y + TILE_SIZE);
      break;
    case TILE_KEYS.south:
      graphics.moveTo(x + TILE_SIZE / 2, y + TILE_SIZE / 2);
      graphics.lineTo(x + TILE_SIZE, y + TILE_SIZE);
      graphics.lineTo(x, y + TILE_SIZE);
      break;
    case TILE_KEYS.west:
      graphics.moveTo(x + TILE_SIZE / 2, y + TILE_SIZE / 2);
      graphics.lineTo(x, y);
      graphics.lineTo(x, y + TILE_SIZE);
      break;

    default:
      break;
  }
  graphics.closePath();
  graphics.endFill();
  app.stage.addChild(graphics);
}

function getLandColor(tile, location) {
  switch (tile.data[location]) {
    case "R":
      return ROAD_COLOR;
    case "C":
      return CITY_COLOR;
    case "F":
      return FARM_COLOR;
    default:
      return 0x000000;
  }
}

function convertTileToRealCoordinates(tile) {
  return {
    x: tile.xOverride ?? origin.x + tile.x * (TILE_SIZE + PADDING),
    y: tile.yOverride ?? origin.y + tile.y * (TILE_SIZE + PADDING),
  };
}

function renderSimpleSegments(tile, app) {
  [TILE_KEYS.north, TILE_KEYS.east, TILE_KEYS.south, TILE_KEYS.west].forEach(
    (k) => renderSimpleSegment(tile, k, app)
  );
}
function renderSegments(tile, app) {
  [TILE_KEYS.north, TILE_KEYS.east, TILE_KEYS.south, TILE_KEYS.west].forEach(
    (k) => renderSegment(tile, k, app)
  );
}

export function renderTile(params) {
  const { app, tile, onClick, style } = params;
  if (tile.data === "empty") {
  }

  if (tile.data === "legal") {
    addClickDetector(tile, onClick, app);
  }
  renderTileBackground(tile, app);
  switch (style) {
    case "fancy":
      renderSegments(tile, app);
      break;

    default:
      renderSimpleSegments(tile, app);
      break;
  }
  if (hasCloister(tile)) {
    renderSimpleTileCloister(tile, app);
  }
}
