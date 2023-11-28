import {Stack} from "expo-router";
import {Alert, Button, View} from "react-native";
import {supabase} from "@/services/supabase-client";
import { router } from 'expo-router';


export default function SettingsIndex(){
    async function logOutApp() {
        console.log('logOutApp')
        const {error} = await supabase.auth.signOut();

        if(error)Alert.alert(error.message)
    };
    return(
        <>
            <Stack.Screen options={{headerShown: true, title: 'Settings'}}/>
            <View>
                <Button title={'Logout'} onPress={()=> logOutApp()} />
            </View>
        </>
    )
}