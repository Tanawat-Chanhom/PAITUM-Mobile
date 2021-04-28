import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/action/userAction";
import { AntDesign } from "@expo/vector-icons";
import BackPage from "../components/BackPage";
import Alert from "../components/MyAlert";
import { removeUser } from "../services/user.service";

const settingAccount = (props) => {
  const dispatch = useDispatch();
  const { userReducer } = useSelector((state) => state);
  const userId = userReducer.userId;
  const [errorMessage, setErrorMessage] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [removeUserIdPending, setRemoveUserIdPending] = useState(false);

  const handleRemoveUser = () => {
    setRemoveUserIdPending(true);
    removeUser(userId)
      .then((result) => {
        setRemoveUserIdPending(false);
        dispatch(logout());
        props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.error(error);
        setRemoveUserIdPending(false);
        setIsAlert(true);
        setErrorMessage(error.data.message);
      });
  };

  return (
    <View style={styles.Container}>
      <BackPage
        navigation={props}
        path={"Setting"}
        isFlow={true}
        magin={10}
      ></BackPage>
      <Alert
        open={isAlert}
        value={errorMessage}
        close={() => {
          setIsAlert(false);
        }}
      ></Alert>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => props.navigation.navigate("ResetPassword")}
          >
            <Text style={styles.settingText}>Reset Password</Text>
            <AntDesign name="arrowright" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => {
              handleRemoveUser();
            }}
          >
            <Text style={[styles.settingText, { color: "#c98f22" }]}>
              Delete Account
            </Text>
            {removeUserIdPending === true ? (
              <ActivityIndicator color="#c98f22" />
            ) : (
              <AntDesign name="arrowright" size={24} color="#c98f22" />
            )}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  safeAreaView: {
    backgroundColor: "#fff",
    marginTop: 100,
  },
  scrollView: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#ebe9e6",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  settingText: {
    fontWeight: "bold",
  },
});

// settingAccount.navigationOptions = (navigationData) => {
//   return {
//     headerShown: false,
//   };
// };

export default settingAccount;
