import { AuthContext } from "@/context/authContext";
import { Redirect } from "expo-router";
import { useContext } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
         <ActivityIndicator size="large" color="#068ad1" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
