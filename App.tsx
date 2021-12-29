import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useWalkthrough, WalkthroughElement} from 'walkthrough';

const BLUR_AMOUNT = 1;

const TestComponent = () => {
  return (
    <View style={styles.testComponent}>
      <Text>Testando </Text>
    </View>
  );
};

const TooltipBalloonContent = ({content = ''}) => {
  return (
    <View>
      <Text style={styles.tooltipBalloonContent}>{content}</Text>
    </View>
  );
};

const App = () => {
  const {start} = useWalkthrough();

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.contentContainer}>
        <View>
          <Button
            title={'Começar o passo a passo'}
            onPress={() => start(500)}
          />
        </View>

        <WalkthroughElement
          id="first-element"
          tooltipElementProps={{
            tooltipBallonContent: (
              <TooltipBalloonContent content="First Element" />
            ),
            ballonStyle: styles.ballon,
            blurAmount: BLUR_AMOUNT,
            ballonPosition: 'bottom',
          }}>
          <TestComponent />
        </WalkthroughElement>

        <WalkthroughElement
          id="second-element"
          tooltipElementProps={{
            tooltipBallonContent: (
              <TooltipBalloonContent content="Second Element" />
            ),
            ballonStyle: styles.ballon,
            blurAmount: BLUR_AMOUNT,
            ballonPosition: 'bottom',
          }}>
          <TestComponent />
        </WalkthroughElement>
        <WalkthroughElement
          id="thirty-element"
          tooltipElementProps={{
            tooltipBallonContent: (
              <TooltipBalloonContent content="Thirty Element" />
            ),
            ballonStyle: styles.ballon,
            blurAmount: BLUR_AMOUNT,
            ballonPosition: 'bottom',
          }}>
          <TestComponent />
        </WalkthroughElement>
        <WalkthroughElement
          id="forty-element"
          tooltipElementProps={{
            tooltipBallonContent: (
              <TooltipBalloonContent content="Forty Element" />
            ),
            ballonStyle: styles.ballon,
            blurAmount: BLUR_AMOUNT,
            ballonPosition: 'top',
          }}>
          <TestComponent />
        </WalkthroughElement>
        <WalkthroughElement
          id="fifty-element"
          onRequestClose={() => console.log('Terminou')}
          tooltipElementProps={{
            tooltipBallonContent: (
              <TooltipBalloonContent content="Fifty Element" />
            ),
            ballonStyle: styles.ballon,
            blurAmount: BLUR_AMOUNT,
            ballonPosition: 'top',
          }}>
          <TestComponent />
        </WalkthroughElement>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  testComponent: {
    height: 100,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'red',
    width: 200,
  },
  contentContainer: {
    alignItems: 'flex-start',
    backgroundColor: 'green',
  },
  ballon: {
    marginHorizontal: 40,
  },
  tooltipBalloonContent: {
    fontSize: 14,
  },
});

export default App;
