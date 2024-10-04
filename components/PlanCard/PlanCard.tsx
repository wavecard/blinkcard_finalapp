import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

interface PlanCardProps {
  title: string;
  price: string | number;
  description: string;
  buttonText: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, price, description, buttonText }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.price}>₹{price}</Text>
        <Text style={styles.perMonth}>per month</Text>
      </View>
    </View>
    <Text style={styles.description}>{description}</Text>
    <TouchableOpacity
      style={[defaultStyles.pillButton, styles.button]}>
      <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
    <Text style={styles.terms}>Terms apply.</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primaryMuted,
    padding: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Quicksand-SemiBold',
  },
  price: {
    fontSize: 24,
    fontFamily: 'Quicksand-Bold',
  },
  perMonth: {
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Quicksand-Medium',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
    backgroundColor: Colors.primary,
  },
  terms: {
    fontFamily: 'Quicksand-SemiBold',
    textAlign: 'center',
    paddingTop: 10,
  },
});

export default PlanCard;
