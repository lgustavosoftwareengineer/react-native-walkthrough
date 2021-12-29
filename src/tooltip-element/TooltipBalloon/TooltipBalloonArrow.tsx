import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

export const TooltipBalloonArrowPosition = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type TooltipBalloonArrowPositionType =
  typeof TooltipBalloonArrowPosition[keyof typeof TooltipBalloonArrowPosition];

export type TooltipBalloonArrowProps = {
  position?: TooltipBalloonArrowPositionType;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export default function TooltipBallonArrow({
  position = 'bottom',
  size = 10,
  color = '#fff',
  style,
}: TooltipBalloonArrowProps) {
  const styles = StyleSheet.create({
    triangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
    },
    arrowUp: {
      borderTopWidth: 0,
      borderRightWidth: size,
      borderBottomWidth: size,
      borderLeftWidth: size,
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: color,
      borderLeftColor: 'transparent',
    },
    arrowRight: {
      borderTopWidth: size,
      borderRightWidth: 0,
      borderBottomWidth: size,
      borderLeftWidth: size,
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: color,
    },
    arrowDown: {
      borderTopWidth: size,
      borderRightWidth: size,
      borderBottomWidth: 0,
      borderLeftWidth: size,
      borderTopColor: color,
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
    },
    arrowLeft: {
      borderTopWidth: size,
      borderRightWidth: size,
      borderBottomWidth: size,
      borderLeftWidth: 0,
      borderTopColor: 'transparent',
      borderRightColor: color,
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
    },
    arrowUpLeft: {
      borderTopWidth: size,
      borderRightWidth: size,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderTopColor: color,
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
    },
    arrowUpRight: {
      borderTopWidth: 0,
      borderRightWidth: size,
      borderBottomWidth: size,
      borderLeftWidth: 0,
      borderTopColor: 'transparent',
      borderRightColor: color,
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
    },
    arrowDownLeft: {
      borderTopWidth: size,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: size,
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: color,
    },
    arrowDownRight: {
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: size,
      borderLeftWidth: size,
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: color,
      borderLeftColor: 'transparent',
    },
  });

  const arrowPossibleStyles = {
    [TooltipBalloonArrowPosition.BOTTOM]: styles.arrowDown,
    [TooltipBalloonArrowPosition.TOP]: styles.arrowUp,
    [TooltipBalloonArrowPosition.LEFT]: styles.arrowLeft,
    [TooltipBalloonArrowPosition.RIGHT]: styles.arrowRight,
  };

  const chooseArrowStyle = arrowPossibleStyles[position];

  const defaultStyle = StyleSheet.flatten([
    styles.triangle,
    chooseArrowStyle,
    style,
  ]);

  return <View style={defaultStyle} />;
}
