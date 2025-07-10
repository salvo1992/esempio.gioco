// src/screens/HomeScreen.jsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import useAnimatedBackground from '../hook/useAnimatedBackground';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const bgColor = useAnimatedBackground(['#ff9a9e', '#fad0c4']);

  // Title letters
  const title = 'Whack-a-Mole';
  const letters = title.split('');
  // Color animations (JS driver)
  const colorAnims = useRef(letters.map(() => new Animated.Value(0))).current;
  // Scale animations (Native driver)
  const scaleAnims = useRef(letters.map(() => new Animated.Value(0.8))).current;

  useEffect(() => {
    const letterAnimations = letters.map((_, i) =>
      Animated.parallel([
        Animated.timing(colorAnims[i], {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.spring(scaleAnims[i], {
          toValue: 1,
          friction: 5,
          useNativeDriver: false, // switched to JS driver to avoid native/JS conflict
        }),
      ])
    );
    Animated.loop(
      Animated.stagger(100, letterAnimations)
    ).start();
  }, [colorAnims, scaleAnims, letters]);

  // Play button pulse
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [pulse]);

  const menuButtons = [
    { icon: require('../assets/icon-login.png'), label: 'Accedi', screen: 'Login', color: '#ff9f43' },
    { icon: require('../assets/icon-register.png'), label: 'Registrati', screen: 'Register', color: '#1dd1a1' },
    { icon: require('../assets/icon-settings.png'), label: 'Impostazioni', screen: 'Settings', color: '#54a0ff' },
    { icon: require('../assets/icon-trophy.png'), label: 'Best Score', screen: 'BestScore', color: '#f368e0' },
    { icon: require('../assets/icon-shop.png'), label: 'Shop', screen: 'Shop', color: '#E76F51' },
    { icon: require('../assets/icon-social.png'), label: 'Social', screen: 'Social', color: '#3D5A80' },
    { icon: require('../assets/icon-customize.png'), label: 'Personalizza', screen: 'Customize', color: '#2A9D8F' },
  ];

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>      
      <SafeAreaView style={styles.safe}>
        {/* Animated Title */}
        <View style={[styles.header, { top: height * 0.15 }]}>          
          <Image source={require('../assets/mole.png')} style={styles.mole} />
          {letters.map((char, i) => (
            <Animated.Text
              key={i}
              style={[
                styles.title,
                {
                  color: colorAnims[i].interpolate({ inputRange: [0, 1], outputRange: ['#ffffff', '#04d361'] }),
                  transform: [{ scale: scaleAnims[i] }],
                },
              ]}
            >
              {char}
            </Animated.Text>
          ))}
          <Image source={require('../assets/hammer.png')} style={styles.hammer} />
        </View>

        {/* Play Button */}
        <View style={styles.playArea}>
          <Animated.View style={{ transform: [{ scale: pulse }] }}>
            <TouchableOpacity style={styles.playButton} onPress={() => navigation.navigate('Game')} activeOpacity={0.8}>
              <Image source={require('../assets/icon-play.png')} style={styles.playIcon} />
              <Text style={styles.playText}>Gioca</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Menu Grid */}
        <View style={styles.menuArea}>
          {menuButtons.map((btn, idx) => (
            <TouchableOpacity key={idx} style={[styles.menuButton, { backgroundColor: btn.color }]} onPress={() => navigation.navigate(btn.screen)} activeOpacity={0.7}>
              <Image source={btn.icon} style={styles.menuIcon} />
              <Text style={styles.menuText}>{btn.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, alignItems: 'center' },
  header: { position: 'absolute', left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  mole: { width: 60, height: 60, resizeMode: 'contain' },
  hammer: { width: 40, height: 40, marginLeft: 8, resizeMode: 'contain' },
  title: { fontSize: 26, fontWeight: '900', textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 4, marginHorizontal: 2 },
  playArea: { position: 'absolute', top: height * 0.45, left: (width - 160) / 2 },
  playButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#04d361', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 30, elevation: 5 },
  playIcon: { width: 24, height: 24, marginRight: 12, tintColor: '#fff' },
  playText: { fontSize: 18, color: '#fff', fontWeight: '700' },
  menuArea: { position: 'absolute', bottom: 40, left: 0, right: 0, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' },
  menuButton: { width: 80, height: 80, borderRadius: 12, justifyContent: 'center', alignItems: 'center', margin: 8, elevation: 3 },
  menuIcon: { width: 32, height: 32, marginBottom: 4, tintColor: '#fff' },
  menuText: { fontSize: 12, color: '#fff', fontWeight: '600', textAlign: 'center' },
});

