import { Stack } from "expo-router";

export default function AuthLayout() {
    return <Stack
        screenOptions={{
            headerStyle: {
                backgroundColor: '#88b7c7',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}

    ></Stack>
}