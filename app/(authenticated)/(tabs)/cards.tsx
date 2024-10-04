import React from "react";
import { View, Text, Pressable, StyleProp, ViewStyle, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card,Snackbar } from "react-native-paper";
import Colors from "@/constants/Colors";
import { fontConfig } from "react-native-paper/lib/typescript/styles/fonts";

export default function VirtualCardsHeader() {
    const [snackbarVisible, setSnackbarVisible] = React.useState(false);

    const createcard = () => {
        setSnackbarVisible(true);
      };
    return (
        <>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingTop: "15%",
                        justifyContent: "space-around",
                        padding: "5%",
                        backgroundColor: "white",
                    }}
                >
                    <Text style={{ fontSize: 22, flex: 1 , fontFamily:"Quicksand-Bold"}}>
                        Virtual Cards
                    </Text>
                    <Pressable
                        style={({ pressed }) =>
                            [
                                styles.button,
                                { opacity: pressed ? 0.5 : 1 },
                            ] as StyleProp<ViewStyle>
                        }
                        onPress={(createcard)}
                    >
                        <Ionicons name="add-outline" size={24} color="black" />
                        <Text style={styles.text}>New Card</Text>
                    </Pressable>
                </View>

                <View style={{ padding: "5%", backgroundColor: "white" }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: "row" }}>
                            <Card.Cover style={styles.cardCover} />
                            <Card.Cover style={styles.cardCover} />
                        </View>
                    </ScrollView>
                </View>

                <View style={{ padding: "5%", backgroundColor: "white" }}>
                    <Text style={{ fontSize: 16,fontFamily:"Quicksand-Bold" }}>
                        Recent Transactions
                    </Text>
                </View>
                <View style={{ padding: "5%"}}>
                <Text style={{ fontSize: 16, fontFamily:"Quicksand-Bold" , textAlign:"center", color:Colors.gray}}>
                        No Transactions
                    </Text>

                </View>
            </View>
            <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        style={styles.snackbar}
        
      >
        <Text style={{color:Colors.primary, textAlign:"center"}}>
              Available soon... 
        </Text>
     
      </Snackbar>
        </>
    );
}

const styles = {
    snackbar: {
        backgroundColor: "white", 
        borderRadius: 10,  
      },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 30,
        borderColor: "#8338EC",
        borderWidth: 1,
    },
    text: {
        fontSize: 16,
        marginRight: 5,
        color: "black",
        marginLeft: 5,
        fontFamily:"Quicksand-Bold",
    },
    cardCover: {
        backgroundColor: Colors.primary,
        marginRight: 10,
        width: 320,
        height: 200,
        borderRadius: 10,
    },
};
