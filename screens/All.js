import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Dimensions } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import All1 from "../AllScreenComponents.js/All1";
import Found from "../AllScreenComponents.js/Found";
import Lost from "../AllScreenComponents.js/Lost";
import Post from "../AllScreenComponents.js/Post";
import { UserType } from "../UserContext";

const All = ({ route, navigation }) => {
  const posts = route.params;
  const [activePage, setActivePage] = useState("All");
  const { isadmin } = useContext(UserType);
  //Header Text
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
      headerRight: () => (
        <View>
          {isadmin && (
            <Text
              style={[
                styles.activeHeaderTab,
                {
                  fontSize: 15,
                  borderBottomWidth: 1,
                  fontWeight: "bold",
                  textShadowColor: "orange",
                  textShadowRadius: 2,
                },
              ]}
            >
              Admin Access
            </Text>
          )}
        </View>
      ),
      headerShadowVisible: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Navigation Part which includes All, Lost ,Found, Admin Portal and Post! Section */}
      <View style={styles.headerContainer}>
        <View
          style={{ flexDirection: "row", justifyContent: "", marginTop: 10 }}
        >
          <Text
            onPress={() => {
              setActivePage("All");
            }}
            style={[
              styles.headerText,
              activePage === "All"
                ? styles.activeHeaderTab
                : styles.inactiveHeaderTab,
            ]}
          >
            All
          </Text>

          <Text
            onPress={() => setActivePage("Lost")}
            style={[
              styles.headerText,
              activePage === "Lost"
                ? styles.activeHeaderTab
                : styles.inactiveHeaderTab,
            ]}
          >
            Lost
          </Text>
          <Text
            onPress={() => setActivePage("Found")}
            style={[
              styles.headerText,
              activePage === "Found"
                ? styles.activeHeaderTab
                : styles.inactiveHeaderTab,
            ]}
          >
            Found
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            marginRight: 10,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text
            onPress={() => setActivePage("Post")}
            style={[
              styles.headerText,
              activePage === "Post"
                ? styles.activeHeaderTab
                : styles.inactiveHeaderTab,
            ]}
          >
            Post!
          </Text>
        </View>
      </View>

      {/* Component of each page to render on main page */}
      <ScrollView style={activePage === "Post" ? {} : styles.postScrollView}>
        {activePage === "All" &&
          posts.posts.map((item, idx) => (
            <View key={idx} style={{ marginVertical: 20 }}>
              <All1 key={idx} posts={item} />
            </View>
          ))}
        {activePage === "Lost" &&
          posts.posts.map(
            (item, idx) =>
              item.lostorfound == "lost" && (
                <View key={idx} style={{ marginVertical: 20 }}>
                  <Lost key={idx} posts={item} />
                </View>
              )
          )}
        {activePage === "Found" &&
          posts.posts.map(
            (item, idx) =>
              item.lostorfound == "found" && (
                <View key={idx} style={{ marginVertical: 20 }}>
                  <Found key={idx} posts={item} />
                </View>
              )
          )}
      </ScrollView>
      {/* Component of Post Page To render on main page  */}
      {activePage === "Post" && (
        <ScrollView>
          <KeyboardAvoidingView style={{}}>
            <View style={{ marginVertical: 20 }}>
              <Post />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      )}
    </View>
  );
};

export default All;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    paddingBottom: 5,
  },
  headerContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 10,
  },
  activeHeaderTab: {
    borderColor: "orange",
    borderBottomWidth: 4,
    color: "orange",
  },
  inactiveHeaderTab: {
    color: "grey",
  },
  postScrollView: {
    height: 0.9 * Dimensions.get("window").height,
  },
});
