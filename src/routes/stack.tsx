import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Home2 from '../screens/Home2';
import Login from '../screens/Login';
import Details from '../screens/Details';
import Convite from '../screens/Convite';
import Cadastro from '../screens/Cadastro';
import DetailsG from '../screens/DetailsG';
import RecuperarSenha from '../screens/RecuperarSenha';
import ExemploEskeleton from '../screens/ExemploEskeleton';
import Grupo from '../screens/Grupo';
import CadastroGrupo from "../screens/CadastroGrupo";
import { RouteProp } from '@react-navigation/native';
import RecuperarSenha2 from '../screens/RecuperarSenha2';
import TabNavigator from '../components/TabNavigator/TabNavigator'
import Splash from '../screens/Splash';
import SorteioGrupo from '../screens/SorteioGrupo';
const Stack = createNativeStackNavigator();

type StackNavigation = {
    Splash : undefined;
    Home : undefined;
    Home2 : undefined;
    Grupo : undefined;
    Login : undefined;
    Cadastro: undefined;
    CadastroGrupo: undefined;
    Convite: undefined;
    RecuperarSenha: undefined;
    RecuperarSenha2: undefined;
    Details: { userId : number | undefined};
    ExemploEskeleton: undefined;
    DetailsG: { groupId : number | undefined};
    SorteioGrupo: undefined;
    //TabNavigator: undefined;
}

export type RootStackParamList = {
    Splash : undefined;
    Home: undefined;
    Home2: undefined;
    Grupo : undefined;
    Login: undefined;
    Details: { userId: number};
    ExemploEskeleton: undefined;
    Cadastro: undefined;
    CadastroGrupo: undefined;
    Convite: undefined;
    RecuperarSenha: undefined;
    RecuperarSenha2: undefined;
    DetailsG: { groupId: number};
    SorteioGrupo: undefined;
   // TabNavigator: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>

export type StackNavigationProp<ScreenName extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, ScreenName>;
export type StackRouteProp<ScreenName extends keyof RootStackParamList> = RouteProp<RootStackParamList, ScreenName>;

export default function StackComponent(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen  name="Splash" component={Splash}  options={{headerShown: false }}/>
                <Stack.Screen  name="Login" component={Login}  options={{headerShown: false }}/>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false }} />
                <Stack.Screen  name="Home2" component={Home2} options={{headerShown: false }} />
                <Stack.Screen  name="Grupo" component={TabNavigator} options={{headerShown: false }} />
                <Stack.Screen  name="DetailsG" component={DetailsG} />
                <Stack.Screen  name="Details" component={Details}   />
                <Stack.Screen name="Cadastro" component={Cadastro} />
                <Stack.Screen name="CadastroGrupo" component={CadastroGrupo} />
                <Stack.Screen  name="Convite" component={Convite}  />
                <Stack.Screen  name="RecuperarSenha" component={RecuperarSenha} />
                <Stack.Screen  name="RecuperarSenha2" component={RecuperarSenha2}/>
                <Stack.Screen  name="ExemploEskeleton" component={ExemploEskeleton}   />
                <Stack.Screen name="SorteioGrupo" component={SorteioGrupo}   />
                <Stack.Screen name="Principal" component={TabNavigator} options={{ headerShown: false }} />     
            </Stack.Navigator>
        </NavigationContainer>

    );
}