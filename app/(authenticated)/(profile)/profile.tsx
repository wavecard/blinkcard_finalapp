import { View, Text, SafeAreaView, TouchableOpacity, Platform, StyleSheet, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import Colors from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BottomSheetModal} from "@gorhom/bottom-sheet";
import CustomBottomSheetModal from "@/components/bottomsheetmodal/BottomSheetModal";
export default function profile() {
  const router = useRouter();
  const { width, height } = Dimensions.get("window");
  const mediumFontSize = Math.min(width, height) * 0.04;
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = () => bottomSheetRef.current?.present();
  const PersonalDetails  = () => {
  router.push({pathname: '/account/personaldetails',  
  })
}

  return (
    <SafeAreaView  style={{
      flex: 1,
      backgroundColor:Colors.background,
      paddingTop: Platform.OS === "android" ? 35 : 0,
    }}>
      <View style={{ backgroundColor:Colors.background, flex: 1, padding: 15 }}>
        <Text style={{ fontSize: 24, fontFamily:"Quicksand-Bold", paddingBottom:10 }}>Account</Text>
      <View style={{gap:10}}>
      <View style={{backgroundColor:"white", borderRadius:30}}> 
      <TouchableOpacity style={styles.btn} onPress={PersonalDetails}>
      <Ionicons name="person" size={20} color={Colors.primary} />
        <Text style={{fontSize:18, fontFamily:"Quicksand-SemiBold"}}>Personal details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
      <Ionicons name="qr-code-outline" size={20} color={Colors.primary} />
        <Text style={{fontSize:18,fontFamily:"Quicksand-SemiBold"}}>Account details</Text>
      </TouchableOpacity>
      </View>
      <View style={{backgroundColor:"white", borderRadius:30}}>
      <TouchableOpacity style={styles.btn}>
              <Ionicons name="document" size={20} color={Colors.primary} />
              <Text style={{ color: "black", fontSize: mediumFontSize,fontFamily:"Quicksand-SemiBold" }}>
                Privacy policy
              </Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.btn}>
        <Ionicons name="information-circle" size={20} color={Colors.primary}/>
        <Text style={{fontSize:18,fontFamily:"Quicksand-SemiBold"}}>Terms & conditiond</Text>
      </TouchableOpacity> 
      </View>
      <View style={{backgroundColor:"white", borderRadius:30}}>
            <TouchableOpacity style={styles.btn} onPress={handlePresentModalPress}>
              <MaterialCommunityIcons
                name="heart-broken"
                size={20}
                color={"red"}
              />
              <Text style={{ color: "black", fontSize: mediumFontSize,fontFamily:"Quicksand-SemiBold" }}>
                Close account
              </Text>
            </TouchableOpacity>
          </View>     
          </View>  
          <CustomBottomSheetModal ref={bottomSheetRef}/>    
          {/* <Accountclosermodal visible={visible} hideModal={hideModal}/> */}
      </View>


    </SafeAreaView>
  );
}


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
