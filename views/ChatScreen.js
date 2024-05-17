import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Navbar from '../components/Navbar';

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [activeMessageId, setActiveMessageId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [attributeInput, setAttributeInput] = useState('');

  useEffect(() => {
    // Mock fetching initial messages
    setMessages([
      { id: '1', text: 'Hello!', sender: 'Alice', likes: 0, comments: [], attributes: ['Construction'], timestamp: new Date().toISOString() },
      { id: '2', text: 'Hi there!', sender: 'Bob', likes: 0, comments: [], attributes: ['Law bills'], timestamp: new Date().toISOString() },
    ]);
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: Math.random().toString(),
        text: input,
        sender: 'You',
        likes: 0,
        comments: [],
        attributes: attributeInput.trim() ? attributeInput.trim().split(',') : [],
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');
      setAttributeInput('');
      setModalVisible(false);
    }
  };

  const sendComment = (messageId) => {
    if (commentInput.trim()) {
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === messageId
            ? { ...message, comments: [...message.comments, { text: commentInput, sender: 'You' }] }
            : message
        )
      );
      setCommentInput('');
      setActiveMessageId(null);
    }
  };

  const likeMessage = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === messageId ? { ...message, likes: message.likes + 1 } : message
      )
    );
  };

  const renderCommentInput = (messageId) => (
    <View style={styles.commentInputContainer}>
      <TextInput
        value={commentInput}
        onChangeText={setCommentInput}
        placeholder="Type a comment"
        style={styles.commentInput}
      />
      <TouchableOpacity onPress={() => sendComment(messageId)} style={styles.sendButton}>
        <Icon name="send" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.message}>
      <View style={styles.messageHeader}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
      </View>
      <Text style={styles.text}>{item.text}</Text>
      <Text style={styles.attributes}>Attributes: {item.attributes.join(', ')}</Text>
      <View style={styles.messageActions}>
        <TouchableOpacity onPress={() => likeMessage(item.id)} style={styles.likeButton}>
          <Text>👍 ({item.likes})</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setActiveMessageId(item.id); setIsComment(true); setModalVisible(true); }} style={styles.commentButton}>
          <Icon name="comment" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      {item.comments.length > 0 && (
        <View style={styles.comments}>
          {item.comments.map((comment, index) => (
            <View key={index} style={styles.comment}>
              <Text style={styles.sender}>{comment.sender}</Text>
              <Text style={styles.text}>{comment.text}</Text>
            </View>
          ))}
        </View>
      )}
      {activeMessageId === item.id && renderCommentInput(item.id)}
    </View>
  );

  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type a message"
              style={styles.modalInput}
            />
            <TextInput
              value={attributeInput}
              onChangeText={setAttributeInput}
              placeholder="Type attributes (comma-separated)"
              style={styles.modalInput}
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={styles.sendButton}
            >
              <Icon name="send" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#0FB5CE', // Change the background color here
  },
  messageList: {
    flex: 1,
  },
  message: {
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  sender: {
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#777',
  },
  text: {
    flexShrink: 1,
    marginVertical: 5,
  },
  attributes: {
    color: '#777',
    fontStyle: 'italic',
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comments: {
    marginTop: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#ccc',
  },
  comment: {
    flexDirection: 'row',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  sendButton: {
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default ChatScreen;

