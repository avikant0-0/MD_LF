import { StyleSheet, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Found = ({ posts }) => {
  console.log(posts);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        height: 0.2 * Dimensions.get("window").height,
        width: "100%",
      }}
    >
      <View
        style={{
          height: "100%",
          width: "70%",
          backgroundColor: "white",
          marginLeft: "7.5%",
          marginVertical: "0.5%",
          borderRadius: 25,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
      ></View>
      <View
        style={{
          backgroundColor: "#FFC5C5",
          width: "15%",
          height: "100%",
          marginRight: "7.5%",
          marginVertical: "0.5%",
          borderRadius: 25,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Feather
          style={{ marginTop: "30%", marginLeft: "30%" }}
          name="bookmark"
          size={24}
          color="black"
        />
        <Entypo
          style={{ marginLeft: "30%" }}
          name="facebook-with-circle"
          size={24}
          color="black"
        />
        <Entypo
          style={{ marginBottom: "30%", marginLeft: "30%" }}
          name="share"
          size={24}
          color="black"
        />
      </View>
    </View>
  );
};

export default Found;

const styles = StyleSheet.create({});
