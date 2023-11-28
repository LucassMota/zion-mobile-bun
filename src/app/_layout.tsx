import { Slot } from 'expo-router';
import {GluestackUIProvider} from "@gluestack-ui/themed";
import { config } from "../../config/gluestack-ui.config";

export default function AppLayout() {
    return (
        <GluestackUIProvider config={config}>
            <Slot />
        </GluestackUIProvider>
    )
}