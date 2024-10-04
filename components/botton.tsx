// import { Link } from 'expo-router';
// import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';
// import MaskedView from '@react-native-masked-view/masked-view';

// import { ImageSourcePropType } from "react-native";


// const Bottom = () => {
//   const { bottom } = useSafeAreaInsets();
//   const image: ImageSourcePropType = require("../assets/images/icon.png");

//   return (
//     Platform.OS === 'ios' ? (
//       <BlurView intensity={100} tint="light" style={styles.blurContainer}>
//         <View style={[styles.container, { paddingBottom: bottom }]}>
//           {/* <Text style={{ fontSize: 50, color: Platform.OS !== 'ios' ? 'white' : '#8338EC', textAlign: "center", fontWeight: "bold" }}>Reimagined</Text> */}
          
//      <MaskedView
//            style={{ height: "25%" }}
//        maskElement={ 
//  <Text style={{ backgroundColor: 'transparent', fontSize: 50, textAlign: "center", fontWeight: "bold" }}>Reimagined</Text>
// }
// >
//   <LinearGradient
//     colors={['white', '#8338EC']}
//     start={{ x: 1, y: 1 }}
//     end={{ x: 0.30, y: 0.33 }}
//     style={{ flex: 1}}
//   />
// </MaskedView> 
//           <Text style={{ color: Platform.OS !== 'ios' ? 'white' : 'white', textAlign: "center" }}>#NoTimeForPin</Text>
//           <Link href={{
//             pathname: '/signup',
//             params: { type: 'signup' },
//           }}
//             style={[styles.btn, styles.btnLight]}
//             asChild>
//             <TouchableOpacity>
//               <Image source={image} style={styles.btnIcon} />
//               <Text style={styles.btnLightText}>Open an account</Text>
//             </TouchableOpacity>
//           </Link>
//           <Link
//             href={{
//               pathname: '/login',
//               params: { type: 'login' },
//             }}
//             style={styles.btn}
//             asChild>
//             <TouchableOpacity style={Platform.OS !== 'ios' ? styles.btnOutlineAndroid : styles.btnOutline}>
//               <Text style={Platform.OS !== 'ios' ? styles.btnDarkTextAndroid : styles.btnDarkText}>Log in</Text>
//             </TouchableOpacity>
//           </Link>
//         </View>
//       </BlurView>
//     ) : (
//       <View style={[styles.container, { paddingBottom: bottom }]}>

//     <MaskedView
//            style={{ height: 100 }}
//        maskElement={ 
//  <Text style={{ fontSize: 50, textAlign: "center", fontWeight: "bold" }}>Reimagined</Text>
// }
// >
//   <LinearGradient
//     colors={['white','#8338EC','white']}
//     start={{ x: 0, y: 1.2 }}
//     end={{ x: 0, y: 0.3 }}
//     style={{ flex: 1 }}
//   />
// </MaskedView>

//         <Text style={{ color: Platform.OS === 'android' ? 'white' : 'white', textAlign: "center" }}>#NoTimeForPin</Text>
//         <Link href={{
//           pathname: '/mail',
//           params: { type: 'signup' },
//         }}
//           style={[styles.btn, styles.btnLight]}
//           asChild>
//           <TouchableOpacity>
//             <Image source={image} style={styles.btnIcon} />
//             <Text style={styles.btnLightText}>Open an account</Text>
//           </TouchableOpacity>
//         </Link>
//         <Link
//           href={{
//             pathname: '/login',
//             params: { type: 'login' },
//           }}
//           style={styles.btn}
//           asChild>
//           <TouchableOpacity style={Platform.OS === 'android' ? styles.btnOutlineAndroid : styles.btnOutline}>
//             <Text style={Platform.OS === 'android' ? styles.btnDarkTextAndroid : styles.btnDarkText}>Log in</Text>
//           </TouchableOpacity>
//         </Link>
//       </View>
//     )
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     bottom: '5%',
//     padding: 26,
//     gap: 14,
//   },
//   btnLight: {
//     backgroundColor: '#fff',
//   },
//   btnLightText: {
//     color: '#000',
//     fontSize: 20,
//   },
//   btnDark: {
//     backgroundColor: "white",
//   },
//   btnDarkText: {
//     color: '#fff',
//     fontSize: 20,
//   },
//   btnOutline: {
//     borderWidth: 3,
//     borderColor: "white",
//   },
//   btnIcon: {
//     height: 40,
//     marginRight: 5,
//     width: 40,
//   },
//   btnOutlineAndroid: {
//     borderWidth: 3,
//     borderColor: "#252525",
//     backgroundColor: "#252525",
//   },
//   btnDarkTextAndroid: {
//     color: "white",
//     fontSize: 20,
//   },
//   btn: {
//     height: 50,
//     borderRadius: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   p: {
//     paddingBottom: "10%",
//   },
//   blurContainer: {
//     flex: 1,
//     position: 'absolute',
//     height: "35%",
//     width: '100%',
//     textAlign: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',
//     bottom: 0,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//   },
  
