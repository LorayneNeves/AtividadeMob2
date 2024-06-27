
import StackComponent from '../../routes/stack';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabBar from '../../components/BottomTabBar/BottomTabBar';
import Grupo from '../../screens/Grupo/index';
import Cadastro from '../../screens/CadastroGrupo/index';
import Login from '../../screens/Login';
import Convite from '../../screens/Convite';
import Icon from 'react-native-vector-icons/Ionicons';
import { Badge } from 'react-native-elements';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { MaterialIcons } from '@expo/vector-icons';
import LogoutScreen from '../../screens/LogoutScreen'; 
const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <BottomTabBar {...props} />}
            
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Grupos') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    } 
                    else if (route.name === 'Logoff'){
                        iconName = focused ? 'ios-exit' : 'ios-exit-outline';
                    }
                  
                    return (
                        <View>
                            
                            <Icon name={iconName} size={size} color={color} />
                            
                            {route.name === 'Grupos' && (
                                <Badge
                                    status="error"
                                    value="3" // O número de notificações
                                    containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                                />
                            )}
                            
                        </View>
                    );
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            
            <Tab.Screen name="Grupos" component={Grupo} />
            <Tab.Screen name="Notificações" component={Convite} />
            <Tab.Screen name="Logoff" component={LogoutScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
