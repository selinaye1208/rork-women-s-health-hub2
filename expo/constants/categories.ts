import { Category } from '@/types/category';

const categories: Category[] = [
  {
    id: '1',
    title: 'Nutrition',
    description: 'Healthy eating for women at every stage of life',
    icon: 'apple',
    color: '#F5A8C5',
    articles: [
      {
        id: '101',
        title: 'Iron Deficiency in Women: Prevention and Treatment',
        summary: 'Understanding iron needs and preventing anemia in women of reproductive age',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f',
        subcategory: 'Essential Nutrients'
      },
      {
        id: '102',
        title: 'Calcium and Vitamin D for Bone Health',
        summary: 'Essential nutrients for preventing osteoporosis and maintaining strong bones',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        subcategory: 'Essential Nutrients'
      },
      {
        id: '103',
        title: 'Folate and Neural Tube Defect Prevention',
        summary: 'The critical role of folic acid before and during pregnancy',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
        subcategory: 'Essential Nutrients'
      },
      {
        id: '104',
        title: 'Omega-3 Fatty Acids and Women\'s Heart Health',
        summary: 'How essential fatty acids support cardiovascular wellness in women',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
        subcategory: 'Essential Nutrients'
      },
      {
        id: '105',
        title: 'Nutrition During Menopause',
        summary: 'Dietary strategies to manage menopausal symptoms and health risks',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56',
        subcategory: 'Life Stage Nutrition'
      },
      {
        id: '106',
        title: 'Plant-Based Nutrition for Women',
        summary: 'Meeting nutritional needs on vegetarian and vegan diets',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        subcategory: 'Dietary Patterns'
      },
      {
        id: '107',
        title: 'Hydration and Women\'s Health',
        summary: 'The importance of proper hydration for female physiology',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca0',
        subcategory: 'Essential Nutrients'
      },
      {
        id: '108',
        title: 'Nutrition for Athletic Women',
        summary: 'Fueling performance and recovery for female athletes',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
        subcategory: 'Specialized Nutrition'
      },
      {
        id: '109',
        title: 'Eating for Hormonal Balance',
        summary: 'Foods that support healthy hormone production and regulation',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
        subcategory: 'Hormonal Health'
      },
      {
        id: '110',
        title: 'Gut Health and Women\'s Wellness',
        summary: 'The connection between digestive health and overall wellbeing',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b',
        subcategory: 'Digestive Health'
      },
      {
        id: '111',
        title: 'Antioxidants and Anti-Aging Nutrition',
        summary: 'Protective nutrients for healthy aging and disease prevention',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
        subcategory: 'Anti-Aging'
      },
      {
        id: '112',
        title: 'Nutrition During Breastfeeding',
        summary: 'Meeting increased nutritional needs while nursing',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed',
        subcategory: 'Life Stage Nutrition'
      },
      {
        id: '113',
        title: 'Managing PCOS Through Diet',
        summary: 'Nutritional strategies for polycystic ovary syndrome',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f',
        subcategory: 'Hormonal Health'
      },
      {
        id: '114',
        title: 'Supplements for Women\'s Health',
        summary: 'Evidence-based guide to vitamins and minerals for women',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063',
        subcategory: 'Supplements'
      },
      {
        id: '115',
        title: 'Nutrition for Fertility Enhancement',
        summary: 'Dietary factors that support reproductive health and conception',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
        subcategory: 'Reproductive Health'
      }
    ],
    subcategories: [
      {
        id: 'essential-nutrients',
        title: 'Essential Nutrients',
        articles: []
      },
      {
        id: 'life-stage-nutrition',
        title: 'Life Stage Nutrition',
        articles: []
      },
      {
        id: 'hormonal-health',
        title: 'Hormonal Health',
        articles: []
      },
      {
        id: 'digestive-health',
        title: 'Digestive Health',
        articles: []
      },
      {
        id: 'specialized-nutrition',
        title: 'Specialized Nutrition',
        articles: []
      }
    ]
  },
  {
    id: '2',
    title: 'Puberty',
    description: 'Understanding changes during adolescence',
    icon: 'flower',
    color: '#8E6BBF',
    articles: [
      {
        id: '201',
        title: 'Normal Pubertal Development in Girls',
        summary: 'Understanding the stages and timing of female puberty',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c',
        subcategory: 'Physical Development'
      },
      {
        id: '202',
        title: 'Early Puberty: Causes and Concerns',
        summary: 'When puberty begins before age 8 and what parents should know',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70',
        subcategory: 'Physical Development'
      },
      {
        id: '203',
        title: 'Menstrual Health Education for Adolescents',
        summary: 'Essential information about periods and menstrual hygiene',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac',
        subcategory: 'Menstrual Health'
      },
      {
        id: '204',
        title: 'Body Image and Self-Esteem During Puberty',
        summary: 'Supporting positive body image through adolescent changes',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
        subcategory: 'Emotional Wellbeing'
      },
      {
        id: '205',
        title: 'Delayed Puberty in Girls: When to Seek Help',
        summary: 'Understanding when pubertal delay requires medical evaluation',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136',
        subcategory: 'Physical Development'
      },
      {
        id: '206',
        title: 'Acne During Puberty: Causes and Treatment',
        summary: 'Understanding hormonal acne and effective treatment options',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec',
        subcategory: 'Skin Health'
      },
      {
        id: '207',
        title: 'Growth Spurts and Nutrition Needs',
        summary: 'Supporting healthy growth during adolescent development',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        subcategory: 'Health & Wellness'
      },
      {
        id: '208',
        title: 'Emotional Changes During Puberty',
        summary: 'Understanding mood swings and emotional development',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a',
        subcategory: 'Emotional Wellbeing'
      },
      {
        id: '209',
        title: 'Sleep and Adolescent Development',
        summary: 'The importance of sleep during puberty and teenage years',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
        subcategory: 'Health & Wellness'
      },
      {
        id: '210',
        title: 'Breast Development: What to Expect',
        summary: 'Normal breast development stages and common concerns',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56',
        subcategory: 'Physical Development'
      },
      {
        id: '211',
        title: 'Peer Pressure and Identity Formation',
        summary: 'Navigating social challenges during adolescence',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5',
        subcategory: 'Social Development'
      },
      {
        id: '212',
        title: 'Exercise and Physical Activity for Teens',
        summary: 'Building healthy fitness habits during puberty',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
        subcategory: 'Health & Wellness'
      },
      {
        id: '213',
        title: 'Hygiene and Personal Care During Puberty',
        summary: 'Essential hygiene practices for adolescent girls',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883',
        subcategory: 'Personal Care'
      },
      {
        id: '214',
        title: 'Communication with Parents During Puberty',
        summary: 'Tips for maintaining open dialogue during adolescent changes',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a',
        subcategory: 'Social Development'
      },
      {
        id: '215',
        title: 'Understanding Hormonal Changes in Puberty',
        summary: 'The science behind puberty and hormonal development',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063',
        subcategory: 'Physical Development'
      }
    ],
    subcategories: [
      {
        id: 'physical-development',
        title: 'Physical Development',
        articles: []
      },
      {
        id: 'emotional-wellbeing',
        title: 'Emotional Wellbeing',
        articles: []
      },
      {
        id: 'menstrual-health',
        title: 'Menstrual Health',
        articles: []
      },
      {
        id: 'social-development',
        title: 'Social Development',
        articles: []
      },
      {
        id: 'health-wellness',
        title: 'Health & Wellness',
        articles: []
      }
    ]
  },
  {
    id: '3',
    title: 'Reproductive Health',
    description: 'Information on fertility, contraception, and more',
    icon: 'heart',
    color: '#4ECDC4',
    articles: [
      {
        id: '301',
        title: 'Understanding Polycystic Ovary Syndrome (PCOS)',
        summary: 'Diagnosis, symptoms, and management of this common hormonal disorder',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f',
        subcategory: 'Hormonal Conditions'
      },
      {
        id: '302',
        title: 'Contraceptive Methods: Efficacy and Safety',
        summary: 'Evidence-based comparison of birth control options',
        readTime: '12 min read',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56',
        subcategory: 'Contraception'
      },
      {
        id: '303',
        title: 'Fertility Preservation Options for Women',
        summary: 'Modern techniques for preserving reproductive potential',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed',
        subcategory: 'Fertility'
      },
      {
        id: '304',
        title: 'Endometriosis: Diagnosis and Treatment',
        summary: 'Understanding this painful condition affecting 1 in 10 women',
        readTime: '11 min read',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063',
        subcategory: 'Gynecological Conditions'
      },
      {
        id: '305',
        title: 'Cervical Cancer Screening Guidelines',
        summary: 'Updated recommendations for Pap smears and HPV testing',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
        subcategory: 'Preventive Care'
      },
      {
        id: '306',
        title: 'Understanding Menstrual Cycles',
        summary: 'Normal cycle variations and when to seek medical advice',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac',
        subcategory: 'Menstrual Health'
      },
      {
        id: '307',
        title: 'Sexually Transmitted Infections: Prevention and Testing',
        summary: 'Comprehensive guide to STI prevention and screening',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f',
        subcategory: 'Sexual Health'
      },
      {
        id: '308',
        title: 'Pregnancy Planning and Preconception Health',
        summary: 'Optimizing health before conception for better outcomes',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
        subcategory: 'Fertility'
      },
      {
        id: '309',
        title: 'Ovarian Health and Cyst Management',
        summary: 'Understanding ovarian cysts and when treatment is needed',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b',
        subcategory: 'Gynecological Conditions'
      },
      {
        id: '310',
        title: 'Uterine Fibroids: Symptoms and Treatment Options',
        summary: 'Managing this common benign condition affecting many women',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a',
        subcategory: 'Gynecological Conditions'
      },
      {
        id: '311',
        title: 'Pelvic Floor Health and Dysfunction',
        summary: 'Understanding and maintaining pelvic floor muscle health',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        subcategory: 'Pelvic Health'
      },
      {
        id: '312',
        title: 'Hormonal Birth Control: Benefits and Risks',
        summary: 'Comprehensive overview of hormonal contraceptive options',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883',
        subcategory: 'Contraception'
      },
      {
        id: '313',
        title: 'Infertility: Causes and Treatment Approaches',
        summary: 'Understanding fertility challenges and available treatments',
        readTime: '11 min read',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
        subcategory: 'Fertility'
      },
      {
        id: '314',
        title: 'Menopause: Symptoms and Management',
        summary: 'Navigating the transition and managing menopausal symptoms',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
        subcategory: 'Life Transitions'
      },
      {
        id: '315',
        title: 'Breast Health and Self-Examination',
        summary: 'Maintaining breast health and early detection practices',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec',
        subcategory: 'Preventive Care'
      }
    ],
    subcategories: [
      {
        id: 'menstrual-health',
        title: 'Menstrual Health',
        articles: []
      },
      {
        id: 'contraception',
        title: 'Contraception',
        articles: []
      },
      {
        id: 'fertility',
        title: 'Fertility',
        articles: []
      },
      {
        id: 'gynecological-conditions',
        title: 'Gynecological Conditions',
        articles: []
      },
      {
        id: 'preventive-care',
        title: 'Preventive Care',
        articles: []
      }
    ]
  },
  {
    id: '4',
    title: 'Mental Health',
    description: 'Supporting your emotional and psychological wellbeing',
    icon: 'brain',
    color: '#F9A826',
    articles: [
      {
        id: '401',
        title: 'Perinatal Depression and Anxiety',
        summary: 'Recognition and treatment of mood disorders during pregnancy and postpartum',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773'
      },
      {
        id: '402',
        title: 'Hormones and Women\'s Mental Health',
        summary: 'How hormonal changes affect mood and cognitive function',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed'
      },
      {
        id: '403',
        title: 'Eating Disorders in Women',
        summary: 'Understanding anorexia, bulimia, and binge eating disorder',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5'
      },
      {
        id: '404',
        title: 'Stress Management for Working Mothers',
        summary: 'Evidence-based strategies for managing work-life balance stress',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
      },
      {
        id: '405',
        title: 'Menopause and Cognitive Health',
        summary: 'Understanding brain changes during menopause and protective strategies',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56'
      },
      {
        id: '406',
        title: 'Anxiety Disorders in Women',
        summary: 'Understanding and treating anxiety disorders specific to women',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773'
      },
      {
        id: '407',
        title: 'Body Dysmorphia and Self-Image',
        summary: 'Recognizing and addressing distorted body image concerns',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed'
      },
      {
        id: '408',
        title: 'Seasonal Affective Disorder in Women',
        summary: 'Understanding winter depression and light therapy benefits',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5'
      },
      {
        id: '409',
        title: 'Trauma and PTSD in Women',
        summary: 'Gender-specific aspects of trauma recovery and treatment',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
      },
      {
        id: '410',
        title: 'Sleep Disorders and Women\'s Mental Health',
        summary: 'The connection between sleep quality and emotional wellbeing',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56'
      },
      {
        id: '411',
        title: 'Mindfulness and Meditation for Women',
        summary: 'Stress reduction techniques and mindfulness practices',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773'
      },
      {
        id: '412',
        title: 'Postpartum Mental Health Beyond Depression',
        summary: 'Understanding anxiety, OCD, and psychosis after childbirth',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed'
      },
      {
        id: '413',
        title: 'Bipolar Disorder in Women',
        summary: 'Gender differences in bipolar disorder presentation and treatment',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5'
      },
      {
        id: '414',
        title: 'Substance Use and Women\'s Mental Health',
        summary: 'Understanding addiction patterns and recovery in women',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2'
      },
      {
        id: '415',
        title: 'Building Resilience and Emotional Intelligence',
        summary: 'Developing coping skills and emotional awareness',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56'
      }
    ]
  },
  {
    id: '5',
    title: 'Fitness & Exercise',
    description: 'Physical activity and wellness for women',
    icon: 'dumbbell',
    color: '#FF6B6B',
    articles: [
      {
        id: '501',
        title: 'Exercise During Pregnancy',
        summary: 'Safe and beneficial workouts for expecting mothers',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
        subcategory: 'Pregnancy Fitness'
      },
      {
        id: '502',
        title: 'Strength Training for Women',
        summary: 'Building muscle and bone density through resistance training',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        subcategory: 'Strength Training'
      },
      {
        id: '503',
        title: 'Postpartum Exercise Recovery',
        summary: 'Safely returning to fitness after childbirth',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
        subcategory: 'Postpartum Fitness'
      },
      {
        id: '504',
        title: 'Exercise and Menstrual Health',
        summary: 'How physical activity affects your cycle and symptoms',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac',
        subcategory: 'Menstrual Health'
      },
      {
        id: '505',
        title: 'Yoga for Women\'s Health',
        summary: 'Mind-body benefits of yoga practice for women',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a',
        subcategory: 'Mind-Body Exercise'
      },
      {
        id: '506',
        title: 'Cardiovascular Exercise Guidelines for Women',
        summary: 'Heart-healthy exercise recommendations based on NIH guidelines',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        subcategory: 'Cardiovascular Fitness'
      },
      {
        id: '507',
        title: 'Bone Health and Weight-Bearing Exercise',
        summary: 'Preventing osteoporosis through targeted physical activity',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
        subcategory: 'Bone Health'
      },
      {
        id: '508',
        title: 'Exercise and Hormonal Balance',
        summary: 'How physical activity affects women\'s hormones',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
        subcategory: 'Hormonal Health'
      },
      {
        id: '509',
        title: 'High-Intensity Interval Training for Women',
        summary: 'Maximizing fitness benefits with HIIT workouts',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a',
        subcategory: 'Cardiovascular Fitness'
      },
      {
        id: '510',
        title: 'Flexibility and Mobility for Women',
        summary: 'Maintaining range of motion throughout life',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a',
        subcategory: 'Flexibility'
      },
      {
        id: '511',
        title: 'Exercise for Menopause Symptoms',
        summary: 'Physical activity to manage menopausal changes',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56',
        subcategory: 'Life Stage Fitness'
      },
      {
        id: '512',
        title: 'Core Strengthening for Women',
        summary: 'Building a strong foundation for overall health',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        subcategory: 'Strength Training'
      },
      {
        id: '513',
        title: 'Exercise and Mental Health Benefits',
        summary: 'How physical activity improves mood and cognitive function',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a',
        subcategory: 'Mental Health'
      },
      {
        id: '514',
        title: 'Injury Prevention in Women\'s Fitness',
        summary: 'Reducing risk of exercise-related injuries',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
        subcategory: 'Injury Prevention'
      },
      {
        id: '515',
        title: 'Exercise Nutrition and Hydration',
        summary: 'Fueling your workouts for optimal performance',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        subcategory: 'Sports Nutrition'
      },
      {
        id: '516',
        title: 'Pelvic Floor Exercises for Women',
        summary: 'Strengthening the pelvic floor for better health',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
        subcategory: 'Pelvic Health'
      },
      {
        id: '517',
        title: 'Exercise for PCOS Management',
        summary: 'Physical activity strategies for polycystic ovary syndrome',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f',
        subcategory: 'Hormonal Health'
      },
      {
        id: '518',
        title: 'Balance and Fall Prevention',
        summary: 'Exercises to maintain stability and prevent falls',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a',
        subcategory: 'Balance Training'
      },
      {
        id: '519',
        title: 'Exercise Modifications for Chronic Conditions',
        summary: 'Adapting workouts for health conditions',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        subcategory: 'Adaptive Fitness'
      },
      {
        id: '520',
        title: 'Creating a Sustainable Exercise Routine',
        summary: 'Building long-term fitness habits that stick',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
        subcategory: 'Lifestyle Fitness'
      }
    ],
    subcategories: [
      {
        id: 'pregnancy-fitness',
        title: 'Pregnancy Fitness',
        articles: []
      },
      {
        id: 'strength-training',
        title: 'Strength Training',
        articles: []
      },
      {
        id: 'postpartum-fitness',
        title: 'Postpartum Fitness',
        articles: []
      },
      {
        id: 'mind-body-exercise',
        title: 'Mind-Body Exercise',
        articles: []
      },
      {
        id: 'cardiovascular-fitness',
        title: 'Cardiovascular Fitness',
        articles: []
      },
      {
        id: 'bone-health',
        title: 'Bone Health',
        articles: []
      },
      {
        id: 'hormonal-health',
        title: 'Hormonal Health',
        articles: []
      },
      {
        id: 'flexibility',
        title: 'Flexibility',
        articles: []
      },
      {
        id: 'life-stage-fitness',
        title: 'Life Stage Fitness',
        articles: []
      },
      {
        id: 'mental-health',
        title: 'Mental Health',
        articles: []
      },
      {
        id: 'injury-prevention',
        title: 'Injury Prevention',
        articles: []
      },
      {
        id: 'sports-nutrition',
        title: 'Sports Nutrition',
        articles: []
      },
      {
        id: 'pelvic-health',
        title: 'Pelvic Health',
        articles: []
      },
      {
        id: 'balance-training',
        title: 'Balance Training',
        articles: []
      },
      {
        id: 'adaptive-fitness',
        title: 'Adaptive Fitness',
        articles: []
      },
      {
        id: 'lifestyle-fitness',
        title: 'Lifestyle Fitness',
        articles: []
      }
    ]
  },
  {
    id: '6',
    title: 'Skin & Beauty',
    description: 'Skincare and beauty tips for healthy skin',
    icon: 'sparkles',
    color: '#FFB6C1',
    articles: [
      {
        id: '601',
        title: 'Hormonal Acne: Causes and Treatment',
        summary: 'Understanding and managing hormone-related breakouts',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec',
        subcategory: 'Acne & Breakouts'
      },
      {
        id: '602',
        title: 'Skincare During Pregnancy',
        summary: 'Safe skincare ingredients and routines for expecting mothers',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883',
        subcategory: 'Pregnancy Skincare'
      },
      {
        id: '603',
        title: 'Anti-Aging Skincare for Women',
        summary: 'Evidence-based approaches to healthy aging skin',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
        subcategory: 'Anti-Aging'
      },
      {
        id: '604',
        title: 'Sun Protection and Skin Cancer Prevention',
        summary: 'Protecting your skin from harmful UV radiation',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f',
        subcategory: 'Sun Protection'
      },
      {
        id: '605',
        title: 'Skincare for Different Life Stages',
        summary: 'Adapting your routine from teens to menopause',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56',
        subcategory: 'Life Stage Skincare'
      },
      {
        id: '606',
        title: 'Melasma and Hyperpigmentation in Women',
        summary: 'Understanding and treating hormone-related skin discoloration',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec',
        subcategory: 'Pigmentation'
      },
      {
        id: '607',
        title: 'Rosacea: Triggers and Management',
        summary: 'Managing this common inflammatory skin condition',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883',
        subcategory: 'Skin Conditions'
      },
      {
        id: '608',
        title: 'Eczema and Sensitive Skin Care',
        summary: 'Gentle skincare approaches for reactive skin',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
        subcategory: 'Skin Conditions'
      },
      {
        id: '609',
        title: 'Retinoids: Benefits and Safe Usage',
        summary: 'Understanding vitamin A derivatives for skin health',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f',
        subcategory: 'Active Ingredients'
      },
      {
        id: '610',
        title: 'Chemical vs Physical Sunscreens',
        summary: 'Choosing the right sun protection for your skin',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56',
        subcategory: 'Sun Protection'
      },
      {
        id: '611',
        title: 'Skincare Ingredients to Avoid During Pregnancy',
        summary: 'Safe beauty practices for expecting mothers',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883',
        subcategory: 'Pregnancy Skincare'
      },
      {
        id: '612',
        title: 'The Science of Collagen and Skin Aging',
        summary: 'Understanding collagen loss and prevention strategies',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
        subcategory: 'Anti-Aging'
      },
      {
        id: '613',
        title: 'Vitamin C in Skincare: Benefits and Application',
        summary: 'Maximizing the antioxidant benefits of vitamin C',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f',
        subcategory: 'Active Ingredients'
      },
      {
        id: '614',
        title: 'Skincare Routine Order and Layering',
        summary: 'Optimizing product application for best results',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56',
        subcategory: 'Skincare Basics'
      },
      {
        id: '615',
        title: 'Natural vs Synthetic Skincare Ingredients',
        summary: 'Understanding the science behind skincare formulations',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883',
        subcategory: 'Skincare Basics'
      },
      {
        id: '616',
        title: 'Skin Barrier Function and Repair',
        summary: 'Maintaining healthy skin barrier for optimal protection',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
        subcategory: 'Skin Health'
      },
      {
        id: '617',
        title: 'Exfoliation: Chemical vs Physical Methods',
        summary: 'Safe and effective exfoliation techniques',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f',
        subcategory: 'Skincare Techniques'
      },
      {
        id: '618',
        title: 'Skincare for Different Skin Types',
        summary: 'Customizing routines for oily, dry, and combination skin',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56',
        subcategory: 'Skincare Basics'
      },
      {
        id: '619',
        title: 'Environmental Factors and Skin Health',
        summary: 'Protecting skin from pollution and environmental damage',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883',
        subcategory: 'Environmental Protection'
      },
      {
        id: '620',
        title: 'Professional Skincare Treatments: What to Know',
        summary: 'Understanding dermatological procedures and their benefits',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
        subcategory: 'Professional Treatments'
      }
    ],
    subcategories: [
      {
        id: 'acne-breakouts',
        title: 'Acne & Breakouts',
        articles: []
      },
      {
        id: 'pregnancy-skincare',
        title: 'Pregnancy Skincare',
        articles: []
      },
      {
        id: 'anti-aging',
        title: 'Anti-Aging',
        articles: []
      },
      {
        id: 'sun-protection',
        title: 'Sun Protection',
        articles: []
      },
      {
        id: 'pigmentation',
        title: 'Pigmentation',
        articles: []
      },
      {
        id: 'skin-conditions',
        title: 'Skin Conditions',
        articles: []
      },
      {
        id: 'active-ingredients',
        title: 'Active Ingredients',
        articles: []
      },
      {
        id: 'skincare-basics',
        title: 'Skincare Basics',
        articles: []
      },
      {
        id: 'skin-health',
        title: 'Skin Health',
        articles: []
      },
      {
        id: 'skincare-techniques',
        title: 'Skincare Techniques',
        articles: []
      },
      {
        id: 'environmental-protection',
        title: 'Environmental Protection',
        articles: []
      },
      {
        id: 'professional-treatments',
        title: 'Professional Treatments',
        articles: []
      }
    ]
  },
  {
    id: '7',
    title: 'Sleep & Wellness',
    description: 'Rest and recovery for optimal health',
    icon: 'moon',
    color: '#9B59B6',
    articles: [
      {
        id: '701',
        title: 'Sleep Disorders in Women',
        summary: 'Understanding insomnia, sleep apnea, and other sleep issues',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
        subcategory: 'Sleep Disorders'
      },
      {
        id: '702',
        title: 'Sleep During Pregnancy',
        summary: 'Managing sleep challenges throughout pregnancy',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
        subcategory: 'Pregnancy Sleep'
      },
      {
        id: '703',
        title: 'Menopause and Sleep Quality',
        summary: 'Addressing sleep disruptions during menopause',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56',
        subcategory: 'Menopause Sleep'
      },
      {
        id: '704',
        title: 'Creating a Sleep-Friendly Environment',
        summary: 'Optimizing your bedroom for better rest',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
        subcategory: 'Sleep Hygiene'
      },
      {
        id: '705',
        title: 'Stress and Sleep Connection',
        summary: 'How stress affects sleep and strategies for better rest',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a',
        subcategory: 'Stress & Sleep'
      },
      {
        id: '706',
        title: 'Circadian Rhythms and Women\'s Health',
        summary: 'Understanding your body clock and optimizing sleep timing',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
        subcategory: 'Sleep Science'
      },
      {
        id: '707',
        title: 'Sleep Hygiene: Evidence-Based Practices',
        summary: 'Research-backed strategies for better sleep quality',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
        subcategory: 'Sleep Hygiene'
      },
      {
        id: '708',
        title: 'Nutrition and Sleep Quality',
        summary: 'How diet affects sleep patterns and quality',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        subcategory: 'Sleep Nutrition'
      },
      {
        id: '709',
        title: 'Technology and Sleep Disruption',
        summary: 'Managing screen time and blue light exposure',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a',
        subcategory: 'Digital Wellness'
      },
      {
        id: '710',
        title: 'Sleep Medications: Benefits and Risks',
        summary: 'Understanding sleep aids and their appropriate use',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063',
        subcategory: 'Sleep Medicine'
      },
      {
        id: '711',
        title: 'Shift Work and Sleep Health',
        summary: 'Managing sleep when working non-traditional hours',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
        subcategory: 'Work-Life Balance'
      },
      {
        id: '712',
        title: 'Exercise Timing and Sleep Quality',
        summary: 'Optimizing workout schedules for better rest',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
        subcategory: 'Exercise & Sleep'
      },
      {
        id: '713',
        title: 'Sleep and Immune Function',
        summary: 'How adequate rest supports your immune system',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
        subcategory: 'Sleep Health'
      },
      {
        id: '714',
        title: 'Relaxation Techniques for Better Sleep',
        summary: 'Evidence-based methods to calm the mind before bed',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a',
        subcategory: 'Relaxation'
      },
      {
        id: '715',
        title: 'Sleep Tracking: Benefits and Limitations',
        summary: 'Understanding sleep monitoring technology',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
        subcategory: 'Sleep Technology'
      },
      {
        id: '716',
        title: 'Caffeine and Sleep: Timing Matters',
        summary: 'How caffeine affects sleep and optimal consumption timing',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        subcategory: 'Sleep Nutrition'
      },
      {
        id: '717',
        title: 'Sleep Position and Spinal Health',
        summary: 'Optimizing sleep posture for better rest and health',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
        subcategory: 'Sleep Ergonomics'
      },
      {
        id: '718',
        title: 'Napping: Benefits and Best Practices',
        summary: 'Strategic napping for improved alertness and health',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
        subcategory: 'Sleep Strategies'
      },
      {
        id: '719',
        title: 'Sleep and Weight Management',
        summary: 'The connection between sleep quality and healthy weight',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        subcategory: 'Sleep Health'
      },
      {
        id: '720',
        title: 'Creating the Perfect Sleep Environment',
        summary: 'Optimizing temperature, lighting, and noise for better sleep',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
        subcategory: 'Sleep Environment'
      }
    ],
    subcategories: [
      {
        id: 'sleep-disorders',
        title: 'Sleep Disorders',
        articles: []
      },
      {
        id: 'pregnancy-sleep',
        title: 'Pregnancy Sleep',
        articles: []
      },
      {
        id: 'menopause-sleep',
        title: 'Menopause Sleep',
        articles: []
      },
      {
        id: 'sleep-hygiene',
        title: 'Sleep Hygiene',
        articles: []
      },
      {
        id: 'sleep-science',
        title: 'Sleep Science',
        articles: []
      },
      {
        id: 'sleep-nutrition',
        title: 'Sleep Nutrition',
        articles: []
      },
      {
        id: 'digital-wellness',
        title: 'Digital Wellness',
        articles: []
      },
      {
        id: 'sleep-medicine',
        title: 'Sleep Medicine',
        articles: []
      },
      {
        id: 'work-life-balance',
        title: 'Work-Life Balance',
        articles: []
      },
      {
        id: 'exercise-sleep',
        title: 'Exercise & Sleep',
        articles: []
      },
      {
        id: 'sleep-health',
        title: 'Sleep Health',
        articles: []
      },
      {
        id: 'relaxation',
        title: 'Relaxation',
        articles: []
      },
      {
        id: 'sleep-technology',
        title: 'Sleep Technology',
        articles: []
      },
      {
        id: 'sleep-ergonomics',
        title: 'Sleep Ergonomics',
        articles: []
      },
      {
        id: 'sleep-strategies',
        title: 'Sleep Strategies',
        articles: []
      },
      {
        id: 'sleep-environment',
        title: 'Sleep Environment',
        articles: []
      }
    ]
  },
  {
    id: '8',
    title: 'Heart Health',
    description: 'Cardiovascular wellness for women',
    icon: 'heart-pulse',
    color: '#E74C3C',
    articles: [
      {
        id: '801',
        title: 'Heart Disease in Women: Risk Factors',
        summary: 'Understanding unique cardiovascular risks for women',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b',
        subcategory: 'Risk Factors'
      },
      {
        id: '802',
        title: 'Pregnancy and Heart Health',
        summary: 'Cardiovascular changes and risks during pregnancy',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed',
        subcategory: 'Pregnancy Heart Health'
      },
      {
        id: '803',
        title: 'Menopause and Cardiovascular Risk',
        summary: 'How hormonal changes affect heart health',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
        subcategory: 'Menopause Heart Health'
      },
      {
        id: '804',
        title: 'Exercise for Heart Health',
        summary: 'Cardiovascular exercise recommendations for women',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        subcategory: 'Exercise & Heart'
      },
      {
        id: '805',
        title: 'Heart-Healthy Diet for Women',
        summary: 'Nutrition strategies for cardiovascular wellness',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        subcategory: 'Heart-Healthy Diet'
      },
      {
        id: '806',
        title: 'Blood Pressure Management in Women',
        summary: 'Understanding and controlling hypertension',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b',
        subcategory: 'Blood Pressure'
      },
      {
        id: '807',
        title: 'Cholesterol and Women\'s Heart Health',
        summary: 'Managing lipid levels for cardiovascular protection',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed',
        subcategory: 'Cholesterol Management'
      },
      {
        id: '808',
        title: 'Stress and Cardiovascular Disease',
        summary: 'How chronic stress affects heart health',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a',
        subcategory: 'Stress & Heart Health'
      },
      {
        id: '809',
        title: 'Heart Disease Prevention Strategies',
        summary: 'Evidence-based approaches to reduce cardiovascular risk',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
        subcategory: 'Prevention'
      },
      {
        id: '810',
        title: 'Women and Heart Attack Symptoms',
        summary: 'Recognizing unique signs of heart attacks in women',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        subcategory: 'Emergency Recognition'
      },
      {
        id: '811',
        title: 'Diabetes and Heart Disease in Women',
        summary: 'Managing cardiovascular risk with diabetes',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063',
        subcategory: 'Comorbid Conditions'
      },
      {
        id: '812',
        title: 'Heart-Healthy Lifestyle Changes',
        summary: 'Comprehensive lifestyle modifications for heart health',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        subcategory: 'Lifestyle Medicine'
      },
      {
        id: '813',
        title: 'Cardiac Rehabilitation for Women',
        summary: 'Recovery and prevention after heart events',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
        subcategory: 'Rehabilitation'
      },
      {
        id: '814',
        title: 'Sleep and Heart Health Connection',
        summary: 'How sleep quality affects cardiovascular wellness',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
        subcategory: 'Sleep & Heart Health'
      },
      {
        id: '815',
        title: 'Smoking Cessation and Heart Health',
        summary: 'The cardiovascular benefits of quitting smoking',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b',
        subcategory: 'Smoking Cessation'
      },
      {
        id: '816',
        title: 'Heart Health Screening Guidelines',
        summary: 'When and how often to get cardiovascular checkups',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed',
        subcategory: 'Screening & Prevention'
      },
      {
        id: '817',
        title: 'Arrhythmias in Women',
        summary: 'Understanding irregular heart rhythms and treatment',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
        subcategory: 'Heart Rhythm Disorders'
      },
      {
        id: '818',
        title: 'Heart Valve Disease in Women',
        summary: 'Recognizing and managing valvular heart conditions',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        subcategory: 'Structural Heart Disease'
      },
      {
        id: '819',
        title: 'Supplements for Heart Health',
        summary: 'Evidence-based supplements for cardiovascular support',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063',
        subcategory: 'Supplements'
      },
      {
        id: '820',
        title: 'Heart Health Through the Decades',
        summary: 'Age-specific cardiovascular health strategies',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        subcategory: 'Life Stage Heart Health'
      }
    ],
    subcategories: [
      {
        id: 'risk-factors',
        title: 'Risk Factors',
        articles: []
      },
      {
        id: 'pregnancy-heart-health',
        title: 'Pregnancy Heart Health',
        articles: []
      },
      {
        id: 'menopause-heart-health',
        title: 'Menopause Heart Health',
        articles: []
      },
      {
        id: 'exercise-heart',
        title: 'Exercise & Heart',
        articles: []
      },
      {
        id: 'heart-healthy-diet',
        title: 'Heart-Healthy Diet',
        articles: []
      },
      {
        id: 'blood-pressure',
        title: 'Blood Pressure',
        articles: []
      },
      {
        id: 'cholesterol-management',
        title: 'Cholesterol Management',
        articles: []
      },
      {
        id: 'stress-heart-health',
        title: 'Stress & Heart Health',
        articles: []
      },
      {
        id: 'prevention',
        title: 'Prevention',
        articles: []
      },
      {
        id: 'emergency-recognition',
        title: 'Emergency Recognition',
        articles: []
      },
      {
        id: 'comorbid-conditions',
        title: 'Comorbid Conditions',
        articles: []
      },
      {
        id: 'lifestyle-medicine',
        title: 'Lifestyle Medicine',
        articles: []
      },
      {
        id: 'rehabilitation',
        title: 'Rehabilitation',
        articles: []
      },
      {
        id: 'sleep-heart-health',
        title: 'Sleep & Heart Health',
        articles: []
      },
      {
        id: 'smoking-cessation',
        title: 'Smoking Cessation',
        articles: []
      },
      {
        id: 'screening-prevention',
        title: 'Screening & Prevention',
        articles: []
      },
      {
        id: 'heart-rhythm-disorders',
        title: 'Heart Rhythm Disorders',
        articles: []
      },
      {
        id: 'structural-heart-disease',
        title: 'Structural Heart Disease',
        articles: []
      },
      {
        id: 'supplements',
        title: 'Supplements',
        articles: []
      },
      {
        id: 'life-stage-heart-health',
        title: 'Life Stage Heart Health',
        articles: []
      }
    ]
  },
  {
    id: '9',
    title: 'Menstruation',
    description: 'Comprehensive menstrual health information and support',
    icon: 'calendar-days',
    color: '#E91E63',
    articles: [
      {
        id: '901',
        title: 'Understanding the Menstrual Cycle',
        summary: 'Complete guide to normal menstrual cycle phases and hormonal changes',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac',
        subcategory: 'Cycle Science'
      },
      {
        id: '902',
        title: 'Menstrual Hygiene: Products and Practices',
        summary: 'Evidence-based guide to menstrual products and hygiene practices',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883',
        subcategory: 'Menstrual Hygiene'
      },
      {
        id: '903',
        title: 'Heavy Menstrual Bleeding: Causes and Treatment',
        summary: 'Understanding menorrhagia and available treatment options',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063',
        subcategory: 'Menstrual Disorders'
      },
      {
        id: '904',
        title: 'Irregular Periods: When to Seek Help',
        summary: 'Understanding cycle variations and when medical evaluation is needed',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
        subcategory: 'Menstrual Disorders'
      },
      {
        id: '905',
        title: 'Premenstrual Syndrome (PMS) Management',
        summary: 'Evidence-based strategies for managing PMS symptoms',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a',
        subcategory: 'PMS & PMDD'
      },
      {
        id: '906',
        title: 'Premenstrual Dysphoric Disorder (PMDD)',
        summary: 'Understanding and treating severe premenstrual symptoms',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
        subcategory: 'PMS & PMDD'
      },
      {
        id: '907',
        title: 'Menstrual Pain: Causes and Relief Strategies',
        summary: 'Understanding dysmenorrhea and effective pain management',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b',
        subcategory: 'Pain Management'
      },
      {
        id: '908',
        title: 'Amenorrhea: Absent or Missed Periods',
        summary: 'Causes and treatment of primary and secondary amenorrhea',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed',
        subcategory: 'Menstrual Disorders'
      },
      {
        id: '909',
        title: 'Menstruation and Exercise Performance',
        summary: 'How menstrual cycle phases affect athletic performance',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
        subcategory: 'Menstruation & Lifestyle'
      },
      {
        id: '910',
        title: 'Nutrition for Menstrual Health',
        summary: 'Dietary strategies to support healthy menstrual cycles',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        subcategory: 'Menstrual Nutrition'
      },
      {
        id: '911',
        title: 'Menstrual Cycle Tracking and Fertility Awareness',
        summary: 'Using cycle tracking for health monitoring and family planning',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac',
        subcategory: 'Cycle Tracking'
      },
      {
        id: '912',
        title: 'Hormonal Birth Control and Menstruation',
        summary: 'How contraceptives affect menstrual cycles and bleeding patterns',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883',
        subcategory: 'Hormonal Influences'
      },
      {
        id: '913',
        title: 'Menopause Transition and Changing Periods',
        summary: 'Understanding perimenopause and menstrual changes',
        readTime: '9 min read',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56',
        subcategory: 'Life Transitions'
      },
      {
        id: '914',
        title: 'Menstrual Disorders and Underlying Conditions',
        summary: 'How PCOS, endometriosis, and other conditions affect periods',
        readTime: '11 min read',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f',
        subcategory: 'Associated Conditions'
      },
      {
        id: '915',
        title: 'Cultural and Social Aspects of Menstruation',
        summary: 'Addressing stigma and promoting menstrual equity',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5',
        subcategory: 'Social & Cultural'
      }
    ],
    subcategories: [
      {
        id: 'cycle-science',
        title: 'Cycle Science',
        articles: []
      },
      {
        id: 'menstrual-hygiene',
        title: 'Menstrual Hygiene',
        articles: []
      },
      {
        id: 'menstrual-disorders',
        title: 'Menstrual Disorders',
        articles: []
      },
      {
        id: 'pms-pmdd',
        title: 'PMS & PMDD',
        articles: []
      },
      {
        id: 'pain-management',
        title: 'Pain Management',
        articles: []
      },
      {
        id: 'menstruation-lifestyle',
        title: 'Menstruation & Lifestyle',
        articles: []
      },
      {
        id: 'menstrual-nutrition',
        title: 'Menstrual Nutrition',
        articles: []
      },
      {
        id: 'cycle-tracking',
        title: 'Cycle Tracking',
        articles: []
      },
      {
        id: 'hormonal-influences',
        title: 'Hormonal Influences',
        articles: []
      },
      {
        id: 'life-transitions',
        title: 'Life Transitions',
        articles: []
      },
      {
        id: 'associated-conditions',
        title: 'Associated Conditions',
        articles: []
      },
      {
        id: 'social-cultural',
        title: 'Social & Cultural',
        articles: []
      }
    ]
  }
];

export default categories;