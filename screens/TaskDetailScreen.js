import React, { useState } from 'react'; 
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function TaskDetailScreen({ route, navigation, tasks, onUpdateTasks, onDeleteTask }) {
  const { taskId } = route.params;

  if (!taskId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Task ID not provided.</Text>
      </View>
    );
  }

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Task not found.</Text>
        <Button title="Back to Task List" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const updateStatus = (newStatus) => {
    if (!onUpdateTasks) {
      Alert.alert('Error', 'Update function not provided.');
      return;
    }

    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, status: newStatus } : t
    );
    onUpdateTasks(updatedTasks);
  };

  const deleteTask = () => {
    if (!onUpdateTasks) {
      Alert.alert('Error', 'Delete function not provided.');
      return;
    }

    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    onUpdateTasks(updatedTasks);

    
    navigation.goBack();
  };

  const [buttonColor, setButtonColor] = useState({
    inProgress: '#4CAF50',
    completed: '#8BC34A',
    cancelled: '#f44336',
    delete: '#f44336'
  });

  const handleButtonPress = (buttonType) => {
    setButtonColor((prevState) => ({
      ...prevState,
      [buttonType]: '#555'
    }));
  };

  const handleButtonRelease = (buttonType, originalColor) => {
    setButtonColor((prevState) => ({
      ...prevState,
      [buttonType]: originalColor
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title: {task.title}</Text>
      <Text style={styles.label}>Description: {task.description}</Text>
      <Text style={styles.label}>Date: {new Date(task.date).toLocaleString()}</Text>
      <Text style={styles.label}>Status: {task.status}</Text>
      <Text style={styles.label}>{`Location: ${task.location || 'Not specified'}`}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: buttonColor.inProgress }]}
          onPressIn={() => handleButtonPress('inProgress')}
          onPressOut={() => handleButtonRelease('inProgress', '#4CAF50')}
          onPress={() => updateStatus('In Progress')}
        >
          <Text style={styles.statusButtonText}>In Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: buttonColor.completed }]}
          onPressIn={() => handleButtonPress('completed')}
          onPressOut={() => handleButtonRelease('completed', '#8BC34A')}
          onPress={() => updateStatus('Completed')}
        >
          <Text style={styles.statusButtonText}>Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: buttonColor.cancelled }]}
          onPressIn={() => handleButtonPress('cancelled')}
          onPressOut={() => handleButtonRelease('cancelled', '#f44336')}
          onPress={() => updateStatus('Cancelled')}
        >
          <Text style={styles.statusButtonText}>Cancelled</Text>
        </TouchableOpacity>

        <View style={styles.deleteButtonContainer}>
          <TouchableOpacity
            style={[styles.deleteButton, { backgroundColor: buttonColor.delete }]}
            onPressIn={() => handleButtonPress('delete')}
            onPressOut={() => handleButtonRelease('delete', '#f44336')}
            onPress={deleteTask}
          >
            <Text style={styles.deleteButtonText}>Delete Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
} 


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f9f9f9',
    justifyContent: 'space-between', 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#333' 
  },
  label: { 
    fontSize: 18, 
    marginBottom: 12, 
    color: '#555' 
  },
  errorText: { 
    fontSize: 18, 
    color: 'red', 
    textAlign: 'center' 
  },
  buttonsContainer: { 
    flex: 1, 
    justifyContent: 'flex-start', 
  },
  deleteButtonContainer: {
    justifyContent: 'flex-end', 
    marginTop: 'auto', 
  },
  statusButton: { 
    paddingVertical: 12, 
    marginBottom: 10, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  statusButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  deleteButton: { 
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: 'center',
  },
  deleteButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});
