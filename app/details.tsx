import { View, Text, StyleSheet, Image, TouchableOpacity, SectionList, ListRenderItem } from 'react-native'
import React, { useLayoutEffect } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import Colors from '@/constants/Colors'
import { restaurant } from '@/assets/data/restaurant'
import { Link, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const Details = () => {
    const navigation = useNavigation();

    const DATA = restaurant.food.map((item, index) => ({
        title: item.category,
        data: item.meals,
        index,
    }))

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: Colors.primary,
            headerLeft: () => ( 
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundButton}>
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
            </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={styles.bar}>
                    <TouchableOpacity style={styles.roundButton}>
                        <Ionicons name="share-outline" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundButton}>
                        <Ionicons name="search-outline" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, []);

    const renderItem: ListRenderItem<any> = ({ item, index}) => (
        <Link href={'/'} asChild>
        <TouchableOpacity style={styles.item}>
            <View style={{ flex: 1 }}>
                <Text style={styles.dish}>{item.name}</Text>
                <Text style={styles.dishText}>{item.info}</Text>
                <Text style={styles.dishText}>${item.price}</Text>
            </View>
            <Image source={item.img} style={styles.dishImage}/>
        </TouchableOpacity>
        </Link>
    )

  return (
    <>
    <ParallaxScrollView
    backgroundColor={'#fff'} 
    style={{ flex: 1 }} 
    parallaxHeaderHeight={250} 
    stickyHeaderHeight={100}
    renderBackground={() => <Image source={restaurant.img} style={{ height:300, width: '100%'}} />}
    contentBacgroundColor={Colors.lightGrey}
    renderStickyHeader={() => (
        <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>{restaurant.name}</Text>
        </View>
    )}>
    <View style={styles.detailsContainer}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <Text style={styles.restaurantDescription}>
            {restaurant.delivery} {restaurant.tags.map((tag, index) =>`${tag}${index < restaurant.tags.length - 1 ? ' · ' : ''}`)}
        </Text>
        <Text style={styles.restaurantDescription}>{restaurant.about}</Text>
        <SectionList 
        contentContainerStyle={{ paddingBottom: 50}}
        keyExtractor={(item, index) => `${item.id + index}`}
        scrollEnabled={false} 
        sections={DATA} 
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ marginHorizontal: 20, paddingHorizontal: 10, height: 1, backgroundColor: Colors.grey }} />}
        SectionSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.grey }} />}
        renderSectionHeader={({section: {title, index,}}) =>
        <Text style={styles.sectionHeader}>{title}</Text>}/>
    </View>
    </ParallaxScrollView>
    </>
  );
};

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: Colors.lightGrey,
    },
    stickySection: {
        backgroundColor: '#fff',
        marginLeft: 70,
        height: 100,
        justifyContent: 'flex-end',
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    stickySectionText: {
        fontSize: 20,
        margin: 10,
    },
    restaurantName: {
        fontSize: 30,
        margin: 16,
    },
    restaurantDescription: {
        fontSize: 16,
        margin: 16,
        lineHeight: 22,
        color: Colors.mediumDark
    },
    sectionHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 40,
        margin: 16
    },
    item: {
        backgroundColor: '#fff',
        padding: 16,
        flexDirection: 'row',
    },
    dishImage: {
        height: 80,
        width: 80,
        borderRadius: 4,
    },
    dish: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dishText: {
        fontSize: 14,
        color: Colors.medium,
        paddingVertical: 5,
    },
});

export default Details;