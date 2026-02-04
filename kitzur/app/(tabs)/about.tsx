import React from 'react';
import { ScrollView, StyleSheet, View, Linking, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { SymbolViewProps } from 'expo-symbols';

export default function AboutScreen() {
  const appVersion = '1.1.0';
  
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* App Header */}
        <View style={styles.header}>
          <IconSymbol size={80} name="book.fill" color={Colors.light.primary.main} />
          <ThemedText type="title" style={styles.appTitle}>
            קיצור שולחן ערוך
          </ThemedText>
          <ThemedText style={styles.version}>גרסה {appVersion}</ThemedText>
        </View>

        {/* App Description */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            📖 אודות האפליקציה
          </ThemedText>
          <ThemedText style={styles.text}>
            אפליקציה ללימוד קיצור שולחן ערוך עם תכונות מתקדמות למעקב אחר ההתקדמות, סימניות, וחיפוש מהיר.
          </ThemedText>
          <ThemedText style={styles.text}>
            האפליקציה כוללת את הטקסט המלא של קיצור שולחן ערוך בנוסח ספרד, עם ניקוד מלא וחלוקה נוחה לסימנים וסעיפים.
          </ThemedText>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            ✨ תכונות עיקריות
          </ThemedText>
          <FeatureItem icon="book.fill" text="לימוד קיצור שולחן ערוך המלא" />
          <FeatureItem icon="magnifyingglass" text="חיפוש מהיר בכל הטקסט" />
          <FeatureItem icon="bookmark.fill" text="סימניות אישיות" />
          <FeatureItem icon="chart.bar.fill" text="מעקב אחר התקדמות הלימוד" />
          <FeatureItem icon="flame.fill" text="רצף ימים של לימוד" />
          <FeatureItem icon="sparkles" text="תזכורת יומית להלכה" />
          <FeatureItem icon="moon.stars.fill" text="ברכות ותפילות (ברכת המזון, בורא נפשות, מעין שלוש)" />
          <FeatureItem icon="scroll.fill" text="תוספות מיוחדות (אגרת הרמב״ן, פרשת המן, שניים מקרא)" />
        </View>

        {/* Content Sources */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            📚 מקורות התוכן
          </ThemedText>
          <ThemedText style={styles.text}>
            הטקסטים באפליקציה מבוססים על מקורות מהימנים:
          </ThemedText>
          <ThemedText style={styles.bulletText}>• קיצור שולחן ערוך - נוסח ספרד</ThemedText>
          <ThemedText style={styles.bulletText}>• ברכות ותפילות - נוסח עדות המזרח</ThemedText>
          <ThemedText style={styles.bulletText}>• תוכן נוסף מספריית ספריא ומקורות נוספים</ThemedText>
        </View>

        {/* Technical Info */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🔧 מידע טכני
          </ThemedText>
          <ThemedText style={styles.text}>
            <ThemedText style={styles.bold}>פלטפורמה:</ThemedText> React Native + Expo
          </ThemedText>
          <ThemedText style={styles.text}>
            <ThemedText style={styles.bold}>גרסת האפליקציה:</ThemedText> {appVersion}
          </ThemedText>
          <ThemedText style={styles.text}>
            <ThemedText style={styles.bold}>עדכון אחרון:</ThemedText> פברואר 2026
          </ThemedText>
        </View>

        {/* What's New */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🆕 מה חדש בגרסה {appVersion}
          </ThemedText>
          <ThemedText style={styles.bulletText}>✅ עיצוב מחדש של ברכות ותפילות</ThemedText>
          <ThemedText style={styles.bulletText}>✅ הדגשה ברורה של ברכות וסעיפים</ThemedText>
          <ThemedText style={styles.bulletText}>✅ הנחיות מפורטות בתחילת כל תפילה</ThemedText>
          <ThemedText style={styles.bulletText}>✅ שיפור קריאות עם שבירת שורות אחרי נקודותיים</ThemedText>
          <ThemedText style={styles.bulletText}>✅ ניקוי ותיקון פורמט הטקסט</ThemedText>
          <ThemedText style={styles.bulletText}>✅ בדיקות E2E מקיפות (65 בדיקות)</ThemedText>
        </View>

        {/* Previous Updates */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            📝 עדכונים קודמים
          </ThemedText>
          <ThemedText style={styles.text}>
            <ThemedText style={styles.bold}>גרסה 1.0.0:</ThemedText>
          </ThemedText>
          <ThemedText style={styles.bulletText}>• שחרור ראשוני</ThemedText>
          <ThemedText style={styles.bulletText}>• קיצור שולחן ערוך המלא</ThemedText>
          <ThemedText style={styles.bulletText}>• מערכת חיפוש וסימניות</ThemedText>
          <ThemedText style={styles.bulletText}>• מעקב התקדמות ורצפים</ThemedText>
        </View>

        {/* Developer Info */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            👨‍💻 פיתוח
          </ThemedText>
          <ThemedText style={styles.text}>
            פותח במטרה להנגיש את לימוד ההלכה ולאפשר למידה נוחה ומעקב אחר התקדמות.
          </ThemedText>
        </View>

        {/* Disclaimer */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            ⚠️ הערה חשובה
          </ThemedText>
          <ThemedText style={styles.text}>
            אפליקציה זו מיועדת ללימוד ועיון בלבד. למעשה הלכה יש להתייעץ עם רב מוסמך.
          </ThemedText>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            💝 תמיכה
          </ThemedText>
          <ThemedText style={styles.text}>
            נהנית מהאפליקציה? שתף אותה עם חברים ומשפחה!
          </ThemedText>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            תורה לשמה לזכות כל עם ישראל
          </ThemedText>
          <ThemedText style={styles.footerText}>
            © 2026 קיצור שולחן ערוך אפליקציה
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

interface FeatureItemProps {
  icon: SymbolViewProps['name'];
  text: string;
}

function FeatureItem({ icon, text }: FeatureItemProps) {
  return (
    <View style={styles.featureItem}>
      <IconSymbol size={20} name={icon} color={Colors.light.primary.main} />
      <ThemedText style={styles.featureText}>{text}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  appTitle: {
    marginTop: 15,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  version: {
    marginTop: 5,
    fontSize: 14,
    opacity: 0.6,
  },
  section: {
    marginBottom: 25,
    backgroundColor: Colors.light.background.surface,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  bulletText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 6,
    marginLeft: 5,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  featureText: {
    fontSize: 15,
    flex: 1,
  },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border.default,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: 5,
  },
});
