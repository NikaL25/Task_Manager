import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function TaskListScreen({ navigation, tasks, onUpdateTasks }) {
  const [sortByDate, setSortByDate] = useState(null);
  const [filterByStatus, setFilterByStatus] = useState('All');

  // date format
  const formatDate = (date) => {
    const taskDate = new Date(date);
    const formattedDate = taskDate.toLocaleDateString('en-GB'); // date format dd/MM/YYYY
    const formattedTime = taskDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // Hours/Minutes format
    return `${formattedDate} / ${formattedTime}`;
  };

  //sort function
  const getSortedTasks = () => {
    let filteredTasks = [...tasks];

    if (filterByStatus !== 'All') {
      filteredTasks = filteredTasks.filter(task => task.status === filterByStatus);
    }

    if (sortByDate === 'asc') {
      filteredTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortByDate === 'desc') {
      filteredTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filteredTasks;
  };

  // delete task function
  const handleDeleteTask = (taskId) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK", 
          onPress: () => {
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            if (onUpdateTasks) {
              onUpdateTasks(updatedTasks); 
            } else {
              console.error('onUpdateTasks is not a function');
            }
          }
        }
      ]
    );
  };

  
  const renderTask = ({ item }) => {
    const taskId = item.id ? item.id.toString() : Math.random().toString();

    const taskContainerStyle = item.status === 'Completed' ? styles.completedTaskContainer : styles.taskContainer;

    return (
      <View style={taskContainerStyle}>
        <TouchableOpacity onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDate}>{formatDate(item.date)}</Text>
          <Text style={styles.taskStatus}>{item.status}</Text>
        </TouchableOpacity>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.viewButton} 
            onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={() => handleDeleteTask(item.id)}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by Date:</Text>
        <TouchableOpacity onPress={() => setSortByDate('asc')}>
          <Text style={styles.ascendingButton}>Earlest Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortByDate('desc')}>
          <Text style={styles.descendingButton}>Latest Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortByDate(null)}>
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Status:</Text>
        <Picker
          selectedValue={filterByStatus}
          onValueChange={(value) => setFilterByStatus(value)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Completed" value="Completed" />
          <Picker.Item label="In Progress" value="In Progress" />
          <Picker.Item label="Cancelled" value="Cancelled" />
        </Picker>
      </View>

      <FlatList
        data={getSortedTasks()}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={renderTask}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  taskTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333',
    textAlign: 'center', 
  },
  taskDate: { 
    fontSize: 16, 
    color: '#666',
    marginTop: 5,
  },
  taskStatus: { 
    fontSize: 16, 
    color: '#666',
    marginTop: 5,
  },
  taskContainer: {
    padding: 16,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: 'center',
  },
  completedTaskContainer: {
    padding: 16,
    marginVertical: 10,
    backgroundColor: '#93efd0', 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: 'center',
  },
  buttonsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10 
  },
  viewButton: { 
    backgroundColor: '#4CAF50', 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  deleteButton: { 
    backgroundColor: '#f44336', 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    borderRadius: 8, 
    flex: 1,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  addButton: { 
    backgroundColor: '#4CAF50', 
    paddingVertical: 15, 
    marginTop: 20, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  addButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },

  sortContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20, 
    justifyContent: 'space-between' 
  },
  sortLabel: { 
    fontSize: 16 
  },
  ascendingButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descendingButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    backgroundColor: '#FF1200',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterContainer: { 
    marginBottom: 20 
  },
  filterLabel: { 
    marginBottom: 10, 
    fontSize: 16 
  },
  picker: { 
    height: 50, 
    width: '100%', 
    borderRadius: 8, 
    backgroundColor: '#fff' 
  },
});
