import React from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
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
};

function setArrowPosition(isTheElementPositionedInRight: boolean) {
  const POSITION_VALUE = 20;

  if (isTheElementPositionedInRight) {
    return {
      right: POSITION_VALUE,
    };
  }

  return {
    left: POSITION_VALUE,
  };
}

export default function TooltipBalloon({
  children,
  style,
  arrowPosition = 'bottom',
  isTheElementPositionedInRight,
  onLayoutBalloon,
}: TooltipBalloonProps) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 20,
    },
    arrowDefaultStyle: {
      position: 'absolute',
    },
    arrowBottomStyle: {
      bottom: -6,
      ...setArrowPosition(isTheElementPositionedInRight),
    },
    arrowTopStyle: {
      top: -6,
      ...setArrowPosition(isTheElementPositionedInRight),
    },
    arrowLeftStyle: {
      top: 20,
      left: -6,
    },
    arrowRightStyle: {
      top: 20,
      right: -6,
    },
  });

  const defaultStyle = StyleSheet.flatten([styles.container, style]);

  const tooltipBallonArrowStyles = {
    [TooltipBalloonArrowPosition.BOTTOM]: styles.arrowBottomStyle,
    [TooltipBalloonArrowPosition.TOP]: styles.arrowTopStyle,
    [TooltipBalloonArrowPosition.LEFT]: styles.arrowLeftStyle,
    [TooltipBalloonArrowPosition.RIGHT]: styles.arrowRightStyle,
  };

  const chooseTooltipBallonArrowStyle = tooltipBallonArrowStyles[arrowPosition];

  const tooltipBallonArrowStyle = StyleSheet.flatten([
    styles.arrowDefaultStyle,
    chooseTooltipBallonArrowStyle,
  ]);

  return (
    <View style={defaultStyle} onLayout={onLayoutBalloon}>
      {children}
      <TooltipBallonArrow
        style={tooltipBallonArrowStyle}
        position={arrowPosition}
      />
    </View>
  );
}
