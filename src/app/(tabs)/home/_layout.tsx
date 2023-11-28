import {Stack} from "expo-router";
import {QueryClient, QueryClientProvider} from "react-query";
import React from "react";

export default function HomeLayout() {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <Stack></Stack>
        </QueryClientProvider>
    )
}