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
    { data: "FFFCB" },
    { data: "FFFCB" },
    { data: "CCCCB" },
    { data: "FFFCB" },
    { data: "RRRCB" },
    { data: "CCFCB" },
    { data: "FFRCB" },
    { data: "RRFCB" },
    { data: "CCRCB" },
    { data: "FFRCB" },
    { data: "RRRCB" },
    { data: "CCFCB" },
    { data: "FFRCB" },
    { data: "RRFCB" },
    { data: "CCRCB" },
    { data: "FFRCB" },
    { data: "RRRCB" },
    { data: "FFRFC" },
    { data: "FFRFC" },
    { data: "CCFCB" },
    { data: "FFRCB" },
    { data: "FFRFC" },
    { data: "FFFCB" },
    { data: "CCCCB" },
    { data: "FFFCB" },
    { data: "FFFFC" },
    { data: "RRRCB" },
    { data: "CCFCB" },
    { data: "FFRCB" },
    { data: "RRFCB" },
    { data: "RRFCB" },
    { data: "FFFFC" },
    { data: "CCRCB" },
    { data: "FFRCB" },
    { data: "RRRCB" },
    { data: "CCFCB" },
    { data: "FFRCB" },
    { data: "FFFFC" },
    { data: "RRFCB" },
    { data: "CCRCB" },
    { data: "CCRCB" },
    { data: "FFRCB" },
    { data: "RRRCB" },
    { data: "FFFFC" },
    { data: "CCFCB" },
    { data: "FFRCB" },
    { data: "RRFCB" },
    { data: "RRRCB" },
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

export function rotateTile(tile, direction) {
  let compassPoints = tile.data.slice(0, 4);
  const remainingCharacters = tile.data.slice(4);
  // rotate dcompassPoints
  if (direction === "left") {
    // take the first character of the string and move it to the end
    const first = compassPoints[0];
    compassPoints = compassPoints.slice(1) + first;
  }
  if (direction === "right") {
    // take the last character of the string and move it to the beginning
    const last = compassPoints[compassPoints.length - 1];
    compassPoints = last + compassPoints.slice(0, compassPoints.length - 1);
  }
  return {
    ...tile,
    data: `${compassPoints}${remainingCharacters}`,
  };
}
