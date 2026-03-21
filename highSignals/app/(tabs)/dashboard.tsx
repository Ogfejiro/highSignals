import { useRouter } from 'expo-router'
import React from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Svg, {
  Circle,
  G,
  Line,
  Path,
  Rect,
  Text as SvgText,
} from 'react-native-svg'

const { width } = Dimensions.get('window')

export default function DashboardScreen() {
  const router = useRouter()

  // Real data for charts
  const contentByPlatform = [
    { platform: 'LinkedIn', posts: 12, color: '#0077B5' },
    { platform: 'Twitter', posts: 8, color: '#1DA1F2' },
    { platform: 'Instagram', posts: 5, color: '#E4405F' },
    { platform: 'Facebook', posts: 3, color: '#4267B2' },
  ]

  const weeklyActivity = [
    { day: 'Mon', posts: 2 },
    { day: 'Tue', posts: 1 },
    { day: 'Wed', posts: 3 },
    { day: 'Thu', posts: 0 },
    { day: 'Fri', posts: 2 },
    { day: 'Sat', posts: 1 },
    { day: 'Sun', posts: 0 },
  ]

  const scoreDistribution = [
    { range: '90-100', count: 8, color: '#00C853' },
    { range: '80-89', count: 12, color: '#d4af37' },
    { range: '70-79', count: 5, color: '#FF9800' },
    { range: '<70', count: 3, color: '#FF5252' },
  ]

  const recentPosts = [
    {
      platformColor: '#0077B5',
      title: 'LinkedIn Post - Growth Tips',
      date: '2 days ago',
      status: 'Draft',
    },
    {
      platformColor: '#1DA1F2',
      title: 'Twitter Thread - AI Tools',
      date: '4 days ago',
      status: 'Scheduled',
    },
  ]

  const userData = {
    name: 'Samuel',
    streak: 12,
    totalPosts: 28,
    averageScore: 87,
    postsThisWeek: 5,
  }

  interface ChartData {
    platform: string
    posts: number
    color: string
  }

  interface BarData {
    day: string
    posts: number
  }

  const CustomPieChart = ({ data }: { data: ChartData[] }) => {
    const total = data.reduce((sum: number, d: ChartData) => sum + d.posts, 0)
    const center = 80
    const radius = 65
    const innerRadius = 35
    let cumulative = 0

    return (
      <G>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill='none'
          stroke='rgba(255,255,255,0.1)'
          strokeWidth='2'
        />
        <Circle cx={center} cy={center} r={innerRadius} fill='#1a2a44' />
        <SvgText
          x={center}
          y={center - 8}
          textAnchor='middle'
          fill='#ffffff'
          fontSize='14'
          fontWeight='bold'
        >
          {total}
        </SvgText>
        <SvgText
          x={center}
          y={center + 8}
          textAnchor='middle'
          fill='rgba(255,255,255,0.7)'
          fontSize='10'
        >
          posts
        </SvgText>
        {data.map((d, i) => {
          const angle = (d.posts / total) * 360
          const largeArc = angle > 180 ? 1 : 0
          const path = `M ${center} ${center - innerRadius} A ${innerRadius} ${innerRadius} 0 ${largeArc} 1 ${center + Math.cos(((cumulative + angle) * Math.PI) / 180) * innerRadius} ${center + Math.sin(((cumulative + angle) * Math.PI) / 180) * innerRadius} L ${center + Math.cos(((cumulative + angle) * Math.PI) / 180) * radius} ${center + Math.sin(((cumulative + angle) * Math.PI) / 180) * radius} A ${radius} ${radius} 0 ${largeArc} 0 ${center + Math.cos((cumulative * Math.PI) / 180) * radius} ${center + Math.sin((cumulative * Math.PI) / 180) * radius} Z`
          cumulative += angle
          return (
            <Path
              key={i}
              d={path}
              fill={d.color}
              stroke='rgba(255,255,255,0.2)'
              strokeWidth='1'
            />
          )
        })}
      </G>
    )
  }

  const CustomBarChart = ({ data }: { data: BarData[] }) => {
    const maxPosts = Math.max(...data.map((d: BarData) => d.posts))
    const barWidth = 25
    const barGroupWidth = 35
    const startX = 30

    return (
      <>
        {/* Y Axis */}
        <Line
          x1='30'
          y1='20'
          x2='30'
          y2='160'
          stroke='rgba(255,255,255,0.2)'
          strokeWidth='1'
        />
        {/* X Axis */}
        <Line
          x1='30'
          y1='160'
          x2='270'
          y2='160'
          stroke='rgba(255,255,255,0.2)'
          strokeWidth='1'
        />
        {/* Grid lines */}
        {[3, 2, 1].map((val) => (
          <Line
            key={val}
            x1='35'
            y1={160 - (val / 3) * 140}
            x2='270'
            y2={160 - (val / 3) * 140}
            stroke='rgba(255,255,255,0.1)'
            strokeWidth='1'
          />
        ))}
        {/* Y labels */}
        {[3, 2, 1].map((val) => (
          <SvgText
            key={val}
            x='25'
            y={162 - (val / 3) * 140}
            textAnchor='end'
            fill='#ffffff'
            fontSize='12'
          >
            {val}
          </SvgText>
        ))}
        {/* Bars */}
        {data.map((d: BarData, i: number) => {
          const barHeight = (d.posts / maxPosts) * 140
          const x = startX + i * barGroupWidth
          return (
            <G key={i}>
              <Rect
                x={x}
                y={160 - barHeight}
                width={barWidth}
                height={barHeight}
                rx='4'
                ry='4'
                fill='#d4af37'
                stroke='rgba(255,255,255,0.3)'
                strokeWidth='1'
              />
              {/* Day label */}
              <SvgText
                x={x + barWidth / 2}
                y='175'
                textAnchor='middle'
                fill='#ffffff'
                fontSize='12'
                fontWeight='bold'
              >
                {d.day}
              </SvgText>
            </G>
          )
        })}
      </>
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{userData.name} 👋</Text>
        </View>
        <View style={styles.streakBadge}>
          <Text style={styles.streakNumber}>{userData.streak}</Text>
          <Text style={styles.streakLabel}>🔥 Day Streak</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log('Go to Drafts')}
        >
          <Text style={[styles.actionIcon, styles.draftIcon]}>📝</Text>
          <Text style={styles.actionLabel}>Drafts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log('Go to Published')}
        >
          <Text style={[styles.actionIcon, styles.publishedIcon]}>✅</Text>
          <Text style={styles.actionLabel}>Published</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/(tabs)/create-post')}
        >
          <Text style={[styles.actionIcon, styles.createIcon]}>✨</Text>
          <Text style={styles.actionLabel}>Create Post</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Stats Row */}
      <View style={styles.quickStats}>
        <View style={styles.quickStatCard}>
          <Text style={styles.quickStatNumber}>{userData.totalPosts}</Text>
          <Text style={styles.quickStatLabel}>Total Posts</Text>
        </View>
        <View style={styles.quickStatCard}>
          <Text style={styles.quickStatNumber}>{userData.averageScore}%</Text>
          <Text style={styles.quickStatLabel}>Avg Score</Text>
        </View>
        <View style={styles.quickStatCard}>
          <Text style={styles.quickStatNumber}>{userData.postsThisWeek}</Text>
          <Text style={styles.quickStatLabel}>This Week</Text>
        </View>
      </View>

      {/* Content by Platform - Compact Pie Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Content by Platform</Text>
        <View style={styles.chartRow}>
          <View style={styles.smallPieContainer}>
            <Svg width='140' height='140' viewBox='0 0 140 140'>
              <CustomPieChart data={contentByPlatform} />
            </Svg>
          </View>
          <View style={styles.verticalLegend}>
            {contentByPlatform.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>
                  {item.platform}: {item.posts}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Weekly Activity - Keep */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Weekly Activity</Text>
        <Svg width={width - 48} height='160' viewBox='0 0 300 200'>
          <CustomBarChart data={weeklyActivity} />
        </Svg>
      </View>

      {/* Compact Score Distribution */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Score Distribution</Text>
        <View style={styles.scoreDistContainer}>
          {scoreDistribution.map((item, index) => (
            <View key={index} style={styles.scoreDistItem}>
              <View style={styles.scoreDistBar}>
                <View
                  style={[
                    styles.scoreDistFill,
                    {
                      width: `${(item.count / 28) * 100}%`,
                      backgroundColor: item.color,
                    },
                  ]}
                />
              </View>
              <View style={styles.scoreDistInfo}>
                <Text style={styles.scoreDistRange}>{item.range}</Text>
                <Text style={styles.scoreDistCount}>{item.count}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Posts with Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Posts</Text>
        {recentPosts.map((post, index) => (
          <View key={index} style={styles.activityCard}>
            <View style={styles.activityLeft}>
              <View
                style={[
                  styles.platformDot,
                  { backgroundColor: post.platformColor },
                ]}
              />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{post.title}</Text>
                <Text style={styles.activityDate}>{post.date}</Text>
              </View>
            </View>
            <View
              style={[
                styles.statusBadge,
                post.status === 'Published' && styles.publishedStatus,
              ]}
            >
              <Text style={styles.statusText}>{post.status}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 120 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a192f',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
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
  streakBadge: {
    backgroundColor: 'rgba(212,175,55,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.3)',
  },
  streakNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#d4af37',
  },
  streakLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  draftIcon: {
    color: '#FF6B6B',
  },
  publishedIcon: {
    color: '#51CF66',
  },
  createIcon: {
    color: '#d4af37',
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  quickStatCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  quickStatNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },
  chartCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 16,
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  smallPieContainer: {
    flexShrink: 1,
  },
  verticalLegend: {
    flex: 1,
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    flex: 1,
  },
  scoreDistContainer: {
    gap: 10,
  },
  scoreDistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scoreDistBar: {
    flex: 1,
    height: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  scoreDistFill: {
    height: '100%',
    borderRadius: 8,
  },
  scoreDistInfo: {
    width: 70,
  },
  scoreDistRange: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
  scoreDistCount: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
  },
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
  activityCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  platformDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  statusBadge: {
    backgroundColor: 'rgba(255,107,107,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,107,107,0.4)',
    minWidth: 60,
    alignItems: 'center',
  },
  publishedStatus: {
    backgroundColor: 'rgba(81,207,102,0.2)',
    borderColor: 'rgba(81,207,102,0.4)',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FF6B6B',
  },
})
