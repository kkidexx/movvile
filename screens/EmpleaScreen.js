import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from '../database/firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';

const EmpleaScreen = (props) => {
  const MOVERE = () => {
    props.navigation.navigate('crear');
  };

  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'empleados'), (querySnapshot) => {
      const empleadosArray = [];
      querySnapshot.forEach((doc) => {
        empleadosArray.push({ ...doc.data(), id: doc.id });
      });
      setEmpleados(empleadosArray);
    });

    return () => unsubscribe();
  }, []);

  const deleteEmpleado = async (id) => {
    try {
      const dbRef = doc(db, 'empleados', id);
      await deleteDoc(dbRef);
      Alert.alert('Éxito', 'Empleado eliminado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el empleado');
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este empleado?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => deleteEmpleado(id) },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.nombre}>Nombre: {item.nombre}</Text>
      <Text style={styles.puesto}>Puesto: {item.puesto}</Text>
      <Text style={styles.area}>Área: {item.area}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => props.navigation.navigate('detalle', { id: item.id })}
        >
          <Icon name="edit" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Icon name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        bottomDivider
        data={empleados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={MOVERE}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  puesto: {
    fontSize: 16,
  },
  area: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 50,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
});

export default EmpleaScreen;
