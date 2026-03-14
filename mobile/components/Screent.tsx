
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";


export default function Screen({ children }: any) {
    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            <StatusBar style="dark" />
            {children}
        </SafeAreaView>
    )
}