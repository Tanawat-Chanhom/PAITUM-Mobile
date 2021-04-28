import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import BackPage from "../components/BackPage";
import Button from "../components/Button";
import Alert from "../components/MyAlert";
import { useSelector, useDispatch } from "react-redux";
import { resetUserPassword } from "../services/user.service";
import { logout } from "../store/action/userAction";

const resetPassword = (props) => {
  const dispatch = useDispatch();
  const { userReducer } = useSelector((state) => state);
  const userId = userReducer.userId;
  const [resetForm, setResetForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  const handleSubmit = () => {
    let isDirty = formIsDirty(resetForm);
    if (isDirty) {
      setIsAlert(true);
      setErrorMessage("Please input your information.");
      return;
    }

    if (resetForm.newPassword !== resetForm.confirmPassword) {
      setIsAlert(true);
      setErrorMessage("New Pass and Confirm Pass is not the same.");
      return;
    }

    setIsPending(true);
    resetUserPassword(userId, resetForm)
      .then((result) => {
        if (result.data.status === 201) {
          dispatch(logout());
          setIsAlert(true);
          setErrorMessage(result.data.message);
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 1000);
        } else {
          setIsAlert(true);
          setErrorMessage(result.data.message);
        }
        setIsPending(false);
      })
      .catch((error) => {
        console.log(error);
        setIsPending(false);
        setIsAlert(true);
        setErrorMessage(error.data.message);
      });
  };

  const formIsDirty = (form) => {
    let inValidCount = 0;

    Object.keys(form).map((x) => {
      form[x] === "" ? inValidCount++ : inValidCount;
    });

    return inValidCount > 0 ? true : false;
  };

  return (
    <View style={styles.Container}>
      <BackPage
        navigation={props}
        path={"SettingAccount"}
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
      <View style={styles.screen}>
        <View style={styles.settingContainer}>
          <Text style={{ color: "#c98f22" }}>Old Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            value={resetForm.oldPassword}
            onChangeText={(text) => {
              setResetForm({ ...resetForm, oldPassword: text });
            }}
          ></TextInput>
        </View>
        <View style={styles.settingContainer}>
          <Text style={{ color: "#c98f22" }}>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            value={resetForm.newPassword}
            onChangeText={(text) => {
              setResetForm({ ...resetForm, newPassword: text });
            }}
          ></TextInput>
        </View>
        <View style={styles.settingContainer}>
          <Text style={{ color: "#c98f22" }}>Confirm Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            value={resetForm.confirmPassword}
            onChangeText={(text) => {
              setResetForm({ ...resetForm, confirmPassword: text });
            }}
          ></TextInput>
        </View>
        <View style={styles.login_button_container}>
          {isPending === true ? (
            <ActivityIndicator style={styles.loginButton} color="#fff" />
          ) : (
            <Button
              color="#FFFFFF"
              title={"SAVE"}
              fontSize={14}
              style={styles.loginButton}
              onPress={() => {
                handleSubmit();
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  screen: {
    width: "100%",
    flex: 2,
    alignItems: "center",
    marginTop: 100,
    paddingHorizontal: 10,
  },
  settingContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "8%",
    marginVertical: 20,
    padding: 5,
  },
  textInput: {
    height: 30,
    width: "100%",
    color: "#A9C3BC",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#707070",
    marginTop: 5,
  },
  login_button_container: {
    backgroundColor: "#E29821",
    borderRadius: 50,
    width: "50%",
    marginVertical: 30,
    padding: 5,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  loginButton: {
    padding: 5,
  },
});

export default resetPassword;
