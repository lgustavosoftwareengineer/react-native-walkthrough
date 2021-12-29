import React, {useRef} from 'react';
import {LayoutChangeEvent, Omit, StyleSheet, View} from 'react-native';
import TooltipElementModal, {
  TooltipElementModalProps,
} from './TooltipElementModal';

export type ElementMeasuresInfos = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TooltipElementProps = Omit<
  TooltipElementModalProps,
  'elementMeasuresInfos'
>;

export default function TooltipElement({
  children,
  ...props
}: TooltipElementProps) {
  const elementMeasuresInfos = useRef<ElementMeasuresInfos>({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  }).current;

  function getChildrenPosition(event: LayoutChangeEvent) {
    const layout = event.nativeEvent.layout;

    elementMeasuresInfos.x = layout.x;
    elementMeasuresInfos.y = layout.y;
    elementMeasuresInfos.height = layout.height;
    elementMeasuresInfos.width = layout.width;
  }

  return (
    <View style={styles.container} onLayout={getChildrenPosition}>
      {children}
      <TooltipElementModal
        children={children}
        elementMeasuresInfos={elementMeasuresInfos}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
