import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskListScreen from './screens/TaskListScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import TaskForm from './components/TaskForm';

const Stack = createStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks from storage:', error);
      }
    };
    loadTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleUpdateTask = async (updatedTasks) => {
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen name="TaskList">
          {props => (
            <TaskListScreen
              {...props}
              tasks={tasks}
              onDeleteTask={handleDeleteTask} 
              onUpdateTasks={handleUpdateTask} 
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="TaskDetail">
          {props => (
            <TaskDetailScreen
              {...props}
              tasks={tasks}
              onUpdateTasks={handleUpdateTask} 
              onDeleteTask={handleDeleteTask} 
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddTask">
          {props => (
            <TaskForm
              {...props}
              onSubmit={(newTask) => handleUpdateTask([...tasks, newTask])}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
