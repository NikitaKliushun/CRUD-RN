import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native'
import  Ionicons  from 'react-native-vector-icons/FontAwesome'
import ValidationForm from '../components/ValidationForm'

function EditUserModalScreen({ route, navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.closeButtonContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => navigation.goBack()}>
                        <Ionicons name='close' color='#101010' size={40} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalContainer}>
                    <ValidationForm navigation={navigation} initialValues={route.params} screenKey='edit' />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff'
    },
    closeButtonContainer: {
        position: 'absolute',
        alignItems: 'flex-end',
        right: 10
    },
    closeButton: {
        backgroundColor: '#d3d3d3',
        borderRadius: 20,
        width: 40,
        height: 40,
        top: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        margin: 60,
        top: 10,
        left: 30
    }
})
export default EditUserModalScreen
