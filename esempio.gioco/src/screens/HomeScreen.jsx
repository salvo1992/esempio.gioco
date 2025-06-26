import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header con Talpa e Martello */}
      <View style={styles.header}>
        <Image source={require('../assets/mole.png')} style={styles.mole} />
        <Text style={styles.title}>Whack‑a‑Mole</Text>
        <Image source={require('../assets/hammer.png')} style={styles.hammer} />
      </View>

      {/* Pulsante per avviare il gioco */}
      <View style={styles.playContainer}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => navigation.navigate('Game')}
        >
          <Image
            source={require('../assets/icon-play.png')}
            style={styles.playIcon}
          />
          <Text style={styles.playText}>Gioca</Text>
        </TouchableOpacity>
      </View>

      {/* Pulsanti di azione */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {/* link in arrivo */}}
        >
          <Image source={require('../assets/icon-login.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Accedi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {/* link in arrivo */}}
        >
          <Image source={require('../assets/icon-register.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Registrati</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Settings')}
        >
          <Image source={require('../assets/icon-settings.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Impostazioni</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BestScore')}
        >
          <Image source={require('../assets/icon-trophy.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Best Score</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const BUTTON_SIZE = 60;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mole: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  hammer: {
    width: 50,
    height: 50,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    marginHorizontal: 10,
    color: '#333',
  },
  playContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#32cd32',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  playIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: '#fff',
  },
  playText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  buttonsContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#ff6347',
    borderRadius: 30,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: '#fff',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});



