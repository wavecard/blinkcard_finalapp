import React from "react";
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity,Platform } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from "@/constants/Colors";

export default function Tab() {
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#8338EC", paddingTop: Platform.OS === 'android' ? 35 : 0 }}>
            <View style={{ backgroundColor: "white", flex: 1, padding: 15 }}>
                <Text style={{ fontSize: 20, textAlign: "center", fontFamily:"Quicksand-Bold" }}>
                    Offers Zone <MaterialCommunityIcons name="assistant" size={24} />
                </Text>
                <View style={{ padding: 15 }}>
                    <Text style={{ fontSize: 10, fontFamily:"Quicksand-Bold", paddingBottom: 10 }}>Our Partners</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
                        alignItems: "center", gap: 20, paddingHorizontal: 16
                    }}>
                        <TouchableOpacity>
                            <Image source={require("../../../assets/images/unnamed-1.png")} style={{ height: 50, width: 50, borderRadius: 30 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require("../../../assets/images/unnamed-2.png")} style={{ height: 50, width: 50, borderRadius: 30 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require("../../../assets/images/Flipkart_(1).png")} style={{ height: 50, width: 50, borderRadius: 30 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require("../../../assets/images/my.png")} style={{ height: 50, width: 50, borderRadius: 30 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require("../../../assets/images/amazon-logo.jpg")} style={{ height: 50, width: 50, borderRadius: 30 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require("../../../assets/images/jio.png")} style={{ height: 50, width: 50, borderRadius: 30 }} />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={{ backgroundColor:"white"}} >
                        <Text style={{ fontSize: 80, fontFamily:"Quicksand-Bold", color: Colors.platium }}>
                            Offers Zone coming to live soon..
                        </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

