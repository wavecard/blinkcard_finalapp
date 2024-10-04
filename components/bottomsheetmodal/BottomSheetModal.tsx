import React, { forwardRef, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BottomSheetModal as GorhomBottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

export type Ref = GorhomBottomSheetModal;

const CustomBottomSheetModal = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const router = useRouter();
  const profile = () => {
    router.push("/settings");
  };
  return (
    <GorhomBottomSheetModal ref={ref} index={0} snapPoints={snapPoints}>
      <View style={{ justifyContent: "center", alignItems: "center", gap: 16, padding:10 }}>
      <LottieView
                      source={require("../../assets/lottie/accountclose.json")}
                      autoPlay
                      loop
                      style={ {   width: "30%",
                        height: "30%",}}
                    />
        <Text style={{ fontSize: 24, fontFamily: "Quicksand-Bold" }}>Hey, wait! Where are you going?</Text>
        <Text style={{ fontSize: 16, textAlign:"center", fontFamily:"Quicksand-Medium" }}>
          You can hold your account for free, even if you don't use Blink Card.
        </Text>
        
        <TouchableOpacity
        onPress={profile}
          style={[
            defaultStyles.pillButton,
            { backgroundColor: Colors.primary, width: 400 },
          ]}
        >
          <Text style={defaultStyles.buttonText}>Keep account open</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              backgroundColor: Colors.platium,
              width: 400,
            },
          ]}
        >
          <Text style={defaultStyles.buttonText}>Close account</Text>
        </TouchableOpacity>
      </View>
    </GorhomBottomSheetModal>
  );
});

export default CustomBottomSheetModal;
