import {  View , Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, { forwardRef, useMemo } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
export type Ref = BottomSheetModal; 

const CustomBottomSheetModal = forwardRef<Ref>((props, ref) =>{
    const snapPoints = useMemo (() =>['50%', '75%'], []);
 
return (
<BottomSheetModal ref ={ref} index={0} snapPoints={snapPoints}>
<View>
<Text>Hey, wait! Where are you going?</Text>
<TouchableOpacity
          style={[
            defaultStyles.pillButton,
            { marginBottom: 20, backgroundColor: Colors.primary },
          ]}
          >
          <Text style={defaultStyles.buttonText}>Keep account open</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: 'row',
              gap: 16,
              marginTop: 20,
              backgroundColor: "#F7F5F5",
            },
          ]}
          >
          <Text style={defaultStyles.buttonText}>Close account</Text>
        </TouchableOpacity>
</View>
</BottomSheetModal>
    );
  } );
 const styles = StyleSheet.create ({
     contentContainer: {
         flex:1,
         alignItems:'center'
     }
 })