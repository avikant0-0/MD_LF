import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
const data = [
  { label: "Lost", value: "lost" },
  { label: "Found", value: "found" },
  // add more options here
];

const Post = () => {
  const [lostorfound, setSelectedValue] = useState("");
  const [name, setname] = useState("");
  const [heading, setheading] = useState("");
  const [location, setlocation] = useState("");
  const [contact, setcontact] = useState("");
  const [uri, seturi] = useState("");
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      seturi(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  const Navigation = useNavigation();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        // height: 0.8 * Dimensions.get("window").height,

        width: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          // height: 0.8 * Dimensions.get("window").height,
          height: "100%",
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
        >
          <TextInput
            placeholder="Enter Heading"
            style={{
              borderColor: "grey",
              borderWidth: 0.5,
              borderRadius: 25,
              margin: 15,
              height: 40,
              textAlign: "center",
            }}
            onChangeText={(e) => setheading(e)}
          />

          <TextInput
            style={{
              borderColor: "grey",
              borderWidth: 0.5,
              borderRadius: 25,
              margin: 15,
              height: 40,
              textAlign: "center",
            }}
            onChangeText={(e) => setname(e)}
            placeholder="Name"
          />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Dropdown
              style={{
                width: 250,
                borderColor: "grey",
                borderWidth: 0.5,
                borderRadius: 25,
                margin: 15,
                height: 40,
                textAlign: "center",
              }}
              data={data}
              labelField="label"
              valueField="value"
              placeholder="Lost / Found"
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.placeholderStyle}
              value={lostorfound}
              onChange={(item) => setSelectedValue(item.value)}
            />
          </View>
          <TextInput
            style={{
              borderColor: "grey",
              borderWidth: 0.5,
              borderRadius: 25,
              margin: 15,
              textAlign: "center",
              height: 40,
            }}
            placeholder="Location"
            onChangeText={(e) => setlocation(e)}
          />
          <TextInput
            style={{
              borderColor: "grey",
              borderWidth: 0.5,
              borderRadius: 25,
              margin: 15,
              textAlign: "center",
              height: 40,
            }}
            keyboardType="numeric"
            placeholder="Contact Number"
            onChangeText={(e) => setcontact(e)}
          />
          {uri && (
            <Image
              source={{ uri: uri }}
              style={{
                height: 200,
                width: 250,
                borderRadius: 25,
                alignSelf: "center",
              }}
            />
          )}
          <Pressable
            onPress={pickImageAsync}
            style={{
              borderColor: "grey",
              borderWidth: 0.5,
              borderRadius: 25,
              margin: 15,
              height: 40,
              justifyContent: "center",
              display: "flex",
              backgroundColor: "grey",
            }}
          >
            <Text
              style={{
                color: "grey",
                textAlign: "center",
                color: "white",
              }}
            >
              Upload An Image
            </Text>
          </Pressable>
        </View>
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
            justifyContent: "flex-end",
          }}
        >
          <Pressable>
            <FontAwesome
              name="send"
              size={24}
              color="black"
              style={{ padding: 15 }}
              onPress={() =>
                Navigation.replace("Load1", {
                  data: {
                    lostorfound,
                    name,
                    heading,
                    location,
                    contact,
                    uri,
                  },
                })
              }
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  placeholderStyle: {
    color: "grey",
    textAlign: "center",
  },
});
