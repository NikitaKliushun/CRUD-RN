import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    StatusBar,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Image
} from 'react-native'
import  Ionicons  from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header'
import {useDispatch, useSelector} from 'react-redux'
import {getUsersRequest, getMoreUsersRequest} from "../actions";

function ListView({ navigation }) {

    const dispatch = useDispatch()

    const usersItems = useSelector(state => state.users)
    const tutorialsItems = useSelector(state => state.tutorials)
    const [usersPage, setUsersPage] = useState(0);

    useEffect(() => {
        dispatch(getUsersRequest(0));

        const unsubscribe = navigation.addListener('focus', () => {
            setUsersPage(0);
            dispatch(getUsersRequest(0));
        });

        return () => {
            unsubscribe;
        };

    }, [navigation]);

    console.log(usersItems, 'usersItems');
    console.log(tutorialsItems, 'tutorialsItems');

    return (
        <View
            style={{
                backgroundColor: 'white',
                flex: 1,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 20
            }}>
            {usersItems?.loading ? <ActivityIndicator color="white"/> : null}
            <FlatList
              data={usersItems.data}
              renderItem={({item}) => (
                  <View style={styles.listItemContainer}>
                      {item?.imageData ? (
                          item?.imageData === '/static/media/default-img.48897ad4.jpg' ? (
                              <Image
                                  source={require('../assets/default-img.jpg')}
                                  style={styles.itemImage}
                              />
                          ) : (
                              <Image
                                  source={{
                                      uri: item.imageData,
                                  }}
                                  style={styles.itemImage}
                              />
                          )
                      ) : (
                          <Image
                              source={require('../assets/default-img.jpg')}
                              style={styles.itemImage}
                          />
                      )}
                      <Text style={styles.itemTitle} numberOfLines={1}>
                          {item.login}

                      </Text>
                      <View style={styles.userContainer}>
                          <TouchableOpacity
                              onPress={() => navigation.navigate('EditUserModal', item)}
                              style={styles.userButton}>
                              <Ionicons name='edit' color='#fff' size={20} />
                          </TouchableOpacity>
                          <TouchableOpacity
                              onPress={() => navigation.navigate('DeleteUserModal', item.id)}
                              style={styles.userButton}>
                              <Ionicons name='close' color='#fff' size={20} />
                          </TouchableOpacity>
                      </View>
                  </View>
              )}
              onEndReachedThreshold={0.005}
              onEndReached={async () => {

                  console.log('usersItems.totalUsers---',usersItems.totalUsersPages);

                  if (!usersItems.moreUsersLoading && (usersItems.totalUsersPages >= usersPage))
                  {
                      setUsersPage(usersPage + 1);
                      dispatch(getMoreUsersRequest(usersPage + 1));
                  }
              }}
            />
        </View>
    )
}

function UsersListScreen({ navigation }) {
    const usersItems = useSelector(state => state.users)

    return (
        <>
            <StatusBar barStyle='light-content' />
            <View style={styles.container}>
                <Header title={'Users List'} totalItems={usersItems.totalUsers} />
                <ListView navigation={ navigation } />
                <View style={styles.fabContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddUserModal')}
                        style={styles.fabButton}>
                        <Ionicons name='plus' color='#fff' size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue'
    },
    fabContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
        bottom: 20
    },
    fabButton: {
        backgroundColor: 'grey',
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },

    userContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    userButton: {
        backgroundColor: 'blue',
        borderRadius: 2,
        width: 40,
        height: 40,
        alignItems: 'center',
        margin: 3,
        justifyContent: 'center'
    },
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 5,
        paddingRight: 5,
        justifyContent: 'space-between',
        width: '100%',
        borderBottomWidth: 0.25
    },
    itemTitle: {
        fontSize: 22,
        fontWeight: '400',
        margin: 2,
    },
    itemImage: {
        width: 25,
        height: 25,
        margin: 1,
        flexDirection: 'row',
    }
})
export default UsersListScreen
