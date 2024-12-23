import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function TaskItem({ task, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>{task.title}</Text>
        <Text>{new Date(task.date).toLocaleString()}</Text>
        <Text>{task.status}</Text>
      </View>
    </TouchableOpacity>
  );
}
