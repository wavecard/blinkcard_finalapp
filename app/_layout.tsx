import { useEffect, useRef, useState } from 'react';
import Splash from './splash';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Colors from '@/constants/Colors';
import { useRouter, Stack, useSegments, Href, Router } from 'expo-router';
import useProtectedRoute from './AuthRoute/useProtectedRoutes';
import { TouchableOpacity, AppState } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserInactivity } from '@/context/UserInactivity';
import * as SplashScreen from 'expo-splash-screen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { LastRouteProvider, useLastRoute } from '../context/LastRouteContext';
interface LastRouteConsumerProps {
  router: Router;
}
export default function RootLayout() {
  const queryClient = new QueryClient();
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
    'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
  });

  const router = useRouter();
    const segments = useSegments();
  const { isCheckingToken, SessionId } = useProtectedRoute();
  useEffect(() => {
    const prepareApp = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        if (fontError) {
          console.error('Failed to load fonts:', fontError);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };

    prepareApp();
  }, [fontsLoaded, fontError]);
  const inAuthGroup = segments[0] === '(authenticated)';


    useEffect(() => {
    if (!isCheckingToken && appIsReady && !inAuthGroup) {
      if (SessionId) {
        router.replace('/wishlist');
      } else if (isCheckingToken) {
        router.replace('/');
      }
    }
  }, [isCheckingToken, SessionId, appIsReady]);

  if (isCheckingToken || !appIsReady) {
    return <Splash />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <LastRouteProvider>
            <LastRouteConsumer router={router} />
      
              <Stack>
                <Stack.Screen name="(authenticated)/(profile)" options={{ headerShown: false }} />
                <Stack.Screen name="(authenticated)/(permissions)" options={{ headerShown: false }} />
                {/* <Stack.Screen name="(authenticated)/(tabs)" options={{ headerShown: false }} /> */}
                <Stack.Screen name='(authenticated)/(modals)/lock' options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name='(authenticated)/(modals)/white' options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name='(authenticated)/(modals)/wishlist' options={{ headerShown: false, animation: "none" }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                {['signup', 'signuptwo', 'login', 'verify/[phone]', 'maillogin', 'forgotpassword', 'resetpassword', 'setpincode', 'confirmpincode', 'mail'].map((screenName) => (
                  <Stack.Screen
                    key={screenName}
                    name={screenName}
                    options={{
                      title: '',
                      headerBackTitle: '',
                      headerShadowVisible: false,
                      headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                          <Ionicons name="arrow-back" size={34} color={Colors.dark} />
                        </TouchableOpacity>
                      ),
                      headerRight: () => (
                        <TouchableOpacity onPress={() => router.navigate('/help')}>
                          <Ionicons name="help-circle-outline" size={34} color={Colors.dark} />
                        </TouchableOpacity>
                      ),
                    }}
                  />
                ))}
                <Stack.Screen name="help" options={{ title: 'Help', presentation: "modal" }} />
                <Stack.Screen name="splash" options={{ headerShown: false }} />
              </Stack>
          </LastRouteProvider>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

function LastRouteConsumer({ router }: LastRouteConsumerProps) {
  const segments = useSegments();
  const appState = useRef(AppState.currentState);
  const { setLastRoute, lastRoute } = useLastRoute();

  useEffect(() => {
    const saveLastRoute = () => {
      setLastRoute(segments.join('/')); 
    };

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        if (lastRoute && lastRoute !== '/wishlist') {
          router.replace(lastRoute as unknown as Href<string>);
        }
      } else if (nextAppState === 'background') {
        saveLastRoute();
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [segments, lastRoute, router, setLastRoute]);

  return null; 
}



// import { useEffect, useRef, useState } from 'react';
// import Splash from './splash';
// import { useFonts } from 'expo-font';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Colors from '@/constants/Colors';
// import { useRouter, Stack, useSegments,Href } from 'expo-router';
// import useProtectedRoute from './AuthRoute/useProtectedRoutes';
// import { TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { UserInactivity } from '@/context/UserInactivity';
// import * as SplashScreen from 'expo-splash-screen';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { AppState } from 'react-native';

// export default function RootLayout() {
//   const queryClient = new QueryClient();
//   const [appIsReady, setAppIsReady] = useState(false);
//   const [fontsLoaded, fontError] = useFonts({
//     'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
//     'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
//     'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
//     'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
//     'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
//   });

//   const router = useRouter();
//   const { isCheckingToken, SessionId } = useProtectedRoute();
//   const segments = useSegments();
//   const appState = useRef(AppState.currentState);
//   const [lastRoute, setLastRoute] = useState<Href<string> | null>(null); 

//   useEffect(() => {
//     const prepareApp = async () => {
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 4000));
//         if (fontError) {
//           console.error('Failed to load fonts:', fontError);
//         }
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setAppIsReady(true);
//       }
//     };

