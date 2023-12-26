import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import All1 from "../AllScreenComponents.js/All1";
import Found from "../AllScreenComponents.js/Found";
import Lost from "../AllScreenComponents.js/Lost";
import Post from "../AllScreenComponents.js/Post";
const All = ({ route, navigation }) => {
  //RECIEVEING DATA TO DISPLAY USING ROUTES, FETCHED FROM A DIFFERENT LOADING SCREEN AND SENT TO THIS ONE
  const posts = route.params;
  //SETTING STATE TO DISPLAY POSTS OR UPLOADING A POST
  const [activePage, setActivePage] = useState("All");

  //   console.log(posts);

  //MAKING HEADER TO DISPLY LOST AND FOUND
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <View>
          <Text
            style={{
              fontFamily: "sans-serif",
              fontSize: 27,
              fontWeight: "bold",
              marginTop: 10,
              marginLeft: 5,
            }}
          >
            Lost & Found
          </Text>
        </View>
      ),
      headerShadowVisible: false,
    });
  }, []);

  const lol = [1, 2, 3, 4, 5];
  return (
    <View>
      {/* MAKING HEADER TO DISPLAY FOUR SECTIONS ALL LOST FOUND AND POST */}
      <View style={{ overflow: "hidden", paddingBottom: 5 }}>
        <View
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "",
              marginTop: 10,
            }}
          >
            <Text
              onPress={() => {
                setActivePage("All");
              }}
              style={
                activePage === "All"
                  ? {
                      borderColor: "orange",
                      borderBottomWidth: 4,
                      fontSize: 20,
                      color: "orange",
                      fontWeight: "600",
                      marginHorizontal: 10,
                    }
                  : {
                      fontSize: 20,
                      color: "grey",
                      fontWeight: "600",
                      marginHorizontal: 10,
                    }
              }
            >
              All
            </Text>

            <Text
              onPress={() => setActivePage("Lost")}
              style={
                activePage === "Lost"
                  ? {
                      borderColor: "orange",
                      borderBottomWidth: 4,
                      fontSize: 20,
                      color: "orange",
                      fontWeight: "600",
                      marginHorizontal: 10,
                    }
                  : {
                      fontSize: 20,
                      color: "grey",
                      fontWeight: "600",
                      marginHorizontal: 10,
                    }
              }
            >
              Lost
            </Text>
            <Text
              onPress={() => setActivePage("Found")}
              style={
                activePage === "Found"
                  ? {
                      borderColor: "orange",
                      borderBottomWidth: 4,
                      fontSize: 20,
                      color: "orange",
                      fontWeight: "600",
                      marginHorizontal: 10,
                    }
                  : {
                      fontSize: 20,
                      color: "grey",
                      fontWeight: "600",
                      marginHorizontal: 10,
                    }
              }
            >
              Found
            </Text>
          </View>
          <View style={{ marginTop: 10, marginRight: 10 }}>
            <Text
              onPress={() => setActivePage("Post")}
              style={
                activePage === "Post"
                  ? {
                      borderColor: "orange",
                      borderBottomWidth: 4,
                      fontSize: 20,
                      color: "orange",
                      fontWeight: "600",
                      marginHorizontal: 10,
                    }
                  : {
                      fontSize: 20,
                      color: "grey",
                      fontWeight: "600",
                      marginHorizontal: 10,
                    }
              }
            >
              Post!
            </Text>
          </View>
        </View>
      </View>
      <View>
        <ScrollView style={{ height: 0.9 * Dimensions.get("window").height }}>
          {posts.posts.map((item, idx) =>
            activePage === "All" ? (
              <View key={idx} style={{ marginVertical: 20 }}>
                <All1 key={idx} posts={item} />
              </View>
            ) : null
          )}
          {/* {activePage === "Lost" ? (
            <View style={{ marginVertical: 20 }}>
              <Lost posts={posts} />
            </View>
          ) : null}
          {activePage === "Found" ? (
            <View style={{ marginVertical: 20 }}>
              <Found posts={posts} />
            </View>
          ) : null} */}
          {activePage === "Post" ? (
            <View style={{ marginVertical: 20 }}>
              <Post posts={posts} />
            </View>
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
};

export default All;

const styles = StyleSheet.create({});
