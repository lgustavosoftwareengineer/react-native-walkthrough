declare module 'walkthrough' {
  export type Walkthrough = import('../WalkthroughProvider').Walkthrough;
  export type WalkthroughProviderProps =
    import('../WalkthroughProvider').WalkthroughProviderProps;

  export function WalkthroughProvider(
    props: WalkthroughProviderProps,
  ): JSX.Element;

  export type UseWalkthrough = import('../useWalkthrough').UseWalkthrough;

  export function useWalkthrough(): UseWalkthrough;

  export type WalkthroughElementProps =
    import('../WalkthroughElement').WalkthroughElementProps;

  export function WalkthroughElement(
    props: WalkthroughElementProps,
  ): JSX.Element;
}