//     prepareApp();
//   }, [fontsLoaded, fontError]);

//   useEffect(() => {
//     if (appIsReady) {
//       SplashScreen.hideAsync();
//     }
//   }, [appIsReady]);

//   const inAuthGroup = segments[0] === '(authenticated)';

//   // Listen for app state changes
//   useEffect(() => {
//     const subscription = AppState.addEventListener('change', (nextAppState) => {
//       if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
//         // App has become active
//         if (lastRoute && lastRoute !== '/userhome') {
//           router.replace(lastRoute); // Properly typed lastRoute
//         }
//       }
//       appState.current = nextAppState;
//     });

//     return () => {
//       subscription.remove();
//     };
//   }, [lastRoute]);

//   // Save the last route before the app goes into the background
//   useEffect(() => {
//     const saveLastRoute = () => {
//       if (segments.length > 0) {
//         setLastRoute(segments[0] as Href<string>); // Cast segment as Href<string>
//       }
//     };
//     const subscription = AppState.addEventListener('change', saveLastRoute);

//     return () => {
//       subscription.remove(); 
//     };
//   }, [segments]);

//   useEffect(() => {
//     if (!isCheckingToken && appIsReady && !inAuthGroup) {
//       if (SessionId) {
//         router.replace('/userhome');
//       } else if (isCheckingToken) {
//         router.replace('/');
//       }
//     }
//   }, [isCheckingToken, SessionId, appIsReady]);

//   if (isCheckingToken || !appIsReady) {
//     return <Splash />;
//   }
//   return (       
//      <GestureHandlerRootView style={{ flex: 1 }}>
//     <BottomSheetModalProvider>
//     <QueryClientProvider client={queryClient}>
//       <UserInactivity>
//           <Stack>
//           <Stack.Screen name="(authenticated)/(profile)" options={{ headerShown: false }} />
//           <Stack.Screen name="(authenticated)/(permissions)" options={{ headerShown: false }} />
//             <Stack.Screen name="(authenticated)/(tabs)" options={{ headerShown: false }} />
//             <Stack.Screen name='(authenticated)/(modals)/lock' options={{ headerShown: false, animation: "none" }} />
//             <Stack.Screen name='(authenticated)/(modals)/white' options={{ headerShown: false, animation: "none" }} />
//             <Stack.Screen name="index" options={{ headerShown: false }} />
//             {['signup', 'signuptwo', 'login', 'verify/[phone]', 'maillogin', 'forgotpassword','resetpassword',"setpincode",'confirmpincode', 'mail'].map((screenName) => (
//               <Stack.Screen
//                 key={screenName}
//                 name={screenName}
//                 options={{
//                   title: '',
//                   headerBackTitle: '',
//                   headerShadowVisible: false,
//                   headerLeft: () => (
//                     <TouchableOpacity onPress={router.back}>
//                       <Ionicons name="arrow-back" size={34} color={Colors.dark} />
//                     </TouchableOpacity>
//                   ),
//                   headerRight: () => (
//                     <TouchableOpacity onPress={() => router.navigate('/help')}>
//                       <Ionicons name="help-circle-outline" size={34} color={Colors.dark} />
//                     </TouchableOpacity>
//                     ),
//                 }}
//               />
//             ))}
//             <Stack.Screen name="help" options={{ title:'Help', presentation:"modal" }} />
//             <Stack.Screen name="splash" options={{ headerShown: false }} />
//           </Stack>
     
//       </UserInactivity>
//     </QueryClientProvider>
//     </BottomSheetModalProvider>   
//     </GestureHandlerRootView>
//   );
// }


// export default function RootLayout() { 

//   const [appIsReady, setAppIsReady] = useState(false);
//   const [fontsLoaded, fontError] = useFonts({
//     'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
//     'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
//     'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
//     'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
//     'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
//   });

//   const router = useRouter();
//   const { isCheckingToken, SessionId } = useProtectedRoute();
//   const segments = useSegments();

//   useEffect(() => {

//     const prepareApp = async () => {
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 4000));

//         if (fontError) {
//           console.error('Failed to load fonts:', fontError);
//         }
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setAppIsReady(true);
//       }
//     };

//     prepareApp();
//   }, [fontsLoaded, fontError]);

//   useEffect(() => {
//     if (appIsReady) {
//       SplashScreen.hideAsync();
//     }
//   }, [appIsReady]);

//   const inAuthGroup = segments[0] === '(authenticated)';

//   useEffect(() => {
//     if (!isCheckingToken && appIsReady && !inAuthGroup) {
//       if (SessionId) {
//         router.replace('/userhome');
//       } else if (isCheckingToken) {
//         router.replace('/');
//       }
//     }
//   }, [isCheckingToken, SessionId, appIsReady]);

//   if (isCheckingToken || !appIsReady) {
//     return <Splash />;
//   }