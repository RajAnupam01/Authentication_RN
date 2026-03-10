import { Tabs } from "expo-router";

export default function TabsLayout(){
    return(
        <Tabs screenOptions={{ headerShown: false }} >
            <Tabs.Screen name="Index" options={{title:'Home'}}  />
            <Tabs.Screen name="setting" options={{title:'setting'}} />
        </Tabs>
    )
}
