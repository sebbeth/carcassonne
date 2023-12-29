export function gameTileFactory(parent, direction) {
  return {};
}

export const placedTiles = [];

export let STACK = [];

export function resetStack() {
  STACK = [
    { data: "CCFCB" },
    { data: "CFFCB" },
    { data: "FFFCB" },
    { data: "FFFCC" },
    { data: "FFFCB" },
    { data: "CCCCB" },
    { data: "FFFCB" },
    { data: "RRRCB" },
    { data: "CCFCC" },
    { data: "FFRCC" },
    { data: "RRFCC" },
    { data: "CCRCB" },
    { data: "FFRCB" },
    { data: "RRRCC" },
    { data: "CCFCC" },
    { data: "FFRCC" },
    { data: "RRFCC" },
    { data: "CCRCB" },
    { data: "FFRCB" },
    { data: "RRRCC" },
    { data: "CCFCC" },
    { data: "FFRCC" },
    { data: "RRFCC" },
    { data: "CCRCB" },
    { data: "FFRCB" },
    { data: "RRRCC" },
  ];
}

export const TILE_KEYS = {
  north: 0,
  east: 1,
  south: 2,
  west: 3,
  center: 4,
};

export function hasCloister(tile) {
  return tile.data[TILE_KEYS.center] === "C";
}

export function getNextMoves(tiles) {
  const adjacentTiles = tiles.map((tile) => getAdjacentTiles(tiles, tile));
  const emptyAdjacentTiles = [];
  adjacentTiles.forEach((tile) => {
    tile.forEach((adjacentTile) => {
      if (adjacentTile.data === "empty") {
        emptyAdjacentTiles.push(adjacentTile);
      }
    });
  });
  return emptyAdjacentTiles;
}

export function getAdjacentTiles(tiles, tile) {
  return getAdjacentTileCoordinates(tile).map((coordinate) => {
    const foundTile = findTile(tiles, coordinate);
    return foundTile
      ? foundTile
      : { x: coordinate.x, y: coordinate.y, data: "empty" };
  });
}
export function findTile(tiles, coordinate) {
  return tiles.find(
    (tile) => tile.x === coordinate.x && tile.y === coordinate.y
  );
}

export function getAdjacentTileCoordinates(tile) {
  return [
    { x: tile.x, y: tile.y + 1 },
    { x: tile.x + 1, y: tile.y },
    { x: tile.x, y: tile.y - 1 },
    { x: tile.x - 1, y: tile.y },
  ];
}
