import { View, Text , Image, ScrollView} from 'react-native'
import React from 'react'
export default function notifications() {
  
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
    <ScrollView>
    <View style={{ justifyContent:"center", alignItems:"center", flex:1, paddingVertical:100}}>
     <Image source={require("../../../assets/images/mailbox.png")} style={{ width: 400, height: 100, resizeMode: "contain" }}/>
     <Text style={{fontSize:25, fontFamily:"Quicksand-Bold"}}>No notifications yet</Text>
     <Text style={{fontSize:14, fontFamily:"Quicksand-Medium"}}>Your notification will appear here once you've received them.</Text>
    </View>
    </ScrollView>  
     </View>
  )
}