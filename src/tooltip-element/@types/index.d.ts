declare module 'tooltip-element' {
  export type TooltipElementProps =
    import('../TooltipElement').TooltipElementProps;

  export function TooltipElement(props: TooltipElementProps): JSX.Element;
}
