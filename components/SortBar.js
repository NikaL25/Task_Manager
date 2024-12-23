import React from 'react';
import { View, Button } from 'react-native';

export default function SortBar({ onSort }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <Button title="Sort by Date" onPress={() => onSort('date')} />
      <Button title="Sort by Status" onPress={() => onSort('status')} />
    </View>
  );
}
