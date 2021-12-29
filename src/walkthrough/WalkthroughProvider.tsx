import React, {createContext, useCallback, useState} from 'react';

export type Walkthrough = {
  registry: (id: string) => void;
  start: (intervalToStart?: number) => void;
  callNextElement: (intervalToCallTheNext?: number) => void;
  getProperties(id: string): WalkthroughElement;
};

export type WalkthroughElement = {
  id: string;
  visible: boolean;
};

const WalkthroughContext = createContext<Walkthrough | undefined>(undefined);

export type WalkthroughProviderProps = {
  children: React.ReactNode;
};

export default function WalkthroughProvider(props: WalkthroughProviderProps) {
  const [elementsList, setElementsList] = useState<WalkthroughElement[]>([]);

  const [actualElementIndex, setActualElementIndex] = useState(0);

  const isListEmpty = useCallback(() => {
    return elementsList.length === 0;
  }, [elementsList.length]);

  const findAElementById = useCallback(
    (id: string): WalkthroughElement | undefined => {
      if (isListEmpty()) {
        return undefined;
      }

      const foundElement = elementsList.find(
        lisElement => lisElement.id === id,
      );

      return foundElement;
    },
    [elementsList, isListEmpty],
  );

  const verifyIfExistsById = useCallback(
    (id: string) => {
      const foundElement = findAElementById(id);

      if (!foundElement) {
        return false;
      }

      return true;
    },
    [findAElementById],
  );

  const registry = useCallback(
    (id: string) => {
      if (verifyIfExistsById(id)) {
        return;
      }

      const walkthroughElement: WalkthroughElement = {
        id,
        visible: false,
      };

      setElementsList(prevState => [...prevState, walkthroughElement]);
    },
    [verifyIfExistsById],
  );

  const alreadyFinished = useCallback(() => {
    if (isListEmpty()) {
      return true;
    }

    const {visible} = elementsList[elementsList.length - 1];

    return visible;
  }, [elementsList, isListEmpty]);

  const reset = useCallback(() => {
    const actualElement = elementsList[actualElementIndex];

    const finishedActualElement: WalkthroughElement = {
      ...actualElement,
      visible: false,
    };

    const firstPartFromNewElementsList = elementsList.slice(
      0,
      actualElementIndex,
    );

    const secondPartFromNewElementsList = elementsList.slice(
      actualElementIndex + 1,
    );

    const newElementsList = [
      ...firstPartFromNewElementsList,
      finishedActualElement,
      ...secondPartFromNewElementsList,
    ];

    setElementsList(newElementsList);
    setActualElementIndex(0);
  }, [actualElementIndex, elementsList]);

  const start = useCallback(
    (intervalToStart = 0) => {
      setTimeout(() => {
        if (!isListEmpty()) {
          const [firstWalkthroughElement, ...elementsListWithoutFirstElement] =
            elementsList;

          const startedFirstWalkthroughElement: WalkthroughElement = {
            ...firstWalkthroughElement,
            visible: true,
          };

          setElementsList([
            startedFirstWalkthroughElement,
            ...elementsListWithoutFirstElement,
          ]);
        }
      }, intervalToStart);
    },
    [elementsList, isListEmpty],
  );

  const callNextElement = useCallback(
    (intervalToCallTheNext = 0) => {
      setTimeout(() => {
        if (alreadyFinished()) {
          return reset();
        }

        const actualElement = elementsList[actualElementIndex];

        const finishedActualElement: WalkthroughElement = {
          ...actualElement,
          visible: false,
        };

        const nextElementIndex = actualElementIndex + 1;

        const nextElement = elementsList[nextElementIndex];

        const startedNextElement: WalkthroughElement = {
          ...nextElement,
          visible: true,
        };

        const firstPartFromNewElementsList = elementsList.slice(
          0,
          nextElementIndex - 1,
        );

        const secondPartFromNewElementsList = elementsList.slice(
          nextElementIndex + 1,
        );

        const newElementsList = Array.prototype.concat(
          firstPartFromNewElementsList,
          [finishedActualElement, startedNextElement],
          secondPartFromNewElementsList,
        );

        setElementsList(newElementsList);

        setActualElementIndex(nextElementIndex);
      }, intervalToCallTheNext);
    },
    [actualElementIndex, alreadyFinished, elementsList, reset],
  );

  const getProperties = useCallback(
    (id: string): WalkthroughElement => {
      const foundElement = findAElementById(id);

      if (!foundElement) {
        return {
          id,
          visible: false,
        };
      }

      return foundElement;
    },
    [findAElementById],
  );

  return (
    <WalkthroughContext.Provider
      value={{
        registry,
        start,
        callNextElement,
        getProperties,
      }}
      {...props}
    />
  );
}

WalkthroughProvider.Context = WalkthroughContext;
