import React, { useState } from 'react';
import {  View,  Text,  TextInput,  TouchableOpacity,  KeyboardAvoidingView
} from 'react-native';
import MeuEstilo from '../meuestilo'
import { auth,firestore } from '../firebase'

const Escrever = () => {
  const [instrumento,  setInstrumento] = useState('')
  const [marca,   setMarca] = useState('')
  const [modelo,  setModelo] = useState('')

  const ref = firestore.collection('User').doc(auth.currentUser.uid).collection('Instrumento').doc();
  const enviarDados = () => {
      ref.set
      ({

       instrumento:instrumento,
       marca:marca,
       modelo:modelo,
       id: ref.id,

     })
     .then(() => {
       alert('Instrumento ' + instrumento + ' Adicionado com Sucesso! :)')
         
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
          placeholder="Instrumento"
          value={instrumento}
          onChangeText={text => setInstrumento(text)}
          style={MeuEstilo.input}
        />
        <TextInput
          placeholder="Modelo"
          value={modelo}
          onChangeText={text => setModelo(text)}
          style={MeuEstilo.input}
        />
          <TextInput
          placeholder="Marca"
          value={marca}
          onChangeText={text => setMarca(text)}
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

