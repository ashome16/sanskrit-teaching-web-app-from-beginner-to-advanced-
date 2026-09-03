# Copilot — Sanskrit Learning (read before any edit)

You are patching ONE child school. One chrome. One board.
Read this file and docs/NAMES.md. Then touch only what the user named.
On-screen copy comes from public/labels.txt. Never print a file tag (prarambhah, matra, kalah, vrittih, glue).

## Do not open

Deepakam, TextbookReader, gsde*, extract_txt.py, extract-lessons.js,
Analyse, Vibhakti Guide, vite.config base, index.html nav labels.

Top nav stays: Board · Deepakam · Analyse · Vibhakti Guide
Shelves stay: Beginners → Body → Maths → Map → Sanskriti → Play → Sūtram
(not Biology, Geography, Games, Coding). Pack vrittih is on-screen जनाः.

## Product law

- Meaning first. After a correct Check, English is the meaning. Devanagari stays.
- जोडो morphs: आ becomes ा, then NFC. क+आ = का (not कआ).
- मेलः does not morph. Target गङ्गा → tap नदी. Target पीतः → tap हरिद्रा. Never put the target word in the tiles.
- रिक्तम् shows the blank sentence. गकारः ____ स्थानस्य अस्ति। Answer कण्ठस्य. Not a self-match on कण्ठः.
- Play does the join. Sūtram watches: glue(...) → का, three sandhi only, button शब्दः सिध्यति (visarga). English is a small caption on Sūtram.
- Deepakam is the book. Never turn lessons into tiles.
- Silent. No TTS, no new Audio, no “Hear the vowel mark.”
- Yellow card: sound-toy.txt letters only. Never “no row yet.” Close on wing/puzzle change. No setTimeout unmount.
- Day-1 tile is आ, not dotted-circle ा.

## Delete these labels if you see them

Hear the vowel mark; Meaning fuses; Small TRACE, no compiler;
ONE BOARD / SHELF; no row yet; A short vowel-mark lesson; Maatra; Biology; Geography; Games; Coding; SHELF; TRACE as a heading;
tripled titles; शब्द: with a colon.

One site line under the shelves: Pick a shelf. Tap tiles. Then Check.
One child line per screen. Do not replace the header.

## Data

public/puzzles.txt is the week. Do not create packs.json.
Do not add 11–20, far lands, audio, or new packs.
Do not shuffle 80 words.
Time / seasons / five senses / eating / professions / weather / glue-words (अहम् त्वम् अत्र कुत्र) are listed in docs/GUIDE.md as NEXT PACKS. Do not implement them until the user says Day 1 का Check is proven.
भूतम् वर्तमानम् भविष्यत् is Sūtram later, not Beginners.

## Stop when

Day 1: tap क then आ then Check shows का and “the girl reads.”
Deepakam still opens a lesson.
