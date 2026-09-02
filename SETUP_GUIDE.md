# Sanskrit Teaching Web App - Setup & Usage Guide

## 🎯 Project Overview

A comprehensive Sanskrit teaching web application built with React + TypeScript and Vite. Features interactive lessons, pronunciation practice with browser speech recognition, quizzes, and progress tracking.

**Features:**
- 📚 Interactive lessons with multimedia content
- 🎤 Pronunciation practice with speech recognition
- 📝 Quiz system with multiple question types
- 📊 Progress tracking with local storage
- 💾 Persistent user progress with Zustand + localStorage
- 🎨 Modern, responsive UI

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm (included with Node.js)

### Installation & Running

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev

# The app will be available at: http://localhost:5173/
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.tsx
│   ├── LessonContent.tsx
│   ├── PronunciationPractice.tsx
│   ├── QuizQuestion.tsx
│   └── QuizResults.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── LessonPage.tsx
│   ├── QuizPage.tsx
│   └── ProgressPage.tsx
├── store/              # State management (Zustand)
│   └── index.ts
├── types/              # TypeScript types
│   └── index.ts
├── data/               # Lesson & quiz data
│   └── lessons.ts
├── utils/              # Utility functions
│   ├── speech.ts       # Speech recognition & TTS
│   └── storage.ts      # Quiz scoring & local storage
├── styles/             # CSS files
│   ├── navbar.css
│   ├── pages.css
│   ├── content.css
│   ├── pronunciation.css
│   ├── lesson.css
│   ├── quiz.css
│   ├── progress.css
│   └── quiz-question.css
├── App.tsx             # Main app component
├── App.css             # Global styles
├── main.tsx            # Entry point
└── index.css
```

## 🎓 Adding Deepakam Lessons

When you have the Deepakam PDF content, add it to `src/data/lessons.ts`:

```typescript
export const LESSONS: Lesson[] = [
  {
    id: 'lesson-1-deepakam',
    title: 'Deepakam Verse 1',
    level: 'beginner',
    order: 1,
    description: 'Learn verse 1 with pronunciation',
    duration: 20,
    content: [
      {
        type: 'text',
        title: 'Devanagari Text',
        description: 'Verse in Devanagari script',
        data: {
          devanagari: 'आपकी Sanskrit text यहाँ',
          transliteration: 'Your transliteration here',
          meaning: 'English meaning here'
        }
      },
      // Add more content blocks...
    ]
  },
  // Add more lessons...
];
```

## 📖 Using the App

### Home Page
- View all lessons by level (Beginner, Intermediate, Advanced)
- See completion status for each lesson
- Quick stats: Points earned, Lessons completed, Overall progress

### Learning Lessons
1. Click "Start" on any lesson
2. Navigate through content using Previous/Next buttons
3. See all lesson contents in the right sidebar
4. Click "Mark as Complete" when finished
5. Take the quiz to reinforce learning

### Pronunciation Practice
- Click the microphone icon to record
- Compare your pronunciation against reference
- Get accuracy feedback (0-100%)
- Practice multiple times to improve

### Quizzes
- Multiple choice questions
- Short answer questions
- Pronunciation questions
- Instant scoring and feedback
- Review your answers at the end

### Progress Tracking
- View completion statistics
- Review all quiz attempts
- See current streak and points
- Reset progress if needed

## 🎤 Browser Requirements for Pronunciation

**Speech Recognition (Pronunciation Recording):**
- Chrome/Chromium (including Edge)
- Safari 14.1+
- Firefox (limited support)

**Text-to-Speech (Listen to Pronunciation):**
- All modern browsers

## 💾 Data Storage

- **Local Storage**: User progress, completed lessons, quiz attempts
- **Zustand Store**: Real-time state management
- **Auto-save**: Progress saves automatically as you learn

Data persists across browser sessions. Clear browser storage to reset progress.

## 🛠️ Development

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📝 Lesson Structure

Each lesson contains multiple content blocks:

- **Text**: Devanagari script, transliteration, meaning, grammar
- **Audio**: Audio file references
- **Video**: Video content  
- **Interactive**: Interactive exercises
- **Pronunciation**: Speech-based pronunciation practice

## 🔧 Customization

### Styling
- Global variables in `src/App.css` (CSS custom properties)
- Component-specific styles in `src/styles/`
- Responsive design with mobile breakpoints

### Speech Recognition Language
- Change language code in `src/utils/speech.ts`
- Currently set to `'sa-IN'` (Sanskrit India)

### Progress Requirements
- Passing quiz score: 70%
- Customize in `src/utils/storage.ts`

## 📊 Component API

### Store (useAppStore)
```typescript
const { 
  userId,
  progress,
  markLessonComplete,
  recordQuizAttempt,
  updateCurrentLesson,
  resetProgress
} = useAppStore();
```

### Speech Recognition
```typescript
const speechHandler = new SpeechHandler();
speechHandler.startListening(onResult, onError);
speechHandler.stopListening();
```

### Text-to-Speech
```typescript
const ttsHandler = new TextToSpeechHandler();
ttsHandler.speak({ text, language, rate, pitch });
ttsHandler.stop();
```

## 🐛 Troubleshooting

**Pronunciation not working?**
- Check browser compatibility (Chrome/Edge recommended)
- Ensure microphone permissions granted
- Try refreshing the page

**Progress not saving?**
- Check browser localStorage is enabled
- Verify browser allows storage for localhost

**Styling looks wrong?**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)

## 📱 Mobile Responsiveness

The app is fully responsive:
- Tablets: Optimized layout
- Mobile: Stacked components, touch-friendly
- Desktop: Full sidebar and multi-column layouts

## 🎯 Next Steps

1. ✅ Core app framework complete
2. ⏳ Add Deepakam lesson content from PDFs
3. ⏳ Create comprehensive quizzes
4. ⏳ Test pronunciation feature across devices
5. ⏳ Deploy to hosting platform

## 📧 Questions?

Refer to component documentation in the source files for detailed API usage.
