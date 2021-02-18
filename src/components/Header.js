import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Header(props) {
    const { title, totalItems } = props

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.subTitle}>Total items: {totalItems}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        height: 125,
        paddingTop: 20
    },
    text: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '500'
    },
    subTitle: {
        paddingTop: 5,
        fontSize: 18,
        color: '#fff'
    }
})
export default Header
