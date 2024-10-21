import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './screens/WelcomeScreen';
import EmpleaScreen from './screens/EmpleaScreen';
import crearScreen from './screens/crearScreen';
import detailScreen from './screens/detailScrenn';




const Stack = createNativeStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='welcome' component={WelcomeScreen} />
      <Stack.Screen name='empleados' component={EmpleaScreen} />
      <Stack.Screen name='crear' component={crearScreen} />
      <Stack.Screen name='detalle' component={detailScreen} />
    </Stack.Navigator>
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
