import React, {useCallback, useEffect} from 'react';
import {TooltipElement, TooltipElementProps} from 'tooltip-element';
import useWalkthrough from './useWalkthrough';

export type WalkthroughElementProps = {
  id: string;
  onRequestClose?: () => void;
  children: React.ReactNode;
  tooltipElementProps: Omit<
    TooltipElementProps,
    'children' | 'visible' | 'onRequestClose'
  >;
  intervalToCallTheNext?: number;
};

export default function WalkthroughElement({
  id,
  onRequestClose: onRequestCloseFromProps,
  children,
  tooltipElementProps,
  intervalToCallTheNext = 0,
}: WalkthroughElementProps) {
  const {getProperties, callNextElement, registry} = useWalkthrough();

  useEffect(() => {
    registry(id);
  }, [id, registry]);

  const onRequestClose = useCallback(() => {
    onRequestCloseFromProps && onRequestCloseFromProps();
    callNextElement(intervalToCallTheNext);
  }, [callNextElement, intervalToCallTheNext, onRequestCloseFromProps]);

  const walkthroughElementProps = {
    ...getProperties(id),
    onRequestClose: onRequestClose,
    ...tooltipElementProps,
  };

  return (
    <TooltipElement {...walkthroughElementProps}>{children}</TooltipElement>
  );
}
