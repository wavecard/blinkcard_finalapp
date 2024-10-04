import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Platform, Switch } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Colors from '@/constants/Colors';

const securityandprivacy = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isbioEnabled, setIsbioEnabled] = useState(false);
  const toggleBioSwitch = () => setIsbioEnabled(previousState =>!previousState);
  const [isnotificationEnabled, setIsnotificationEnabled] = useState(false);
  const toggleNotificationSwitch = () => setIsnotificationEnabled(previousState =>!previousState);
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor:Colors.background,
      paddingTop: Platform.OS === "android" ? 35 : 0,
    }}>
     <View style={{ backgroundColor:Colors.background, flex: 1, padding: 15 }}>
      {/* <Text style={{fontSize:24, fontFamily:"Quicksand-Bold", paddingBottom:15}}>security & privacy</Text> */}
      <View style={{gap:10}}>
      <View style={{backgroundColor:"white", borderRadius:30}}>
      <Text style={{fontSize:20,fontFamily:"Quicksand-Bold",padding:20, paddingBottom:10, paddingRight:0}}>Security</Text>      
      <TouchableOpacity style={styles.btn}>
      <Ionicons name="lock-closed" size={20} color={Colors.primary} />
        <Text style={{fontSize:18, fontFamily:"Quicksand-SemiBold"}}>Change passcode</Text>
       </TouchableOpacity>        
       <TouchableOpacity style={styles.btn}>
       <MaterialCommunityIcons name="marker-check" size={20} color={Colors.primary} />
        <Text style={{fontSize:18,fontFamily:"Quicksand-SemiBold"}}>Trusted Merchants</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.btn}>
       <Ionicons name="phone-portrait" size={20} color={Colors.primary} />
        <Text style={{fontSize:18,fontFamily:"Quicksand-SemiBold"}}>Devices</Text>
       </TouchableOpacity>
       <View style={{flexDirection:"row", justifyContent:"space-between", alignContent:"center", alignItems:"center"}}>
       <TouchableOpacity style={styles.btn}>
        {/* <Image style={{height:20, width:20}}source={require("../../../assets/images/icons/faceid.png")}        /> */}
        <MaterialCommunityIcons name="face-recognition" size={20} color={Colors.primary} />
       {/* <Ionicons name="lock-closed" size={20} color={Colors.primary} /> */}
        <Text style={{fontSize:18,fontFamily:"Quicksand-SemiBold"}}>Biometrics</Text>
       </TouchableOpacity> 
       <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isbioEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleBioSwitch}
        value={isbioEnabled}
        style={{ transform:[{ scaleX: .7 }, { scaleY: .7 }] }}
      /> 
       </View>
      </View>
      
      <View style={{gap:10}}>
      <View style={{backgroundColor:"white", borderRadius:30}}>
      <Text style={{fontSize:20,fontFamily:"Quicksand-Bold",padding:20, paddingBottom:10, paddingRight:0}}>Privacy</Text>
      <View style={{flexDirection:"row", justifyContent:"space-between", alignContent:"center", alignItems:"center"}}>
      <TouchableOpacity style={styles.btn}>
       <Ionicons name="notifications" size={20} color={Colors.primary} />
        <Text style={{fontSize:18,fontFamily:"Quicksand-SemiBold"}}>App notifications</Text>
       </TouchableOpacity> 
       <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isnotificationEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleNotificationSwitch}
        value={isnotificationEnabled}
        style={{ transform:[{ scaleX: .7 }, { scaleY: .7 }] }}
      /> 
</View>
       <View style={{flexDirection:"row", justifyContent:"space-between", alignContent:"center", alignItems:"center"}}>
       <TouchableOpacity style={styles.btn}>
       <Ionicons name="location" size={20} color={Colors.primary} />
        <Text style={{fontSize:18,fontFamily:"Quicksand-SemiBold"}}>Location</Text>
       </TouchableOpacity>     
       <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ transform:[{ scaleX: .7 }, { scaleY: .7 }] }}
      />  
       </View> 
      </View>
      </View>  
       </View>
     </View>

    </SafeAreaView>
  )
}
export default securityandprivacy; 

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    backgroundColor: "whitesmoke",
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
