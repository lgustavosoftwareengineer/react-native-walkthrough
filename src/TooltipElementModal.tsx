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
  ViewProps,
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
  backgroundComponent?: React.ComponentType<ViewProps>;
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

export default function TooltipElementModal({
  visible,
  onRequestClose,
  children,
  elementMeasuresInfos,
  tooltipBallonContent,
  ballonPosition = 'bottom',
  ballonStyle,
  backgroundComponent,
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

  const ballonSpaceFromBottomToElement = tooltipBalloonHeight / 5;

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
      backgroundColor: 'rgba(0,0,0,0.5)',
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

  const BackgroundComponent = backgroundComponent ?? View;

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        visible={visible}
        onRequestClose={onRequestClose}
        transparent>
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <BackgroundComponent style={styles.background}>
            <View style={styles.element}>{children}</View>
            <TooltipBalloon
              style={tooltipBallonStyle}
              arrowPosition={chosenArrowPosition}
              isTheElementPositionedInRight={isTheElementPositionedInRight}
              onLayoutBalloon={onLayoutBalloon}>
              {tooltipBallonContent}
            </TooltipBalloon>
          </BackgroundComponent>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
