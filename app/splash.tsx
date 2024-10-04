import {View } from "react-native";
import LottieView from 'lottie-react-native';
import { useRef } from "react";
export default function Splash() {
  const animation = useRef<LottieView>(null);
  return (
    <View style={{flex:1, alignItems:"center", justifyContent:"center",backgroundColor:"black"}}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: "100%",
          maxWidth:400,
          height: "100%",
          maxHeight:400
        }}
        source={require('../assets/lottie/bcsplash.json')}
      />
    </View>
  );
}
// }
// import { View, Platform } from "react-native";
// import { useRef } from "react";
// import LottieView from 'lottie-react-native';
// import { Player } from '@lottiefiles/react-lottie-player'; // Web-specific player

// export default function Splash() {
//   const animation = useRef<LottieView>(null);

//   return (
//     <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "black"}}>
//       {Platform.OS === 'web' ? (
//         <Player
//           autoplay
//           loop
//           src={require('../assets/lottie/bcsplash.json')}
//           style={{ width: "100%", maxWidth: 400, height: "100%", maxHeight: 400 }}
//         />
//       ) : (
//         <LottieView
//           autoPlay
//           ref={animation}
//           style={{ width: "100%", maxWidth: 400, height: "100%", maxHeight: 400 }}
//           source={require('../assets/lottie/bcsplash.json')}
//         />
//       )}
//     </View>
//   );
// }
