// import React from 'react';
// import { Tabs } from 'expo-router';
// import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
// import { Image } from'react-native';
// import useProtectedRoute from "../../AuthRoute/useProtectedRoutes";
// import EmojiAvatar from "@/components/EmojiAvatar/EmojiAvatar"; 
// import { useRouter } from "expo-router";
// import Colors from '@/constants/Colors';

// export default function TabLayout() {
// const { firstname} = useProtectedRoute();
// const router = useRouter();
// const profile = () => {
//   router.push("/settings");
// };

//   const tabConfig = [
//     { name: "userhome", title: "Home", icon: (color: string) => <Image source={require('../../../assets/images/logobtnicon.png')} style={{maxHeight:27, maxWidth:23}} tintColor={color}/> },
//     { name: "cards", title: "Cards", icon: (color: string) => <Ionicons name="card-outline" size={30} color={color} /> },
//     { name: "offers", title: "Offers", icon: (color: string) => <MaterialCommunityIcons name="star-four-points-outline" size={30} color={color} /> },
//     { name: "settings", title: "Profile", icon: (color: string) => <EmojiAvatar firstname={firstname} color={color} onPress={profile} backgroundColor={color} size={33} height={33} width={33}   />    },
    
//   ];


//   return (
//     <Tabs screenOptions={{ tabBarActiveTintColor: '#8338EC', headerShown: false }}>
//       {tabConfig.map(({ name, title, icon }) => (
//         <Tabs.Screen
//           key={name}
//           name={name}
//           options={{
//             title,
//             tabBarIcon: ({ color }) => icon(color),
//           }}
//         />
//       ))}
//     </Tabs>
//   );
// }
