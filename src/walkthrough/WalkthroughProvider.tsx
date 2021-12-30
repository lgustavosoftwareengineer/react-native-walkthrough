import React, {createContext, useCallback, useState} from 'react';

export type WalkthroughItem = {
  id: string;
  visible: boolean;
};

export type Walkthrough = {
  registry: (id: string) => void;
  start: (intervalToStart?: number) => void;
  callNext: (intervalToCallTheNext?: number) => void;
  getProperties(id: string): WalkthroughItem;
  clean: () => void;
};

const WalkthroughContext = createContext<Walkthrough | undefined>(undefined);

export type WalkthroughProviderProps = {
  children: React.ReactNode;
};

export default function WalkthroughProvider(props: WalkthroughProviderProps) {
  const [walkthroughItems, setWalkthroughItems] = useState<WalkthroughItem[]>(
    [],
  );

  const [actualWalkthroughIndex, setActualWalkthroughIndex] = useState(0);

  const isListEmpty = useCallback(() => {
    return walkthroughItems.length === 0;
  }, [walkthroughItems.length]);

  const findAItemById = useCallback(
    (id: string): WalkthroughItem | undefined => {
      if (isListEmpty()) {
        return undefined;
      }

      const foundWalkthroughItem = walkthroughItems.find(
        lisElement => lisElement.id === id,
      );

      return foundWalkthroughItem;
    },
    [walkthroughItems, isListEmpty],
  );

  const verifyIfExistsById = useCallback(
    (id: string) => {
      const foundWalkthroughItem = findAItemById(id);

      return Boolean(foundWalkthroughItem);
    },
    [findAItemById],
  );

  const registry = useCallback(
    (id: string) => {
      if (verifyIfExistsById(id)) {
        return;
      }

      const walkthroughElement: WalkthroughItem = {
        id,
        visible: false,
      };

      setWalkthroughItems(prevWalkthroughItems => [
        ...prevWalkthroughItems,
        walkthroughElement,
      ]);
    },
    [verifyIfExistsById],
  );

  const clean = useCallback(() => {
    setWalkthroughItems([]);
    setActualWalkthroughIndex(0);
  }, []);

  const alreadyFinished = useCallback(() => {
    if (isListEmpty()) {
      return true;
    }

    const lastWalkthroughItem = walkthroughItems[walkthroughItems.length - 1];

    const isLastWalkthroughItemVisible = lastWalkthroughItem.visible;

    return isLastWalkthroughItemVisible;
  }, [walkthroughItems, isListEmpty]);

  const resetOnFinish = useCallback(() => {
    const actualWalkthroughItem = walkthroughItems[actualWalkthroughIndex];

    const finishedActualWalkthroughItem: WalkthroughItem = {
      ...actualWalkthroughItem,
      visible: false,
    };

    const firstPartFromNewWalkthroughItems = walkthroughItems.slice(
      0,
      actualWalkthroughIndex,
    );

    const secondPartFromNewWalkthroughItems = walkthroughItems.slice(
      actualWalkthroughIndex + 1,
    );

    const newWalkthoughItems = [
      ...firstPartFromNewWalkthroughItems,
      finishedActualWalkthroughItem,
      ...secondPartFromNewWalkthroughItems,
    ];

    setWalkthroughItems(newWalkthoughItems);
    setActualWalkthroughIndex(0);
  }, [actualWalkthroughIndex, walkthroughItems]);

  const start = useCallback(
    (intervalToStart = 0) => {
      setTimeout(() => {
        if (!isListEmpty()) {
          const [firstWalkthroughItem, ...walkthroughItemsWithoutFirstElement] =
            walkthroughItems;

          const startedFirstWalkthroughItem: WalkthroughItem = {
            ...firstWalkthroughItem,
            visible: true,
          };

          setWalkthroughItems([
            startedFirstWalkthroughItem,
            ...walkthroughItemsWithoutFirstElement,
          ]);
        }
      }, intervalToStart);
    },
    [walkthroughItems, isListEmpty],
  );

  const callNext = useCallback(
    (intervalToCallTheNext = 0) => {
      setTimeout(() => {
        if (alreadyFinished()) {
          return resetOnFinish();
        }

        const actualWalkthroughItem = walkthroughItems[actualWalkthroughIndex];

        const finishedActualWalkthroughItem: WalkthroughItem = {
          ...actualWalkthroughItem,
          visible: false,
        };

        const nextElementIndex = actualWalkthroughIndex + 1;

        const nextElement = walkthroughItems[nextElementIndex];

        const startedNextElement: WalkthroughItem = {
          ...nextElement,
          visible: true,
        };

        const firstPartFromNewWalkthroughItems = walkthroughItems.slice(
          0,
          nextElementIndex - 1,
        );

        const secondPartFromNewWalkthroughItems = walkthroughItems.slice(
          nextElementIndex + 1,
        );

        const newWalkthroughItems = Array.prototype.concat(
          firstPartFromNewWalkthroughItems,
          [finishedActualWalkthroughItem, startedNextElement],
          secondPartFromNewWalkthroughItems,
        );

        setWalkthroughItems(newWalkthroughItems);

        setActualWalkthroughIndex(nextElementIndex);
      }, intervalToCallTheNext);
    },
    [actualWalkthroughIndex, alreadyFinished, walkthroughItems, resetOnFinish],
  );

  const getProperties = useCallback(
    (id: string): WalkthroughItem => {
      const foundWalkthroughItem = findAItemById(id);

      if (!foundWalkthroughItem) {
        return {
          id,
          visible: false,
        };
      }

      return foundWalkthroughItem;
    },
    [findAItemById],
  );

  return (
    <WalkthroughContext.Provider
      value={{
        registry,
        start,
        callNext,
        getProperties,
        clean,
      }}
      {...props}
    />
  );
}

WalkthroughProvider.Context = WalkthroughContext;
