import React, { useState, useEffect } from "react";
import { ImageSourcePropType, Pressable } from "react-native";
// import { A } from '@expo/html-elements';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Image
} from "react-native";
import EmojiAvatar from "@/components/EmojiAvatar/EmojiAvatar"; 
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Divider, Modal, Provider as PaperProvider, Avatar } from "react-native-paper";
import useProtectedRoute from "../../AuthRoute/useProtectedRoutes";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Link, useRouter } from "expo-router";
import Loading from "@/components/loder/loading";
const AccountPage: React.FC = () => {
  const router = useRouter();
  const {
    isCheckingToken,
    deleteToken,
    firstname,
    lastname,
    mobileVerificationStatus,
  } = useProtectedRoute();
  const image: ImageSourcePropType = require("../../../assets/images/logobtnicon.png");
  const [isEnabled, setIsEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const { width, height } = Dimensions.get("window");
  const mediumFontSize = Math.min(width, height) * 0.04;
  const largeFontSize = Math.min(width, height) * 0.07;
  const smallFontSize = Math.min(width, height) * 0.030;

  useEffect(() => {
    setIsEnabled(mobileVerificationStatus === "verified");
  }, [mobileVerificationStatus]);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleLogout = async () => {
    await deleteToken();
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  if (isCheckingToken) {
    return (
      
        <Loading/>
    );
  }

  // const Name = `${firstname} ${lastname}`;
  // const initials = `${firstname?.charAt(0) ?? ""}${lastname?.charAt(0) ?? ""}`.toUpperCase();
  const plans = () => {
    router.push("/plans");
  };
  const account = () => {
router.push('/profile')
  };
  const security = () => {
router.push('/securityandprivacy')
  };
  const helppage = () => {
    router.push('/help/helpuserhome')

  };
  const changeprofileimg = () => {
  };
  return (
    <PaperProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:Colors.background,
          paddingTop: Platform.OS === "android" ? 35 : 0,
        }}
      >
        <View style={{ backgroundColor:Colors.background, flex: 1, padding: 15 }}>
          <View style={{alignItems:"center", gap:10}}>
          <EmojiAvatar firstname={firstname} onPress= {changeprofileimg}size={80} height={70} width={70} backgroundColor={Colors.primary}/>  
          {/* <Avatar.Text size={40} label={initials} color="white" style={styles.avatar} /> */}
          <Text style={{ fontSize: 24, color: Colors.primary, fontFamily:"Quicksand-Bold"}}>
            Hey, {firstname} </Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.btn} onPress={plans}>
              <Ionicons name="ribbon" size={20} color={Colors.primary} />
              <Text style={{ 
                color: "black", 
                fontSize: mediumFontSize,
                fontFamily:"Quicksand-SemiBold"
                }}>
                Plan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={account}>
              <Ionicons name="person" size={20} color={Colors.primary} />
                <Text style={{ color: "black", fontSize: mediumFontSize, fontFamily:"Quicksand-SemiBold" }}>
                  Account
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={security}>
              <Ionicons name="lock-closed" size={20} color={Colors.primary} />
                <Text style={{ color: "black", fontSize: mediumFontSize, fontFamily:"Quicksand-SemiBold" }}>
                  Security & privacy
                </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.btn} onPress={helppage}>
            <Ionicons name="information-circle" size={23} color={Colors.primary} />
              <Text style={{ color: "black", fontSize: mediumFontSize, fontFamily:"Quicksand-SemiBold" }}>
                Help
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={showModal}>
            <Ionicons name="flask" size={20} color={Colors.primary} />
              <Text style={{ color: "black", fontSize: mediumFontSize, fontFamily:"Quicksand-SemiBold" }}>
                Upcoming features (soon)
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.btn}>
          {/* <A href="https://www.blinkcard.in/about/virtualcard" style={{gap:20, paddingHorizontal:15, backgroundColor:"white"}}> */}
            <Image source={image} style={styles.btnIcon} />
              <Text style={{ color: "black", fontSize: mediumFontSize, fontFamily:"Quicksand-SemiBold"}}>
                About us
              </Text>   
            </Pressable>
         
          </View>
          <View style={styles.actions}>
          <TouchableOpacity
            style={[
              styles.btn,
              { backgroundColor: Colors.primary, borderRadius:20 },
            ]}
            onPress={handleLogout}
          >
            <Text style={defaultStyles.buttonText}>
              <MaterialCommunityIcons name="location-exit" size={20} /> Log out
            </Text>
          </TouchableOpacity>
          </View>
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <Text style={{ color: Colors.gray,fontSize:smallFontSize }}>Version 1.0</Text>
            <Text style={{ color: Colors.gray, fontSize:smallFontSize }}>
              Blink Card a Wave Card Pvt Ltd company
            </Text>
          </View>
        </View> 
      </SafeAreaView>
    </PaperProvider>
  );
};

export default AccountPage;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    backgroundColor: "white",
    borderRadius: 16,
    margin: 10,
  },
  btn: {
    padding: 14,
    flexDirection: "row",
    gap: 20,
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalContent: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalBullet: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: Colors.primary,
  },
  btnIcon: {
    height: 25,
    marginRight: 5,
    width: 20,
  },
});
