/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import TooltipElement from './src/TooltipElement';

const TestComponent = () => {
  return (
    <View
      style={{
        height: 100,
        justifyContent: 'center',
        padding: 40,
        backgroundColor: 'red',
        width: 200,
      }}>
      <Text>Testando </Text>
    </View>
  );
};

const TooltipBalloonContent = () => {
  return (
    <View>
      <Text style={{fontSize: 14}}>
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
  const isDarkMode = useColorScheme() === 'dark';
  const [visible, setVisible] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={{
          alignItems: 'flex-start',
          backgroundColor: 'green',
        }}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
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
          ballonPosition="top"
          ballonStyle={{marginHorizontal: 40}}>
          <TestComponent />
        </TooltipElement>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
