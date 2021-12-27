import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import TooltipElement from './src/TooltipElement';

const BLUR_AMOUNT = 1;

const TestComponent = () => {
  return (
    <View style={styles.testComponent}>
      <Text>Testando </Text>
    </View>
  );
};

const TooltipBalloonContent = () => {
  return (
    <View>
      <Text style={styles.tooltipBalloonContent}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ornare
        maximus sapien in sodales. Integer porta leo non justo porta dignissim.
        Quisque pretium odio dui, at varius ex viverra id. Nunc efficitur
        aliquet pretium. Suspendisse ornare elit vel purus laoreet commodo. In
        non accumsan nisi. Donec imperdiet tortor
      </Text>
    </View>
  );
};

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.contentContainer}>
        <View>
          <Button title={'Abrir modal'} onPress={() => setVisible(true)} />
        </View>
        <TestComponent />
        <TestComponent />
        <TestComponent />
        <TestComponent />
        <TooltipElement
          visible={visible}
          onRequestClose={() => setVisible(false)}
          tooltipBallonContent={<TooltipBalloonContent />}
          ballonPosition="bottom"
          ballonStyle={styles.ballon}
          blurAmount={BLUR_AMOUNT}>
          <TestComponent />
        </TooltipElement>
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
