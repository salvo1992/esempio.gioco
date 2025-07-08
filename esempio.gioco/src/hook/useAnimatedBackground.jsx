// src/hooks/useAnimatedBackground.jsx
import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

/**
 * Hook per animare lo sfondo con un gradiente che sfuma tra due o più colori.
 * @param {string[]} colors - Array di colori CSS tra cui interpolare.
 * @param {number} duration - Durata del ciclo di animazione in ms.
 * @returns {Animated.AnimatedInterpolation} Valore interpolato da usare come backgroundColor.
 */
export default function useAnimatedBackground(colors, duration = 8000) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, [anim, duration]);

  return anim.interpolate({
    inputRange: [0, 1],
    outputRange: colors,
  });
}


