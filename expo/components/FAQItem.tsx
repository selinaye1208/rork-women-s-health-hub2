import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { FAQ } from '@/types/faq';
import colors from '@/constants/colors';

interface FAQItemProps {
  faq: FAQ;
}

export default function FAQItem({ faq }: FAQItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.questionContainer}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.question}>{faq.question}</Text>
        {expanded ? (
          <ChevronUp size={20} color={colors.primary} />
        ) : (
          <ChevronDown size={20} color={colors.primary} />
        )}
      </TouchableOpacity>
      {expanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    paddingRight: 8,
  },
  answerContainer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  answer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});