// });
// export default Bottom;
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Link } from 'expo-router';

import { ImageSourcePropType } from "react-native";

const Bottom = () => {
  const { bottom } = useSafeAreaInsets();
  const image: ImageSourcePropType = require("../assets/images/icon.png");

  // Reanimated shared value for the translateY animation
  const translateY = useSharedValue(300); // Start off-screen

  useEffect(() => {
    // Trigger the popup animation when the component mounts
    translateY.value = withSpring(0, { damping: 15 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const content = (
    <>
      <MaskedView style={{ height: "25%" }}
        maskElement={
          <Text style={{ backgroundColor: 'transparent', fontSize: 50, textAlign: "center", fontWeight: "bold" }}>
            Reimagined
          </Text>
        }>
        <LinearGradient
          colors={['white', '#8338EC']}
          start={{ x: 1, y: 1 }}
          end={{ x: 0.30, y: 0.33 }}
          style={{ flex: 1 }}
        />
      </MaskedView>
      <Text style={{ color: 'white', textAlign: "center" }}>#NoTimeForPin</Text>
      <Link href={{ pathname: '/signup', params: { type: 'signup' } }}
        style={[styles.btn, styles.btnLight]}
        asChild>
        <TouchableOpacity>
          <Image source={image} style={styles.btnIcon} />
          <Text style={styles.btnLightText}>Open an account</Text>
        </TouchableOpacity>
      </Link>
      <Link href={{ pathname: '/login', params: { type: 'login' } }}
        style={styles.btn}
        asChild>
        <TouchableOpacity style={Platform.OS !== 'ios' ? styles.btnOutlineAndroid : styles.btnOutline}>
          <Text style={Platform.OS !== 'ios' ? styles.btnDarkTextAndroid : styles.btnDarkText}>Log in</Text>
        </TouchableOpacity>
      </Link>
    </>
  );

  return (
    <Animated.View style={[styles.blurContainer, animatedStyle]}>
      {Platform.OS === 'ios' ? (
        <BlurView intensity={100} tint="light" style={{ flex: 1 }}>
          <View style={[styles.container, { paddingBottom: bottom }]}>
            {content}
          </View>
        </BlurView>
      ) : (
        <View style={[styles.container, { paddingBottom: bottom }]}>
          {content}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: '5%',
    padding: 26,
    gap: 14,
  },
  btnLight: {
    backgroundColor: '#fff',
  },
  btnLightText: {
    color: '#000',
    fontSize: 20,
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: "white",
  },
  btnIcon: {
    height: 40,
    marginRight: 5,
    width: 40,
  },
  btnOutlineAndroid: {
    borderWidth: 3,
    borderColor: "#252525",
    backgroundColor: "#252525",
  },
  btnDarkTextAndroid: {
    color: "white",
    fontSize: 20,
  },
  btn: {
    height: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  blurContainer: {
    flex: 1,
    position: 'absolute',
    height: "35%",
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    bottom: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
     btnDarkText: {
        color: '#fff',
        fontSize: 20,
      },
});

export default Bottom;
