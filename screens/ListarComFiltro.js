import React, { useState, useEffect } from "react";

import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  MeuEstiloheet,
  View,
  FlatList,
  TextInput,
  StatusBar,
} from "react-native";
import { auth, firestore } from "../firebase";
import MeuEstilo from "../meuestilo";

const ListaComFiltro = () => {
  const [search, setSearch] = useState("");
  const [dadosFiltrados, setdadosFiltrados] = useState([]);
  const [musica, setLocal] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore
      .collection("User")
      .doc(auth.currentUser.uid)
      .collection("Instrumento")
      .onSnapshot((querySnapshot) => {
        const instrumento = [];
        querySnapshot.forEach((documentSnapshot) => {
          instrumento.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.instrumento,
          });
        });
        setdadosFiltrados(instrumento);
        setLocal(instrumento);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = instrumento.filter(function (item) {
        if (item.instrumento) {
          const itemData = item.instrumento.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setdadosFiltrados(newData);
      setSearch(text);
    } else {
      setdadosFiltrados(instrumento);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <Text style={MeuEstilo.item} onPress={() => getItem(item)}>
        {/* {item.id}
        {' - '} */}
        {item.instrumento.toUpperCase()}
      </Text>
    );
  };

  const getItem = (item) => {
    alert("Instrumento : " + item.instrumento);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={MeuEstilo.containerlistarcomfiltro}>
        <TextInput
          style={MeuEstilo.textInputStyle}
          onChangeText={(text) => searchFilter(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Procure Aqui"
        />
        <FlatList
          data={dadosFiltrados}
          keyExtractor={(item) => item.instrumento}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListaComFiltro;
