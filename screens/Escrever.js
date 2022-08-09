import React, { useState } from 'react';
import {  View,  Text,  TextInput,  TouchableOpacity,  KeyboardAvoidingView
} from 'react-native';
import MeuEstilo from '../meuestilo'
import { auth,firestore } from '../firebase'

const Escrever = () => {
  const [local,  setLocal] = useState('')
  const [lat,   setLat] = useState('')
  const [long,  setLong] = useState('')

  const ref = firestore.collection('User').doc(auth.currentUser.uid).collection('Local').doc();
  const enviarDados = () => {
      ref.set
      ({

       local:local,
       long:long,
       lat:lat,
       id: ref.id,

     })
     .then(() => {
       alert('Local ' + local + ' Adicionado com Sucesso! :)')
         
     });
    
  }

  const limparFormulario = () => {
  
  }

  return (
    <KeyboardAvoidingView
      style={MeuEstilo.containerlistar}
      behavior="padding"
    >
      <View style={MeuEstilo.inputcontainerlistar}>
        <TextInput
          placeholder="Local"
          value={local}
          onChangeText={text => setLocal(text)}
          style={MeuEstilo.input}
        />
        <TextInput
          placeholder="Long"
          value={long}
          onChangeText={text => setLong(text)}
          style={MeuEstilo.input}
        />
          <TextInput
          placeholder="Lat"
          value={lat}
          onChangeText={text => setLat(text)}
          style={MeuEstilo.input}
        />
       
      </View>

      <View style={MeuEstilo.buttoncontainerlistar}>
        <TouchableOpacity
          onPress={enviarDados}
          style={MeuEstilo.button}
        >
          <Text style={MeuEstilo.buttonText}>Enviar Dados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={limparFormulario}
          style={[MeuEstilo.button, MeuEstilo.buttonOutline]}
        >
          <Text style={MeuEstilo.buttonOutlineText}>Limpar Formulario</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Escrever

