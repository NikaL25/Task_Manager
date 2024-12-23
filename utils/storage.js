import AsyncStorage from '@react-native-async-storage/async-storage';


export const loadTasks = async () => {
  try {
    const savedTasks = await AsyncStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : []; //Return Tasks or Empy array
  } catch (error) {
    console.error("Failed to load tasks from AsyncStorage", error);
    return []; // Return empty arrray if error
  }
};

export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks)); // Save Tasks into AsyncStorage
  } catch (error) {
    console.error("Failed to save tasks to AsyncStorage", error);
  }
};
