import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide the default header
        contentStyle: { backgroundColor: '#000' }, // Dark background
      }}
    >
      {/* Define your screens here */}
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Welcome',
        }}
      />
      <Stack.Screen 
        name="auth" 
        options={{
          title: 'Login',
        }}
      />
    </Stack>
  );
}