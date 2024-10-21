import React from 'react';
import { View, Text, Button } from 'react-native';

const WelcomeScreen = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenido</Text>
      <Button title="INGRESAR" onPress={() => props.navigation.navigate('empleados')} />
    </View>
  );
};

export default WelcomeScreen;
