import type { ClassLevel, Subject, ExamType } from '../types';

export const CLASS_LEVELS: ClassLevel[] = [
  'Creche', 'N1', 'N2', 'KG1', 'KG2',
  'Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6',
  'Basic 7', 'Basic 8', 'Basic 9'
];

export const EARLY_CHILDHOOD_LEVELS: ClassLevel[] = ['Creche', 'N1', 'N2', 'KG1', 'KG2'];
export const PRIMARY_LEVELS: ClassLevel[] = ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6'];
export const JHS_LEVELS: ClassLevel[] = ['Basic 7', 'Basic 8', 'Basic 9'];

export const SUBJECTS_BY_LEVEL: Record<string, Subject[]> = {
  'Creche': ['Literacy & Language', 'Numeracy', 'Environmental Studies', 'Physical & Psychosocial Development'],
  'N1': ['Literacy & Language', 'Numeracy', 'Environmental Studies', 'Physical & Psychosocial Development'],
  'N2': ['Literacy & Language', 'Numeracy', 'Environmental Studies', 'Physical & Psychosocial Development'],
  'KG1': ['Literacy & Language', 'Numeracy', 'Environmental Studies', 'Physical & Psychosocial Development'],
  'KG2': ['Literacy & Language', 'Numeracy', 'Environmental Studies', 'Physical & Psychosocial Development'],
  'Basic 1': ['English Language', 'Mathematics', 'Science', 'Social Studies', 'Computing', 'Creative Arts', 'RME', 'History', 'French', 'Ga/Twi', 'Career Technology'],
  'Basic 2': ['English Language', 'Mathematics', 'Science', 'Social Studies', 'Computing', 'Creative Arts', 'RME', 'History', 'French', 'Ga/Twi', 'Career Technology'],
  'Basic 3': ['English Language', 'Mathematics', 'Science', 'Social Studies', 'Computing', 'Creative Arts', 'RME', 'History', 'French', 'Ga/Twi', 'Career Technology'],
  'Basic 4': ['English Language', 'Mathematics', 'Science', 'Social Studies', 'Computing', 'Creative Arts', 'RME', 'History', 'French', 'Ga/Twi', 'Career Technology'],
  'Basic 5': ['English Language', 'Mathematics', 'Science', 'Social Studies', 'Computing', 'Creative Arts', 'RME', 'History', 'French', 'Ga/Twi', 'Career Technology'],
  'Basic 6': ['English Language', 'Mathematics', 'Science', 'Social Studies', 'Computing', 'Creative Arts', 'RME', 'History', 'French', 'Ga/Twi', 'Career Technology'],
  'Basic 7': ['English Language', 'Mathematics', 'Science', 'Social Studies', 'Computing', 'Creative Arts', 'RME', 'History', 'French', 'Ga/Twi', 'Career Technology'],
  'Basic 8': ['English Language', 'Mathematics', 'Science', 'Social Studies', 'Computing', 'Creative Arts', 'RME', 'History', 'French', 'Ga/Twi', 'Career Technology'],
  'Basic 9': ['English Language', 'Mathematics', 'Science', 'Social Studies', 'Computing', 'Creative Arts', 'RME', 'History', 'French', 'Ga/Twi', 'Career Technology'],
};

export const EXAM_TYPES: ExamType[] = [
  'End of Month Test',
  'End of Term Examination',
  'Mid-Term Test',
  'Class Test',
];

export const SPECIAL_EXAM_TYPES: Record<ClassLevel, ExamType[]> = {
  'Creche': [],
  'N1': [],
  'N2': [],
  'KG1': [],
  'KG2': [],
  'Basic 1': [],
  'Basic 2': [],
  'Basic 3': [],
  'Basic 4': [],
  'Basic 5': [],
  'Basic 6': ['Entrance Exam'],
  'Basic 7': [],
  'Basic 8': ['Transitional Exam'],
  'Basic 9': ['B.E.C.E Standard Exam'],
};

export const PRACTICAL_SUBJECTS_B7_B9: Subject[] = ['Computing', 'Science', 'Creative Arts', 'Career Technology'];
export const PRACTICAL_SUBJECTS_B6: Subject[] = ['Computing'];

