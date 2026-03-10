import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  // Mock data - will be replaced with real data from backend
  const userData = {
    name: 'Samuel',
    streak: 12,
    totalPosts: 28,
    averageScore: 87,
    postsThisWeek: 5,
    freezeAvailable: 2,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a192f" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{userData.name} 👋</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <View style={styles.profileCircle}>
              <Text style={styles.profileInitial}>{userData.name[0]}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Streak Card - Main Feature */}
        <View style={styles.streakCard}>
          <View style={styles.streakHeader}>
            <Text style={styles.streakLabel}>Current Streak</Text>
            <View style={styles.freezeBadge}>
              <Text style={styles.freezeText}>❄️ {userData.freezeAvailable} Freeze</Text>
            </View>
          </View>
          
          <View style={styles.streakDisplay}>
            <Text style={styles.streakFlame}>🔥</Text>
            <Text style={styles.streakNumber}>{userData.streak}</Text>
            <Text style={styles.streakDays}>Days</Text>
          </View>

          <Text style={styles.streakMotivation}>
            Keep going! Post today to maintain your streak
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {/* Total Posts */}
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📝</Text>
            <Text style={styles.statNumber}>{userData.totalPosts}</Text>
            <Text style={styles.statLabel}>Total Posts</Text>
          </View>

          {/* Average Score */}
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={styles.statNumber}>{userData.averageScore}%</Text>
            <Text style={styles.statLabel}>Avg Score</Text>
          </View>

          {/* This Week */}
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📊</Text>
            <Text style={styles.statNumber}>{userData.postsThisWeek}</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          {/* Create Content Button */}
          <TouchableOpacity 
            style={styles.primaryAction}
            onPress={() => router.push('/create post')}
          >
            <View style={styles.actionLeft}>
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>✍️</Text>
              </View>
              <View>
                <Text style={styles.actionTitle}>Create New Content</Text>
                <Text style={styles.actionSubtitle}>Write & get AI feedback</Text>
              </View>
            </View>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>

          {/* View Drafts */}
          <TouchableOpacity style={styles.secondaryAction}>
            <View style={styles.actionLeft}>
              <Text style={styles.secondaryActionIcon}>📄</Text>
              <Text style={styles.secondaryActionText}>View Drafts</Text>
            </View>
            <View style={styles.draftBadge}>
              <Text style={styles.draftBadgeText}>3</Text>
            </View>
          </TouchableOpacity>

          {/* Content Ideas */}
          <TouchableOpacity style={styles.secondaryAction}>
            <View style={styles.actionLeft}>
              <Text style={styles.secondaryActionIcon}>💡</Text>
              <Text style={styles.secondaryActionText}>Content Ideas</Text>
            </View>
            <Text style={styles.actionArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityTitle}>LinkedIn Post - Growth Tips</Text>
              <View style={styles.scoreCircle}>
                <Text style={styles.scoreText}>94</Text>
              </View>
            </View>
            <Text style={styles.activityDate}>Published 2 days ago</Text>
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityTitle}>Twitter Thread - AI Tools</Text>
              <View style={styles.scoreCircle}>
                <Text style={styles.scoreText}>88</Text>
              </View>
            </View>
            <Text style={styles.activityDate}>Published 4 days ago</Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a192f', // Brand blue
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  userName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 4,
  },
  profileButton: {
    // Profile circle in top right
  },
  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#d4af37', // Brand gold
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0a192f', // Brand blue
  },

  // Streak Card
  streakCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  streakLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  freezeBadge: {
    backgroundColor: '#E8F4FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  freezeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0066CC',
  },
  streakDisplay: {
    alignItems: 'center',
    marginBottom: 16,
  },
  streakFlame: {
    fontSize: 64,
    marginBottom: 8,
  },
  streakNumber: {
    fontSize: 56,
    fontWeight: '800',
    color: '#0a192f', // Brand blue
    lineHeight: 60,
  },
  streakDays: {
    fontSize: 18,
    fontWeight: '600',
    color: '#d4af37', // Brand gold
  },
  streakMotivation: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },

  // Sections
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 16,
  },

  // Primary Action
  primaryAction: {
    backgroundColor: '#d4af37', // Brand gold
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(10,25,47,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a192f', // Brand blue
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 13,
    color: 'rgba(10,25,47,0.6)',
  },
  actionArrow: {
    fontSize: 24,
    color: '#0a192f',
    fontWeight: '600',
  },

  // Secondary Actions
  secondaryAction: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  secondaryActionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  secondaryActionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  draftBadge: {
    backgroundColor: '#d4af37', // Brand gold
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  draftBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0a192f',
  },

  // Activity
  activityCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  scoreCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212,175,55,0.2)',
    borderWidth: 2,
    borderColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#d4af37',
  },
  activityDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
});