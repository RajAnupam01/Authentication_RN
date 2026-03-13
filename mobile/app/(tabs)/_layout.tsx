import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:'#068ad1',
      tabBarInactiveTintColor:'black',
      tabBarItemStyle:{
        borderRightWidth:0.5,
        borderColor:'gray',
        marginVertical:4,
      },
      tabBarLabelPosition:'beside-icon'
      }} >
      <Tabs.Screen name="index" options={{ title: "Home",
      tabBarIcon:({color})=>(
        <FontAwesome name="home" size={34} color={color} />
      )
       }}
      />
      <Tabs.Screen name="setting" options={{ title: "Setting",
      tabBarIcon:({color})=>(
        <Ionicons name="settings" size={30} color={color} />
      )
       }}
      />
    </Tabs>
  );
}