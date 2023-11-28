import React, { useState } from 'react'
import { Alert, StyleSheet, View, TextInput, Button, Text } from 'react-native'
import { supabase } from '@/services/supabase-client'
import { Stack } from 'expo-router'
import * as Linking from 'expo-linking'

export default function Auth() {
    const [email, setEmail] = useState('mk@mk')
    const [password, setPassword] = useState('123456')
    const [loading, setLoading] = useState<boolean>(false)

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function signUpWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function resetPassword() {
        const resetPasswordURL = Linking.createURL('')
        console.log(resetPasswordURL)

        const { data, error } = await supabase
            .auth
            .resetPasswordForEmail(
                email,
                { redirectTo: resetPasswordURL }
            );
        console.log('resetPassword data:', data)
        console.log('resetPassword() error: ', error)
    }



    return (
        <View style={styles.container}>

            <Stack.Screen options={{headerShown: true, title: "Zion Capital"}}/>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="Email address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                placeholder="Password"
                autoCapitalize="none"
            />
            <View style={styles.buttonContainer}>
                <Button title="Sign In" disabled={loading} onPress={signInWithEmail} />
            </View>
            {/*<View style={styles.buttonContainer}>*/}
            {/*    <Button title="Sign Up" disabled={loading} onPress={signUpWithEmail} />*/}
            {/*</View>*/}
            <View style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText} onPress={resetPassword}>
                    Forgot password?
                </Text>
            </View>
        </View>
    );

}

// const styles = StyleSheet.create({
//     container: {
//         marginTop: 40,
//         padding: 12,
//     },
//     verticallySpaced: {
//         paddingTop: 4,
//         paddingBottom: 4,
//         alignSelf: 'stretch',
//     },
//     mt20: {
//         marginTop: 20,
//     },
// })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingTop: 40, // Adiciona espaço na parte superior
    },
    inputContainer: {
        marginBottom: 12,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginTop: 10
    },
    buttonContainer: {
        marginVertical: 8,
    },
    forgotPasswordContainer: {
        marginTop: 'auto',
        alignItems: 'center',
    },
    forgotPasswordText: {
        fontSize: 12,
        color: 'blue',
    },
});