import {BlurView} from '@react-native-community/blur';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  Dimensions,
  LayoutRectangle,
  LayoutChangeEvent,
} from 'react-native';
import TooltipBalloon from './TooltipBalloon/TooltipBalloon';
import {TooltipBalloonArrowPosition} from './TooltipBalloon/TooltipBalloonArrow';
import {ElementMeasuresInfos} from './TooltipElement';
import {calculateHorizontalPosition} from './utils';

export const BalloonPosition = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type BalloonPositionType =
  typeof BalloonPosition[keyof typeof BalloonPosition];

export type TooltipElementModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  elementMeasuresInfos: ElementMeasuresInfos;
  tooltipBallonContent: React.ReactNode;
  ballonPosition?: BalloonPositionType;
  ballonStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  blurAmount?: number;
};

const ARROW_POSITIONS = {
  [BalloonPosition.BOTTOM]: TooltipBalloonArrowPosition.TOP,
  [BalloonPosition.TOP]: TooltipBalloonArrowPosition.BOTTOM,
  [BalloonPosition.LEFT]: TooltipBalloonArrowPosition.RIGHT,
  [BalloonPosition.RIGHT]: TooltipBalloonArrowPosition.LEFT,
};

function calculateTooltipBalloonHorizontalPosition(
  isTheElementPositionedInRight: boolean,
) {
  return calculateHorizontalPosition({isTheElementPositionedInRight});
}

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const MODAL_BACKGROUND_COLOR = 'rgba(0,0,0,0.2)';

export default function TooltipElementModal({
  visible,
  onRequestClose,
  children,
  elementMeasuresInfos,
  tooltipBallonContent,
  ballonPosition = 'bottom',
  ballonStyle,
  blurAmount = 0,
  style,
}: TooltipElementModalProps) {
  function onLayoutBalloon(event: LayoutChangeEvent) {
    const layout = event.nativeEvent.layout;

    setTooltipBalloonLayout(layout);
  }

  const [tooltipBalloonLayout, setTooltipBalloonLayout] =
    useState<LayoutRectangle>();

  const {height: tooltipBalloonHeight = 0} = tooltipBalloonLayout ?? {};

  const {x, y, height, width} = elementMeasuresInfos;

  const isTheElementPositionedInRight = x >= SCREEN_WIDTH / 2;

  const ballonSpaceFromBottomToElement = tooltipBalloonHeight / 2.5;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    element: {
      width: '100%',
      position: 'absolute',
      top: y,
      left: x,
    },
    defaultTooltipBallon: {
      position: 'absolute',
    },
    background: {
      backgroundColor: MODAL_BACKGROUND_COLOR,
      flex: 1,
    },
    tooltipBallonTop: {
      bottom: y - height + ballonSpaceFromBottomToElement,
      ...calculateTooltipBalloonHorizontalPosition(
        isTheElementPositionedInRight,
      ),
    },
    tooltipBallonBottom: {
      top: y + height + 10,
      ...calculateTooltipBalloonHorizontalPosition(
        isTheElementPositionedInRight,
      ),
    },
    tooltipBallonLeft: {
      top: y,
      right: width - 20,
    },
    tooltipBallonRight: {
      top: y,
      left: width - 20,
    },
  });

  const ballonPositionStyles = {
    [BalloonPosition.BOTTOM]: styles.tooltipBallonBottom,
    [BalloonPosition.TOP]: styles.tooltipBallonTop,
    [BalloonPosition.LEFT]: styles.tooltipBallonLeft,
    [BalloonPosition.RIGHT]: styles.tooltipBallonRight,
  };

  const chosenArrowPosition = ARROW_POSITIONS[ballonPosition];

  const chosenBallonPositionStyle = ballonPositionStyles[ballonPosition];

  const tooltipBallonStyle: StyleProp<ViewStyle> = StyleSheet.flatten([
    styles.defaultTooltipBallon,
    chosenBallonPositionStyle,
    ballonStyle,
  ]);

  const backgroundStyle = StyleSheet.flatten([styles.background, style]);

  const isUsingBlur = Boolean(blurAmount);

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        visible={visible}
        onRequestClose={onRequestClose}
        transparent>
        {isUsingBlur && (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={blurAmount}
          />
        )}
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View style={backgroundStyle}>
            <View style={styles.element}>{children}</View>
            <TooltipBalloon
              style={tooltipBallonStyle}
              arrowPosition={chosenArrowPosition}
              isTheElementPositionedInRight={isTheElementPositionedInRight}
              onLayoutBalloon={onLayoutBalloon}>
              {tooltipBallonContent}
            </TooltipBalloon>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
