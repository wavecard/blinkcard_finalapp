import {View, Text } from "react-native";
import LottieView from 'lottie-react-native';
import { useRef } from "react";
import Colors from "@/constants/Colors";
export default function Loading() {
  const animation = useRef<LottieView>(null);
  return (
    <View style={{flex:1, alignItems:"center", justifyContent:"center",backgroundColor:"white"}}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: "100%",
          maxWidth:50,
          height: "100%",
          maxHeight:50,

        }}
        source={require('../../assets/lottie/loder.json')}
        // source={require('../../assets/lottie/lodertwo.json')}

      />
      <Text style={{color:Colors.primary, fontSize:8, textAlign:'center'}}>Loading...</Text>
    </View>
  );
}
