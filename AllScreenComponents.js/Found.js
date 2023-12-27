import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import { Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { createClient } from "@sanity/client";
import { UserType } from "../UserContext";
const Found = ({ posts }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isadmin } = useContext(UserType);

  approvepost = async () => {
    console.log("kasjf");
    const client = createClient({
      projectId: "1kykh7vm",
      dataset: "production",
      apiVersion: "2021-08-29",
      token:
        "skatPdx83KAVsmVcYWWvz1ISxMahCNVWMuxsRLOpxPaXgIRsrMjZMAp0zdHJ11RK78zfBY8ZFauMJvuIg75dONHTlHTDTau0FnWdd9386P3oNdQfPqXFQ516dsIAgB4Rnvhhb94BaU32lc12SJbhcJh4IPYIGzxUTN12KLqSj7aU5GecI45Z",
      useCdn: false,
    });
    const docid = posts._id;
    const transaction = client
      .transaction()
      .patch(docid, { set: { approved: true } })
      .commit()
      .then((updatedDoc) => {
        console.log(updatedDoc);
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.innerContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.heading}>{posts.heading}</Text>
        <Text style={styles.name}>{posts.name}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={styles.date}>
            {new Date(posts.dateandtime).toLocaleString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <Feather
          style={styles.bookmarkIcon}
          name="bookmark"
          size={24}
          color="black"
        />
        <Entypo
          style={styles.facebookIcon}
          name="facebook-with-circle"
          size={24}
          color="black"
        />
        <Entypo style={styles.shareIcon} name="share" size={24} color="black" />
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
            <View
              style={styles.innerContainer_modal}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.heading}>{posts.heading}</Text>
              <Image
                source={{ uri: posts.imageUrl }}
                style={{ height: "40%", width: "100%", borderRadius: 25 }}
              />
              <Text style={styles.name}>{posts.name}</Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text style={styles.name}>
                  <Text style={styles.darker}>Location</Text> {posts.location}
                </Text>
                <Text style={styles.name}>
                  <Text style={styles.darker}>Contact </Text>
                  {posts.contactnumber}
                </Text>
                <Text style={styles.date}>
                  {new Date(posts.dateandtime).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </Text>
              </View>
            </View>
            {isadmin && (
              <Pressable style={{ backgroundColor: "grey", borderRadius: 25 }}>
                {!posts.approved && (
                  <Text onPress={() => approvepost()} style={[styles.approve]}>
                    Approve
                  </Text>
                )}
                {posts.approved && (
                  <Text style={[styles.approve]}>Approved</Text>
                )}
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Found;

const styles = StyleSheet.create({
  darker: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
  },
  innerContainer_modal: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    marginVertical: "0.5%",
    borderRadius: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "86%",
    width: "90%",
  },
  button: {
    borderRadius: 20,
    padding: 2,
    paddingHorizontal: 6,
    marginLeft: "93%",
    marginTop: "-10%",
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    height: 0.2 * Dimensions.get("window").height,
    width: "100%",
  },
  innerContainer: {
    height: "100%",
    width: "70%",
    backgroundColor: "white",
    marginLeft: "7.5%",
    marginVertical: "0.5%",
    borderRadius: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  name: {
    color: "grey",
    fontSize: 17,
    margin: 7,
    marginLeft: 20,
  },
  date: {
    color: "grey",
    margin: 7,
    marginLeft: 20,
    fontSize: 13,
  },
  iconContainer: {
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
  },
  bookmarkIcon: {
    marginTop: "30%",
    marginLeft: "30%",
  },
  facebookIcon: {
    marginLeft: "30%",
  },
  shareIcon: {
    marginBottom: "30%",
    marginLeft: "30%",
  },
  approve: {
    color: "white",
    margin: 7,
    fontSize: 13,
    textAlign: "center",
    fontWeight: "bold",
  },
  approvetext: {},
});
