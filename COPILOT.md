# Copilot — Sanskrit Learning (read before any edit)

You are patching ONE child school. One chrome. One board.
Read this file and docs/NAMES.md. Then touch only what the user named.
On-screen copy comes from public/labels.txt. Never print a file tag (prarambhah, matra, kalah, vrittih, glue).

## Do not open

Deepakam, TextbookReader, gsde*, extract_txt.py, extract-lessons.js,
Analyse, Vibhakti Guide, vite.config base, index.html nav labels.

Top nav stays: Board · Deepakam · Analyse · Vibhakti Guide
Shelves stay: Beginners · मात्रा → nada · नाद-पथः → Objects · परिवेशः → Naksha · नक्शा → Nature · प्रकृतिः → Sanskriti · संस्कृतिः → Play · क्रिया
Sūtram is a later grammar door. Nature is प्रकृतिः.
Sūtram is a later grammar door, not a shelf on this word-bank board. Never Breath Travel or Build.
(not Biology, Geography, Games, Coding). Pack vrittih is on-screen जनाः.

## labels.txt — parse, do not dump

Fetch `public/labels.txt`. Skip `#` lines and blank lines.
Each row is `kind|id|tab|sanskrit` (four pipe fields).

- `shelf` rows: the button is field 3 **as written**. It is already bilingual English · देवनागरी.
  Beginners · मात्रा · nada · नाद-पथः · Objects · परिवेशः · Naksha · नक्शा · Sanskriti · संस्कृतिः · Play · क्रीडा · Nature · प्रकृतिः
- Render **only** field 3 for the tab. If you also print field 4 you double the Devanagari.
- Never print field 2 (file id: prarambhah, sariram, ganitam, bhugolah, sankhya-0-10).
- Never invent Maths, Body, Map, Geography, Breath Travel, गणितम् as the numbers tab.
- nada means sound path. Not Body. Not शरीरम् on that tab.

## Product law

- Meaning first. After a correct Check, English is the meaning. Devanagari stays.
- जोडो morphs: आ becomes ा, then NFC. क+आ = का (not कआ).
- मेलः does not morph. Target गङ्गा → tap नदी. Target पीतः → tap हरिद्रा. Never put the target word in the tiles.
- Play is कर्ता-क्रिया. Same renderer as मेलः. Prompt is the कर्ता in Devanagari only (बालकः). Tiles are क्रिया (पठति वहति उदयति). Check: बालकः + पठति. Never write (Kartā) or (Kriyā) on a tile. Never बनाओ a whole sentence as the Play target.
- Third shelf is Objects · परिवेशः, not numbers · संख्या. संख्या is a later door, like Sūtram. परिवेशः is मेलः: prompt पुस्तकम्, tap पठति. Tiles Devanagari only. Never English tiles (Book, Water). Never navigation.ts.
- रिक्तम् shows the blank sentence. गकारः ____ स्थानस्य अस्ति। Answer कण्ठस्य. Not a self-match on कण्ठः.
- Play does the join. Sūtram watches: glue(...) → का, three sandhi only, button शब्दः सिध्यति (visarga). English is a small caption on Sūtram.
- Deepakam is the book. Never turn lessons into tiles.
- Silent. No TTS, no new Audio, no “Hear the vowel mark.”
- Yellow card: sound-toy.txt letters only. Never “no row yet.” Close on wing/puzzle change. No setTimeout unmount.
- Day-1 tile is आ, not dotted-circle ा.
- NEVER put naked combining marks (ा ि ु ू े ो) in a tile array. The font inserts U+25CC dotted circle, which looks like inverted English “to”.
- Tile face = independent vowel आ इ उ. glueTiles maps आ→ा, इ→ि, उ→ु, then NFC. क+आ = का (not कआ, not “ आ ” with a space).
- Do not prepend U+25CC. Do not pad the mark with spaces as a fake base.

## Delete these labels if you see them

Hear the vowel mark; Meaning fuses; Small TRACE, no compiler;
ONE BOARD / SHELF; no row yet; A short vowel-mark lesson; Maatra; Biology; Geography; Games; Coding; SHELF; TRACE as a heading;
tripled titles; शब्द: with a colon;
alone Maths; alone Body; alone Map; Geography.

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

## Analyse
Same word bank, other door. Read docs/ANALYSE.md and public/analyse.json.
Never live-translate. Missing word: say not in the bank. Do not put language pills on the Board.

Sentence bank is public/sentences.txt (Devanagari only). Do not mix Telugu/Kannada into it. Language pills belong only in Analyse via public/analyse.json.
