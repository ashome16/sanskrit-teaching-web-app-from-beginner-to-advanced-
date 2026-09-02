# Sanskrit Teaching Web App - Beginner to Advanced

A modern, interactive web application for learning Sanskrit from beginner to advanced levels. Built with React, TypeScript, and Vite.

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or higher
- npm (comes with Node.js)

### Installation & Running

```bash
# Dependencies are already installed
# Start the development server:
npm run dev

# Open your browser and go to: http://localhost:5173/
```

## ✨ Features

- 📚 **Interactive Lessons** - Progress from beginner to advanced Sanskrit
- 🎤 **Pronunciation Practice** - Browser-based speech recognition
- 📝 **Quiz System** - Multiple choice, short answer, and pronunciation questions
- 📊 **Progress Tracking** - Track completed lessons and quiz scores
- 💾 **Local Storage** - All progress persists automatically
- 🎨 **Responsive Design** - Works on desktop, tablet, and mobile
- 🕉️ **Devanagari Support** - Full Sanskrit script support

## 📖 Project Structure

```
src/
├── components/        # React components (Navbar, LessonContent, etc.)
├── pages/            # Page components (Home, LessonPage, QuizPage, ProgressPage)
├── store/            # Zustand state management
├── types/            # TypeScript types
├── data/             # Lesson and quiz content
├── utils/            # Utilities (speech recognition, storage, etc.)
├── styles/           # CSS stylesheets
└── App.tsx           # Main application component
```

## 🎓 Adding Deepakam Lessons

Detailed instructions on adding your Deepakam lesson PDFs can be found in [SETUP_GUIDE.md](./SETUP_GUIDE.md).

## 🎤 Pronunciation Features

- **Record Your Pronunciation** - Use your microphone to practice
- **Listen to Reference** - Hear native pronunciation
- **Accuracy Feedback** - Get real-time feedback on your pronunciation
- **Multiple Attempts** - Practice as many times as you need

**Browser Support:**
- Chrome/Chromium (Edge): Full support
- Safari 14.1+: Full support
- Firefox: Limited support

## 📝 Quiz Types

1. **Multiple Choice** - Select from options
2. **Short Answer** - Type your answer
3. **Pronunciation** - Record and compare

## 📊 Progress Tracking

- Complete lessons and earn points
- Track your learning journey
- View quiz attempt history
- Reset progress if needed

## 🛠️ Building for Production

```bash
# Create optimized production build
npm run build

# Preview the production build
npm run preview

# Lint code
npm run lint
```

## 📱 Browser Requirements

- **Modern browser** (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **JavaScript enabled**
- **Microphone access** (for pronunciation practice)
- **LocalStorage enabled** (for progress tracking)

## 📚 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Routing**: React Router v6
- **Styling**: Pure CSS with CSS custom properties
- **Speech APIs**: Web Speech API (recognition & synthesis)

## 💾 Data Persistence

- User progress is automatically saved to browser localStorage
- All quiz attempts and lesson completion status is persisted
- Clear browser storage to reset progress

## 🔧 Troubleshooting

### Dev server won't start?
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Pronunciation not working?
- Use Chrome/Chromium or Safari (best support)
- Check that microphone permissions are granted
- Refresh the page

### Progress not saving?
- Ensure localStorage is enabled in browser settings
- Try a different browser to rule out browser-specific issues

## 📖 Full Documentation

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for comprehensive documentation on:
- Adding lessons and quizzes
- Customizing styles
- Using the API
- Detailed troubleshooting

## 🎯 Current Status

✅ Core app framework complete and running
⏳ Ready for Deepakam lesson content

## 📝 License

MIT

---

**Built with ❤️ for Sanskrit learners**

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
