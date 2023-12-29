import {
  STACK,
  TILE_KEYS,
  getNextMoves,
  hasCloister,
  placedTiles,
  resetStack,
} from "./data.js";
const TILE_SIZE = 100;
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

function renderTileBackground(tile) {
  const graphics = new PIXI.Graphics();

  // Rectangle
  graphics.lineStyle(2, 0x004000, 1);
  graphics.beginFill(0xff0000);
  const { x, y } = convertTileToRealCoordinates(tile);
  graphics.drawRect(x, y, TILE_SIZE, TILE_SIZE);
  graphics.endFill();
  app.stage.addChild(graphics);
}

function renderTileCloister(tile) {
  const graphics = new PIXI.Graphics();

  graphics.lineStyle(2, 0xfeeb77, 1);
  graphics.beginFill(CLOISTER_COLOR, 1);
  const { x, y } = convertTileToRealCoordinates(tile);
  graphics.drawCircle(x + TILE_SIZE / 2, y + TILE_SIZE / 2, TILE_SIZE / 4);
  graphics.endFill();
  app.stage.addChild(graphics);
}

function renderSegment(tile, location) {
  // render a triangle joining the top left, top right, and center
  // of the tile

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

function onPlaceNextTile(tile) {
  const nextTile = STACK[STACK.length - 1];
  if (nextTile) {
    tiles.push({ x: tile.x, y: tile.y, data: STACK.pop().data });
  }
  render();
}

function renderSegments(tile) {
  renderSegment(tile, TILE_KEYS.north);
  renderSegment(tile, TILE_KEYS.east);
  renderSegment(tile, TILE_KEYS.south);
  renderSegment(tile, TILE_KEYS.west);
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

function addClickDetector(tile, callback) {
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

function renderTile(tile) {
  if (tile.data === "empty") {
    addClickDetector(tile, onPlaceNextTile);
  }
  renderTileBackground(tile);
  renderSegments(tile);
  if (hasCloister(tile)) {
    renderTileCloister(tile);
  }
}

function renderTiles(tiles) {
  tiles.forEach((tile) => {
    renderTile(tile);
  });
}

function renderNextTile(nextTile) {
  renderTile({
    xOverride: 10,
    yOverride: app.screen.height - TILE_SIZE - 10,
    data: nextTile.data,
  });
}

function render() {
  app.stage.removeChildren();
  console.log({ tiles });
  const nextMoves = getNextMoves(tiles);
  // concatonate tiles and nextMoves
  // last element of STACK
  const nextTile = STACK[STACK.length - 1];

  renderTiles([...tiles, ...nextMoves], nextTile);
  if (nextTile) {
    renderNextTile(nextTile);
  }
}

// Create the application helper and add its render target to the page
let app = new PIXI.Application({ resizeTo: window });
document.body.appendChild(app.view);
resetStack();

const tiles = placedTiles;

tiles.push({ x: 0, y: 0, data: "CCRRB" });
render();
