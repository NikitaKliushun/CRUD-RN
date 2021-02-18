import React, {useEffect} from "react";
import {Text, View, Image, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from "react-native";
import  Ionicons  from 'react-native-vector-icons/FontAwesome'
import { useForm, Controller } from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {
    findUserByLogin,
    initUserState,
    initDataState,
    updateUserToPush,
    getTutorialsRequest,
    getUsersRequest,
    updateUserImgToPush,
    addUserRequest,
    updateUserRequest
} from "../actions";
import  ImgUpload  from './ImgUpload';
//import ImgToBase64 from 'react-native-image-base64';
//import ImageModifier from 'react-native-image-modifier'
//import DefaultImg from "../assets/default-img.jpg";

const DefaultImg = 'data:image/png;base64,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'

/*const addUser = data => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);

    let dataToSend = {
        age: data.age,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        login: data.login,
        image: user.userImgToPush
    }
    dispatch(addUserRequest(dataToSend));
    dispatch(updateUserImgToPush(undefined));
    dispatch(updateUserToPush(undefined));
}*/

async function sendData (screenKey, dataToSend, initialValues, navigation) {
    const dispatch = useDispatch();
    switch(screenKey) {

        case 'add':
        {
            await dispatch(addUserRequest(dataToSend));
            break;
        }
        case 'edit':
        {
            await dispatch(updateUserRequest(initialValues.id,dataToSend));
            break;
        }
        default:
        {
            console.log('Error, screenKey is undefined!');
            break;
        }
    }
    navigation.navigate('UsersList');
    return null;
}

function ValidationForm({ navigation, initialValues, screenKey }) {
    const { control, handleSubmit, errors } = useForm({mode: 'onBlur', reValidateMode: 'onBlur'});
    const dispatch = useDispatch()
    const user = useSelector(state => state.users)

    const sendData = async dataToSend => {
        switch(screenKey) {

            case 'add':
            {
                await dispatch(addUserRequest(dataToSend));
                break;
            }
            case 'edit':
            {
                await dispatch(updateUserRequest(initialValues.id,dataToSend));
                break;
            }
            default:
            {
                console.log('Error, screenKey is undefined!');
                break;
            }
        }
        navigation.navigate('UsersList');
        return null;
    }

    const onSubmit = data => {
        console.log('data',data);
        let imageToSend;
        if (user.userImgToPush) {
            imageToSend = user.userImgToPush;
        }
        else {
           /* const param = {
                path: "file://D://Development//Project//src//assets//default-img.jpg",
                base64: true,
            }

            ImageModifier.modify(param)
                .then (base64String => {imageToSend = base64String})
                .catch (err => console.log(err));

          /*  ImgToBase64.getBase64String('file://D://Development//Project//src//assets//default-img.jpg')
                .then(base64String => {imageToSend = base64String})
                .catch(err => console.log(err));*/
            imageToSend = DefaultImg;
        }
        let dataToSend = {
            age: data.age,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            login: data.login,
            imageData: imageToSend
        }
    //    console.log('data',dataToSend);
     //   dispatch(updateUserToPush(dataToSend));
        dispatch(initDataState);
        dispatch(updateUserImgToPush(undefined));
        sendData(dataToSend);
        /*switch(screenKey) {

            case 'add':
            {
                dispatch(addUserRequest(dataToSend));
                if (!user.userCreateLoading) {
                    navigation.navigate('UsersList');
                }
                break;
            }
            case 'edit':
            {
                dispatch(updateUserRequest(initialValues.id,dataToSend));
                if (!user.userUpdateLoading) {
                    navigation.navigate('UsersList');
                }
                break;
            }
            default:
            {
                console.log('Error, screenKey is undefined!');
                break;
            }
        }*/
     //   dispatch(initDataState);
     //   dispatch(updateUserImgToPush(undefined));
     //   dispatch(updateUserToPush(undefined));
     /*   console.log('addLoading before if ', user.userCreateLoading);
        console.log('editLoading before if',user.userUpdateLoading);
        if (!user.userUpdateLoading && !user.userCreateLoading) { console.log('YES'); console.log('addLoading at if ', user.userCreateLoading);
            console.log('editLoading at if',user.userUpdateLoading); navigation.navigate('UsersList'); }
        else console.log("NOT");*/


/*        Here's would be pushing data to API

        switch(screenKey) {
            case 'add':
            {

            }
            case 'edit':
            {

            }
        } */


    }


    return (
        <View>
            <Text>First Name: </Text>
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <TextInput
                        styles={styles.field}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="firstName"
                rules={{ required: true, maxLength: 20, minLength: 3, pattern: /^[A-Za-z]+$/i  }}
                defaultValue={initialValues.firstName}
            />
            {errors.firstName?.type === "required" && <Text style={styles.fieldError}>First Name field is required</Text>}
            {errors.firstName?.type === "maxLength" && <Text style={styles.fieldError}>First Name exceed Max Length</Text>}
            {errors.firstName?.type === "minLength" && <Text style={styles.fieldError}>First Name exceed Min Length</Text>}
            {errors.firstName?.type === "pattern" && <Text style={styles.fieldError}>First Name must have only A-z chars</Text>}

            <Text>Last Name: </Text>
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <TextInput
                        styles={styles.field}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="lastName"
                rules={{ required: true, maxLength: 20, minLength: 2, pattern: /^[A-Za-z]+$/i  }}
                defaultValue={initialValues.lastName}
            />
            {errors.lastName?.type === "required" && <Text style={styles.fieldError}>Last Name field is required</Text>}
            {errors.lastName?.type === "maxLength" && <Text style={styles.fieldError}>Last Name exceed Max Length</Text>}
            {errors.lastName?.type === "minLength" && <Text style={styles.fieldError}>Last Name exceed Min Length</Text>}
            {errors.lastName?.type === "pattern" && <Text style={styles.fieldError}>Last Name must have only A-z chars</Text>}

            <Text>Age: </Text>
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <TextInput keyboardType="numeric"
                        styles={styles.field}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="age"
                type="number"
                rules={{ required: true, valueAsNumber: true, min: 18, max: 99  }}
                defaultValue={initialValues.age.toString()}
            />
            {errors.age?.type === "required" && <Text style={styles.fieldError}>Age field is required</Text>}
            {errors.age?.type === "valuesAsNumber" && <Text style={styles.fieldError}>Age field must have only numbers</Text>}
            {errors.age?.type === "min" && <Text style={styles.fieldError}>Age must be at least 18 y.o.</Text>}
            {errors.age?.type === "max" && <Text style={styles.fieldError}>Age must be between 18 and 99 y.o.</Text>}

            <Text>E-mail: </Text>
            <Controller
                control={control}
                render={({ onChange, onBlur, setValue, value }) => (
                    <TextInput
                        styles={styles.field}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="email"
                rules={{ required: true, maxLength: 20, minLength: 2, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }}
                defaultValue={initialValues.email}
            />
            {errors.email?.type === "required" && <Text style={styles.fieldError}>E-mail field is required</Text>}
            {errors.email?.type === "maxLength" && <Text style={styles.fieldError}>E-mail exceed Max Length</Text>}
            {errors.email?.type === "minLength" && <Text style={styles.fieldError}>E-mail exceed Min Length</Text>}
            {errors.email?.type === "pattern" && <Text style={styles.fieldError}>Incorrect e-mail</Text>}

            <Text>Login: </Text>
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <TextInput
                        styles={styles.field}
                        onBlur={ () => { onBlur()} }




                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="login"
                rules={{
                        required: true,
                        maxLength: 20,
                        minLength: 2,
                        validate: async (value) => {
                                                        console.log(value);

                                                        switch(screenKey) {
                                                            case 'add':
                                                            {
                                                                console.log('screenKey - add');
                                                                await dispatch(findUserByLogin(value));
                                                                console.log ('USER.DATA!!!!!!', user.errorUser);

                                                                if (user.errorUser) return true
                                                                else return false;

                                                                dispatch(initUserState);
                                                            }
                                                            case 'edit':
                                                            {
                                                                console.log('screenKey - edit');
                                                                if (value === initialValues.login) return true
                                                                else {
                                                                    await dispatch(findUserByLogin(value));
                                                                    console.log ('USER.DATA!!!!!!', user.errorUser);

                                                                    if (user.errorUser) return true
                                                                    else return false;

                                                                    dispatch(initUserState);
                                                                }
                                                            }
                                                            default:
                                                            {
                                                                console.log('Error, screenKey is undefined!');
                                                                return true;
                                                            }
                                                        }
                                                    }

                      }}
                defaultValue={initialValues.login}
            />

            {errors.login?.type === "required" && <Text style={styles.fieldError}>Your input is required</Text>}
            {errors.login?.type === "maxLength" && <Text style={styles.fieldError}>Your input exceed maxLength</Text>}
            {errors.login?.type === "minLength" && <Text style={styles.fieldError}>Your input exceed minLength</Text>}
            {user?.loadingUser ? <ActivityIndicator color="white"/> : user?.user ? errors.login?.type === "validate" && <Text style={styles.fieldError}>This login is already exist</Text> : null}

            <ImgUpload initImg={initialValues.image}/>

            <TouchableOpacity

                style={{
                    marginTop: 10,
                    backgroundColor: 'blue',
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5
                }}
                onPress={handleSubmit(onSubmit)}
            >
                <Ionicons name='check' size={40} color='#fff' />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    introText: {
        fontSize: 22,
        fontWeight: '400',
    },
    fieldError: {
        fontSize: 14,
        fontWeight: '400',
        width: 250,
        color: 'red'
    },
    field: {
        height: 50,
        width: 200,
        padding: 5,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    avatar: {
        width: 140,
    }
})

export default ValidationForm
