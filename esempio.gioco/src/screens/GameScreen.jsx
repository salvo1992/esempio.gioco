// Per abilitare AsyncStorage:
// yarn add @react-native-async-storage/async-storage
// npx pod-install

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const BASE_POPUP_DURATION = 1500;
const MIN_POPUP_DURATION = 400;
const INITIAL_HOLES = 6;

export default function GameScreen({ navigation }) {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [activeHoles, setActiveHoles] = useState([]);
  const [numHoles, setNumHoles] = useState(INITIAL_HOLES);
  const [bestScore, setBestScore] = useState(0);
  const popupAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);

  // Carica best score
  useEffect(() => {
    AsyncStorage.getItem('bestScore').then(val => {
      if (val) setBestScore(Number(val));
    });
  }, []);

  // Aggiorna numero di buche per livello
  useEffect(() => {
    if (level >= 70) setNumHoles(INITIAL_HOLES + 3);
    else if (level >= 30) setNumHoles(INITIAL_HOLES + 2);
    else if (level >= 10) setNumHoles(INITIAL_HOLES + 1);
  }, [level]);

  const getSimultaneous = () => {
    if (level >= 80) return 4;
    if (level >= 50) return 3;
    if (level >= 10) return 2;
    return 1;
  };

  const getPopupDuration = () => Math.max(BASE_POPUP_DURATION - (level - 1) * 50, MIN_POPUP_DURATION);

  const popMoles = () => {
    const count = getSimultaneous();
    const holes = new Set();
    while (holes.size < count) {
      holes.add(Math.floor(Math.random() * numHoles));
    }
    setActiveHoles([...holes]);
    popupAnim.setValue(0);

    Animated.timing(popupAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(popupAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          setActiveHoles([]);
          scheduleNext();
        });
      }, getPopupDuration() - 400);
    });
  };

  const scheduleNext = () => {
    timerRef.current = setTimeout(popMoles, Math.max(getPopupDuration(), 500));
  };

  useEffect(() => {
    scheduleNext();
    return () => clearTimeout(timerRef.current);
  }, [level, numHoles]);

  const hitMole = idx => {
    if (activeHoles.includes(idx)) {
      setScore(prev => {
        const newScore = prev + 1;
        if (newScore > bestScore) {
          setBestScore(newScore);
          AsyncStorage.setItem('bestScore', String(newScore));
        }
        if (newScore % 10 === 0) setLevel(l => l + 1);
        return newScore;
      });
      setActiveHoles(prev => prev.filter(h => h !== idx));
    }
  };

  const translateY = popupAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] });

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.hud}>
        <Text style={styles.hudText}>Score: {score}</Text>
        <Text style={styles.hudText}>Level: {level}</Text>
        <Text style={styles.hudText}>Best: {bestScore}</Text>
      </View>
      <View style={styles.grid}>
        {Array.from({ length: numHoles }).map((_, idx) => (
          <View key={idx} style={styles.holeWrapper}>
            <Image source={require('../assets/hole.png')} style={styles.hole} />
            {activeHoles.includes(idx) && (
              <Animated.View style={[styles.moleWrapper, { transform: [{ translateY }] }]}>                
                <TouchableOpacity onPress={() => hitMole(idx)} activeOpacity={0.8}>
                  <Image source={require('../assets/mole.png')} style={styles.mole} />
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#66a6ff' },
  background: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.1)' },
  hud: { flexDirection: 'row', justifyContent: 'space-around', padding: 16 },
  hudText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  grid: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', padding: 10 },
  holeWrapper: { width: width / 4 - 20, height: width / 4 - 20, alignItems: 'center', justifyContent: 'flex-end' },
  hole: { width: '100%', height: '100%', resizeMode: 'contain' },
  moleWrapper: { position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center' },
  mole: { width: 50, height: 50, resizeMode: 'contain' },
  backButton: { padding: 12, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.6)' },
  backText: { fontSize: 16, fontWeight: '600', color: '#333' },
});






