import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {updateUserImgToPush} from "../actions";
import {useDispatch, useSelector} from "react-redux";

const ImgUpload = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const [imgSize,setImgSize] = useState(0);

    const chooseFileFromLib = () => {
        const options = {
            includeBase64: true,
            maxWidth: 600,
            mediaType: 'photo',
        };

        launchImageLibrary(options,(result) => {
            console.log('result: ', result);
            setImgSize(result.fileSize);
            if (result.fileSize < 10000) {
                dispatch(updateUserImgToPush(result.base64));
            }
        })
    };

    const fileFromCamera = () => {
        const options = {
            includeBase64: true,
            maxWidth: 600,
            mediaType: 'photo',
        };

        launchCamera(options, (result) => {
            console.log('result: ', result);
            setImgSize(result.fileSize);
            if (result.fileSize < 10240) {
                dispatch(updateUserImgToPush(result.base64));
            }
        });

    };


    return (
        <SafeAreaView style={{flex: 1}}>
            {imgSize > 10240 ? (<Text>Your image exceed max image size (10kB)</Text>) : (<Text>Max size of image is 10kB</Text>)}

            <View style={styles.container}>
                {user.userImgToPush ?
                <Image
                    source={{
                        uri: 'data:image/jpeg;base64,' + user.userImgToPush,
                    }}
                    style={styles.imageStyle}
                />
                :
                <Image
                    source={require('../assets/default-img.jpg')}
                    style={styles.imageStyle}
                />}

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.buttonStyle}
                    onPress={chooseFileFromLib}>
                    <Text style={styles.textStyle}>
                        Img from Storage
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.buttonStyle}
                    onPress={fileFromCamera}>
                    <Text style={styles.textStyle}>
                        Img from Cam
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ImgUpload;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
    },
    textStyle: {
        padding: 10,
        color: 'black',
    },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#DDDDDD',
        padding: 3,
        width: '100%',
    },
    imageStyle: {
        width: 50,
        height: 50,
        margin: 5,
        flexDirection: 'row',
    },
});
