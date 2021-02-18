import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import  Ionicons  from 'react-native-vector-icons/FontAwesome'
import { useDispatch } from 'react-redux'
import {deleteUserRequest, initDataState} from "../actions";

function DeleteUserModalScreen({ route, navigation }) {
    const dispatch = useDispatch()

    const delUser = async () => {
        dispatch(initDataState);
        await dispatch(deleteUserRequest(route.params));
        navigation.navigate('UsersList');
        return null;
    }

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
                <Text style={{marginTop: 50}}>Are you sure you want to delete this user?</Text>
                <View style={styles.modalContainer}>

                    <TouchableOpacity

                        style={{
                            margin: 10,
                            backgroundColor: 'blue',
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name='close' size={40} color='#fff' />
                    </TouchableOpacity>

                    <TouchableOpacity

                        style={{
                            margin: 10,
                            backgroundColor: 'blue',
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5
                        }}
                        onPress={delUser}
                    >
                        <Ionicons name='check' size={40} color='#fff' />
                    </TouchableOpacity>


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
        justifyContent: 'center',
        flexDirection: 'row',
        height: '30%',
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
        flexDirection: 'row',
        margin: 60,
        top: 10,
    }
})
export default DeleteUserModalScreen
