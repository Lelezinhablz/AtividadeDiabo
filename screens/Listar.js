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
  const [local, setLocal] = useState([]);

  useEffect(() => {
    const subscriber = firestore
      .collection("User")
      .doc(auth.currentUser.uid)
      .collection("Local")
      .onSnapshot((querySnapshot) => {
        const local = [];
        querySnapshot.forEach((documentSnapshot) => {
          local.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.local,
          });
        });
        setLocal(local);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const Item = ({ local }) => (
    <View style={MeuEstilo.item}>
      <Text style={MeuEstilo.title}>{local}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item local={item.local} />;

  return (
    <SafeAreaView style={MeuEstilo.containerlistar}>
      <FlatList
        data={local}
        renderItem={renderItem}
        keyExtractor={(item) => item.local}
      />
    </SafeAreaView>
  );
};

export default Listar;
