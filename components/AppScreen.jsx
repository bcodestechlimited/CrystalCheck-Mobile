import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { Children } from "react";

export default function AppScreen({ title, children }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <SafeAreaView style={{flex:1}}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // height:50,
    backgroundColor: "#1C18921A",
    paddingVertical:20,
    paddingHorizontal:40
  },
  title:{
    marginTop:15,
    color:'#02052F',
    fontWeight:"500",
    fontSize:20,
  }
});
