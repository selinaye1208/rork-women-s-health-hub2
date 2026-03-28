import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Clock } from 'lucide-react-native';
import categories from '@/constants/categories';
import colors from '@/constants/colors';

// Import article content
import { article as nutrition101 } from '@/articles/nutrition/101';
import { article as nutrition102 } from '@/articles/nutrition/102';
import { article as nutrition103 } from '@/articles/nutrition/103';
import { article as nutrition104 } from '@/articles/nutrition/104';
import { article as nutrition105 } from '@/articles/nutrition/105';
import { article as puberty201 } from '@/articles/puberty/201';
import { article as puberty202 } from '@/articles/puberty/202';
import { article as puberty203 } from '@/articles/puberty/203';
import { article as puberty204 } from '@/articles/puberty/204';
import { article as puberty205 } from '@/articles/puberty/205';
import { article as reproductive301 } from '@/articles/reproductive/301';
import { article as reproductive302 } from '@/articles/reproductive/302';
import { article as reproductive303 } from '@/articles/reproductive/303';
import { article as reproductive304 } from '@/articles/reproductive/304';
import { article as reproductive305 } from '@/articles/reproductive/305';
import { article as mental401 } from '@/articles/mental/401';
import { article as mental402 } from '@/articles/mental/402';
import { article as mental403 } from '@/articles/mental/403';
import { article as mental404 } from '@/articles/mental/404';
import { article as mental405 } from '@/articles/mental/405';
import { article as nutrition106 } from '@/articles/nutrition/106';
import { article as nutrition107 } from '@/articles/nutrition/107';
import { article as nutrition108 } from '@/articles/nutrition/108';
import { article as nutrition109 } from '@/articles/nutrition/109';
import { article as nutrition110 } from '@/articles/nutrition/110';
import { article as nutrition111 } from '@/articles/nutrition/111';
import { article as puberty206 } from '@/articles/puberty/206';
import { article as puberty207 } from '@/articles/puberty/207';
import { article as reproductive306 } from '@/articles/reproductive/306';
import { article as reproductive307 } from '@/articles/reproductive/307';
import { article as mental406 } from '@/articles/mental/406';
import { article as mental407 } from '@/articles/mental/407';
import { article as nutrition112 } from '@/articles/nutrition/112';
import { article as nutrition113 } from '@/articles/nutrition/113';
import { article as nutrition114 } from '@/articles/nutrition/114';
import { article as nutrition115 } from '@/articles/nutrition/115';
import { article as puberty208 } from '@/articles/puberty/208';
import { article as puberty209 } from '@/articles/puberty/209';
import { article as puberty210 } from '@/articles/puberty/210';
import { article as puberty211 } from '@/articles/puberty/211';
import { article as puberty212 } from '@/articles/puberty/212';
import { article as puberty213 } from '@/articles/puberty/213';
import { article as puberty214 } from '@/articles/puberty/214';
import { article as puberty215 } from '@/articles/puberty/215';
import { article as reproductive308 } from '@/articles/reproductive/308';
import { article as reproductive309 } from '@/articles/reproductive/309';
import { article as reproductive310 } from '@/articles/reproductive/310';
import { article as reproductive311 } from '@/articles/reproductive/311';
import { article as reproductive312 } from '@/articles/reproductive/312';
import { article as reproductive313 } from '@/articles/reproductive/313';
import { article as reproductive314 } from '@/articles/reproductive/314';
import { article as reproductive315 } from '@/articles/reproductive/315';
import { article as mental408 } from '@/articles/mental/408';
import { article as mental409 } from '@/articles/mental/409';
import { article as mental410 } from '@/articles/mental/410';
import { article as mental411 } from '@/articles/mental/411';
import { article as mental412 } from '@/articles/mental/412';
import { article as mental413 } from '@/articles/mental/413';
import { article as mental414 } from '@/articles/mental/414';
import { article as mental415 } from '@/articles/mental/415';
import { article as fitness501 } from '@/articles/fitness/501';
import { article as fitness502 } from '@/articles/fitness/502';
import { article as fitness503 } from '@/articles/fitness/503';
import { article as fitness504 } from '@/articles/fitness/504';
import { article as fitness505 } from '@/articles/fitness/505';
import { article as fitness506 } from '@/articles/fitness/506';
import { article as fitness507 } from '@/articles/fitness/507';
import { article as fitness508 } from '@/articles/fitness/508';
import { article as fitness509 } from '@/articles/fitness/509';
import { article as fitness510 } from '@/articles/fitness/510';
import { article as fitness511 } from '@/articles/fitness/511';
import { article as fitness512 } from '@/articles/fitness/512';
import { article as fitness513 } from '@/articles/fitness/513';
import { article as fitness514 } from '@/articles/fitness/514';
import { article as fitness515 } from '@/articles/fitness/515';
import { article as fitness516 } from '@/articles/fitness/516';
import { article as fitness517 } from '@/articles/fitness/517';
import { article as fitness518 } from '@/articles/fitness/518';
import { article as fitness519 } from '@/articles/fitness/519';
import { article as fitness520 } from '@/articles/fitness/520';
import { article as skinbeauty601 } from '@/articles/skinbeauty/601';
import { article as skinbeauty602 } from '@/articles/skinbeauty/602';
import { article as skinbeauty603 } from '@/articles/skinbeauty/603';
import { article as skinbeauty604 } from '@/articles/skinbeauty/604';
import { article as skinbeauty605 } from '@/articles/skinbeauty/605';
import { article as skinbeauty606 } from '@/articles/skinbeauty/606';
import { article as skinbeauty607 } from '@/articles/skinbeauty/607';
import { article as skinbeauty608 } from '@/articles/skinbeauty/608';
import { article as skinbeauty609 } from '@/articles/skinbeauty/609';
import { article as skinbeauty610 } from '@/articles/skinbeauty/610';
import { article as skinbeauty611 } from '@/articles/skinbeauty/611';
import { article as skinbeauty612 } from '@/articles/skinbeauty/612';
import { article as skinbeauty613 } from '@/articles/skinbeauty/613';
import { article as skinbeauty614 } from '@/articles/skinbeauty/614';
import { article as skinbeauty615 } from '@/articles/skinbeauty/615';
import { article as skinbeauty616 } from '@/articles/skinbeauty/616';
import { article as skinbeauty617 } from '@/articles/skinbeauty/617';
import { article as skinbeauty618 } from '@/articles/skinbeauty/618';
import { article as skinbeauty619 } from '@/articles/skinbeauty/619';
import { article as skinbeauty620 } from '@/articles/skinbeauty/620';
import { article as sleep701 } from '@/articles/sleep/701';
import { article as sleep702 } from '@/articles/sleep/702';
import { article as sleep703 } from '@/articles/sleep/703';
import { article as sleep704 } from '@/articles/sleep/704';
import { article as sleep705 } from '@/articles/sleep/705';
import { article as sleep706 } from '@/articles/sleep/706';
import { article as sleep707 } from '@/articles/sleep/707';
import { article as sleep708 } from '@/articles/sleep/708';
import { article as sleep709 } from '@/articles/sleep/709';
import { article as sleep710 } from '@/articles/sleep/710';
import { article as sleep711 } from '@/articles/sleep/711';
import { article as sleep712 } from '@/articles/sleep/712';
import { article as sleep713 } from '@/articles/sleep/713';
import { article as sleep714 } from '@/articles/sleep/714';
import { article as sleep715 } from '@/articles/sleep/715';
import { article as sleep716 } from '@/articles/sleep/716';
import { article as sleep717 } from '@/articles/sleep/717';
import { article as sleep718 } from '@/articles/sleep/718';
import { article as sleep719 } from '@/articles/sleep/719';
import { article as sleep720 } from '@/articles/sleep/720';
import { article as heart801 } from '@/articles/heart/801';
import { article as heart802 } from '@/articles/heart/802';
import { article as heart803 } from '@/articles/heart/803';
import { article as heart804 } from '@/articles/heart/804';
import { article as heart805 } from '@/articles/heart/805';
import { article as heart806 } from '@/articles/heart/806';
import { article as heart807 } from '@/articles/heart/807';
import { article as heart808 } from '@/articles/heart/808';
import { article as heart809 } from '@/articles/heart/809';
import { article as heart810 } from '@/articles/heart/810';
import { article as heart811 } from '@/articles/heart/811';
import { article as heart812 } from '@/articles/heart/812';
import { article as heart813 } from '@/articles/heart/813';
import { article as heart814 } from '@/articles/heart/814';
import { article as heart815 } from '@/articles/heart/815';
import { article as heart816 } from '@/articles/heart/816';
import { article as heart817 } from '@/articles/heart/817';
import { article as heart818 } from '@/articles/heart/818';
import { article as heart819 } from '@/articles/heart/819';
import { article as heart820 } from '@/articles/heart/820';

