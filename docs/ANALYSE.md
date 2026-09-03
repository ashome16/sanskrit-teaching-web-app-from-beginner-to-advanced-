# Analyse — same bank, other door

Board never translates. Analyse is where language pills live.

## Two modes

1. **Bank** — word exists in `public/analyse.json`.
   Show: Devanagari word, sealed meaning, sealed Sanskrit sentence, sealed gloss for the selected pill.
   Pills: English, తెలుగు, ಕನ್ನಡ, മലയാളം, தமிழ்.
   Sanskrit sentence does **not** change with the pill. Only `meaning` and `sentence_translation` do.

2. **Paste** (later) — word is not in the file.
   Say “not in the bank.” Do not invent a sentence. Do not call a translator or LLM.

The search box on Analyse is mode 2. Put bank words (का, गजः, …) above it, or open Analyse from a Board tile.

## Schema (sealed)

Each headword:

- `word` — Devanagari
- `base_english` — Board gloss
- `languages.<code>.label`
- `languages.<code>.meaning`
- `languages.<code>.sentence_sanskrit` — same Devanagari in every language
- `languages.<code>.sentence_translation`

Never generate a missing language. Omit the key.

## Do not

- Put pills on the Board
- Dynamically translate Check English
- Mix scripts inside one language block
- Edit Deepakam or Board.tsx for this feature
