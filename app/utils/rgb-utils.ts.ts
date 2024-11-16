interface Pos {
  x: number
  y: number
}

export function getDistance(startPos: Pos, endPos: Pos): number {
  return Math.sqrt(
    Math.pow(endPos.x - startPos.x, 2)
    + Math.pow(endPos.y - startPos.y, 2),
  )
}