const articleContent: Record<string, any> = {
  '101': nutrition101,
  '102': nutrition102,
  '103': nutrition103,
  '104': nutrition104,
  '105': nutrition105,
  '106': nutrition106,
  '107': nutrition107,
  '108': nutrition108,
  '109': nutrition109,
  '110': nutrition110,
  '111': nutrition111,
  '112': nutrition112,
  '113': nutrition113,
  '114': nutrition114,
  '115': nutrition115,
  '201': puberty201,
  '202': puberty202,
  '203': puberty203,
  '204': puberty204,
  '205': puberty205,
  '206': puberty206,
  '207': puberty207,
  '208': puberty208,
  '209': puberty209,
  '210': puberty210,
  '211': puberty211,
  '212': puberty212,
  '213': puberty213,
  '214': puberty214,
  '215': puberty215,
  '301': reproductive301,
  '302': reproductive302,
  '303': reproductive303,
  '304': reproductive304,
  '305': reproductive305,
  '306': reproductive306,
  '307': reproductive307,
  '308': reproductive308,
  '309': reproductive309,
  '310': reproductive310,
  '311': reproductive311,
  '312': reproductive312,
  '313': reproductive313,
  '314': reproductive314,
  '315': reproductive315,
  '401': mental401,
  '402': mental402,
  '403': mental403,
  '404': mental404,
  '405': mental405,
  '406': mental406,
  '407': mental407,
  '408': mental408,
  '409': mental409,
  '410': mental410,
  '411': mental411,
  '412': mental412,
  '413': mental413,
  '414': mental414,
  '415': mental415,
  '501': fitness501,
  '502': fitness502,
  '503': fitness503,
  '504': fitness504,
  '505': fitness505,
  '506': fitness506,
  '507': fitness507,
  '508': fitness508,
  '509': fitness509,
  '510': fitness510,
  '511': fitness511,
  '512': fitness512,
  '513': fitness513,
  '514': fitness514,
  '515': fitness515,
  '516': fitness516,
  '517': fitness517,
  '518': fitness518,
  '519': fitness519,
  '520': fitness520,
  '601': skinbeauty601,
  '602': skinbeauty602,
  '603': skinbeauty603,
  '604': skinbeauty604,
  '605': skinbeauty605,
  '606': skinbeauty606,
  '607': skinbeauty607,
  '608': skinbeauty608,
  '609': skinbeauty609,
  '610': skinbeauty610,
  '611': skinbeauty611,
  '612': skinbeauty612,
  '613': skinbeauty613,
  '614': skinbeauty614,
  '615': skinbeauty615,
  '616': skinbeauty616,
  '617': skinbeauty617,
  '618': skinbeauty618,
  '619': skinbeauty619,
  '620': skinbeauty620,
  '701': sleep701,
  '702': sleep702,
  '703': sleep703,
  '704': sleep704,
  '705': sleep705,
  '706': sleep706,
  '707': sleep707,
  '708': sleep708,
  '709': sleep709,
  '710': sleep710,
  '711': sleep711,
  '712': sleep712,
  '713': sleep713,
  '714': sleep714,
  '715': sleep715,
  '716': sleep716,
  '717': sleep717,
  '718': sleep718,
  '719': sleep719,
  '720': sleep720,
  '801': heart801,
  '802': heart802,
  '803': heart803,
  '804': heart804,
  '805': heart805,
  '806': heart806,
  '807': heart807,
  '808': heart808,
  '809': heart809,
  '810': heart810,
  '811': heart811,
  '812': heart812,
  '813': heart813,
  '814': heart814,
  '815': heart815,
  '816': heart816,
  '817': heart817,
  '818': heart818,
  '819': heart819,
  '820': heart820,
};

