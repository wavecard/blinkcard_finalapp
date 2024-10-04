import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function AuthLayout() {
  const router = useRouter();


  return (
<Stack>
<Stack.Screen name="plans" options={
  
  {
    title: '',
    headerBackTitle: '',
    headerShadowVisible: false,
    headerLeft: () => (
      <TouchableOpacity onPress={router.back}>
        <Ionicons name="arrow-back" size={34} color={Colors.dark} />
      </TouchableOpacity>
    ),
  }
}/>
<Stack.Screen name="profile" options={
  {
    title: '',
    headerBackTitle: '',
    headerShadowVisible: false,
    headerLeft: () => (
      <TouchableOpacity onPress={router.back}>
        <Ionicons name="arrow-back" size={34} color={Colors.dark} />
      </TouchableOpacity>
    ),
  }
}/>
{/* <Stack.Screen name="aboutus" options={
  {
    title: '',
    headerBackTitle: '',
    headerShadowVisible: false,
    headerLeft: () => (

      <TouchableOpacity onPress={router.back}>
        <Ionicons name="arrow-back" size={34} color={Colors.dark} />
      </TouchableOpacity>
    ),
  }
}/> */}
<Stack.Screen name="securityandprivacy" options={
  {
    title: '',
    headerBackTitle: '',
    headerShadowVisible: false,
    headerLeft: () => (
      <TouchableOpacity onPress={router.back}>
        <Ionicons name="arrow-back" size={34} color={Colors.dark} />
      </TouchableOpacity>
    ),
  }
}/>
<Stack.Screen name="notifications" 
            
                options={{
                  title: 'Notifications',
                  headerBackTitle: '',
                  headerShadowVisible: false,
                  headerLeft: () => (
                    <TouchableOpacity onPress={router.back}>
                      <Ionicons name="arrow-back" size={25} color={Colors.dark} />
                    </TouchableOpacity>
                  ),
          
                }}
              />
   <Stack.Screen name="help/helpuserhome" options={
  { title: 'Blink Card support', headerBackTitle: '', headerShadowVisible: false, headerLeft: () =>(
    <TouchableOpacity onPress={router.back}>
      <Ionicons name="arrow-back" size={34} color={Colors.dark} />
    </TouchableOpacity>
  ),
}} />
<Stack.Screen name="account/personaldetails" options={
  { title: 'Personal details', headerBackTitle: '', headerShadowVisible: false, headerLeft: () =>(
<TouchableOpacity onPress={router.back}>
<Ionicons name="arrow-back" size={34} color={Colors.dark} />
</TouchableOpacity>
),
}} />
</Stack>
    
  );
}