export const PRACTICAL_QUESTION_TYPES: Record<Subject, string[]> = {
  'Computing': ['Programming Tasks', 'Flowchart Design', 'Algorithm Development', 'Web Page Design', 'Spreadsheet Activities', 'Database Activities', 'ICT Problem Solving Tasks', 'Data Handling Activities'],
  'Science': ['Experiments', 'Observation Activities', 'Scientific Investigations', 'Data Analysis', 'Interpretation of Results', 'Experimental Procedures', 'Scientific Problem Solving'],
  'Career Technology': ['Design Activities', 'Product Development Tasks', 'Entrepreneurship Activities', 'Home Management Tasks', 'Technical Drawing', 'Production Activities', 'Problem Solving Activities'],
  'Creative Arts': ['Drawing', 'Craft Work', 'Design Tasks', 'Visual Communication Activities', 'Art Appreciation Activities', 'Creative Production Tasks'],
  'RME': ['Stories', 'Moral Scenarios', 'Religious Scenarios', 'Case Studies', 'Passages', 'Real-Life Situations'],
  'English Language': [],
  'Mathematics': [],
  'Social Studies': [],
  'History': [],
  'French': [],
  'Ga/Twi': [],
  'Literacy & Language': [],
  'Numeracy': [],
  'Environmental Studies': [],
  'Physical & Psychosocial Development': [],
};

