import React, {useEffect, useState} from 'react'
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native'
import  Ionicons  from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import ValidationForm from '../components/ValidationForm'
import DefaultImg from '../assets/default-img.jpg'
import {getTutorialsRequest, getUsersRequest, updateUserImgToPush, updateUserToPush} from "../actions";

const initialValues = {
    age: "10",
    email: 'no@email',
    firstName: 'Mary',
    lastName: 'Jane',
    login: 'Login',
    image: DefaultImg,
};



function AddUserModalScreen({ navigation }) {
    const [value, setValue] = useState("");
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updateUserImgToPush(undefined));
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.closeButtonContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            navigation.goBack();
                            dispatch(updateUserImgToPush(undefined));
                           // dispatch(updateUserToPush(undefined));
                        } }>
                        <Ionicons name='close' color='#101010' size={40} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalContainer}>
                    <ValidationForm navigation={navigation} initialValues={initialValues} screenKey='add' />
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
export default AddUserModalScreen
