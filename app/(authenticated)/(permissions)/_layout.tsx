import { Stack } from "expo-router";
export default function PermissionLayout() {
  return (
<Stack>
<Stack.Screen name="notification" options={{ headerShown: false}}/>
</Stack>
    
  );
}
