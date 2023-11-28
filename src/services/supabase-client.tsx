import 'react-native-url-polyfill/auto'
import * as SecureStore from 'expo-secure-store'
import { createClient } from '@supabase/supabase-js'
import { Platform } from 'react-native'

const isIOS = Platform.OS === 'ios'

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key)
    },
    setItem: (key: string, value: string) => {
        SecureStore.setItemAsync(key, value)
    },
    removeItem: (key: string) => {
        SecureStore.deleteItemAsync(key)
    },
    clearStore: () => {
        SecureStore
    }
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey =
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

const authObj = isIOS
    ? {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
    : {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
        auth: authObj
    }
)