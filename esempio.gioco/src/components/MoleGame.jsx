import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Grid from './Grid';

export default function MoleGame({ setScore }) {
  const [timer, setTimer] = useState(30);
  const [molePos, setMolePos] = useState(null);

  useEffect(() => {
    if (timer === 0) return;
    const t = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) return;
    const m = setInterval(() => {
      setMolePos(Math.floor(Math.random() * 9));
    }, 1000);
    return () => clearInterval(m);
  }, [timer]);

  const onWhack = pos => {
    if (pos === molePos) setScore(s => s + 1);
    setMolePos(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time: {timer}s</Text>
      <Grid molePosition={molePos} onWhack={onWhack} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems:'center' },
  timer: { fontSize:20, marginBottom:10 },
});

