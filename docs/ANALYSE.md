# Analyse vs sentence bank

Board never translates.

## public/sentences.txt — Sanskrit sentence bank

Devanagari sentences only. Optional English gloss for the teacher.
No Telugu, Kannada, Malayalam, or Tamil in this file.
No language pills here.

This week:
नदी वेगेन वहति।
बालः पठति।
गजः मन्दं चलति।
सूर्यः उदयति।
वृक्षः फलति।

Format: sentence|english|theme|shelf

## public/analyse.json — word analyzer (Analyse tab)

Keyed by a word (का, गजः). Language pills (en / te / kn / ml / ta) live only here.
Sanskrit sentence inside a language block stays Devanagari and does not change with the pill.

Missing word: “not in the bank.” Never live-translate. Never guess.

## Do not

- Mix scripts into sentences.txt
- Put pills on the Board
- Edit Deepakam or Board.tsx for this
