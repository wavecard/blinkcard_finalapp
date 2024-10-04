// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';
// import { useEffect, useRef } from 'react';
// import { AppState, AppStateStatus } from 'react-native';
// import useProtectedRoute from '../app/AuthRoute/useProtectedRoutes';

// const LOCK_TIME = 3000;

// export const UserInactivity = ({ children }: any) => {
//     const appState = useRef(AppState.currentState);
//     const router = useRouter();
//     const {isCheckingToken, SessionId} = useProtectedRoute();

//     const handleAppStateChange = async (nextAppState: AppStateStatus) => {
//         console.log('appState', appState.current, nextAppState);

//         if (nextAppState === 'inactive') {
//             if (SessionId){
//                 router.replace('/(authenticated)/(modals)/white');
//             }
//         } else {
//             if (router.canGoBack()) {
//                 router.back();
//             }
//         }

//         if (nextAppState === 'background') {
//             await recordStartTime();
//         } else if (nextAppState === 'active' && appState.current.match(/background/)) {
//             const startTime = await AsyncStorage.getItem('startTime');
//             const elapsed = Date.now() - (parseInt(startTime || '0'));
//             console.log(`Elapsed time: ${elapsed} ms`);

//             if (elapsed > LOCK_TIME && SessionId && isCheckingToken) {
//                 router.replace('/(authenticated)/(modals)/lock')
//             }  
//         }

//         appState.current = nextAppState;
//     };

//     useEffect(() => {
//         const subscription = AppState.addEventListener('change', handleAppStateChange);
//         return () => {
//             subscription.remove();
//         };
//     }, [SessionId]);

//     const recordStartTime = async () => {
//         await AsyncStorage.setItem('startTime', String(Date.now()));
//     };

//     return children;
// };



// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';
// import { useEffect, useRef } from 'react';
// import { AppState, AppStateStatus } from 'react-native';
// import useProtectedRoute from '../app/AuthRoute/useProtectedRoutes';

// const LOCK_TIME = 3000;

// export const UserInactivity = ({ children }: any) => {
//     const appState = useRef(AppState.currentState);
//     const router = useRouter();
//     const {isCheckingToken, SessionId} = useProtectedRoute();

//     const handleAppStateChange = async (nextAppState: AppStateStatus) => {
//         console.log('appState', appState.current, nextAppState);

//         if (nextAppState === 'inactive') {
//             if (SessionId) {
//                 router.replace('/(authenticated)/(modals)/white');
//             }
//         } else {
//             if (router.canGoBack()) {
//                 router.back();
//             }
//         }

//         if (nextAppState === 'background') {
//             await recordStartTime();
//         } else if (nextAppState === 'active' && appState.current.match(/background/)) {
//             const startTime = await AsyncStorage.getItem('startTime');
//             const elapsed = Date.now() - (parseInt(startTime || '0'));
//             console.log(`Elapsed time: ${elapsed} ms`);

//             if (elapsed > LOCK_TIME && SessionId && isCheckingToken) {
//                 router.replace('/(authenticated)/(modals)/lock');
//             }
//         }

//         appState.current = nextAppState;
//     };

//     const checkInitialSession = async () => {
//         // Check session on app mount
//         if (SessionId) {
//             const startTime = await AsyncStorage.getItem('startTime');
//             const elapsed = Date.now() - (parseInt(startTime || '0'));
//             if (elapsed > LOCK_TIME && isCheckingToken) {
//                 router.replace('/(authenticated)/(modals)/lock');
//             }
//         }
//     };

//     useEffect(() => {
//         const subscription = AppState.addEventListener('change', handleAppStateChange);
//         checkInitialSession();  // Perform check when component mounts

//         return () => {
//             subscription.remove();
//         };
//     }, [SessionId]);

//     const recordStartTime = async () => {
//         await AsyncStorage.setItem('startTime', String(Date.now()));
//     };

//     return children;
// };

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import useProtectedRoute from '../app/AuthRoute/useProtectedRoutes';

const LOCK_TIME = 3000;

export const UserInactivity = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const { isCheckingToken, SessionId } = useProtectedRoute();

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState === 'background') {
      await recordStartTime(); // Save the start time
    } else if (nextAppState === 'active' && appState.current === 'background') {
      // Check elapsed time since the app went to background
      const startTime = await AsyncStorage.getItem('startTime');
      const elapsed = Date.now() - (parseInt(startTime || '0'));

      if (elapsed > LOCK_TIME && SessionId && isCheckingToken) {
        router.replace('/(authenticated)/(modals)/lock');
      }
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [SessionId]);

  const recordStartTime = async () => {
    await AsyncStorage.setItem('startTime', String(Date.now()));
  };

  return children;
};
