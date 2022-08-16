import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  FlatList,
  MeuEstiloheet,
  Text,
  StatusBar,
} from "react-native";
import { auth, firestore } from "../firebase";
import MeuEstilo from "../meuestilo";

const Listar = () => {
  const [loading, setLoading] = useState(true);
  const [instrumento, setLocal] = useState([]);

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
        setLocal(instrumento);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const Item = ({ instrumento }) => (
    <View style={MeuEstilo.item}>
      <Text style={MeuEstilo.title}>{instrumento}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item instrumento={item.instrumento} />;

  return (
    <SafeAreaView style={MeuEstilo.containerlistar}>
      <FlatList
        data={instrumento}
        renderItem={renderItem}
        keyExtractor={(item) => item.instrumento}
      />
    </SafeAreaView>
  );
};

export default Listar;
