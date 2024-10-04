import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import PlanCard from '../../../components/PlanCard/PlanCard'; 

export default function (){

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainview}>
          <View style={{ paddingBottom: 10 }}>
            <Text style={{ fontSize: 24, fontFamily: "Quicksand-Bold" }}>Plans</Text>
            <Text style={{ fontSize: 16, fontFamily: "Quicksand-Medium" }}>Manage your plan and billing history here</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <PlanCard title="Blink Card Neo" price="03" description="Limited access" buttonText="Get started" />
            <PlanCard title="Blink Card Plus" price="99" description="Perfect for daily usage" buttonText="Get started" />
            <PlanCard title="Blink Card Platinum" price="199" description="For Platinum Heroes" buttonText="Get started" />
            <PlanCard title="Blink Card Titanium" price="299" description="Only for Titanium Members" buttonText="Get started" />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainview: {
    backgroundColor: "white",
    padding: 20,
  },
});
