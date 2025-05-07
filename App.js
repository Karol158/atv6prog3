import React,{useEffect,useState} from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageCircle, Home, User, Menu } from 'lucide-react';
import axios from "axios";


export default function App() {

  const [dados, SetDados] = useState([]);


  useEffect(()=>{
    
    function consultarDados(){

      axios.get('http://localhost:3000/messages')
      .then(function (response) {
      SetDados(response.data)
      }).catch(function (error) {
      console.log(error);
      
      });
      
      }


      consultarDados();

    },[])





  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages & Chat</Text>
        <View style={styles.headerActions}>
          <Text style={styles.markAllRead}>Mark all read</Text>
          <Text style={styles.sortBy}>Sort by time ▼</Text>
        </View>
      </View>

      <ScrollView style={styles.messageList}>
        {dados.map((message) => (
          <TouchableOpacity key={message.id} style={styles.messageItem}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: message.avatar }} style={styles.avatar} />
              <View style={styles.onlineDot} />
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.name}>{message.name}</Text>
              <Text style={styles.messageText}>{message.message}</Text>
            </View>
            <Text style={styles.timeText}>{message.time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Home size={24} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNav]}>
          <MessageCircle size={24} color="#4B6BFB" />
          <Text style={[styles.navText, styles.activeNavText]}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Menu size={24} color="#666" />
          <Text style={styles.navText}>More</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <User size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#dbb5ed',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#666',
    marginBottom: 15,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  markAllRead: {
    color: '#666',
    fontSize: 14,
  },
  sortBy: {
    color: '#666',
    fontSize: 14,
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineDot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  messageContent: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#666',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#dbb5ed',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navItem: {
    alignItems: 'center',
  },
  activeNav: {
    opacity: 1,
  },
  navText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
  activeNavText: {
    color: '#4B6BFB',
  },
});
