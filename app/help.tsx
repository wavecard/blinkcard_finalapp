import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import Colors from '@/constants/Colors';

export default class Help extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Need Help?</Text>

        <Text style={styles.description}>
          We're here to assist you. If you have any issues or need support, feel free to reach out to us.
        </Text>

        <View style={styles.contactContainer}>
          <FontAwesome name="envelope" size={20} color="black" />
          <Text style={styles.contactText}>service@blinkcard.in</Text>
        </View>

        <View style={styles.contactContainer}>
          <FontAwesome name="exclamation-circle" size={20} color="black" />
          <Text style={styles.contactText}>report@blinkcard.in</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => {  }}>
          <Text style={styles.buttonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 40,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  contactText: {
    fontSize: 18,
    marginLeft: 10,
  },
  button: {
    backgroundColor:Colors.primary,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
