import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatBoard = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(["Hello chatGPT, how are you today?"]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerText}>Family Assist</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Family</Text>
        <Text style={styles.title}>Assist</Text>
      </View>
      <Text style={styles.subtitle}>Chat board</Text>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageBubble}>
            <Text style={styles.messageText}>{msg}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="type here"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#00A87E" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#00A87E',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7DDCD3',
    marginHorizontal: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7DDCD3',
  },
  chatContainer: {
    flex: 1,
    marginVertical: 20,
  },
  messageBubble: {
    backgroundColor: '#ECFDF5',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  messageText: {
    color: '#00A87E',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
});

export default ChatBoard;
