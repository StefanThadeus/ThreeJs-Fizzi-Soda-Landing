export const getXPosition = (distance: number, angle: number) =>
  Math.cos(angle) * distance;

export const getYPosition = (distance: number, angle: number) =>
  Math.sin(angle) * distance;

export const getXYPositions = (distance: number, angle: number) => ({
  x: getXPosition(distance, angle),
  y: getYPosition(distance, angle),
});
