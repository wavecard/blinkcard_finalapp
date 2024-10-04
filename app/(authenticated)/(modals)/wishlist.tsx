import { View, Text, SafeAreaView, Image,Dimensions, TouchableOpacity, StyleSheet} from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native';
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useProtectedRoute from "../../AuthRoute/useProtectedRoutes";

export default function wishlist() {
  const {
    deleteToken,
  } = useProtectedRoute();
  const handleLogout = async () => {
    await deleteToken();
  };

  const animation = useRef<LottieView>(null);
  const { width, height } = Dimensions.get('window');
  const mediumFontSize = Math.min(width, height) * 0.04;
  const largeFontSize = Math.min(width, height) * 0.09;
  const semiFontSize = Math.min(width, height) * 0.058;

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flexDirection:"row", alignItems:'center', justifyContent:"space-between", padding:10}}>
        <Text style={{fontFamily: "Quicksand-Bold", fontSize:semiFontSize, color:Colors.primary}}>Blink Card</Text>
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
  <View style={{ alignItems:'center'}}>
     <Image source={require("../../../assets/images/logobtn.png")} style={{ height: 200, width: 200}}/>
    
        <LottieView
        autoPlay
        ref={animation}
        style={{
          width: "100%",
          height: "100%",
          maxHeight:200
        }}
        source={require('../../../assets/lottie/lineloader.json')}
      />   
            <Text style={{fontFamily: "Quicksand-Bold", fontSize:largeFontSize}}>Dropping Soon !</Text>
            <Text style={{fontFamily: "Quicksand-SemiBold", fontSize:mediumFontSize}}>Welcome to the Exclusive Waitlist</Text>
       </View>    
    </SafeAreaView>
  )
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
    padding: 7,
    flexDirection: "row",
    gap: 20,
  },

});
