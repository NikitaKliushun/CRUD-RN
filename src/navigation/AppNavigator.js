import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import UsersListScreen from '../screens/UsersListScreen'
import AddUserModalScreen from '../screens/AddUserModalScreen'
import EditUserModalScreen from '../screens/EditUserModalScreen'

const Stack = createStackNavigator()
function MainStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                mode='modal'
                headerMode='none'
                screenOptions={{
                    cardStyle: { backgroundColor: 'transparent' },
                    cardOverlayEnabled: true,
                    cardStyleInterpolator: ({ current: { progress } }) => ({
                        cardStyle: {
                            opacity: progress.interpolate({
                                inputRange: [0, 0.5, 0.9, 1],
                                outputRange: [0, 0.25, 0.7, 1]
                            })
                        },
                        overlayStyle: {
                            opacity: progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0.5],
                                extrapolate: 'clamp'
                            })
                        }
                    })
                }}
            >
                <Stack.Screen name='UsersList' component={UsersListScreen} />
                <Stack.Screen name='AddUserModal' component={AddUserModalScreen} />
                <Stack.Screen name='EditUserModal' component={EditUserModalScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default MainStackNavigator
