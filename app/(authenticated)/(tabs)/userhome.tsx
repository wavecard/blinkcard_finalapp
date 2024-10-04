// import React, { Fragment, useMemo } from "react";
// import { View, Text, Image, SafeAreaView, RefreshControl, StyleSheet, TouchableOpacity, Platform, StatusBar } from "react-native";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { ScrollView, GestureHandlerRootView } from "react-native-gesture-handler";
// import LottieView from "lottie-react-native";
// import useProtectedRoute from "../../AuthRoute/useProtectedRoutes";
// import Colors from "@/constants/Colors";
// import { Snackbar } from "react-native-paper";
// import { useRouter } from "expo-router";
// import Loading from "@/components/loder/loading";
// import EmojiAvatar from "@/components/EmojiAvatar/EmojiAvatar"; 
// import { LinearGradient } from 'expo-linear-gradient';
// import BottomSheet from "@gorhom/bottom-sheet";

// export default function UserHome() {
//   const router = useRouter();
//   const { isCheckingToken, firstname } = useProtectedRoute();
//   const [refreshing, setRefreshing] = React.useState(false);
//   const [snackbarVisible, setSnackbarVisible] = React.useState(false);
// 	const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000);
//   }, [refreshing]);

//   if (isCheckingToken) {
//     return <Loading />;
//   }

//   const createCard = () => {
//     router.push("/cards");
//   };

//   const addMoney = () => {
//     setSnackbarVisible(true);
//   };

//   const sendMoney = () => {
//     setSnackbarVisible(true);
//   };
//   const notifications = () => {
//     router.push("/notifications");
//   };

//   const profile = () => {
//     router.push("/settings");
//   };
//   return (
//     <Fragment>
//     <SafeAreaView style={{ flex:0, backgroundColor: '#8338EC' }} />
//     <SafeAreaView style={{ flex: 1,backgroundColor:"#8338EC", paddingTop: Platform.OS === "android" ? 35 : 0 }}>
//       <View style={{  gap: 5 }}>
//         <View>
//           <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
//             <View style={{ flexDirection: "row", flex: 1, alignItems: "center", gap: 5 }}>
//               <EmojiAvatar firstname={firstname} onPress={profile} size={40} height={40} width={40}/>  
//               <Text style={{ fontSize: 18, fontFamily:"Quicksand-Bold", color: "white" }}>
//                 Hey, {firstname}
//               </Text>
//             </View>
//             <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", width: 30, justifyContent: "center", borderRadius: 20, height: 30 }}>
//               <TouchableOpacity onPress={notifications}>
//                 <Ionicons name="notifications-outline" size={20} color="#8338EC" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//         <View style={{ alignContent: "center", justifyContent: "center", display: "flex" }}>
//           <View style={{ justifyContent: "center", padding: "10%", flexDirection: "row", paddingBottom: "0%" }}>
//             <Text style={{ textAlign: "center", fontSize: 25, color: "white"}}>₹</Text>
//             <Text style={{ textAlign: "center", fontSize: 40,fontFamily:"Quicksand-Bold", color: "white" }}>
//               00.00
//             </Text>
//           </View>
//           <Text style={{ textAlign: "center", color: "white",fontFamily:"Quicksand-Medium" }}> Available to spend</Text>
//         </View>
//         <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingTop: "10%", paddingBottom: "5%" }}>
//           <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom:6, gap:3 }}>
//             <TouchableOpacity onPress={addMoney}>
//               <Ionicons name="add-circle" size={42} color="white" />
//             </TouchableOpacity>
//             <Text style={{color:"white",fontFamily:"Quicksand-SemiBold"}}>Add money</Text>
//           </View>
//           <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", gap:7 }}>
//             <TouchableOpacity onPress={createCard} style={{ backgroundColor:"white", borderRadius:30, padding:5}}>
//               <Ionicons name="card" size={25} color="#8338EC" />
//             </TouchableOpacity>
//             <Text style={{color:"white",fontFamily:"Quicksand-SemiBold"}}>Cards</Text>
//           </View>
//           <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", gap:5 }}>
//             <TouchableOpacity onPress={sendMoney} >
//               <MaterialCommunityIcons name="send-circle" size={42} color="white" />
//             </TouchableOpacity>
//             <Text style={{color:"white",fontFamily:"Quicksand-SemiBold"}}>Send</Text>
//           </View>
//           <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", gap:5 }}>
//             <TouchableOpacity>
//               <MaterialCommunityIcons name="dots-horizontal-circle" size={42} color="white" />
//             </TouchableOpacity>
//             <Text style={{color:"white",fontFamily:"Quicksand-SemiBold"}}>More</Text>
//           </View>
//         </View>
//       </View>
//       {/* <LinearGradient
//       colors={['hsla(265, 83%, 57%, 1)', 'hsla(304, 100%, 69%, 1)']}
//       start={{ x: 1, y: 1 }}
//       end={{ x: 1, y: 1 }}
      
//     >
// </LinearGradient> */}


// <View style={styles.container}>
// 			<BottomSheet index={1} snapPoints={snapPoints}>
// 			<View style={{ flex: 1, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
//         <View style={{ padding: "5%" }}>
//           <Text style={{ fontSize: 16, fontFamily:"Quicksand-Bold" }}>Spending's </Text>
//         </View>
//         <GestureHandlerRootView>
//           <ScrollView
//             contentContainerStyle={{ flexGrow: 1 }}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 tintColor="transparent"
//                 colors={["#8338EC"]}
//                 progressViewOffset={0}
//               >
//                 {refreshing && (
//                   <View style={styles.lottieContainer}>
//                     <LottieView
//                       source={require("../../../assets/json/qRKT0lasKZ.json")}
//                       autoPlay
//                       loop
//                       style={styles.lottie}
//                     />
//                   </View>
//                 )}
//               </RefreshControl>
//             }
//           >
//             <View style={{ paddingTop: "10%", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 30 }}>
//               <Image source={require("../../../assets/images/nta.png")} style={{ width: 400, height: 100, resizeMode: "contain" }} />
//               <Text style={{ fontSize: 16,fontFamily:"Quicksand-SemiBold" }}>No Transactions at</Text>
//             </View>
//           </ScrollView>
//         </GestureHandlerRootView>
//       </View>
// 			</BottomSheet>
// 		</View>
//       <Snackbar
//         visible={snackbarVisible}
//         onDismiss={() => setSnackbarVisible(false)}
//         duration={Snackbar.DURATION_SHORT}
//         style={styles.snackbar}
//       >
//       <Text style={{fontFamily:"Quicksand-SemiBold"}}> Money addition failed! KYC pending.</Text> 
//       </Snackbar>
//     </SafeAreaView>
//     </Fragment>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
// 		flex: 1,
// 		alignItems: 'center',
// 		justifyContent: 'center'
// 	},
//   lottieContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     height: 100,
//   },
//   lottie: {
//     width: "100%",
//     height: "100%",
//   },
//   snackbar: {
//     backgroundColor: 'red',
//   },
// });
