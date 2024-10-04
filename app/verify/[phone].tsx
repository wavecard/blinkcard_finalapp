import React, { Fragment, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import Colors from "@/constants/Colors";
import axios from 'axios'; 
import { verifyOtp, sendOTP } from "../api/auth";
import { defaultStyles } from '@/constants/Styles';
import Loading from "@/components/loder/loading"; 

const CELL_COUNT = 6;
const RESEND_DELAY = 180; 
const API_URL = 'https://j70x7qx5pk.execute-api.ap-south-1.amazonaws.com/dev/generate-otp';
const { width, height } = Dimensions.get('window');
const cellSize = Math.min(width, height) * 0.10;
const baseFontSize = Math.min(width, height) * 0.05;
const smallFontSize = Math.min(width, height) * 0.050;
const mediumFontSize = Math.min(width, height) * 0.04;
const largeFontSize = Math.min(width, height) * 0.1;

const Page = () => {
  const { phone } = useLocalSearchParams();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(RESEND_DELAY);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      verifyCode();
    }
  }, [code]);

  useEffect(() => {
    if (timer === 0) {
      setIsResendDisabled(false);
      return;
    }
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const resendCode = async () => {
    const fullPhoneNumber = phone; // Retrieve phone number from useLocalSearchParams
    try {
      await axios.post(API_URL, { phoneNumber: fullPhoneNumber });
      setTimer(RESEND_DELAY);
      setIsResendDisabled(true);
      setMessage("OTP Resent successfully.");
    } catch (error) {
      setMessage("Failed to resend OTP. Please try again.");
    }
  };

  const verifyCode = async () => {
    setIsLoading(true);
    const minLoadingTime = new Date().getTime() + 2000; 
    try {
      const response = await verifyOtp(phone, code);
      const remainingTime = minLoadingTime - new Date().getTime();
      if (response.message.includes("OTP verified successfully")) {
        setTimeout(() => {
          router.replace('/wishlist');
          setIsLoading(false);
        }, remainingTime > 0 ? remainingTime : 0);
      } else {
        setMessage("Failed to verify OTP");
        setIsLoading(false); 
      }
    } catch (error) {
      setMessage("Error verifying OTP");
      setIsLoading(false); 
    }
  };

  if (isLoading) {
    return <Loading />; 
    // Show loader while verifying
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <Text style={{ fontSize: largeFontSize, fontWeight: "700" }}>6-digit code</Text>
      <Text style={{ fontSize: smallFontSize, marginTop: 20, color: "black" }}>
        We've sent an SMS with an OTP to your phone <Text style={{ color: Colors.primary, fontWeight: "bold" }}>{phone}</Text>
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}
      />
      <TouchableOpacity
        onPress={resendCode}
        disabled={isResendDisabled}
        style={[
          defaultStyles.pillButton,
          isResendDisabled && styles.disabledButton,
          {
            flexDirection: 'row',
            gap: 16,
            marginTop: 20,
            backgroundColor: "#F7F5F5",
          },
        ]}>
        <Text style={{ color: isResendDisabled ? Colors.gray : Colors.primary, fontSize: mediumFontSize, fontWeight: "500", paddingLeft: 10, paddingRight: 10 }}>
          {isResendDisabled ? `Resend code in ${timer}s` : "Resend code"}
        </Text>
      </TouchableOpacity>
      {message ? <Text style={{ color: 'red', marginTop: 20 }}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 40,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 12,
  },
  cellRoot: {
    width: cellSize,
    height: cellSize,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: cellSize / 5, 
  },
  cellText: {
    color: "#000",
    fontSize: baseFontSize,
    textAlign: "center",
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: "center",
  },
  resendButton: {
    marginTop: 20,
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "gray",
    borderRadius: 8,
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default Page;
