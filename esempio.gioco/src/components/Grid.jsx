import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export default function Grid({ molePosition, onWhack }) {
  return (
    <View style={styles.grid}>
      {Array.from({ length: 9 }).map((_, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.hole, molePosition === i && styles.active]}
          onPress={() => onWhack(i)}
        >
          {molePosition === i && <View style={styles.mole}/>}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    width:300, height:300,
    flexDirection:'row', flexWrap:'wrap',
    justifyContent:'space-between'
  },
  hole: {
    width:90, height:90,
    backgroundColor:'#ccc', borderRadius:10,
    margin:5, position:'relative'
  },
  active: { backgroundColor:'#fa8072' },
  mole: {
    width:50, height:50,
    backgroundColor:'#8b4513', borderRadius:25,
    position:'absolute', top:'25%', left:'25%'
  }
});
