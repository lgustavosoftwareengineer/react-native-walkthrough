import React from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {calculateHorizontalPosition} from '../utils';
import TooltipBallonArrow, {
  TooltipBalloonArrowPositionType,
  TooltipBalloonArrowPosition,
} from './TooltipBalloonArrow';

export type TooltipBalloonProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  arrowPosition?: TooltipBalloonArrowPositionType;
  isTheElementPositionedInRight: boolean;
  onLayoutBalloon: ((event: LayoutChangeEvent) => void) | undefined;
  arrowColor?: string;
  arrowSize?: number;
};

export default function TooltipBalloon({
  children,
  style,
  arrowPosition = 'bottom',
  isTheElementPositionedInRight,
  onLayoutBalloon,
  arrowColor,
  arrowSize,
}: TooltipBalloonProps) {
  function calculateArrowHorizontalPosition() {
    const DEFAULT_POSITION_VALUE = 20;

    return calculateHorizontalPosition({
      isTheElementPositionedInRight,
      value: DEFAULT_POSITION_VALUE,
    });
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 20,
    },
    arrowDefault: {
      position: 'absolute',
    },
    arrowBottom: {
      bottom: -6,
      ...calculateArrowHorizontalPosition(),
    },
    arrowTop: {
      top: -6,
      ...calculateArrowHorizontalPosition(),
    },
    arrowLeft: {
      top: 20,
      left: -6,
    },
    arrowRight: {
      top: 20,
      right: -6,
    },
  });

  const defaultContainerStyle = StyleSheet.flatten([styles.container, style]);

  const arrowPositionsStyles = {
    [TooltipBalloonArrowPosition.BOTTOM]: styles.arrowBottom,
    [TooltipBalloonArrowPosition.TOP]: styles.arrowTop,
    [TooltipBalloonArrowPosition.LEFT]: styles.arrowLeft,
    [TooltipBalloonArrowPosition.RIGHT]: styles.arrowRight,
  };

  const chosenArrowPositionStyle = arrowPositionsStyles[arrowPosition];

  const defaultArrowStyle = StyleSheet.flatten([
    styles.arrowDefault,
    chosenArrowPositionStyle,
  ]);

  return (
    <View style={defaultContainerStyle} onLayout={onLayoutBalloon}>
      {children}
      <TooltipBallonArrow
        style={defaultArrowStyle}
        position={arrowPosition}
        color={arrowColor}
        size={arrowSize}
      />
    </View>
  );
}
