import React, { JSX } from 'react';
import { View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential, type AuthCredential } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn(): JSX.Element {
  const router = useRouter();
  const [request, , promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    // iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    // androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    
  }, );

  const handleGoogleSignIn = async () => {
    try {
      // Launch Google OAuth prompt
      const response = await promptAsync();

      if (response.type === 'success') {
        const { id_token } = response.params;

        // Create Firebase credential
        const credential: AuthCredential = GoogleAuthProvider.credential(id_token);

        // Sign in with Firebase
        const userCredential = await signInWithCredential(auth, credential);
        console.log('User signed in:', userCredential.user);
        router.replace('/(tabs)/home');
      } else {
        console.log('Google sign-in cancelled or failed', response);
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button disabled={!request} onPress={handleGoogleSignIn}>
        <Text>Sign in with Google</Text>
      </Button>
    </View>
  );
}