export const TOPICS_BY_SUBJECT_LEVEL: Record<string, Record<string, string[]>> = {
  'English Language': {
    'Basic 1': ['Nouns', 'Pronouns', 'Verbs', 'Simple Sentences', 'Reading Comprehension', 'Letter Recognition', 'Phonics', 'Vocabulary', 'Spelling', 'Capitalization', 'Punctuation'],
    'Basic 2': ['Nouns', 'Pronouns', 'Verbs', 'Adjectives', 'Simple Sentences', 'Reading Comprehension', 'Vocabulary', 'Spelling', 'Capitalization', 'Punctuation', 'Composition Writing'],
    'Basic 3': ['Parts of Speech', 'Tenses', 'Singular and Plural', 'Reading Comprehension', 'Vocabulary', 'Spelling', 'Composition Writing', 'Letter Writing', 'Punctuation'],
    'Basic 4': ['Parts of Speech', 'Tenses', 'Articles', 'Prepositions', 'Reading Comprehension', 'Vocabulary', 'Composition Writing', 'Letter Writing', 'Punctuation', 'Direct and Indirect Speech'],
    'Basic 5': ['Parts of Speech', 'Tenses', 'Clauses', 'Phrases', 'Reading Comprehension', 'Vocabulary', 'Composition Writing', 'Letter Writing', 'Punctuation', 'Direct and Indirect Speech', 'Active and Passive Voice'],
    'Basic 6': ['Parts of Speech', 'Tenses', 'Clauses', 'Phrases', 'Reading Comprehension', 'Vocabulary', 'Composition Writing', 'Formal Letter Writing', 'Informal Letter Writing', 'Punctuation', 'Direct and Indirect Speech', 'Active and Passive Voice', 'Concord'],
    'Basic 7': ['Grammar', 'Comprehension', 'Summary Writing', 'Composition - Narrative Essay', 'Composition - Descriptive Essay', 'Composition - Argumentative Essay', 'Composition - Formal Letter', 'Composition - Informal Letter', 'Literature - The Beacon of Light', 'Vocabulary', 'Punctuation', 'Tenses', 'Parts of Speech', 'Clauses and Phrases'],
    'Basic 8': ['Grammar', 'Comprehension', 'Summary Writing', 'Composition - Narrative Essay', 'Composition - Descriptive Essay', 'Composition - Argumentative Essay', 'Composition - Formal Letter', 'Composition - Informal Letter', 'Literature - The Beacon of Light', 'Vocabulary', 'Punctuation', 'Tenses', 'Parts of Speech', 'Figures of Speech', 'Clauses and Phrases'],
    'Basic 9': ['Grammar', 'Comprehension', 'Summary Writing', 'Composition - Narrative Essay', 'Composition - Descriptive Essay', 'Composition - Argumentative Essay', 'Composition - Formal Letter', 'Composition - Informal Letter', 'Literature - The Beacon of Light', 'Vocabulary', 'Punctuation', 'Tenses', 'Parts of Speech', 'Figures of Speech', 'Clauses and Phrases', 'Concord', 'Idioms and Proverbs'],
  },
  'Mathematics': {
    'Basic 1': ['Counting 1-100', 'Addition', 'Subtraction', 'Shapes', 'Patterns', 'Measurement', 'Money', 'Time'],
    'Basic 2': ['Addition', 'Subtraction', 'Multiplication', 'Shapes', 'Measurement', 'Money', 'Time', 'Fractions', 'Patterns'],
    'Basic 3': ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Fractions', 'Measurement', 'Money', 'Time', 'Geometry', 'Data Handling'],
    'Basic 4': ['Whole Numbers', 'Fractions', 'Decimals', 'Measurement', 'Geometry', 'Data Handling', 'Money', 'Time', 'Multiplication', 'Division'],
    'Basic 5': ['Whole Numbers', 'Fractions', 'Decimals', 'Percentages', 'Measurement', 'Geometry', 'Data Handling', 'Ratio', 'Algebra'],
    'Basic 6': ['Whole Numbers', 'Fractions', 'Decimals', 'Percentages', 'Measurement', 'Geometry', 'Data Handling', 'Ratio', 'Proportion', 'Algebra', 'Integers'],
    'Basic 7': ['Number and Numeration', 'Fractions', 'Decimals', 'Percentages', 'Integers', 'Algebra', 'Geometry', 'Measurement', 'Statistics', 'Probability', 'Ratio and Proportion', 'Sets'],
    'Basic 8': ['Number and Numeration', 'Fractions', 'Decimals', 'Percentages', 'Integers', 'Algebra', 'Geometry', 'Measurement', 'Statistics', 'Probability', 'Linear Equations', 'Sets', 'Trigonometry'],
    'Basic 9': ['Number and Numeration', 'Fractions', 'Decimals', 'Percentages', 'Integers', 'Algebra', 'Geometry', 'Measurement', 'Statistics', 'Probability', 'Linear Equations', 'Quadratic Equations', 'Sets', 'Trigonometry', 'Vectors'],
  },
  'Science': {
    'Basic 1': ['Living Things', 'Plants', 'Animals', 'Water', 'Air', 'Weather', 'Our Body', 'Health'],
    'Basic 2': ['Living Things', 'Plants', 'Animals', 'Water', 'Air', 'Weather', 'Our Body', 'Health', 'Energy'],
    'Basic 3': ['Living Things', 'Plants', 'Animals', 'Soil', 'Water', 'Air', 'Energy', 'Matter', 'Health'],
    'Basic 4': ['Living Things', 'Plants', 'Animals', 'Soil', 'Water', 'Energy', 'Matter', 'Health', 'Forces', 'Machines'],
    'Basic 5': ['Living Things', 'Ecosystems', 'Energy', 'Matter', 'Health', 'Forces', 'Machines', 'Electricity', 'Human Body Systems'],
    'Basic 6': ['Living Things', 'Ecosystems', 'Energy', 'Matter', 'Health', 'Forces', 'Machines', 'Electricity', 'Human Body Systems', 'Reproduction'],
    'Basic 7': ['Diversity of Matter', 'Cycles', 'Systems', 'Energy', 'Interactions of Matter', 'Humans and the Environment', 'Practical Activities'],
    'Basic 8': ['Diversity of Matter', 'Cycles', 'Systems', 'Energy', 'Interactions of Matter', 'Humans and the Environment', 'Practical Activities', 'Chemical Reactions'],
    'Basic 9': ['Diversity of Matter', 'Cycles', 'Systems', 'Energy', 'Interactions of Matter', 'Humans and the Environment', 'Practical Activities', 'Chemical Reactions', 'Electricity and Magnetism'],
  },
  'Social Studies': {
    'Basic 1': ['Family', 'School', 'Community', 'National Symbols', 'Rules and Laws'],
    'Basic 2': ['Family', 'School', 'Community', 'National Symbols', 'Rules and Laws', 'Our Environment'],
    'Basic 3': ['Family', 'Community', 'Our Environment', 'National Symbols', 'Government', 'Culture'],
    'Basic 4': ['Family', 'Community', 'Our Environment', 'Government', 'Culture', 'History of Ghana', 'Maps'],
    'Basic 5': ['Government', 'Culture', 'History of Ghana', 'Maps', 'Population', 'Resources', 'Environment'],
    'Basic 6': ['Government', 'Culture', 'History of Ghana', 'Maps', 'Population', 'Resources', 'Environment', 'Human Rights'],
    'Basic 7': ['Our Environment', 'Governance', 'Culture', 'Population', 'Resources', 'Human Rights', 'National Development'],
    'Basic 8': ['Our Environment', 'Governance', 'Culture', 'Population', 'Resources', 'Human Rights', 'National Development', 'International Relations'],
    'Basic 9': ['Our Environment', 'Governance', 'Culture', 'Population', 'Resources', 'Human Rights', 'National Development', 'International Relations', 'Sustainable Development'],
  },
  'Computing': {
    'Basic 1': ['Parts of a Computer', 'Uses of Computer', 'Keyboard', 'Mouse'],
    'Basic 2': ['Parts of a Computer', 'Uses of Computer', 'Keyboard', 'Mouse', 'Drawing with Computer'],
    'Basic 3': ['Computer Hardware', 'Computer Software', 'Keyboard Skills', 'Word Processing'],
    'Basic 4': ['Computer Hardware', 'Computer Software', 'Word Processing', 'Internet Basics'],
    'Basic 5': ['Computer Hardware', 'Computer Software', 'Word Processing', 'Spreadsheets', 'Internet'],
    'Basic 6': ['Computer Hardware', 'Computer Software', 'Word Processing', 'Spreadsheets', 'Internet', 'Programming Basics', 'Flowcharts'],
    'Basic 7': ['Introduction to Computing', 'Computer Hardware', 'Computer Software', 'Word Processing', 'Spreadsheets', 'Internet and Web', 'Programming', 'Algorithms', 'Flowcharts', 'Web Design', 'Database'],
    'Basic 8': ['Computer Systems', 'Networking', 'Word Processing', 'Spreadsheets', 'Programming', 'Algorithms', 'Web Design', 'Database', 'Data Handling', 'Cyber Security'],
    'Basic 9': ['Computer Systems', 'Networking', 'Programming', 'Algorithms', 'Web Design', 'Database', 'Data Handling', 'Cyber Security', 'Emerging Technologies', 'Problem Solving'],
  },
  'Creative Arts': {
    'Basic 1': ['Drawing', 'Colouring', 'Craft Work', 'Music', 'Dance'],
    'Basic 2': ['Drawing', 'Colouring', 'Craft Work', 'Music', 'Dance', 'Patterns'],
    'Basic 3': ['Drawing', 'Painting', 'Craft Work', 'Music', 'Dance', 'Patterns', 'Design'],
    'Basic 4': ['Drawing', 'Painting', 'Craft Work', 'Music', 'Dance', 'Patterns', 'Design', 'Textiles'],
    'Basic 5': ['Drawing', 'Painting', 'Craft Work', 'Music', 'Dance', 'Design', 'Textiles', 'Ceramics'],
    'Basic 6': ['Drawing', 'Painting', 'Craft Work', 'Music', 'Dance', 'Design', 'Textiles', 'Ceramics', 'Visual Communication'],
    'Basic 7': ['Visual Art', 'Performing Arts', 'Design', 'Textiles', 'Ceramics', 'Drawing', 'Craft Work', 'Visual Communication'],
    'Basic 8': ['Visual Art', 'Performing Arts', 'Design', 'Textiles', 'Ceramics', 'Drawing', 'Craft Work', 'Visual Communication', 'Art Appreciation'],
    'Basic 9': ['Visual Art', 'Performing Arts', 'Design', 'Textiles', 'Ceramics', 'Drawing', 'Craft Work', 'Visual Communication', 'Art Appreciation', 'Creative Production'],
  },
  'RME': {
    'Basic 1': ['God the Creator', 'Moral Lessons', 'Good Behaviour', 'Prayer'],
    'Basic 2': ['God the Creator', 'Moral Lessons', 'Good Behaviour', 'Prayer', 'Religious Leaders'],
    'Basic 3': ['God the Creator', 'Moral Lessons', 'Religious Festivals', 'Prayer', 'Religious Leaders'],
    'Basic 4': ['God the Creator', 'Moral Values', 'Religious Festivals', 'Religious Leaders', 'Commandments'],
    'Basic 5': ['God the Creator', 'Moral Values', 'Religious Festivals', 'Religious Leaders', 'Commandments', 'Civic Responsibility'],
    'Basic 6': ['God the Creator', 'Moral Values', 'Religious Festivals', 'Religious Leaders', 'Commandments', 'Civic Responsibility', 'Tolerance'],
    'Basic 7': ['God and Creation', 'Moral Values', 'Religious Teachings', 'Family Values', 'Community Living', 'Tolerance', 'Peace Building', 'Civic Responsibility', 'Honesty', 'Integrity'],
    'Basic 8': ['God and Creation', 'Moral Values', 'Religious Teachings', 'Family Values', 'Community Living', 'Tolerance', 'Peace Building', 'Civic Responsibility', 'Leadership', 'Citizenship'],
    'Basic 9': ['God and Creation', 'Moral Values', 'Religious Teachings', 'Family Values', 'Community Living', 'Tolerance', 'Peace Building', 'Civic Responsibility', 'Leadership', 'Citizenship', 'Respect', 'Responsibility'],
  },
  'History': {
    'Basic 1': ['My Family History', 'My School', 'My Community'],
    'Basic 2': ['My Family History', 'My School', 'My Community', 'Our Town'],
    'Basic 3': ['Our Town', 'Our Region', 'Traditional Leaders', 'Cultural Practices'],
    'Basic 4': ['Our Region', 'Traditional Leaders', 'Cultural Practices', 'Early Kingdoms'],
    'Basic 5': ['Early Kingdoms', 'European Contact', 'Trade', 'Independence'],
    'Basic 6': ['Independence of Ghana', 'Government', 'National Heroes', 'Economic Development'],
    'Basic 7': ['Pre-Colonial Ghana', 'European Contact', 'Trade and Commerce', 'Colonialism', 'Nationalism', 'Independence'],
    'Basic 8': ['Post-Independence Ghana', 'Governments of Ghana', 'Economic Development', 'African History', 'World History'],
    'Basic 9': ['Ghana History', 'African History', 'World History', 'International Organizations', 'Human Rights', 'Sustainable Development'],
  },
  'French': {
    'Basic 1': ['Greetings', 'Numbers 1-10', 'Colours', 'Family'],
    'Basic 2': ['Greetings', 'Numbers 1-20', 'Colours', 'Family', 'Days of the Week'],
    'Basic 3': ['Greetings', 'Numbers', 'Colours', 'Family', 'Days and Months', 'Animals'],
    'Basic 4': ['Greetings', 'Numbers', 'Family', 'School', 'Food', 'Animals', 'Parts of Body'],
    'Basic 5': ['Greetings', 'Numbers', 'Family', 'School', 'Food', 'Weather', 'Daily Activities'],
    'Basic 6': ['Greetings', 'Numbers', 'Family', 'School', 'Food', 'Weather', 'Daily Activities', 'Directions'],
    'Basic 7': ['La Famille', 'L\'école', 'Les Aliments', 'Le Temps', 'Les Activités Quotidiennes', 'La Ville', 'Les Vêtements', 'Les Professions'],
    'Basic 8': ['La Famille', 'L\'école', 'Les Aliments', 'Le Temps', 'Les Activités Quotidiennes', 'La Ville', 'Les Vêtements', 'Les Professions', 'Les Voyages'],
    'Basic 9': ['La Famille', 'L\'école', 'Les Aliments', 'Le Temps', 'Les Activités Quotidiennes', 'La Ville', 'Les Vêtements', 'Les Professions', 'Les Voyages', 'La Culture'],
  },
  'Ga/Twi': {
    'Basic 1': ['Greetings', 'Numbers', 'Family', 'Colours'],
    'Basic 2': ['Greetings', 'Numbers', 'Family', 'Colours', 'Days of the Week'],
    'Basic 3': ['Greetings', 'Numbers', 'Family', 'Animals', 'Food'],
    'Basic 4': ['Greetings', 'Numbers', 'Family', 'Animals', 'Food', 'Body Parts'],
    'Basic 5': ['Culture', 'Proverbs', 'Storytelling', 'Vocabulary', 'Grammar'],
    'Basic 6': ['Culture', 'Proverbs', 'Storytelling', 'Vocabulary', 'Grammar', 'Composition'],
    'Basic 7': ['Culture', 'Proverbs', 'Storytelling', 'Vocabulary', 'Grammar', 'Composition', 'Comprehension'],
    'Basic 8': ['Culture', 'Proverbs', 'Storytelling', 'Vocabulary', 'Grammar', 'Composition', 'Comprehension', 'Translation'],
    'Basic 9': ['Culture', 'Proverbs', 'Storytelling', 'Vocabulary', 'Grammar', 'Composition', 'Comprehension', 'Translation', 'Literature'],
  },
  'Career Technology': {
    'Basic 1': ['Tools and Materials', 'Safety', 'Simple Projects'],
    'Basic 2': ['Tools and Materials', 'Safety', 'Simple Projects', 'Home Management'],
    'Basic 3': ['Tools and Materials', 'Safety', 'Projects', 'Home Management', 'Sewing'],
    'Basic 4': ['Tools and Materials', 'Safety', 'Projects', 'Home Management', 'Sewing', 'Woodwork'],
    'Basic 5': ['Tools and Materials', 'Safety', 'Projects', 'Home Management', 'Sewing', 'Woodwork', 'Entrepreneurship'],
    'Basic 6': ['Tools and Materials', 'Safety', 'Projects', 'Home Management', 'Sewing', 'Woodwork', 'Entrepreneurship', 'Design'],
    'Basic 7': ['Design and Technology', 'Home Management', 'Entrepreneurship', 'Technical Drawing', 'Textiles', 'Woodwork', 'Problem Solving'],
    'Basic 8': ['Design and Technology', 'Home Management', 'Entrepreneurship', 'Technical Drawing', 'Textiles', 'Woodwork', 'Problem Solving', 'Product Development'],
    'Basic 9': ['Design and Technology', 'Home Management', 'Entrepreneurship', 'Technical Drawing', 'Textiles', 'Woodwork', 'Problem Solving', 'Product Development', 'Production Activities'],
  },
  'Literacy & Language': {
    'Creche': ['Basic Communication', 'Responding to Sounds', 'Eye Contact'],
    'N1': ['Songs and Rhymes', 'Storytelling', 'Colour Recognition', 'Shape Recognition'],
    'N2': ['Songs and Rhymes', 'Storytelling', 'Colour Recognition', 'Shape Recognition', 'Letter Recognition'],
    'KG1': ['Letter Recognition', 'Phonics', 'Simple Reading', 'Oral Language', 'Songs and Rhymes'],
    'KG2': ['Letter Recognition', 'Phonics', 'Simple Reading', 'Oral Language', 'Songs and Rhymes', 'Writing Readiness'],
  },
  'Numeracy': {
    'Creche': ['Grasping Objects', 'Sorting'],
    'N1': ['Counting 1-5', 'Sorting Objects', 'Colours', 'Shapes'],
    'N2': ['Counting 1-10', 'Sorting Objects', 'Colours', 'Shapes', 'Patterns'],
    'KG1': ['Counting 1-20', 'Basic Addition', 'Shapes', 'Sorting', 'Patterns'],
    'KG2': ['Counting 1-50', 'Addition', 'Subtraction', 'Shapes', 'Sorting', 'Patterns', 'Measurement'],
  },
  'Environmental Studies': {
    'Creche': ['Physical Environment'],
    'N1': ['Family', 'School', 'Animals', 'Plants'],
    'N2': ['Family', 'School', 'Community', 'Animals', 'Plants', 'Weather'],
    'KG1': ['Family', 'School', 'Community', 'Animals', 'Plants', 'Weather'],
    'KG2': ['Family', 'School', 'Community', 'Animals', 'Plants', 'Weather', 'Seasons'],
  },
  'Physical & Psychosocial Development': {
    'Creche': ['Movement', 'Walking', 'Grasping', 'Social Behaviour'],
    'N1': ['Motor Skills', 'Games', 'Coordination', 'Social Interaction'],
    'N2': ['Motor Skills', 'Games', 'Coordination', 'Social Interaction', 'Pencil Holding'],
    'KG1': ['Motor Skills', 'Games', 'Coordination', 'Social Interaction', 'Writing Skills'],
    'KG2': ['Motor Skills', 'Games', 'Coordination', 'Social Interaction', 'Writing Skills', 'Behaviour'],
  },
};

