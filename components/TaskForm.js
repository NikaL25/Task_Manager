import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TaskForm({ navigation, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [location, setLocation] = useState('');

  const [errors, setErrors] = useState({}); 

  const validateFields = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = 'Title is required.';
    if (!description.trim()) newErrors.description = 'Description is required.';
    if (!location.trim()) newErrors.location = 'Location is required.';
    if (!date) newErrors.date = 'Please select a valid date.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleAddTask = () => {
    if (validateFields()) {
      onSubmit({
        id: Date.now(),
        title,
        description,
        date: date.toISOString(),
        location,
        status: 'In Progress',
       });
      navigation.goBack();
    } else {
      Alert.alert('Validation Error', 'Please correct the highlighted fields.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, errors.title && styles.errorInput]}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

      <TextInput
        style={[styles.input, styles.textArea, errors.description && styles.errorInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Pick Date:</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.datePickerButton}>
          <Text style={[styles.datePickerText, errors.date && styles.errorText]}>
            {date ? date.toLocaleDateString() : 'Select Date'}
          </Text>
        </TouchableOpacity>
      </View>
      {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TextInput
        style={[styles.input, errors.location && styles.errorInput]}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleAddTask} style={[styles.button, styles.addButton]}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  datePickerButton: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  datePickerText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
});