export default function ArticleScreen() {
  const { categoryId, id } = useLocalSearchParams<{ categoryId: string; id: string }>();
  
  const category = categories.find(c => c.id === categoryId);
  const article = category?.articles.find(a => a.id === id);
  const content = articleContent[id || ''];

  if (!article || !content) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Article not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: '',
          headerTransparent: true,
          headerTintColor: '#FFF',
        }}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${article.image}?w=800&auto=format&q=80` }}
            style={styles.image}
            contentFit="cover"
          />
          <View style={styles.overlay} />
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{content.title}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.readTimeContainer}>
              <Clock size={14} color={colors.lightText} />
              <Text style={styles.readTime}>{article.readTime}</Text>
            </View>
            <Text style={styles.category}>{category?.title}</Text>
          </View>
          
          <Text style={styles.content}>{content.content}</Text>
          
          {content.citations && (
            <View style={styles.citationsContainer}>
              <Text style={styles.citationsTitle}>References</Text>
              {content.citations.map((citation: string, index: number) => (
                <Text key={index} style={styles.citation}>
                  {index + 1}. {citation}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.background,
    marginTop: -24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTime: {
    fontSize: 14,
    color: colors.lightText,
    marginLeft: 4,
  },
  category: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    marginBottom: 32,
  },
  citationsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 20,
  },
  citationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  citation: {
    fontSize: 14,
    color: colors.lightText,
    marginBottom: 8,
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
  },
});