export const RME_STORY_THEMES = [
  'Honesty', 'Respect', 'Responsibility', 'Tolerance', 'Integrity',
  'Peace Building', 'Leadership', 'Citizenship', 'Family Values',
  'Community Living', 'Religious Teachings', 'Moral Values'
];

export const ENGLISH_B7_B9_SECTION_B = {
  grammar: { title: 'Grammar', defaultMarks: 15 },
  comprehension: { title: 'Comprehension', defaultMarks: 15 },
  summary: { title: 'Summary', defaultMarks: 10 },
  composition: { title: 'Composition', defaultMarks: 10 },
  literature: { title: 'Literature (The Beacon of Light)', defaultMarks: 10 },
};

export const ENGLISH_B1_B6_AREAS = [
  'Grammar',
  'Comprehension (Reading)',
  'Composition/Writing',
  'Vocabulary and Writing Conventions',
  'Oral Language',
];

export const COMPOSITION_TYPES = [
  'Narrative Essay', 'Descriptive Essay', 'Argumentative Essay',
  'Formal Letter', 'Informal Letter',
];

export const LITERARY_DEVICES = [
  'Simile', 'Metaphor', 'Personification', 'Hyperbole',
  'Alliteration', 'Repetition', 'Imagery',
];

export const DEFAULT_USERS: { id: string; name: string; role: 'admin' | 'teacher'; password: string; subject?: string }[] = [
  { id: 'admin1', name: 'Admin', role: 'admin', password: 'admin123' },
  { id: 'teacher1', name: 'Mr. Mensah', role: 'teacher', password: 'teacher123', subject: 'Mathematics' },
  { id: 'teacher2', name: 'Mrs. Addo', role: 'teacher', password: 'teacher123', subject: 'English Language' },
];

