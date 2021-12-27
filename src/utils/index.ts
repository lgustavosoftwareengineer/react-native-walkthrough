export type CalculateHorizontalPositionParams = {
  value?: number;
  isTheElementPositionedInRight: boolean;
};

export function calculateHorizontalPosition({
  value = 0,
  isTheElementPositionedInRight,
}: CalculateHorizontalPositionParams) {
  if (isTheElementPositionedInRight) {
    return {
      right: value,
    };
  }

  return {
    left: value,
  };
}
