import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200' }}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Gradient overlay with brand color #0a192f */}
        <LinearGradient
          colors={[
            'rgba(10, 25, 47, 0.3)',   // Brand blue with transparency at top
            'rgba(10, 25, 47, 0.6)',
            'rgba(10, 25, 47, 0.85)',
            'rgba(10, 25, 47, 0.98)',  // Almost solid brand blue at bottom
          ]}
          locations={[0, 0.3, 0.65, 1]}
          style={styles.overlay}
        >
          <View style={styles.content}>

            {/* Top logo */}
            <Animated.View style={[styles.logoArea, { opacity: fadeAnim }]}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoText}>HS</Text>
              </View>
            </Animated.View>

            {/* Bottom text + button */}
            <Animated.View
              style={[
                styles.textContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>AI-POWERED CONTENT TOOL</Text>
              </View>

              <Text style={styles.headline}>
                Publish{'\n'}with{'\n'}
                <Text style={styles.headlineAccent}>Confidence.</Text>
              </Text>

              <Text style={styles.subtitle}>
                The only mobile AI that audits your{'\n'}content before you post.
              </Text>

              <Animated.View style={{ opacity: buttonAnim, width: '100%' }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => router.push('/auth')}
                  activeOpacity={0.85}
                >
                  <Text style={styles.buttonText}>Get Started</Text>
                  <Text style={styles.buttonArrow}> →</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push('/auth')}
                  style={styles.loginLink}
                >
                  <Text style={styles.loginLinkText}>
                    Already have an account?{' '}
                    <Text style={styles.loginLinkAccent}>Log In</Text>
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>

          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 50,
    paddingHorizontal: 28,
  },
  logoArea: { alignItems: 'flex-start' },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.15)', // Gold with transparency
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)', // Gold border
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#d4af37', // Brand gold
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  textContainer: { alignItems: 'flex-start' },
  tagBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.12)', // Gold background
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 20,
  },
  tagText: {
    color: '#d4af37', // Brand gold
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  headline: {
    fontSize: 54,
    fontWeight: '800',
    color: '#ffffff', // Brand white
    lineHeight: 60,
    marginBottom: 16,
    letterSpacing: -1,
  },
  headlineAccent: { 
    color: '#d4af37', // Brand gold accent
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 23,
    marginBottom: 36,
  },
  button: {
    backgroundColor: '#d4af37', // Brand gold button
    paddingVertical: 17,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#0a192f', // Brand blue text on gold button
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  buttonArrow: {
    color: '#0a192f', // Brand blue
    fontSize: 18,
    fontWeight: '600',
  },
  loginLink: { alignItems: 'center', paddingVertical: 8 },
  loginLinkText: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  loginLinkAccent: { 
    color: '#d4af37', // Brand gold
    fontWeight: '600' 
  },
});