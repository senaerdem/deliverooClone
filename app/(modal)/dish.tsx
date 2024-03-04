import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getDishById } from '@/assets/data/restaurant';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const Dish = () => {
  const { id } = useLocalSearchParams();
  //console.log('~ file: dish.tsx:7 ~Dish ~id:', id);
  const item = getDishById(+id);
  const router = useRouter();

  const addToCart = () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      router.back();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['bottom']}>
      <View style={styles.container}>
        <Animated.Image entering={FadeIn.duration(400).delay(200)} source={item?.img} style={styles.image} />
        <View style={{ padding: 20 }}>
          <Animated.Text entering={FadeInLeft.duration(400).delay(200)} style={styles.dishName}>
            {item?.name}
          </Animated.Text>
          <Animated.Text entering={FadeInLeft.duration(400).delay(400)} style={styles.dishInfo}>
            {item?.info}
          </Animated.Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.fullButton} onPress={addToCart}>
            <Text style={styles.footerText}>Add for ${item?.price}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
    },
    dishName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    dishInfo: { 
        fontSize: 16, 
        color: Colors.medium 
    },
    footer: {
        position: 'absolute',
        backgroundColor: '#fff',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingTop: 30,
    },
    fullButton: {
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    footerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,

    },
});

export default Dish