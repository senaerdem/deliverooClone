import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useBasketStore from '@/store/basketStore'
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const Basket = () => {
    const { products, total, clearCart, reduceProduct } = useBasketStore();
    const [order, setOrder] = useState(false);

    const FEES = {
        service: 2.99,
        delivery: 5.99,
    }

    const startCheckout = () => {
        setOrder(true);
        clearCart();
    };

  return (
    <>
    { order && (
        <Text>Cool order</Text>
    )}
        { !order && (
            <>
            <FlatList 
            data={products} 
            ListHeaderComponent={<Text style={styles.section}>Items</Text>}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.grey }} />}
            renderItem={({ item }) => (
                <View style={styles.row}>
                    <Text style={{ color: Colors.primary}}>{item.quantity}x</Text>
                    <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
                    <Text style={{ fontSize: 18 }}>${item.price * item.quantity}</Text>
                </View>
            )}
            ListFooterComponent={
                <View>
                    <View style={{ height: 1, backgroundColor: Colors.grey}}></View>
                    <View style={styles.totalRow}>
                        <Text style={styles.total}>Subtotal</Text>
                        <Text style={{ fontSize: 18 }}>${total}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.total}>Delivery fee</Text>
                        <Text style={{ fontSize: 18 }}>${FEES.delivery}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.total}>Order Total</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>${(total + FEES.service + FEES.delivery).toFixed(2)}</Text>
                    </View>
                </View>
            }
            />
            <View style={styles.footer}>
            <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#fff' }} />
            <TouchableOpacity style={styles.fullButton} onPress={startCheckout}>
                <Text style={styles.footerText}>Order now</Text>
            </TouchableOpacity>
            </View>
            </>
        )}
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        gap: 20,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        gap: 20,
    },
    section: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 16,
        paddingHorizontal: 10,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
    },
    total: {
        fontSize: 18,
        color: Colors.mediumDark
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
    footerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    fullButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 50,
    },
});

export default Basket