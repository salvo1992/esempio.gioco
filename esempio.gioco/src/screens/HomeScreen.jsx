// src/screens/HomeScreen.jsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import login from '../screens/AuthAndSettingsScreens/LoginScreen'

export default function HomeScreen({ navigation }) {
  const bgAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgAnim, { toValue: 1, duration: 8000, useNativeDriver: false, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(bgAnim, { toValue: 0, duration: 8000, useNativeDriver: false, easing: Easing.inOut(Easing.ease) }),
      ])
    ).start();
  }, []);
  const bgColor = bgAnim.interpolate({ inputRange: [0, 1], outputRange: ['#ff9a9e', '#fad0c4'] });

  const headerScale = useRef(new Animated.Value(0.7)).current;
  useEffect(() => {
    Animated.spring(headerScale, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  }, []);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>      
      <SafeAreaView style={styles.safe}>
        <Animated.View style={[styles.header, { transform: [{ scale: headerScale }] }]}>          
          <Image source={require('../assets/mole.png')} style={styles.mole} />
          <Text style={styles.title}>Whack-a-Mole</Text>
          <Image source={require('../assets/hammer.png')} style={styles.hammer} />
        </Animated.View>

        <View style={styles.playContainer}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity style={styles.playButton} onPress={() => navigation.navigate('Game')} activeOpacity={0.8}>
              <Image source={require('../assets/icon-play.png')} style={styles.playIcon} />
              <Text style={styles.playText}>Gioca</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.buttonsContainer}>
          <ActionButton icon={require('../assets/icon-login.png')} label="Accedi" onPress={() => navigation.navigate('Login')} color="#ff9f43" />
          <ActionButton icon={require('../assets/icon-register.png')} label="Registrati" onPress={() => navigation.navigate('Register')} color="#1dd1a1" />
          <ActionButton icon={require('../assets/icon-settings.png')} label="Impostazioni" onPress={() => navigation.navigate('Settings')} color="#54a0ff" />
          <ActionButton icon={require('../assets/icon-trophy.png')} label="Best Score" onPress={() => navigation.navigate('BestScore')} color="#f368e0" />
          <ActionButton icon={require('../assets/icon-shop.png')} label="Shop" onPress={() => navigation.navigate('Shop')} color="#E76F51" />
           <ActionButton icon={require('../assets/icon-social.png')} label="Social" onPress={() => navigation.navigate('Social')} color="#3D5A80" />
           <ActionButton icon={require('../assets/icon-customize.png')} label="Personalizza" onPress={() => navigation.navigate('Customize')} color="#2A9D8F" />
        
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

function ActionButton({ icon, label, onPress, color }) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress} activeOpacity={0.7}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  safe: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  mole: { width: 80, height: 80, resizeMode: 'contain' },
  hammer: { width: 50, height: 50, marginLeft: 12, resizeMode: 'contain' },
  title: { fontSize: 32, fontWeight: '900', marginHorizontal: 12, color: '#fff', textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 4, flexShrink: 1 },
  playContainer: { marginTop: 30, marginBottom: 20 },
  playButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#04d361', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 40, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 },
  playIcon: { width: 28, height: 28, marginRight: 14, tintColor: '#fff' },
  playText: { fontSize: 20, color: '#fff', fontWeight: '700' },
  buttonsContainer: { width: '100%', alignItems: 'center', paddingBottom: 40 },
  button: { flexDirection: 'row', alignItems: 'center', width: '80%', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30, marginVertical: 10, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 4, elevation: 3 },
  icon: { width: 24, height: 24, marginRight: 10, tintColor: '#fff' },
  buttonText: { fontSize: 18, color: '#fff', fontWeight: '600' },
});




