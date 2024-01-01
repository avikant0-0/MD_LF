import { Alert, StyleSheet, View } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { createClient } from "@sanity/client";

const LoadingScreen = ({ route }) => {
  const animation = useRef(null);
  const Navigation = useNavigation();
  const data = route.params.data;

  const { contact, heading, location, lostorfound, name, uri } = data;
  console.log(contact);
  const client = createClient({
    projectId: "fzto7fg7",
    dataset: "production",
    apiVersion: "2021-08-29",
    token:
      "sksIomAUWqd08Zdn3iTuf56Y6sRkfa2ehNfKwzxfQnIIueIwQ3YeeloRPmWRNkR8ToDx6Wythx8XwlOHt2FiNb3loY1JD7TejZSnCG2eDr76UklPCVcLIRDgv46P4656VEE0Nxoxsc138h4qmZdNV2W2uBVo9wur2iLhbd9Np2JhNvLPlX8z",
    useCdn: false,
  });
  const handlesubmit = async () => {
    if (uri === "") {
      const doc = {
        _type: "post",
        heading,
        name,
        location,
        lostorfound,
        contactnumber: contact,
      };
      const result = await client.create(doc);
      if (result._createdAt) {
        console.log("Document created with ID:", result._id);
        Alert.alert(
          "Successfullyy Uploaded",
          "Wait For Our Team To Review Your Request,This won't Take Long",
          [
            {
              text: "Ok",
              onPress: () => Navigation.replace("Load"),
            },
          ]
        );
      } else {
        console.log("Error in uploding doc");
      }
    } else {
      const img = await fetch(uri);
      const bytes = await img.blob();

      client.assets
        .upload("image", bytes, { filename: "image" })
        .then((imageAsset) => {
          const doc = {
            _type: "post",
            heading,
            name,
            location,
            lostorfound,
            contactnumber: contact,
            dateandtime: imageAsset._createdAt,
            image: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: imageAsset._id,
              },
            },
          };

          client.create(doc).then((response) => {
            console.log(response);
            if (response._createdAt) {
              console.log("Document created with ID:", response._id);
              Alert.alert(
                "Successfully Uploaded",
                "Wait For Our Team To Review Your Request, This won't Take Long",
                [
                  {
                    text: "Ok",
                    onPress: () => Navigation.replace("Load"),
                  },
                ]
              );
            } else {
              console.log("Error in uploading doc");
            }
          });
        });
    }
  };
  useEffect(() => {
    handlesubmit();
  }, [uri]);
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
