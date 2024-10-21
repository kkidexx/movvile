import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { db } from '../database/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';

const detailScreen = (props) => {
  const [empleado, setEmpleado] = useState(null);
  const [state, setState] = useState({
    nombre: '',
    area: '',
    puesto: '',
  });

  useEffect(() => {
    const empleadoId = props.route.params.id;
    const getEmpleId = async (id) => {
      const dbRef = doc(db, 'empleados', id);
      const docSnap = await getDoc(dbRef);
      if (docSnap.exists()) {
        setEmpleado(docSnap.data());
        setState(docSnap.data());
      } else {
        Alert.alert('Error', 'No existe el empleado con ese ID');
      }
    };
    getEmpleId(empleadoId);
  }, [props.route.params.id]);

  const updateEmpleado = async (id) => {
    try {
      const dbRef = doc(db, 'empleados', id);
      await updateDoc(dbRef, state);
      Alert.alert('Éxito', 'Empleado actualizado correctamente');
      props.navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el empleado');
    }
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Detalles del Empleado</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Nombre'
          value={state.nombre}
          onChangeText={(value) => setState({ ...state, nombre: value })}
        />
        <TextInput
          style={styles.input}
          placeholder='Área'
          value={state.area}
          onChangeText={(value) => setState({ ...state, area: value })}
        />
        <TextInput
          style={styles.input}
          placeholder='Puesto'
          value={state.puesto}
          onChangeText={(value) => setState({ ...state, puesto: value })}
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => updateEmpleado(props.route.params.id)}
        >
          <Icon name="edit" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    padding: 8,
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#28a745', 
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

export default detailScreen;
