import React from "react";
import { View, ImageBackground,  StyleSheet} from "react-native";
import { ImageSourcePropType } from "react-native";
import Bottom from "../components/botton";
import * as Network from 'expo-network';
import { UnavailabilityError } from 'expo-modules-core';

export async function getNetworkStateAsync(): Promise<Network.NetworkState> {
  if (!Network.getNetworkStateAsync) {
    throw new UnavailabilityError('expo-network', 'getNetworkStateAsync');
  }
  return await Network.getNetworkStateAsync();
}
export default function App() {
  const image: ImageSourcePropType = require("../assets/images/indexbg.png");
  
  return (
    
      <ImageBackground source={image} resizeMode="cover" style={StyleSheet.absoluteFillObject}>    
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Bottom />
        </View> 
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});