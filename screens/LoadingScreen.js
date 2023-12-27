import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { createClient } from "@sanity/client";
import { UserType } from "../UserContext";
const LoadingScreen = () => {
  const { isadmin } = useContext(UserType);
  console.log(isadmin);
  const animation = useRef(null);
  const Navigation = useNavigation();
  const client = createClient({
    projectId: "1kykh7vm",
    dataset: "production",
    apiVersion: "2021-08-29",
    token:
      "skatPdx83KAVsmVcYWWvz1ISxMahCNVWMuxsRLOpxPaXgIRsrMjZMAp0zdHJ11RK78zfBY8ZFauMJvuIg75dONHTlHTDTau0FnWdd9386P3oNdQfPqXFQ516dsIAgB4Rnvhhb94BaU32lc12SJbhcJh4IPYIGzxUTN12KLqSj7aU5GecI45Z",
    useCdn: false,
  });

  // Fetch data from Sanity here and update the state
  {
    if (isadmin === false) {
      useEffect(() => {
        client
          .fetch(
            `*[_type == "post" &&  approved == true] | order(_createdAt desc)[0..9]{
          ...,
          "imageUrl": image.asset->url,
          "approved":approved,
 }`
          )
          .then((data) => {
            // console.log(data);
            Navigation.replace("All", { posts: data });
            console.log("NAviga");
          })
          .catch(console.error);
      }, []);
    } else {
      useEffect(() => {
        client
          .fetch(
            `*[_type == "post"] | order(_createdAt desc)[0..9]{
          ...,
          "imageUrl": image.asset->url,
          "approved":approved,
 }`
          )
          .then((data) => {
            // console.log(data);
            Navigation.replace("All", { posts: data });
            console.log("NAviga");
          })
          .catch(console.error);
      }, []);
    }
  }

  return (
    <View style={{ backgroundColor: "white" }}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: "20%",
          height: "100%",
          backgroundColor: "white",
        }}
        source={require("../assets/Animation - 1703491551004.json")}
      />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
