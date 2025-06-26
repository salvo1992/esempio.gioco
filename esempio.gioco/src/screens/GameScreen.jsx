import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MoleGame from '../components/MoleGame';

export default function GameScreen({ navigation }) {
  const [score, setScore] = useState(0);

  const endGame = () => {
    navigation.replace('End', { score });
  };

  return (
    <View style={styles.container}>
      <MoleGame setScore={setScore} />
      <Button title="End Game" onPress={endGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center' },
});


