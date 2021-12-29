import {useContext} from 'react';
import WalkthroughProvider, {Walkthrough} from './WalkthroughProvider';

export type UseWalkthrough = Walkthrough;

export default function useWalkthrough() {
  const context = useContext(WalkthroughProvider.Context);

  if (!context) {
    throw new Error('This hook must be wrapped by WalkthroughProvider context');
  }

  return context;
}
