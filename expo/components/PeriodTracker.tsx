import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Modal, TextInput } from 'react-native';
import { Calendar, Plus, X, Heart, Zap, Droplets, Moon, Sun, Smile, Frown, Meh } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '@/constants/colors';

interface PeriodData {
  [date: string]: {
    isPeriod: boolean;
    isOvulation?: boolean;
    symptoms?: string[];
    mood?: 'happy' | 'sad' | 'neutral' | 'anxious' | 'energetic';
    flow?: 'light' | 'medium' | 'heavy';
    pain?: number; // 1-10 scale
    notes?: string;
    customSymptoms?: string[];
  };
}

interface DayDetailsModalProps {
  visible: boolean;
  date: string;
  data: PeriodData[string] | undefined;
  onClose: () => void;
  onSave: (date: string, data: PeriodData[string]) => void;
}

interface CalendarDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isPeriod: boolean;
  isOvulation: boolean;
  isPredicted: boolean;
}

const SYMPTOMS = [
  'Cramps', 'Headache', 'Bloating', 'Breast tenderness', 'Fatigue',
  'Mood swings', 'Acne', 'Food cravings', 'Back pain', 'Nausea'
];

const MOODS = [
  { key: 'happy', label: 'Happy', icon: Smile, color: '#4CAF50' },
  { key: 'neutral', label: 'Neutral', icon: Meh, color: '#9E9E9E' },
  { key: 'sad', label: 'Sad', icon: Frown, color: '#2196F3' },
  { key: 'anxious', label: 'Anxious', icon: Zap, color: '#FF9800' },
  { key: 'energetic', label: 'Energetic', icon: Sun, color: '#FFC107' },
] as const;