export const KG_ASSESSMENT_AREAS = {
  'KG1': [
    {
      name: 'Literacy & Language',
      criteria: ['Letter Recognition (A-Z)', 'Phonics (Letter Sounds)', 'Oral Language Skills', 'Listening Comprehension', 'Recitation of Rhymes/Songs']
    },
    {
      name: 'Numeracy',
      criteria: ['Counting 1-20', 'Number Recognition', 'Basic Addition with Objects', 'Shape Recognition', 'Sorting and Grouping']
    },
    {
      name: 'Environmental Studies',
      criteria: ['Identifying Family Members', 'School Community', 'Animals and Plants', 'Weather Recognition']
    },
    {
      name: 'Physical & Psychosocial Development',
      criteria: ['Fine Motor Skills', 'Gross Motor Skills', 'Social Interaction', 'Following Instructions', 'Coordination in Games']
    }
  ],
  'KG2': [
    {
      name: 'Literacy & Language',
      criteria: ['Letter Recognition and Writing', 'Phonics and Blending', 'Simple Reading', 'Oral Communication', 'Story Comprehension', 'Writing Readiness']
    },
    {
      name: 'Numeracy',
      criteria: ['Counting 1-50', 'Number Writing', 'Basic Addition', 'Basic Subtraction', 'Shape and Pattern Recognition', 'Simple Measurement']
    },
    {
      name: 'Environmental Studies',
      criteria: ['Family and Community', 'Animals and Plants', 'Weather and Seasons', 'Health and Hygiene']
    },
    {
      name: 'Physical & Psychosocial Development',
      criteria: ['Fine Motor Skills', 'Gross Motor Skills', 'Social Skills', 'Emotional Development', 'Creative Expression']
    }
  ]
};
