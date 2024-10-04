// import { useRouter } from 'expo-router';
// import { useEffect, useState } from 'react';
// import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
// import * as Haptics from 'expo-haptics';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
// import * as LocalAuthentication from 'expo-local-authentication';
// import useProtectedRoute from "../../AuthRoute/useProtectedRoutes";
// import Colors from '@/constants/Colors';

// const Page = () => {
//   const [code, setCode] = useState<number[]>([]);
//   const codeLength = Array(6).fill(0);
//   const router = useRouter();
//   const offset = useSharedValue(0);
//   const { firstname } = useProtectedRoute();

//   const style = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateX: offset.value }],
//     };
//   });

//   const OFFSET = 20;
//   const TIME = 80;

//   useEffect(() => {
//     if (code.length === 6) {
//       if (code.join('') === '111111') {
//         router.replace('/userhome');
//         setCode([]);
//       } else {
//         offset.value = withSequence(
//           withTiming(-OFFSET, { duration: TIME / 2 }),
//           withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
//           withTiming(0, { duration: TIME / 2 })
//         );
//         Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
//         setCode([]);
//       }
//     }
//   }, [code]); 

//   const onNumberPress = (number: number) => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     setCode((prevCode) => [...prevCode, number]);
//   };

//   const numberBackspce = () => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//     setCode((prevCode) => prevCode.slice(0, -1));
//   };

//   const onBiometricPress = async () => {
//     const {success} = await LocalAuthentication.authenticateAsync();
//     if (success){
//       router.replace('/userhome');
//     } else{
//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
//     }
//   };

import { Href, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import * as LocalAuthentication from 'expo-local-authentication';
import useProtectedRoute from "../../AuthRoute/useProtectedRoutes";
import { useLastRoute } from '../../../context/LastRouteContext'; 

import Colors from '@/constants/Colors';

const Page = () => {
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(6).fill(0);
  const router = useRouter();
  const offset = useSharedValue(0);
  const { firstname } = useProtectedRoute();  
  const { lastRoute } = useLastRoute();
  
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const OFFSET = 20;
  const TIME = 80;

  useEffect(() => {
    if (code.length === 6) {
      if (code.join('') === '111111') {
        // Navigate to the last route or fallback to /userhome
        const targetRoute = lastRoute ? `/${lastRoute}` : '/wishlist';
        // Type assertion to Href<string>
        router.replace(targetRoute as unknown as Href<string>);
        setCode([]);
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 })
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setCode([]);
      }
    }
  }, [code]); 

  const onNumberPress = (number: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode((prevCode) => [...prevCode, number]);
  };


  const numberBackspce = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode((prevCode) => prevCode.slice(0, -1));
  };

  const onBiometricPress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      // Navigate to the last route or fallback to /userhome
      const targetRoute = lastRoute ? `/${lastRoute}` : '/wishlist';
      // Type assertion to Href<string>
      router.replace(targetRoute as unknown as Href<string>);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.greeting}>Welcome back, {firstname}</Text>
      <Text style={{ fontFamily:"Quicksand-SemiBold", alignSelf:"center", fontSize:18}}>Enter your PIN code to login</Text>
      <Animated.View style={[styles.codeView, style]}>
        {codeLength.map((_, index) => (
          <View
            key={index}
            style={[
              styles.codeEmpty,
              {
                backgroundColor: code[index] ? '#8338EC' : '#E5E4E2',
              },
            ]}
          />
        ))}
      </Animated.View>
      <View style={styles.numberView}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {[1, 2, 3].map((number) => (
            <TouchableOpacity key={number} onPress={() => onNumberPress(number)}>
              <Text style={styles.number}> {number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {[4, 5, 6].map((number) => (
            <TouchableOpacity key={number} onPress={() => onNumberPress(number)}>
              <Text style={styles.number}> {number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {[7, 8, 9].map((number) => (
            <TouchableOpacity key={number} onPress={() => onNumberPress(number)}>
              <Text style={styles.number}> {number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={onBiometricPress}>
            <MaterialCommunityIcons name="face-recognition" size={26} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberPress(0)}>
            <Text style={styles.number}>0</Text>
          </TouchableOpacity>

          <View style={{ minWidth: 30 }}>
            {code.length > 0 && (
              <TouchableOpacity onPress={numberBackspce}>
                <MaterialCommunityIcons name="backspace-outline" size={26} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity style={{backgroundColor:Colors.primaryMuted, borderRadius:20, padding:10}}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontFamily:"Quicksand-Bold",
            color:Colors.primary
          }}
        >
          Forgot your passcode?
        </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  greeting: {
    fontSize: 24,
    marginTop: 40,
    alignSelf: 'center',
    fontFamily:"Quicksand-Bold",
  },
  codeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginVertical: 100,
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  numberView: {
    marginHorizontal: 80,
    gap: 60,
  },
  number: {
    fontSize: 32,
    fontFamily:"Quicksand-Bold"
  },
});

export default Page;
