import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export default function InfoScreen({ navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const submitInfo = async () => {
    if (!name || !age) {
      Alert.alert("Please fill in both fields.");
      return;
    }

    try {
      await addDoc(collection(db, "userInfo"), {
        name,
        age,
        createdAt: new Date(),
      });
      Alert.alert("Info saved successfully!");
      setName("");
      setAge("");
    } catch (error) {
      Alert.alert("Error saving info", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={{ margin: 5, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Enter your age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={{ margin: 5, borderWidth: 1, padding: 8 }}
      />
      <Button title="Submit Info" onPress={submitInfo} />
      <Button title="Back to Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
