import axios from 'axios';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

type UseProtectedRouteReturn = {
  isCheckingToken: boolean;
  SessionId:boolean;
  phoneNumber: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  emailVerificationStatus: string | null;
  mobileVerificationStatus: string | null;
  kycVerificationStatus: string | null;
  deleteToken: () => Promise<void>;
};

const useProtectedRoute = (): UseProtectedRouteReturn => {
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [SessionId, setSessionId] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [firstname, setFirstName] = useState<string | null>(null);
  const [lastname, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [emailVerificationStatus, setEmailVerification] = useState<string | null>(null);
  const [mobileVerificationStatus, setMobileVerification] = useState<string | null>(null);
  const [kycVerificationStatus, setKycVerification] = useState<string | null>(null);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const router = useRouter();

  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      
      // Add padding if necessary
      const padding = base64.length % 4;
      if (padding === 2) {
        base64 += '==';
      } else if (padding === 3) {
        base64 += '=';
      }
  
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
  
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error parsing JWT:', e);
      return null;
    }
  };
  

  useEffect(() => {
    let isMounted = true;

    const checkToken = async () => {
      try {
        console.log('Checking token...');
        const token = await SecureStore.getItemAsync('jwt_token');
        console.log('Token:', token);

        if (token) {
          const decodedToken = parseJwt(token);
          console.log('Decoded Token:', decodedToken);

          if (decodedToken) {
            setPhoneNumber(decodedToken.phoneNumber);
            setSessionId(decodedToken.sessionId);

            const response = await axios.post('https://0z2a2zkfeg.execute-api.ap-south-1.amazonaws.com/dev/', 
              {
                phoneNumber: decodedToken.phoneNumber 
            });

            if (response.status === 200) {
              const data = response.data;
              console.log('User Data:', data);
              // Set the user data from the API response
              setFirstName(data.firstname);
              setLastName(data.lastname);
              setEmail(data.email);
              setEmailVerification(data.emailVerificationStatus);
              setMobileVerification(data.mobileVerificationStatus);
              setKycVerification(data.kycVerificationStatus);

            } else {
              console.error('Error fetching user data:', response.statusText);
              handleInvalidToken();
            }
          } else {
            handleInvalidToken();
          }
        } else {
          handleInvalidToken();
        }
      } catch (error) {
        console.error('Error checking token:', error);
        handleInvalidToken();
      } finally {
        if (isMounted) {
          setIsCheckingToken(false);

        }
      }
    };

    checkToken();
    setIsComponentMounted(true);

    return () => {
      isMounted = false;
    };
  }, []); 

  const handleInvalidToken = () => {
    setIsCheckingToken(false);
    setSessionId(false);
    setPhoneNumber(null);
    setFirstName(null);
    setLastName(null);
    setEmail(null);
    setEmailVerification(null);
    setMobileVerification(null);
    setKycVerification(null);
    SecureStore.deleteItemAsync('jwt_token');
    if (isComponentMounted) {
      setTimeout(() => {
        router.replace('/');
      }, 0);
    }
  };

  const deleteToken = async () => {
    try {
      await SecureStore.deleteItemAsync('jwt_token');
      if (isComponentMounted) {
        setTimeout(() => {
          router.replace('/');
        }, 0);
      }
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  };

  return {
    isCheckingToken,
    SessionId,
    phoneNumber,
    firstname,
    lastname,
    email,
    emailVerificationStatus,
    mobileVerificationStatus,
    kycVerificationStatus,
    deleteToken
  };
};

export default useProtectedRoute;
