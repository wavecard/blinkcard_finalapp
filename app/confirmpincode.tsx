import React, { Fragment, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import {  useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { verifyOtp } from './api/auth';
import { defaultStyles } from '@/constants/Styles';
import BiomatricBSM from '@/components/bottomsheetmodal/BiomatricBSM';
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";

const CELL_COUNT = 6;
const RESEND_DELAY = 180; 
const { width, height } = Dimensions.get('window');
const cellSize = Math.min(width, height) * 0.10;
const baseFontSize = Math.min(width, height) * 0.05;

const ConfirmPincode = () => {    
    const router = useRouter();

    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");

    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });

    const handlePresentModalPress = () => {
        bottomSheetRef.current?.present();
        setIsModalVisible(true); 
    };

    const verifyCode = async () => {
        try {
            const response = await verifyOtp(code);
            if (response.message.includes("OTP verified successfully")) {
                setTimeout(() => {
                    router.replace('/notification');
                }, 1000);
            } else {
                setMessage("Failed to verify OTP");
            }
        } catch (error) {
            setMessage("Error verifying OTP");
        }
    };

    useEffect(() => {
        if (code.length === 6) {
            verifyCode();
        }
    }, [code]);



    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: isModalVisible ? 'rgba(0, 0, 0, 0.5)' : 'white' }} // Change background color when modal is visible
            behavior="padding"
            keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
                    <View style={{ padding: 10, paddingVertical: 50, gap: 10 }}>
                        <Text style={{ fontSize: 28, fontFamily: "Quicksand-Bold" }}>Confirm your Pin Code</Text>
                        <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 18 }}>Type your Pin Code again to confirm</Text>
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
                                        style={[styles.cellRoot, isFocused && styles.focusCell,  {backgroundColor: isModalVisible ? 'rgba(0, 0, 0, 0.1)' : Colors.lightGray}]}
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
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity
                            onPress={handlePresentModalPress}
                            style={[
                                defaultStyles.pillButton,
                                {
                                    flexDirection: 'row',
                                    gap: 16,
                                    marginTop: 20,
                                    backgroundColor: Colors.primary,
                                },
                            ]}
                        >
                            <Text style={[defaultStyles.buttonText, { color: '#ffff' }]}>Continue</Text>
                        </TouchableOpacity>
                        <BiomatricBSM ref={bottomSheetRef} />
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

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
    }
});

export default ConfirmPincode;
