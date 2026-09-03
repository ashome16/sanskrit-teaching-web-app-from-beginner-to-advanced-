# Copilot — Sanskrit Learning (canonical rules)

Read this file before any edit. This is the only rules file. Do not invent a second manifesto.
On-screen copy comes from `public/labels.txt` field 3. Never print a file tag (`prarambhah`, `matra`, `ganitam`, `nadyah`, `parivesah`, `katha-bija`, `sankhya-0-10`).

After `git pull origin main --no-rebase --no-edit`, quote the seven `shelf|` lines from `public/labels.txt` before you patch UI.

## Do not open

Deepakam, TextbookReader, gsde*, extract_txt.py, extract-lessons.js,
Analyse, Vibhakti Guide, vite.config, index.html nav, navigation.ts.

`public/numbers.txt` is gone. Do not create it. संख्या 1–20 lives in `docs/SANKHYA.md` (later door). Never render `29`.

Top nav: Board · Deepakam · Analyse · Vibhakti Guide

## Seven child tabs (field 3 only)

Parse `public/labels.txt`: skip `#` and blanks. Row is `kind|id|tab|sanskrit`.
`shelf` button text = field 3 as written. Do not also print field 4.

1. Beginners · मात्रा
2. nada · नाद-पथः
3. Vastu · वस्तु
4. Naksha · नक्शा
5. Nature · प्रकृतिः
6. Sanskriti · संस्कृतिः
7. Play · क्रिया

Never: Maths, Body, Map, Geography, numbers · संख्या, Objects · परिवेशः, space · परिवेशः, map · नक्शा, one seed, Gunitālu, Maatra, Breath Travel, Build, SHELF, TRACE as a heading.
संख्या is a later door, like Sūtram. Not a shelf.
Sanskriti never shows `one seed`.
nada is the sound path. Not Body. Not शरीरम् on that tab.

If `Board.tsx` has `FALLBACK_WINGS`, its order and labels must match the seven tabs above.

## Skins

- जोडो: आ→ा then NFC. क+आ = का (not कआ). Tiles are independent आ इ उ, never naked ा ि ु.
- मेलः: prompt + tiles + Check. Tapped tile === target. No morph. Prompt is not a tile.
- कर्ता-क्रिया: same renderer as मेलः. Prompt is the कर्ता in Devanagari only. Never print (Kartā) or (Kriyā).
- रिक्तम्: blank sentence. गकारः ____ → कण्ठस्य. Not a self-match on कण्ठः.

If you touch `type Shape`, the union is:
`'जोडो' | 'बनाओ' | 'मेलः' | 'रिक्तम्' | 'प्रश्न' | 'क्रमः' | 'कर्ता-क्रिया'`
Never जोड़ो, जोड़िये, रंगो, परखो, मेल without visarga.

## Week proofs (from public/board.json + week.txt)

1. Beginners जोडो: क then आ then Check → का and “who? (feminine)”
2. nada रिक्तम्: गकारः ____ → कण्ठस्य → “ga is a throat-letter”
3. Vastu मेलः: पुस्तकम्, tap पठति → “a book”. Tiles Devanagari only. Never Book/Water/Cloth as tiles.
4. Naksha मेलः: सूर्यः, tap आकाशः → “the sun”. Not गङ्गा this week.
5. Nature मेलः: गजः
6. Sanskriti: तारा
7. Play कर्ता-क्रिया: बालकः, tap पठति → “The boy reads.”

Tiles are Devanagari. English only after a correct Check.

## Delete if you see them

Hear the vowel mark; Meaning fuses; Small TRACE, no compiler;
ONE BOARD / SHELF; no row yet; Maatra; Biology; Geography; Games; Coding;
tripled titles; शब्द: with a colon; (Kartā); (Kriyā).

One site line: Pick a shelf. Tap tiles. Then Check.

## Data

`public/board.json` and `public/puzzles.txt` are the week. Do not create packs.json.
Do not add 11–20, far lands, audio, TTS, or new packs until Day 1 का still holds.
Do not live-translate. Analyse is a later door (`docs/ANALYSE.md`). No language pills on the Board.

## Stop when

Ports preview matches the seven tabs and the week proofs above.
Deepakam still opens a lesson.
