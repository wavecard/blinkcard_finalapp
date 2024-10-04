import { View, Text, TouchableOpacity, SafeAreaView,Dimensions } from 'react-native'
import React, { useRef } from 'react'
import { Link } from 'expo-router'
import { defaultStyles } from '@/constants/Styles'
import LottieView from 'lottie-react-native';
import Colors from '@/constants/Colors';

const Mail = () => {
    const animation = useRef<LottieView>(null);
    const { width, height } = Dimensions.get('window');
    const smallFontSize = Math.min(width, height) * 0.04;
    const largeFontSize = Math.min(width, height) * 0.09;
  return (
    <SafeAreaView style={{ flex: 1, justifyContent:"center",backgroundColor:"white"}}>
    <View style={{ padding: 10, paddingVertical: 50, gap: 10, alignItems:"center", backgroundColor:"white" }}>
      <Text style={{ fontSize: largeFontSize, fontFamily: "Quicksand-Bold" }}>Verify your Mail ID</Text>
      <Text style={{ fontFamily: "Quicksand-Medium", fontSize: smallFontSize }}>Verification link has been sent to the e-mail address you provided</Text>

          <LottieView
        autoPlay
        ref={animation}
        style={{
          width: "50%",
          maxWidth:200,
          height: "50%",
          maxHeight:200
        }}
        source={require('../assets/lottie/mailsend.json')}
      /> 
     <Link href={{
            pathname: '/signup',
            params: { type: 'signup' },
          }} replace asChild>
            <TouchableOpacity style={{flexDirection:"row"}}>
              <Text style={[defaultStyles.textLink, { textAlign: "center", padding: 10, fontSize:smallFontSize }]}>Didn't get a Verification link?</Text>
              <Text  style={ { textAlign: "center", padding: 10, paddingLeft:0,color: Colors.primary, fontSize: smallFontSize,fontWeight: '500',fontFamily:"Quicksand-Bold" }}>Click to resend</Text>
            </TouchableOpacity>
          </Link>
    </View>
    </SafeAreaView>
  )
}

export default Mail