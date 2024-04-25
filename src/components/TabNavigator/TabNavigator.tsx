
import StackComponent from '../../routes/stack';
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabBar from '../../components/BottomTabBar/BottomTabBar';
import Grupo from '../../screens/Grupo/index';
import Cadastro from '../../screens/CadastroGrupo/index';
import Login from '../../screens/Login';
import Convite from '../../screens/Convite';

const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
            
            <Tab.Screen name="Grupos" component={Grupo}  />
            <Tab.Screen name="Novo Grupo" component={Cadastro} />
           
           
        </Tab.Navigator>
    );
};


export default TabNavigator;