const DayDetailsModal: React.FC<DayDetailsModalProps> = ({ visible, date, data, onClose, onSave }) => {
  const [isPeriod, setIsPeriod] = useState(data?.isPeriod || false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(data?.symptoms || []);
  const [selectedMood, setSelectedMood] = useState<string>(data?.mood || '');
  const [flow, setFlow] = useState<string>(data?.flow || '');
  const [pain, setPain] = useState<number>(data?.pain || 0);
  const [notes, setNotes] = useState<string>(data?.notes || '');
  const [customSymptom, setCustomSymptom] = useState<string>('');
  const [customSymptoms, setCustomSymptoms] = useState<string[]>(data?.customSymptoms || []);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const addCustomSymptom = () => {
    if (customSymptom.trim() && !customSymptoms.includes(customSymptom.trim())) {
      setCustomSymptoms(prev => [...prev, customSymptom.trim()]);
      setCustomSymptom('');
    }
  };

  const removeCustomSymptom = (symptom: string) => {
    setCustomSymptoms(prev => prev.filter(s => s !== symptom));
  };

  const handleSave = () => {
    const dayData: PeriodData[string] = {
      isPeriod,
      symptoms: selectedSymptoms,
      mood: selectedMood as any,
      flow: flow as any,
      pain,
      notes,
      customSymptoms,
    };
    onSave(date, dayData);
    onClose();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{formatDate(date)}</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.text} />
          </Pressable>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {/* Period Toggle */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Period</Text>
            <Pressable 
              style={[styles.toggleButton, isPeriod && styles.toggleButtonActive]}
              onPress={() => setIsPeriod(!isPeriod)}
            >
              <Droplets size={20} color={isPeriod ? '#FFF' : colors.primary} />
              <Text style={[styles.toggleText, isPeriod && styles.toggleTextActive]}>
                {isPeriod ? 'Period Day' : 'No Period'}
              </Text>
            </Pressable>
          </View>

          {/* Flow Intensity */}
          {isPeriod && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Flow Intensity</Text>
              <View style={styles.flowButtons}>
                {['light', 'medium', 'heavy'].map((flowType) => (
                  <Pressable
                    key={flowType}
                    style={[styles.flowButton, flow === flowType && styles.flowButtonActive]}
                    onPress={() => setFlow(flowType)}
                  >
                    <Text style={[styles.flowText, flow === flowType && styles.flowTextActive]}>
                      {flowType.charAt(0).toUpperCase() + flowType.slice(1)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Mood */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mood</Text>
            <View style={styles.moodGrid}>
              {MOODS.map((mood) => {
                const IconComponent = mood.icon;
                const isSelected = selectedMood === mood.key;
                return (
                  <Pressable
                    key={mood.key}
                    style={[styles.moodButton, isSelected && { backgroundColor: mood.color }]}
                    onPress={() => setSelectedMood(isSelected ? '' : mood.key)}
                  >
                    <IconComponent size={24} color={isSelected ? '#FFF' : mood.color} />
                    <Text style={[styles.moodText, isSelected && styles.moodTextActive]}>
                      {mood.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Pain Level */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pain Level (0-10)</Text>
            <View style={styles.painScale}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                <Pressable
                  key={level}
                  style={[styles.painButton, pain === level && styles.painButtonActive]}
                  onPress={() => setPain(level)}
                >
                  <Text style={[styles.painText, pain === level && styles.painTextActive]}>
                    {level}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Symptoms */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Symptoms</Text>
            <View style={styles.symptomsGrid}>
              {SYMPTOMS.map((symptom) => (
                <Pressable
                  key={symptom}
                  style={[styles.symptomButton, selectedSymptoms.includes(symptom) && styles.symptomButtonActive]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text style={[styles.symptomText, selectedSymptoms.includes(symptom) && styles.symptomTextActive]}>
                    {symptom}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Custom Symptoms */}
            <View style={styles.customSymptomContainer}>
              <TextInput
                style={styles.customSymptomInput}
                placeholder="Add custom symptom"
                value={customSymptom}
                onChangeText={setCustomSymptom}
                onSubmitEditing={addCustomSymptom}
              />
              <Pressable style={styles.addSymptomButton} onPress={addCustomSymptom}>
                <Plus size={20} color={colors.primary} />
              </Pressable>
            </View>

            {customSymptoms.length > 0 && (
              <View style={styles.customSymptomsList}>
                {customSymptoms.map((symptom) => (
                  <View key={symptom} style={styles.customSymptomChip}>
                    <Text style={styles.customSymptomText}>{symptom}</Text>
                    <Pressable onPress={() => removeCustomSymptom(symptom)}>
                      <X size={16} color={colors.lightText} />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Add any additional notes..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </ScrollView>

        <View style={styles.modalFooter}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const PeriodTracker: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [periodData, setPeriodData] = useState<PeriodData>({});
  const [averageCycleLength, setAverageCycleLength] = useState(28);
  const [lastPeriodStart, setLastPeriodStart] = useState<Date | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    loadPeriodData();
  }, []);

  const loadPeriodData = async () => {
    try {
      const data = await AsyncStorage.getItem('periodData');
      const cycleLength = await AsyncStorage.getItem('averageCycleLength');
      const lastPeriod = await AsyncStorage.getItem('lastPeriodStart');
      
      if (data) setPeriodData(JSON.parse(data));
      if (cycleLength) setAverageCycleLength(parseInt(cycleLength));
      if (lastPeriod) setLastPeriodStart(new Date(lastPeriod));
    } catch (error) {
      console.error('Error loading period data:', error);
    }
  };

  const savePeriodData = async (data: PeriodData) => {
    try {
      await AsyncStorage.setItem('periodData', JSON.stringify(data));
      await AsyncStorage.setItem('averageCycleLength', averageCycleLength.toString());
      if (lastPeriodStart) {
        await AsyncStorage.setItem('lastPeriodStart', lastPeriodStart.toISOString());
      }
    } catch (error) {
      console.error('Error saving period data:', error);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const openDayDetails = (date: string) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const saveDayData = (date: string, data: PeriodData[string]) => {
    const newData = { ...periodData };
    const dateObj = new Date(date);
    
    if (Object.keys(data).length === 0 || (!data.isPeriod && !data.symptoms?.length && !data.mood && !data.notes && !data.customSymptoms?.length)) {
      delete newData[date];
    } else {
      newData[date] = data;
      
      // Update last period start if this is a period day and is more recent
      if (data.isPeriod && (!lastPeriodStart || dateObj > lastPeriodStart)) {
        setLastPeriodStart(dateObj);
      }
    }
    
    setPeriodData(newData);
    savePeriodData(newData);
  };

  const getPredictedDates = (): { nextPeriod: Date | null; ovulation: Date | null } => {
    if (!lastPeriodStart) return { nextPeriod: null, ovulation: null };
    
    const nextPeriod = new Date(lastPeriodStart);
    nextPeriod.setDate(nextPeriod.getDate() + averageCycleLength);
    
    const ovulation = new Date(lastPeriodStart);
    ovulation.setDate(ovulation.getDate() + Math.floor(averageCycleLength / 2));
    
    return { nextPeriod, ovulation };
  };

  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: CalendarDay[] = [];
    const { nextPeriod, ovulation } = getPredictedDates();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateString = formatDate(date);
      
      const isCurrentMonth = date.getMonth() === month;
      const dayData = periodData[dateString];
      const isPeriod = dayData?.isPeriod || false;
      const isOvulation = ovulation && formatDate(ovulation) === dateString;
      const isPredicted = nextPeriod && formatDate(nextPeriod) === dateString;
      
      days.push({
        date: dateString,
        day: date.getDate(),
        isCurrentMonth,
        isPeriod,
        isOvulation: isOvulation || false,
        isPredicted: isPredicted || false,
      });
    }
    
    return days;
  };

  const getDayIndicators = (date: string) => {
    const dayData = periodData[date];
    if (!dayData) return null;
    
    const indicators = [];
    if (dayData.symptoms && dayData.symptoms.length > 0) indicators.push('symptoms');
    if (dayData.mood) indicators.push('mood');
    if (dayData.pain && dayData.pain > 0) indicators.push('pain');
    if (dayData.notes) indicators.push('notes');
    
    return indicators;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const getDaysUntilNextPeriod = (): number | null => {
    const { nextPeriod } = getPredictedDates();
    if (!nextPeriod) return null;
    
    const today = new Date();
    const diffTime = nextPeriod.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : null;
  };

  const calendarDays = generateCalendarDays();
  const daysUntilNext = getDaysUntilNextPeriod();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Calendar size={24} color={colors.primary} />
        <Text style={styles.title}>Period Tracker</Text>
      </View>
      
      {daysUntilNext && (
        <View style={styles.predictionCard}>
          <Text style={styles.predictionText}>
            Next period in approximately {daysUntilNext} days
          </Text>
        </View>
      )}

      <View style={styles.calendarHeader}>
        <Pressable onPress={() => navigateMonth('prev')} style={styles.navButton}>
          <Text style={styles.navButtonText}>‹</Text>
        </Pressable>
        
        <Text style={styles.monthYear}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        
        <Pressable onPress={() => navigateMonth('next')} style={styles.navButton}>
          <Text style={styles.navButtonText}>›</Text>
        </Pressable>
      </View>

      <View style={styles.weekDays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Text key={day} style={styles.weekDayText}>{day}</Text>
        ))}
      </View>

      <View style={styles.calendar}>
        {calendarDays.map((day, index) => (
          <Pressable
            key={`${day.date}-${index}`}
            style={[
              styles.dayButton,
              !day.isCurrentMonth && styles.otherMonthDay,
              day.isPeriod && styles.periodDay,
              day.isOvulation && styles.ovulationDay,
              day.isPredicted && styles.predictedDay,
            ]}
            onPress={() => day.isCurrentMonth && openDayDetails(day.date)}
          >
            <Text style={[
              styles.dayText,
              !day.isCurrentMonth && styles.otherMonthText,
              (day.isPeriod || day.isOvulation || day.isPredicted) && styles.highlightedText,
            ]}>
              {day.day}
            </Text>
            {day.isPeriod && <Droplets size={8} color="#FFF" style={styles.periodIcon} />}
            {day.isOvulation && <Heart size={8} color="#FFF" style={styles.ovulationIcon} />}
            {day.isPredicted && <Moon size={8} color="#FFF" style={styles.predictedIcon} />}
            {getDayIndicators(day.date) && (
              <View style={styles.indicatorDots}>
                {getDayIndicators(day.date)?.map((indicator, index) => (
                  <View key={indicator} style={[styles.indicatorDot, { left: index * 4 }]} />
                ))}
              </View>
            )}
          </Pressable>
        ))}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: colors.primary }]} />
          <Text style={styles.legendText}>Period</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#4ECDC4' }]} />
          <Text style={styles.legendText}>Ovulation</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#F9A826' }]} />
          <Text style={styles.legendText}>Predicted</Text>
        </View>
      </View>

      <Text style={styles.instructionText}>
        Tap on any day to add period info, symptoms, mood, and notes. The app will predict your next cycle based on your data.
      </Text>

      <DayDetailsModal
        visible={modalVisible}
        date={selectedDate}
        data={periodData[selectedDate]}
        onClose={() => setModalVisible(false)}
        onSave={saveDayData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Section Styles
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  
  // Toggle Button Styles
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: '#FFF',
  },
  toggleButtonActive: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  toggleTextActive: {
    color: '#FFF',
  },
  
  // Flow Button Styles
  flowButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  flowButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  flowButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  flowText: {
    fontSize: 14,
    color: colors.text,
  },
  flowTextActive: {
    color: '#FFF',
  },
  
  // Mood Styles
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  moodButton: {
    width: '30%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  moodText: {
    fontSize: 12,
    marginTop: 4,
    color: colors.text,
  },
  moodTextActive: {
    color: '#FFF',
  },
  
  // Pain Scale Styles
  painScale: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  painButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  painButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  painText: {
    fontSize: 14,
    color: colors.text,
  },
  painTextActive: {
    color: '#FFF',
  },
  
  // Symptoms Styles
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  symptomButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  symptomText: {
    fontSize: 12,
    color: colors.text,
  },
  symptomTextActive: {
    color: '#FFF',
  },
  
  // Custom Symptoms Styles
  customSymptomContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  customSymptomInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  addSymptomButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customSymptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  customSymptomChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  customSymptomText: {
    fontSize: 12,
    color: colors.text,
  },
  
  // Notes Styles
  notesInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
  },
  
  // Calendar Icons
  periodIcon: {
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
  ovulationIcon: {
    position: 'absolute',
    bottom: 2,
    left: 2,
  },
  predictedIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  indicatorDots: {
    position: 'absolute',
    bottom: 1,
    left: '50%',
    flexDirection: 'row',
    transform: [{ translateX: -6 }],
  },
  indicatorDot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 1,
  },
  
  // Main Container
  container: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  predictionCard: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  predictionText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
  },
  navButtonText: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
  },
  monthYear: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: colors.lightText,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayButton: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dayText: {
    fontSize: 14,
    color: colors.text,
  },
  otherMonthDay: {
    opacity: 0.3,
  },
  otherMonthText: {
    color: colors.lightText,
  },
  periodDay: {
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  ovulationDay: {
    backgroundColor: '#4ECDC4',
    borderRadius: 20,
  },
  predictedDay: {
    backgroundColor: '#F9A826',
    borderRadius: 20,
  },
  highlightedText: {
    color: '#FFF',
    fontWeight: '600',
  },
  dot: {
    position: 'absolute',
    bottom: 2,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: colors.lightText,
  },
  instructionText: {
    fontSize: 12,
    color: colors.lightText,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default PeriodTracker;