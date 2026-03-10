import { AuthContext } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";

export default function ProtectRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        {/* kabhi bhi direct string mat likho */}
      </View>
    );
  }

  // Conditional return
  if (user) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    );
  } else {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
      </Stack>
    );
  }
}
