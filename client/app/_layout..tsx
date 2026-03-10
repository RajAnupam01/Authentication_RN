// _layout.tsx
import { AuthProvider } from "@/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProtectRoute from "./ProtectRoute"; // import correct path

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ProtectRoute />   {/* <- Conditional navigation */}
      </AuthProvider>
    </SafeAreaProvider>
  )
}