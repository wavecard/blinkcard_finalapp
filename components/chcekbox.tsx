import { Pressable, StyleSheet, Text, View,Dimensions } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface CheckBoxProps {
    isChecked: boolean;
    onPress: () => void;
    title: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ isChecked, onPress, title }) => {
    const iconName = isChecked ? "checkbox-marked" : "checkbox-blank-outline";
    const { width, height } = Dimensions.get('window');
    const mediumFontSize = Math.min(width, height) * 0.04;
    return (
        <View style={styles.container}>
            <Text style={[styles.title,{fontSize:mediumFontSize}]}>{title}</Text>
            <Pressable onPress={onPress} style={{justifyContent:"center"}}>
                <MaterialCommunityIcons name={iconName} size={19} color={Colors.primary} />
            </Pressable>
        </View>
    );
};

export default CheckBox;

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-evenly",
        flexDirection: "row",
        marginTop: 5,
    },
    title: {
        color: "black",
        fontFamily: 'Quicksand-Medium',
    },
});
