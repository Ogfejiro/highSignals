import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function CreatePostScreen() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [aiFeedback, setAiFeedback] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Text formatting state
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // TODO: Call AI API
    // Simulate AI analysis
    setTimeout(() => {
      setAiScore(92);
      setAiFeedback([
        'Strong opening hook that grabs attention',
        'Consider adding a call-to-action at the end',
        'Good use of storytelling elements',
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', { title, content });
    // TODO: Save to backend
  };

  const handlePublish = () => {
    console.log('Publishing:', { title, content, score: aiScore });
    // TODO: Mark as published in backend
    router.back();
  };

  const increaseFontSize = () => {
    if (fontSize < 24) setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) setFontSize(fontSize - 2);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0a192f" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Content</Text>
        <TouchableOpacity onPress={handleSaveDraft}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title Input */}
        <View style={styles.titleSection}>
          <TextInput
            style={styles.titleInput}
            placeholder="Give your content a title..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Formatting Toolbar */}
        <View style={styles.toolbar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Font Size Controls */}
            <View style={styles.toolbarGroup}>
              <TouchableOpacity style={styles.toolButton} onPress={decreaseFontSize}>
                <Text style={styles.toolIcon}>A-</Text>
              </TouchableOpacity>
              <Text style={styles.fontSizeDisplay}>{fontSize}</Text>
              <TouchableOpacity style={styles.toolButton} onPress={increaseFontSize}>
                <Text style={styles.toolIcon}>A+</Text>
              </TouchableOpacity>
            </View>

            {/* Bold */}
            <TouchableOpacity 
              style={[styles.toolButton, isBold && styles.toolButtonActive]}
              onPress={() => setIsBold(!isBold)}
            >
              <Text style={[styles.toolIcon, { fontWeight: 'bold' }]}>B</Text>
            </TouchableOpacity>

            {/* Italic */}
            <TouchableOpacity 
              style={[styles.toolButton, isItalic && styles.toolButtonActive]}
              onPress={() => setIsItalic(!isItalic)}
            >
              <Text style={[styles.toolIcon, { fontStyle: 'italic' }]}>I</Text>
            </TouchableOpacity>

            {/* More formatting options */}
            <TouchableOpacity style={styles.toolButton}>
              <Text style={styles.toolIcon}>⋮</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Content Editor */}
        <View style={styles.editorSection}>
          <TextInput
            style={[
              styles.contentInput,
              { 
                fontSize,
                fontWeight: isBold ? 'bold' : 'normal',
                fontStyle: isItalic ? 'italic' : 'normal',
              }
            ]}
            placeholder="Start writing your content here..."
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Character Count */}
        <View style={styles.stats}>
          <Text style={styles.statText}>
            {content.length} characters · {content.split(' ').filter(Boolean).length} words
          </Text>
        </View>

        {/* AI Analysis Section */}
        {aiScore !== null && (
          <View style={styles.aiResultCard}>
            {/* Score Display */}
            <View style={styles.scoreSection}>
              <View style={styles.scoreCircleLarge}>
                <Text style={styles.scoreLabel}>AI SCORE</Text>
                <Text style={styles.scoreLarge}>{aiScore}</Text>
                <Text style={styles.scoreOutOf}>/100</Text>
              </View>
            </View>

            {/* Feedback */}
            <View style={styles.feedbackSection}>
              <Text style={styles.feedbackTitle}>💡 AI Suggestions</Text>
              {aiFeedback.map((feedback, index) => (
                <View key={index} style={styles.feedbackItem}>
                  <Text style={styles.feedbackBullet}>•</Text>
                  <Text style={styles.feedbackText}>{feedback}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        {aiScore === null ? (
          <TouchableOpacity 
            style={[styles.analyzeButton, (!content || isAnalyzing) && styles.buttonDisabled]}
            onPress={handleAnalyze}
            disabled={!content || isAnalyzing}
          >
            <Text style={styles.analyzeButtonText}>
              {isAnalyzing ? 'Analyzing...' : '🤖 Get AI Feedback'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.saveDraftButton} onPress={handleSaveDraft}>
              <Text style={styles.saveDraftText}>Save Draft</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
              <Text style={styles.publishButtonText}>Mark as Published</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  closeButton: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '700',
    color: '#d4af37', // Brand gold
  },

  // Title Section
  titleSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    paddingVertical: 12,
  },

  // Toolbar
  toolbar: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  toolbarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  toolButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  toolButtonActive: {
    backgroundColor: '#d4af37', // Brand gold
  },
  toolIcon: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  fontSizeDisplay: {
    fontSize: 14,
    color: '#d4af37',
    fontWeight: '600',
    marginHorizontal: 4,
  },

  // Editor
  editorSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    minHeight: 300,
  },
  contentInput: {
    color: '#ffffff',
    lineHeight: 28,
  },

  // Stats
  stats: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  statText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },

  // AI Results
  aiResultCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 24,
    marginTop: 16,
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  scoreCircleLarge: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 1,
    marginBottom: 8,
  },
  scoreLarge: {
    fontSize: 64,
    fontWeight: '800',
    color: '#0a192f', // Brand blue
    lineHeight: 72,
  },
  scoreOutOf: {
    fontSize: 18,
    fontWeight: '600',
    color: '#d4af37', // Brand gold
  },

  // Feedback
  feedbackSection: {
    // Feedback list
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0a192f',
    marginBottom: 16,
  },
  feedbackItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  feedbackBullet: {
    fontSize: 16,
    color: '#d4af37',
    marginRight: 8,
    fontWeight: '800',
  },
  feedbackText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    flex: 1,
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0a192f',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  analyzeButton: {
    backgroundColor: '#d4af37', // Brand gold
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  analyzeButtonText: {
    color: '#0a192f',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonDisabled: {
    backgroundColor: 'rgba(212,175,55,0.3)',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  saveDraftButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  saveDraftText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  publishButton: {
    flex: 1,
    backgroundColor: '#d4af37', // Brand gold
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#0a192f',
    fontSize: 16,
    fontWeight: '700',
  },
});