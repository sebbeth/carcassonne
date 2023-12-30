import {
  STACK,
  getNextMoves,
  placedTiles,
  resetStack,
  rotateTile,
} from "./data.js";

import { renderTile } from "./renderTile.js";
export const TILE_SIZE = 100;

const STYLE = "simple";

function onPlaceNextTile(tile) {
  const nextTile = STACK[STACK.length - 1];
  if (nextTile) {
    tiles.push({ x: tile.x, y: tile.y, data: STACK.pop().data });
  }
  render();
}

function renderButton(params) {
  const { texture, position, callback } = params;
  const button = new PIXI.Sprite(texture);
  button.interactive = true;
  button.x = position.x;
  button.y = position.y;
  // red
  button.tint = 0xff0000;
  button.buttonMode = true;
  button.on("pointerdown", callback);
  app.stage.addChild(button);
}

function renderTiles(tiles) {
  tiles.forEach((tile) => {
    renderTile({ tile, app, onClick: onPlaceNextTile, style: STYLE });
  });
}

function renderNextTile(nextTile) {
  const tile = {
    xOverride: 10,
    yOverride: app.screen.height - TILE_SIZE - 10,
    data: nextTile.data,
  };
  renderTile({ tile, app, style: STYLE });
}

function renderButtons() {
  renderButton({
    texture: PIXI.Texture.from("assets/left-arrow.png"),
    position: { x: TILE_SIZE + 50, y: app.screen.height - 60 },
    callback: () => {
      STACK[STACK.length - 1] = rotateTile(STACK[STACK.length - 1], "left");
      render();
    },
  });
  renderButton({
    texture: PIXI.Texture.from("assets/right-arrow.png"),
    position: { x: TILE_SIZE + 100, y: app.screen.height - 60 },
    callback: () => {
      STACK[STACK.length - 1] = rotateTile(STACK[STACK.length - 1], "right");
      render();
    },
  });
}

function render() {
  app.stage.removeChildren();
  console.log({ tiles });
  renderButtons();
  const nextTile = STACK[STACK.length - 1];
  const nextMoves = getNextMoves(tiles, nextTile);

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
