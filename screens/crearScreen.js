import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '../database/firebase'; 
import { collection, addDoc } from 'firebase/firestore';

const CrearScreen = (props) => {
  const [state, setState] = useState({
    nombre: '',
    area: '',
    puesto: ''
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const addNewEmpleado = async () => {
    if (state.nombre === '') {
      Alert.alert('Error', 'Ingrese datos del empleado');
    } else {
      try {
        await addDoc(collection(db, 'empleados'), {
          nombre: state.nombre,
          area: state.area,
          puesto: state.puesto
        });
        Alert.alert('Éxito', 'Datos guardados');
        props.navigation.navigate('empleados');
      } catch (error) {
        console.error("Error al guardar el empleado: ", error);
        Alert.alert('Error', 'Hubo un problema al guardar los datos');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder='Nombre'
          onChangeText={(value) => handleChangeText('nombre', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder='Área'
          onChangeText={(value) => handleChangeText('area', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder='Puesto'
          onChangeText={(value) => handleChangeText('puesto', value)}
        />
      </View>
      <View style={styles.button}>
        <Button title='Guardar' onPress={() => addNewEmpleado()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f9fa',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: '#333',
    },
    inputGroup: {
      marginBottom: 15,
    },
    input: {
      height: 40,
      borderColor: '#ced4da',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      backgroundColor: '#fff',
    },
    saveButton: {
      backgroundColor: '#007bff', 
      padding: 15,
      borderRadius: 50, 
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: 60,
      height: 60,
      marginTop: 20,
    },
  });

export default CrearScreen;
