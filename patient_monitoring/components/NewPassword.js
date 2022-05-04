import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";

const NewPassword = () => {
  const [email, setEmail] = useState('')

  const navigation = useNavigation()

  const handlePasswordChange = () => {
    
  }

  const forgotPassword = () => {
    sendPasswordResetEmail(email)
      .then(function() {
        alert('Please check your email...')
      })
      .catch(function (error) {
        console.log('wtf', error.message)
      })
  }
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior="padding"
    >
      <View>
        <Text style={styles.text}>Write an email and we will send you an email to reset your password</Text>
      </View>
      <View style={styles.newPassInputContainer}>
        <TextInput
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        style={styles.newPassInput}
        >
          
        </TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={styles.button}
        >
            <Text style={styles.button}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default NewPassword;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat_500Medium',
  },
  newPassInputContainer: {
    width: '80%',
    height: '30%',
    bottom: 20,
  },
  newPassInput: {
    paddingHorizontal: 1,
    paddingVertical: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: '#696969',
    fontSize: 15,
    fontFamily: 'Montserrat_500Medium',
  },
  text: {
    width: 300,
    color: '#696969',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    bottom: 90
  },
  buttonContainer:{
    borderRadius: 50,
    width: '80%',
    bottom: 70,
 },
 button:{
     color: 'white',
     fontFamily: 'Montserrat_500Medium',
     fontSize: 15,
     textAlign: 'center',
     width: '100%',
     backgroundColor: '#4166f5',
     padding: 8,
     borderRadius: 25,
 },
})

