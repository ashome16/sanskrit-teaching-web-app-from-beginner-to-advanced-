export interface Vibhakti30Question {
  id: number;
  part: 1 | 2 | 3;
  partTitle: string;
  topic: string;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; label: string; text?: string }[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  correctLabel: string;
  correctText?: string;
  explanation: string;
  audioTerm: string;
}

export const VIBHAKTI_PARTS = [
  { id: 'all', partNumber: 0, title: 'All 30 Questions (Full Master Test)', shortTitle: 'All 30 Questions', range: 'Qs 1–30', count: 30, icon: '🌟' },
  { id: 'part1', partNumber: 1, title: 'Part 1: Foundational Forms (बालक & राम)', shortTitle: 'Part 1: Foundational', range: 'Qs 1–10', count: 10, icon: '📘' },
  { id: 'part2', partNumber: 2, title: 'Part 2: Sentence Roles & Kārakas', shortTitle: 'Part 2: Sentence Roles', range: 'Qs 11–20', count: 10, icon: '📙' },
  { id: 'part3', partNumber: 3, title: 'Part 3: Applied Nouns (गज, वृक्ष, शिष्य)', shortTitle: 'Part 3: Applied Nouns', range: 'Qs 21–30', count: 10, icon: '📗' },
] as const;

export const VIBHAKTI_30_QUESTIONS: Vibhakti30Question[] = [
  {
    "id": 1,
    "part": 1,
    "partTitle": "Part 1: Foundational Forms (बालक & राम)",
    "question": "Which of the following forms represents the masculine singular Prathama Vibhakti (Nominative Case) for the noun 'बालक' (boy)?",
    "options": [
      {
        "key": "A",
        "text": "बालकम् [Dvitiya Vibhakti / Accusative]",
        "label": "बालकम् [Dvitiya Vibhakti / Accusative]"
      },
      {
        "key": "B",
        "text": "बालकः [Prathama Vibhakti / Nominative Case]",
        "label": "बालकः [Prathama Vibhakti / Nominative Case]"
      },
      {
        "key": "C",
        "text": "बालकेण [Tritiya Vibhakti / Instrumental]",
        "label": "बालकेण [Tritiya Vibhakti / Instrumental]"
      },
      {
        "key": "D",
        "text": "बालकाय [Chaturthi Vibhakti / Dative]",
        "label": "बालकाय [Chaturthi Vibhakti / Dative]"
      }
    ],
    "correctKey": "B",
    "correctText": "बालकः [Prathama Vibhakti / Nominative Case]",
    "explanation": "Correct! 'बालकः' represents the nominative subject form in the singular.",
    "topic": "प्रथमा विभक्ति (Nominative / Subject)",
    "audioTerm": "बालकः",
    "correctLabel": "B) बालकः [Prathama Vibhakti / Nominative Case]"
  },
  {
    "id": 2,
    "part": 1,
    "partTitle": "Part 1: Foundational Forms (बालक & राम)",
    "question": "Which singular form of the noun 'राम' (Rama) indicates the object receiving the action (Dvitiya Vibhakti / Accusative Case)?",
    "options": [
      {
        "key": "A",
        "text": "रामः [Prathama Vibhakti / Nominative]",
        "label": "रामः [Prathama Vibhakti / Nominative]"
      },
      {
        "key": "B",
        "text": "रामेण [Tritiya Vibhakti / Instrumental]",
        "label": "रामेण [Tritiya Vibhakti / Instrumental]"
      },
      {
        "key": "C",
        "text": "रामम् [Dvitiya Vibhakti / Accusative Case]",
        "label": "रामम् [Dvitiya Vibhakti / Accusative Case]"
      },
      {
        "key": "D",
        "text": "रामाय [Chaturthi Vibhakti / Dative]",
        "label": "रामाय [Chaturthi Vibhakti / Dative]"
      }
    ],
    "correctKey": "C",
    "correctText": "रामम् [Dvitiya Vibhakti / Accusative Case]",
    "explanation": "Correct! 'रामम्' is the singular object form (Dvitiya Vibhakti).",
    "topic": "द्वितीया विभक्ति (Accusative / Object)",
    "audioTerm": "रामम्",
    "correctLabel": "C) रामम् [Dvitiya Vibhakti / Accusative Case]"
  },
  {
    "id": 3,
    "part": 1,
    "partTitle": "Part 1: Foundational Forms (बालक & राम)",
    "question": "If you want to say an action is done \"by Rama\" or \"with Rama\" using the Tritiya Vibhakti (Instrumental Case), which singular form should you choose?",
    "options": [
      {
        "key": "A",
        "text": "रामेण [Tritiya Vibhakti / Instrumental Case]",
        "label": "रामेण [Tritiya Vibhakti / Instrumental Case]"
      },
      {
        "key": "B",
        "text": "रामात् [Panchami Vibhakti / Ablative]",
        "label": "रामात् [Panchami Vibhakti / Ablative]"
      },
      {
        "key": "C",
        "text": "रामस्य [Shashti Vibhakti / Genitive]",
        "label": "रामस्य [Shashti Vibhakti / Genitive]"
      },
      {
        "key": "D",
        "text": "रामे [Saptami Vibhakti / Locative]",
        "label": "रामे [Saptami Vibhakti / Locative]"
      }
    ],
    "correctKey": "A",
    "correctText": "रामेण [Tritiya Vibhakti / Instrumental Case]",
    "explanation": "Correct! 'रामेण' is the correct instrumental singular form showing agency or accompaniment.",
    "topic": "तृतीया विभक्ति (Instrumental / Means)",
    "audioTerm": "रामेण",
    "correctLabel": "A) रामेण [Tritiya Vibhakti / Instrumental Case]"
  },
  {
    "id": 4,
    "part": 1,
    "partTitle": "Part 1: Foundational Forms (बालक & राम)",
    "question": "Which singular form represents the Chaturthi Vibhakti (Dative Case) used for the recipient or purpose of giving, using the noun 'बालक' (boy)?",
    "options": [
      {
        "key": "A",
        "text": "बालकस्य [Shashti Vibhakti / Genitive]",
        "label": "बालकस्य [Shashti Vibhakti / Genitive]"
      },
      {
        "key": "B",
        "text": "बालकात [Panchami Vibhakti / Ablative]",
        "label": "बालकात [Panchami Vibhakti / Ablative]"
      },
      {
        "key": "C",
        "text": "बालके [Saptami Vibhakti / Locative]",
        "label": "बालके [Saptami Vibhakti / Locative]"
      },
      {
        "key": "D",
        "text": "बालकाय [Chaturthi Vibhakti / Dative Case]",
        "label": "बालकाय [Chaturthi Vibhakti / Dative Case]"
      }
    ],
    "correctKey": "D",
    "correctText": "बालकाय [Chaturthi Vibhakti / Dative Case]",
    "explanation": "Correct! 'बालकाय' is the dative case form indicating a recipient or purpose.",
    "topic": "चतुर्थी विभक्ति (Dative / Recipient)",
    "audioTerm": "बालकाय",
    "correctLabel": "D) बालकाय [Chaturthi Vibhakti / Dative Case]"
  },
  {
    "id": 5,
    "part": 1,
    "partTitle": "Part 1: Foundational Forms (बालक & राम)",
    "question": "Which form of 'राम' (Rama) denotes separation or origin (meaning \"from Rama\") corresponding to the Panchami Vibhakti (Ablative Case)?",
    "options": [
      {
        "key": "A",
        "text": "रामात् [Panchami Vibhakti / Ablative Case]",
        "label": "रामात् [Panchami Vibhakti / Ablative Case]"
      },
      {
        "key": "B",
        "text": "रामे [Saptami Vibhakti / Locative]",
        "label": "रामे [Saptami Vibhakti / Locative]"
      },
      {
        "key": "C",
        "text": "रामस्य [Shashti Vibhakti / Genitive]",
        "label": "रामस्य [Shashti Vibhakti / Genitive]"
      },
      {
        "key": "D",
        "text": "रामाय [Chaturthi Vibhakti / Dative]",
        "label": "रामाय [Chaturthi Vibhakti / Dative]"
      }
    ],
    "correctKey": "A",
    "correctText": "रामात् [Panchami Vibhakti / Ablative Case]",
    "explanation": "Correct! 'रामात्' represents the ablative singular case signifying separation or source.",
    "topic": "पञ्चमी विभक्ति (Ablative / Separation)",
    "audioTerm": "रामात्",
    "correctLabel": "A) रामात् [Panchami Vibhakti / Ablative Case]"
  },
  {
    "id": 6,
    "part": 1,
    "partTitle": "Part 1: Foundational Forms (बालक & राम)",
    "question": "To indicate possession or relationship, such as \"of Rama\" or \"Rama's\", which Shashti Vibhakti (Genitive Case) singular form is correct?",
    "options": [
      {
        "key": "A",
        "text": "रामम् [Dvitiya Vibhakti / Accusative]",
        "label": "रामम् [Dvitiya Vibhakti / Accusative]"
      },
      {
        "key": "B",
        "text": "रामस्य [Shashti Vibhakti / Genitive Case]",
        "label": "रामस्य [Shashti Vibhakti / Genitive Case]"
      },
      {
        "key": "C",
        "text": "रामेण [Tritiya Vibhakti / Instrumental]",
        "label": "रामेण [Tritiya Vibhakti / Instrumental]"
      },
      {
        "key": "D",
        "text": "रामात् [Panchami Vibhakti / Ablative]",
        "label": "रामात् [Panchami Vibhakti / Ablative]"
      }
    ],
    "correctKey": "B",
    "correctText": "रामस्य [Shashti Vibhakti / Genitive Case]",
    "explanation": "Correct! 'रामस्य' indicates possession or association (\"of Rama\").",
    "topic": "षष्ठी विभक्ति (Genitive / Relation)",
    "audioTerm": "रामस्य",
    "correctLabel": "B) रामस्य [Shashti Vibhakti / Genitive Case]"
  },
  {
    "id": 7,
    "part": 1,
    "partTitle": "Part 1: Foundational Forms (बालक & राम)",
    "question": "Which singular word form represents the Saptami Vibhakti (Locative Case) meaning \"in/on the boy\" for 'बालक'?",
    "options": [
      {
        "key": "A",
        "text": "बालके [Saptami Vibhakti / Locative Case]",
        "label": "बालके [Saptami Vibhakti / Locative Case]"
      },
      {
        "key": "B",
        "text": "बालकाय [Chaturthi Vibhakti / Dative]",
        "label": "बालकाय [Chaturthi Vibhakti / Dative]"
      },
      {
        "key": "C",
        "text": "बालकः [Prathama Vibhakti / Nominative]",
        "label": "बालकः [Prathama Vibhakti / Nominative]"
      },
      {
        "key": "D",
        "text": "बालकम् [Dvitiya Vibhakti / Accusative]",
        "label": "बालकम् [Dvitiya Vibhakti / Accusative]"
      }
    ],
    "correctKey": "A",
    "correctText": "बालके [Saptami Vibhakti / Locative Case]",
    "explanation": "Correct! 'बालके' is the locative singular form designating place or time.",
    "topic": "सप्तमी विभक्ति (Locative / Location)",
    "audioTerm": "बालके",
    "correctLabel": "A) बालके [Saptami Vibhakti / Locative Case]"
  },
  {
    "id": 8,
    "part": 1,
    "partTitle": "Part 1: Foundational Forms (बालक & राम)",
    "question": "Which of the following forms is used in Sambodhana (Vocative Case) to directly address or call out to Rama?",
    "options": [
      {
        "key": "A",
        "text": "रामस्य [Shashti Vibhakti / Genitive]",
        "label": "रामस्य [Shashti Vibhakti / Genitive]"
      },
      {
        "key": "B",
        "text": "रामेण [Tritiya Vibhakti / Instrumental]",
        "label": "रामेण [Tritiya Vibhakti / Instrumental]"
      },
      {
        "key": "C",
        "text": "हे राम [Sambodhana / Vocative Case]",
        "label": "हे राम [Sambodhana / Vocative Case]"
      },
      {
        "key": "D",
        "text": "रामात् [Panchami Vibhakti / Ablative]",
        "label": "रामात् [Panchami Vibhakti / Ablative]"
      }
    ],
    "correctKey": "C",
    "correctText": "हे राम [Sambodhana / Vocative Case]",
    "explanation": "Correct! 'हे राम' represents direct address (Sambodhana).",
    "topic": "सम्बोधनम् (Vocative / Direct Address)",
    "audioTerm": "हे राम",
    "correctLabel": "C) हे राम [Sambodhana / Vocative Case]"
  },
  {
    "id": 9,
    "part": 1,
    "partTitle": "Part 1: Foundational Forms (बालक & राम)",
    "question": "In the phrase 'रामेण सह' (with Rama), what is the specific case and grammatical name of the word 'रामेण'?",
    "options": [
      {
        "key": "A",
        "text": "Prathama Vibhakti [Nominative Case]",
        "label": "Prathama Vibhakti [Nominative Case]"
      },
      {
        "key": "B",
        "text": "Chaturthi Vibhakti [Dative Case]",
        "label": "Chaturthi Vibhakti [Dative Case]"
      },
      {
        "key": "C",
        "text": "Panchami Vibhakti [Ablative Case]",
        "label": "Panchami Vibhakti [Ablative Case]"
      },
      {
        "key": "D",
        "text": "Tritiya Vibhakti [Instrumental Case]",
        "label": "Tritiya Vibhakti [Instrumental Case]"
      }
    ],
    "correctKey": "D",
    "correctText": "Tritiya Vibhakti [Instrumental Case]",
    "explanation": "Correct! 'रामेण' is in the Tritiya Vibhakti (Instrumental Case) used here to express companionship with 'सह'.",
    "topic": "विभक्ति-प्रयोगः · सह-योगे तृतीया (Companionship)",
    "audioTerm": "रामेण सह",
    "correctLabel": "D) Tritiya Vibhakti [Instrumental Case]"
  },
  {
    "id": 10,
    "part": 1,
    "partTitle": "Part 1: Foundational Forms (बालक & राम)",
    "question": "Which vibhakti and case combination is represented by 'बालकात्' (Balakat)?",
    "options": [
      {
        "key": "A",
        "text": "Panchami Vibhakti [Ablative Case]",
        "label": "Panchami Vibhakti [Ablative Case]"
      },
      {
        "key": "B",
        "text": "Saptami Vibhakti [Locative Case]",
        "label": "Saptami Vibhakti [Locative Case]"
      },
      {
        "key": "C",
        "text": "Shashti Vibhakti [Genitive Case]",
        "label": "Shashti Vibhakti [Genitive Case]"
      },
      {
        "key": "D",
        "text": "Tritiya Vibhakti [Instrumental Case]",
        "label": "Tritiya Vibhakti [Instrumental Case]"
      }
    ],
    "correctKey": "A",
    "correctText": "Panchami Vibhakti [Ablative Case]",
    "explanation": "Correct! 'बालकात्' is the singular form for the Panchami Vibhakti (Ablative Case).",
    "topic": "विभक्ति-प्रत्ययः · अपादानम् (Panchami / From)",
    "audioTerm": "बालकात्",
    "correctLabel": "A) Panchami Vibhakti [Ablative Case]"
  },
  {
    "id": 11,
    "part": 2,
    "partTitle": "Part 2: Sentence Roles & Kārakas",
    "question": "In the sentence \"रामः गच्छति\" (Ramah gacchati - Rama goes), which word represents the Karta (the doer or subject performing the action) in Prathama Vibhakti?",
    "options": [
      {
        "key": "A",
        "text": "गच्छति",
        "label": "गच्छति"
      },
      {
        "key": "B",
        "text": "रामः",
        "label": "रामः"
      },
      {
        "key": "C",
        "text": "रामम्",
        "label": "रामम्"
      },
      {
        "key": "D",
        "text": "रामेण",
        "label": "रामेण"
      }
    ],
    "correctKey": "B",
    "correctText": "रामः",
    "explanation": "Correct! 'रामः' is the subject (Karta) performing the action of going, taking the nominative singular case.",
    "topic": "कर्ता-कारकम् · प्रथमा (Subject in Sentence)",
    "audioTerm": "रामः गच्छति",
    "correctLabel": "B) रामः"
  },
  {
    "id": 12,
    "part": 2,
    "partTitle": "Part 2: Sentence Roles & Kārakas",
    "question": "Which singular form of the masculine a-ending noun 'बालक' (boy) represents the Karman (direct object receiving the action) in Dvitiya Vibhakti?",
    "options": [
      {
        "key": "A",
        "text": "बालकः",
        "label": "बालकः"
      },
      {
        "key": "B",
        "text": "बालकेन",
        "label": "बालकेन"
      },
      {
        "key": "C",
        "text": "बालकम्",
        "label": "बालकम्"
      },
      {
        "key": "D",
        "text": "बालकाय",
        "label": "बालकाय"
      }
    ],
    "correctKey": "C",
    "correctText": "बालकम्",
    "explanation": "Correct! 'बालकम्' is the singular object form (Dvitiya Vibhakti) indicating the target of an action.",
    "topic": "कर्म-कारकम् · द्वितीया (Object in Sentence)",
    "audioTerm": "बालकम्",
    "correctLabel": "C) बालकम्"
  },
  {
    "id": 13,
    "part": 2,
    "partTitle": "Part 2: Sentence Roles & Kārakas",
    "question": "To express the instrument or means by which an action is done (Karanam) using the masculine noun 'राम', which singular form of the Tritiya Vibhakti should be used?",
    "options": [
      {
        "key": "A",
        "text": "रामात्",
        "label": "रामात्"
      },
      {
        "key": "B",
        "text": "रामेण",
        "label": "रामेण"
      },
      {
        "key": "C",
        "text": "रामस्य",
        "label": "रामस्य"
      },
      {
        "key": "D",
        "text": "रामे",
        "label": "रामे"
      }
    ],
    "correctKey": "B",
    "correctText": "रामेण",
    "explanation": "Correct! 'रामेण' is the correct instrumental singular form showing agency or means, ending with '-ena' (-एण).",
    "topic": "करण-कारकम् · तृतीया (Means / Instrument)",
    "audioTerm": "रामेण",
    "correctLabel": "B) रामेण"
  },
  {
    "id": 14,
    "part": 2,
    "partTitle": "Part 2: Sentence Roles & Kārakas",
    "question": "Which Chaturthi Vibhakti singular form of the masculine noun 'राम' indicates the recipient or purpose of giving (Sampradana), meaning \"for Rama\" or \"to Rama\"?",
    "options": [
      {
        "key": "A",
        "text": "रामात्",
        "label": "रामात्"
      },
      {
        "key": "B",
        "text": "रामस्य",
        "label": "रामस्य"
      },
      {
        "key": "C",
        "text": "रामाय",
        "label": "रामाय"
      },
      {
        "key": "D",
        "text": "रामे",
        "label": "रामे"
      }
    ],
    "correctKey": "C",
    "correctText": "रामाय",
    "explanation": "Correct! 'रामाय' is the dative case form (Chaturthi Vibhakti) used for recipients, ending in '-aya'.",
    "topic": "सम्प्रदान-कारकम् · चतुर्थी (Recipient / Purpose)",
    "audioTerm": "रामाय",
    "correctLabel": "C) रामाय"
  },
  {
    "id": 15,
    "part": 2,
    "partTitle": "Part 2: Sentence Roles & Kārakas",
    "question": "When describing separation or movement away from a source (Apadana) using the noun 'राम', which Panchami Vibhakti singular form indicates \"from Rama\"?",
    "options": [
      {
        "key": "A",
        "text": "रामात्",
        "label": "रामात्"
      },
      {
        "key": "B",
        "text": "रामे",
        "label": "रामे"
      },
      {
        "key": "C",
        "text": "रामस्य",
        "label": "रामस्य"
      },
      {
        "key": "D",
        "text": "रामाय",
        "label": "रामाय"
      }
    ],
    "correctKey": "A",
    "correctText": "रामात्",
    "explanation": "Correct! 'रामात्' ends with a crisp '-त्' sound, signifying the ablative case denoting origin or separation (\"from\").",
    "topic": "अपादान-कारकम् · पञ्चमी (Source / Separation)",
    "audioTerm": "रामात्",
    "correctLabel": "A) रामात्"
  },
  {
    "id": 16,
    "part": 2,
    "partTitle": "Part 2: Sentence Roles & Kārakas",
    "question": "What does the Shashti Vibhakti (Genitive Case) singular form 'बालकस्य' (Balakasya) signify in a sentence?",
    "options": [
      {
        "key": "A",
        "text": "Direct address to the boy",
        "label": "Direct address to the boy"
      },
      {
        "key": "B",
        "text": "Possession or relationship (of the boy / boy's)",
        "label": "Possession or relationship (of the boy / boy's)"
      },
      {
        "key": "C",
        "text": "Location where the boy is",
        "label": "Location where the boy is"
      },
      {
        "key": "D",
        "text": "The recipient given to the boy",
        "label": "The recipient given to the boy"
      }
    ],
    "correctKey": "B",
    "correctText": "Possession or relationship (of the boy / boy's)",
    "explanation": "Correct! The genitive case ('बालकस्य') indicates ownership, association, or a relationship like \"of\" or \"'s\".",
    "topic": "सम्बन्ध-बोधकम् · षष्ठी (Genitive Meaning)",
    "audioTerm": "बालकस्य",
    "correctLabel": "B) Possession or relationship (of the boy / boy's)"
  },
  {
    "id": 17,
    "part": 2,
    "partTitle": "Part 2: Sentence Roles & Kārakas",
    "question": "Where an action takes place (in, on, or at) uses the Saptami Vibhakti (Adhikarana). What is the singular Saptami form for the masculine noun 'राम' (Rama)?",
    "options": [
      {
        "key": "A",
        "text": "रामे",
        "label": "रामे"
      },
      {
        "key": "B",
        "text": "रामम्",
        "label": "रामम्"
      },
      {
        "key": "C",
        "text": "रामस्य",
        "label": "रामस्य"
      },
      {
        "key": "D",
        "text": "रामात्",
        "label": "रामात्"
      }
    ],
    "correctKey": "A",
    "correctText": "रामे",
    "explanation": "Correct! 'रामे' is the locative singular form indicating location (\"in or on Rama\").",
    "topic": "अधिकरण-कारकम् · सप्तमी (Location / Base)",
    "audioTerm": "रामे",
    "correctLabel": "A) रामे"
  },
  {
    "id": 18,
    "part": 2,
    "partTitle": "Part 2: Sentence Roles & Kārakas",
    "question": "Which of the following forms represents the Sambodhana (Vocative Case) singular for 'राम', used to call or address him directly?",
    "options": [
      {
        "key": "A",
        "text": "रामाय",
        "label": "रामाय"
      },
      {
        "key": "B",
        "text": "रामस्य",
        "label": "रामस्य"
      },
      {
        "key": "C",
        "text": "हे राम",
        "label": "हे राम"
      },
      {
        "key": "D",
        "text": "रामेण",
        "label": "रामेण"
      }
    ],
    "correctKey": "C",
    "correctText": "हे राम",
    "explanation": "Correct! 'हे राम' represents direct address (Sambodhana), which is used to call out to someone.",
    "topic": "सम्बोधन-पदम् · आह्वानम् (Direct Address)",
    "audioTerm": "हे राम",
    "correctLabel": "C) हे राम"
  },
  {
    "id": 19,
    "part": 2,
    "partTitle": "Part 2: Sentence Roles & Kārakas",
    "question": "In the sentence \"बालकः पुस्तकं पठति\" (The boy reads a book), what are the respective grammatical roles and cases of 'बालकः' (Balakah) and 'पुस्तकं' (pustakam)?",
    "options": [
      {
        "key": "A",
        "text": "बालकः is Karman (Dvitiya) and पुस्तकं is Karta (Prathama)",
        "label": "बालकः is Karman (Dvitiya) and पुस्तकं is Karta (Prathama)"
      },
      {
        "key": "B",
        "text": "बालकः is Karta in Prathama and पुस्तकं is Karman in Dvitiya",
        "label": "बालकः is Karta in Prathama and पुस्तकं is Karman in Dvitiya"
      },
      {
        "key": "C",
        "text": "Both words are in the Saptami Vibhakti",
        "label": "Both words are in the Saptami Vibhakti"
      },
      {
        "key": "D",
        "text": "Both words are in the Panchami Vibhakti",
        "label": "Both words are in the Panchami Vibhakti"
      }
    ],
    "correctKey": "B",
    "correctText": "बालकः is Karta in Prathama and पुस्तकं is Karman in Dvitiya",
    "explanation": "Correct! 'बालकः' is the subject doer (Karta / Prathama) and 'पुस्तकं' is the object (Karman / Dvitiya).",
    "topic": "कारक-युग्मम् · कर्ता च कर्म च (Subject & Object in Sentence)",
    "audioTerm": "बालकः पुस्तकं पठति",
    "correctLabel": "B) बालकः is Karta in Prathama and पुस्तकं is Karman in Dvitiya"
  },
  {
    "id": 20,
    "part": 2,
    "partTitle": "Part 2: Sentence Roles & Kārakas",
    "question": "If you want to say \"with the boy\" (expressing companionship/instrumentation using Tritiya Vibhakti) for the masculine noun 'बालक', which form is correct?",
    "options": [
      {
        "key": "A",
        "text": "बालकस्य",
        "label": "बालकस्य"
      },
      {
        "key": "B",
        "text": "बालकेन",
        "label": "बालकेन"
      },
      {
        "key": "C",
        "text": "बालकाय",
        "label": "बालकाय"
      },
      {
        "key": "D",
        "text": "बालके",
        "label": "बालके"
      }
    ],
    "correctKey": "B",
    "correctText": "बालकेन",
    "explanation": "Correct! 'बालकेन' is the correct instrumental singular form (Tritiya Vibhakti) meaning \"by or with the boy\".",
    "topic": "सह-अवबोधकम् · तृतीया (Companionship with Boy)",
    "audioTerm": "बालकेन सह",
    "correctLabel": "B) बालकेन"
  },
  {
    "id": 21,
    "part": 3,
    "partTitle": "Part 3: Applied Nouns (गज, वृक्ष, शिष्य)",
    "question": "In the simple sentence \"गजः चलति\" (The elephant walks), which form acts as the subject (Karta) performing the action?",
    "options": [
      {
        "key": "A",
        "text": "गजम् [द्वितीया विभक्ति / Accusative Case]",
        "label": "गजम् [द्वितीया विभक्ति / Accusative Case]"
      },
      {
        "key": "B",
        "text": "गजः [प्रथमा विभक्ति / Nominative Case]",
        "label": "गजः [प्रथमा विभक्ति / Nominative Case]"
      },
      {
        "key": "C",
        "text": "गजेण [तृतीया विभक्ति / Instrumental Case]",
        "label": "गजेण [तृतीया विभक्ति / Instrumental Case]"
      },
      {
        "key": "D",
        "text": "गजाय [चतुर्थी विभक्ति / Dative Case]",
        "label": "गजाय [चतुर्थी विभक्ति / Dative Case]"
      }
    ],
    "correctKey": "B",
    "correctText": "गजः [प्रथमा विभक्ति / Nominative Case]",
    "explanation": "Correct! 'गजः' is the nominative singular subject doing the action of walking.",
    "topic": "गज-शब्दः · प्रथमा विभक्ति (Elephant as Subject)",
    "audioTerm": "गजः चलति",
    "correctLabel": "B) गजः [प्रथमा विभक्ति / Nominative Case]"
  },
  {
    "id": 22,
    "part": 3,
    "partTitle": "Part 3: Applied Nouns (गज, वृक्ष, शिष्य)",
    "question": "In the sentence \"बालकः वृक्षम् पश्यति\" (The boy sees the tree), which word represents the direct object receiving the action of seeing?",
    "options": [
      {
        "key": "A",
        "text": "वृक्षः [प्रथमा विभक्ति / Nominative Case]",
        "label": "वृक्षः [प्रथमा विभक्ति / Nominative Case]"
      },
      {
        "key": "B",
        "text": "वृक्षे [सप्तमी विभक्ति / Locative Case]",
        "label": "वृक्षे [सप्तमी विभक्ति / Locative Case]"
      },
      {
        "key": "C",
        "text": "वृक्षम् [द्वितीया विभक्ति / Accusative Case]",
        "label": "वृक्षम् [द्वितीया विभक्ति / Accusative Case]"
      },
      {
        "key": "D",
        "text": "वृक्षात् [पञ्चमी विभक्ति / Ablative Case]",
        "label": "वृक्षात् [पञ्चमी विभक्ति / Ablative Case]"
      }
    ],
    "correctKey": "C",
    "correctText": "वृक्षम् [द्वितीया विभक्ति / Accusative Case]",
    "explanation": "Correct! 'वृक्षम्' is the objective case form (Dvitiya Vibhakti) ending with '-m' (म्).",
    "topic": "वृक्ष-शब्दः · द्वितीया विभक्ति (Tree as Object)",
    "audioTerm": "वृक्षम्",
    "correctLabel": "C) वृक्षम् [द्वितीया विभक्ति / Accusative Case]"
  },
  {
    "id": 23,
    "part": 3,
    "partTitle": "Part 3: Applied Nouns (गज, वृक्ष, शिष्य)",
    "question": "When expressing an action performed by or with a student, which singular form of 'शिष्य' belongs to the [तृतीया विभक्ति / Instrumental Case]?",
    "options": [
      {
        "key": "A",
        "text": "शिष्येन [तृतीया विभक्ति / Instrumental Case]",
        "label": "शिष्येन [तृतीया विभक्ति / Instrumental Case]"
      },
      {
        "key": "B",
        "text": "शिष्यस्य [षष्ठी विभक्ति / Genitive Case]",
        "label": "शिष्यस्य [षष्ठी विभक्ति / Genitive Case]"
      },
      {
        "key": "C",
        "text": "शिष्ये [सप्तमी विभक्ति / Locative Case]",
        "label": "शिष्ये [सप्तमी विभक्ति / Locative Case]"
      },
      {
        "key": "D",
        "text": "शिष्यम् [द्वितीया विभक्ति / Accusative Case]",
        "label": "शिष्यम् [द्वितीया विभक्ति / Accusative Case]"
      }
    ],
    "correctKey": "A",
    "correctText": "शिष्येन [तृतीया विभक्ति / Instrumental Case]",
    "explanation": "Correct! 'शिष्येन' is the instrumental singular form indicating the agent or instrument (\"by the student\").",
    "topic": "शिष्य-शब्दः · तृतीया विभक्ति (Student as Agent)",
    "audioTerm": "शिष्येन",
    "correctLabel": "A) शिष्येन [तृतीया विभक्ति / Instrumental Case]"
  },
  {
    "id": 24,
    "part": 3,
    "partTitle": "Part 3: Applied Nouns (गज, वृक्ष, शिष्य)",
    "question": "If you are giving grass to an elephant, which form of 'गज' correctly indicates the recipient (Sampradana) in the [चतुर्थी विभक्ति / Dative Case]?",
    "options": [
      {
        "key": "A",
        "text": "गजात् [पञ्चमी विभक्ति / Ablative Case]",
        "label": "गजात् [पञ्चमी विभक्ति / Ablative Case]"
      },
      {
        "key": "B",
        "text": "गजस्य [षष्ठी विभक्ति / Genitive Case]",
        "label": "गजस्य [षष्ठी विभक्ति / Genitive Case]"
      },
      {
        "key": "C",
        "text": "गजे [सप्तमी विभक्ति / Locative Case]",
        "label": "गजे [सप्तमी विभक्ति / Locative Case]"
      },
      {
        "key": "D",
        "text": "गजाय [चतुर्थी विभक्ति / Dative Case]",
        "label": "गजाय [चतुर्थी विभक्ति / Dative Case]"
      }
    ],
    "correctKey": "D",
    "correctText": "गजाय [चतुर्थी विभक्ति / Dative Case]",
    "explanation": "Correct! 'गजाय' is the dative case form ending in '-aya' (-आय), used when giving or offering to someone.",
    "topic": "गज-शब्दः · चतुर्थी विभक्ति (Giving to Elephant)",
    "audioTerm": "गजाय",
    "correctLabel": "D) गजाय [चतुर्थी विभक्ति / Dative Case]"
  },
  {
    "id": 25,
    "part": 3,
    "partTitle": "Part 3: Applied Nouns (गज, वृक्ष, शिष्य)",
    "question": "In the context of a leaf falling from a tree (\"वृक्षात् पर्णम् पतति\"), which form expresses separation using the [पञ्चमी विभक्ति / Ablative Case]?",
    "options": [
      {
        "key": "A",
        "text": "वृक्षे [सप्तमी विभक्ति / Locative Case]",
        "label": "वृक्षे [सप्तमी विभक्ति / Locative Case]"
      },
      {
        "key": "B",
        "text": "वृक्षात् [पञ्चमी विभक्ति / Ablative Case]",
        "label": "वृक्षात् [पञ्चमी विभक्ति / Ablative Case]"
      },
      {
        "key": "C",
        "text": "वृक्षस्य [षष्ठी विभक्ति / Genitive Case]",
        "label": "वृक्षस्य [षष्ठी विभक्ति / Genitive Case]"
      },
      {
        "key": "D",
        "text": "वृक्षम् [द्वितीया विभक्ति / Accusative Case]",
        "label": "वृक्षम् [द्वितीया विभक्ति / Accusative Case]"
      }
    ],
    "correctKey": "B",
    "correctText": "वृक्षात् [पञ्चमी विभक्ति / Ablative Case]",
    "explanation": "Correct! 'वृक्षात्' is the ablative singular form denoting a starting point of separation (\"from the tree\").",
    "topic": "वृक्ष-शब्दः · पञ्चमी विभक्ति (Falling from Tree)",
    "audioTerm": "वृक्षात् पर्णं पतति",
    "correctLabel": "B) वृक्षात् [पञ्चमी विभक्ति / Ablative Case]"
  },
  {
    "id": 26,
    "part": 3,
    "partTitle": "Part 3: Applied Nouns (गज, वृक्ष, शिष्य)",
    "question": "To express the student's book (\"the book of the student\"), which singular form of 'शिष्य' correctly shows possession in the [षष्ठी विभक्ति / Genitive Case]?",
    "options": [
      {
        "key": "A",
        "text": "शिष्येण [तृतीया विभक्ति / Instrumental Case]",
        "label": "शिष्येण [तृतीया विभक्ति / Instrumental Case]"
      },
      {
        "key": "B",
        "text": "शिष्याय [चतुर्थी विभक्ति / Dative Case]",
        "label": "शिष्याय [चतुर्थी विभक्ति / Dative Case]"
      },
      {
        "key": "C",
        "text": "शिष्यस्य [षष्ठी विभक्ति / Genitive Case]",
        "label": "शिष्यस्य [षष्ठी विभक्ति / Genitive Case]"
      },
      {
        "key": "D",
        "text": "शिष्यः [प्रथमा विभक्ति / Nominative Case]",
        "label": "शिष्यः [प्रथमा विभक्ति / Nominative Case]"
      }
    ],
    "correctKey": "C",
    "correctText": "शिष्यस्य [षष्ठी विभक्ति / Genitive Case]",
    "explanation": "Correct! 'शिष्यस्य' is the genitive form indicating ownership or relationship (\"of the student\").",
    "topic": "शिष्य-शब्दः · षष्ठी विभक्ति (Student's Relation)",
    "audioTerm": "शिष्यस्य",
    "correctLabel": "C) शिष्यस्य [षष्ठी विभक्ति / Genitive Case]"
  },
  {
    "id": 27,
    "part": 3,
    "partTitle": "Part 3: Applied Nouns (गज, वृक्ष, शिष्य)",
    "question": "If a bird is sitting on a tree (\"वृक्षे खगः तिष्ठति\"), which word form denotes the location or base of the action in the [सप्तमी विभक्ति / Locative Case]?",
    "options": [
      {
        "key": "A",
        "text": "वृक्षे [सप्तमी विभक्ति / Locative Case]",
        "label": "वृक्षे [सप्तमी विभक्ति / Locative Case]"
      },
      {
        "key": "B",
        "text": "वृक्षात् [पञ्चमी विभक्ति / Ablative Case]",
        "label": "वृक्षात् [पञ्चमी विभक्ति / Ablative Case]"
      },
      {
        "key": "C",
        "text": "वृक्षस्य [षष्ठी विभक्ति / Genitive Case]",
        "label": "वृक्षस्य [षष्ठी विभक्ति / Genitive Case]"
      },
      {
        "key": "D",
        "text": "वृक्षम् [द्वितीया विभक्ति / Accusative Case]",
        "label": "वृक्षम् [द्वितीया विभक्ति / Accusative Case]"
      }
    ],
    "correctKey": "A",
    "correctText": "वृक्षे [सप्तमी विभक्ति / Locative Case]",
    "explanation": "Correct! 'वृक्षे' is the locative singular form designating place or location (\"on/in the tree\").",
    "topic": "वृक्ष-शब्दः · सप्तमी विभक्ति (Bird on Tree / Locative)",
    "audioTerm": "वृक्षे खगः तिष्ठति",
    "correctLabel": "A) वृक्षे [सप्तमी विभक्ति / Locative Case]"
  },
  {
    "id": 28,
    "part": 3,
    "partTitle": "Part 3: Applied Nouns (गज, वृक्ष, शिष्य)",
    "question": "When you want to call out or address a student directly (\"O student!\"), which form represents the [संबोधनम् / Vocative Case]?",
    "options": [
      {
        "key": "A",
        "text": "शिष्यः [प्रथमा विभक्ति / Nominative Case]",
        "label": "शिष्यः [प्रथमा विभक्ति / Nominative Case]"
      },
      {
        "key": "B",
        "text": "शिष्यम् [द्वितीया विभक्ति / Accusative Case]",
        "label": "शिष्यम् [द्वितीया विभक्ति / Accusative Case]"
      },
      {
        "key": "C",
        "text": "शिष्याय [चतुर्थी विभक्ति / Dative Case]",
        "label": "शिष्याय [चतुर्थी विभक्ति / Dative Case]"
      },
      {
        "key": "D",
        "text": "हे शिष्य [संबोधनम् / Vocative Case]",
        "label": "हे शिष्य [संबोधनम् / Vocative Case]"
      }
    ],
    "correctKey": "D",
    "correctText": "हे शिष्य [संबोधनम् / Vocative Case]",
    "explanation": "Correct! 'हे शिष्य' is used for addressing or calling someone directly (Sambodhana).",
    "topic": "शिष्य-शब्दः · सम्बोधनम् (Addressing Student)",
    "audioTerm": "हे शिष्य",
    "correctLabel": "D) हे शिष्य [संबोधनम् / Vocative Case]"
  },
  {
    "id": 29,
    "part": 3,
    "partTitle": "Part 3: Applied Nouns (गज, वृक्ष, शिष्य)",
    "question": "In the phrase \"शिष्येन सह गच्छति\" (goes along with the student), the word 'शिष्येन' is used for companionship requiring the [तृतीया विभक्ति / Instrumental Case]. Which option is it?",
    "options": [
      {
        "key": "A",
        "text": "शिष्यात् [पञ्चमी विभक्ति / Ablative Case]",
        "label": "शिष्यात् [पञ्चमी विभक्ति / Ablative Case]"
      },
      {
        "key": "B",
        "text": "शिष्येन [तृतीया विभक्ति / Instrumental Case]",
        "label": "शिष्येन [तृतीया विभक्ति / Instrumental Case]"
      },
      {
        "key": "C",
        "text": "शिष्ये [सप्तमी विभक्ति / Locative Case]",
        "label": "शिष्ये [सप्तमी विभक्ति / Locative Case]"
      },
      {
        "key": "D",
        "text": "शिष्यस्य [षष्ठी विभक्ति / Genitive Case]",
        "label": "शिष्यस्य [षष्ठी विभक्ति / Genitive Case]"
      }
    ],
    "correctKey": "B",
    "correctText": "शिष्येन [तृतीया विभक्ति / Instrumental Case]",
    "explanation": "Correct! 'शिष्येन' is the instrumental form used alongside words like 'सह' (with).",
    "topic": "सह-प्रयोगः · तृतीया विभक्ति (With Student)",
    "audioTerm": "शिष्येन सह",
    "correctLabel": "B) शिष्येन [तृतीया विभक्ति / Instrumental Case]"
  },
  {
    "id": 30,
    "part": 3,
    "partTitle": "Part 3: Applied Nouns (गज, वृक्ष, शिष्य)",
    "question": "In the context of looking at or observing an elephant (\"गजम् पश्यति\"), which word form represents the object in the [द्वितीया विभक्ति / Accusative Case]?",
    "options": [
      {
        "key": "A",
        "text": "गजः [प्रथमा विभक्ति / Nominative Case]",
        "label": "गजः [प्रथमा विभक्ति / Nominative Case]"
      },
      {
        "key": "B",
        "text": "गजाय [चतुर्थी विभक्ति / Dative Case]",
        "label": "गजाय [चतुर्थी विभक्ति / Dative Case]"
      },
      {
        "key": "C",
        "text": "गजम् [द्वितीया विभक्ति / Accusative Case]",
        "label": "गजम् [द्वितीया विभक्ति / Accusative Case]"
      },
      {
        "key": "D",
        "text": "गजे [सप्तमी विभक्ति / Locative Case]",
        "label": "गजे [सप्तमी विभक्ति / Locative Case]"
      }
    ],
    "correctKey": "C",
    "correctText": "गजम् [द्वितीया विभक्ति / Accusative Case]",
    "explanation": "Correct! 'गजम्' functions as the direct object of the verb 'pashyati' (sees), taking the accusative singular case.",
    "topic": "गज-शब्दः · द्वितीया विभक्ति (Observing Elephant)",
    "audioTerm": "गजम्",
    "correctLabel": "C) गजम् [द्वितीया विभक्ति / Accusative Case]"
  }
];
