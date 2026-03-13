
import { SafeAreaView } from "react-native-safe-area-context";


export default function Screen({ children }: any) {
    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            {children}
        </SafeAreaView>
    )
}