import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router';

const SearchBar = () => (
    <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
            <View style={styles.searchField}>
                <Ionicons style={styles.searchIcon} name="ios-search" size={20} color={Colors.medium} />
                <TextInput style={styles.input} placeholder="Restaurants, groceries, dishes" />
            </View>
            <Link href={'/'} asChild>
                <TouchableOpacity style={styles.optionButton}>
                    <Ionicons name="options-outline" size={20} color={Colors.primary} />

                </TouchableOpacity>
            </Link>
        </View>
    </View>
)

const CustomHeader = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity>
            <Image style={styles.bike} source={require('@/assets/images/bike.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.titleContainer}>
            <Text style={styles.titleContainer}>Delivery Now</Text>
            <View style={styles.locationName}>
                <Text style={styles.subtitle}>San Fransisco, CA</Text>
                <Ionicons name='chevron-down-outline' size={20} color={Colors.primary} />
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
            <Ionicons name='person-outline' size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    bike: {
        width: 30,
        height: 30,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        color: Colors.medium,
    },
    locationName: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileButton: {
        backgroundColor: Colors.lightGrey,
        padding: 10,
        borderRadius: 50,
    },
    searchContainer: {
        height: 60,
        backgroundColor: '#fff'
    },
    searchSection: {
        flexDirection: 'row',
        gap: 10,
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    searchField: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionButton: {
        padding: 10,
        borderRadius: 50,
    },
    searchIcon: {
        paddingLeft: 10,
    },
    input: {
        padding: 10,
        color: Colors.mediumDark
    },

})

export default CustomHeader