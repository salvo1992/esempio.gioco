// src/screens/AuthAndSettingsScreens/HelpScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Animated,
  FlatList,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAnimatedBackground from '../../hook/useAnimatedBackground';

export default function HelpScreen({ navigation }) {
  const bgColor = useAnimatedBackground(['#ffd194', '#d1913c']);
  const [message, setMessage] = useState('');
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState({ name: 'Guest' });

  // Carica user e reports da storage
  useEffect(() => {
    AsyncStorage.getItem('user').then(json => {
      if (json) setUser(JSON.parse(json));
    });
    loadReports();
  }, []);

  const loadReports = async () => {
    const json = await AsyncStorage.getItem('reports');
    const arr = json ? JSON.parse(json) : [];
    setReports(arr);
  };

  const submitReport = async () => {
    if (!message.trim()) {
      Alert.alert('Attenzione', 'Per favore, descrivi il problema prima di inviare.');
      return;
    }
    const report = {
      message: message.trim(),
      timestamp: new Date().toLocaleString(),
      userName: user.name,
    };
    try {
      const json = await AsyncStorage.getItem('reports');
      const arr = json ? JSON.parse(json) : [];
      arr.unshift(report);
      await AsyncStorage.setItem('reports', JSON.stringify(arr));
      setMessage('');
      loadReports();
      Alert.alert('Grazie!', 'Il tuo report è stato salvato.');
    } catch (e) {
      console.error('Errore salvataggio report', e);
      Alert.alert('Errore', 'Impossibile salvare il report. Riprova.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.reportRow}>
      <Text style={styles.reportUser}>{item.userName}</Text>
      <Text style={styles.reportTime}>{item.timestamp}</Text>
      <Text style={styles.reportMessage}>{item.message}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: bgColor, opacity: 0.2 },
        ]}
      />
      <View style={styles.content}>
        <Text style={styles.header}>Segnala un problema</Text>
        <TextInput
          style={styles.input}
          placeholder="Descrivi qui il problema..."
          placeholderTextColor="#666"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <TouchableOpacity style={styles.button} onPress={submitReport} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Invia Segnalazione</Text>
        </TouchableOpacity>
        <FlatList
          data={reports}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>Nessuna segnalazione inviata.</Text>}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20, backgroundColor: 'transparent' },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 12, color: '#333' },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 12, backgroundColor: '#fff', marginBottom: 12 },
  button: { backgroundColor: '#ffa502', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  list: { flex: 1 },
  reportRow: { marginBottom: 12, padding: 10, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 6 },
  reportUser: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  reportTime: { fontSize: 12, color: '#666', marginBottom: 4 },
  reportMessage: { fontSize: 14, color: '#333' },
  empty: { textAlign: 'center', color: '#666', marginTop: 20 },
});
