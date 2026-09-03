# Copilot — Sanskrit Learning (canonical rules)

Read this file before any edit. This is the only rules file.
Tabs come from `public/labels.txt` field 3. Never print a file tag.

After `git pull origin main --no-rebase --no-edit`, quote the seven `shelf|` lines before you patch UI.

## Do not create

`src/constants/navigation.ts`, `src/utils/engine.ts`, `packs.json`, `public/numbers.txt`.
Do not invent `shelf1`…`shelf7`. Silent ids stay `prarambhah` `sariram` `ganitam` `bhugolah` `prakrtih` `sanskritih` `krida`.
Do not `git add -A`. Do not `git push`. Do not `gh-pages` unless the user names that.

Do not open: Deepakam, gsde*, extract_txt.py, Analyse, Vibhakti Guide, vite.config.

## Seven child tabs

`shelf` button = field 3 only.

1. Beginners · मात्रा — जोडो — क+आ → का — “who? (feminine)”
2. nada · नाद-पथः — रिक्तम् — गकारः ____ → कण्ठस्य — “ga is a throat-letter”
3. Vastu · वस्तु — मेलः — पुस्तकम् tap पठति — “a book”
4. Naksha · नक्शा — मेलः — सूर्यः tap आकाशः — “the sun”
5. Nature · प्रकृतिः — मेलः — गजः (animal/plant names, not चलति)
6. Sanskriti · संस्कृतिः — रिक्तम् — तारा — never “one seed”
7. Play · क्रिया — कर्ता-क्रिया — बालकः tap पठति — “The boy reads.”

Never on a tab: Maths, Body, Map, Geography, numbers · संख्या, Objects · परिवेशः, space · परिवेशः, map · नक्शा, one seed, Gunitālu, Maatra, Breath Travel, Build, SHELF.

संख्या and Sūtram are later doors. Not shelves.

Clicking a tab must load that shelf’s puzzle from `public/board.json`. Vastu must not keep showing Target का.

## Skins

- जोडो: आ→ा then NFC in existing `glueTiles`. Tiles आ इ उ, never naked ा.
- मेलः and कर्ता-क्रिया: same renderer. Prompt is not a tile. Tapped tile === target. No morph. Never (Kartā).
- रिक्तम्: fill the blank. Answer tile may appear in the row. Do not self-match कण्ठः for कण्ठस्य.

If you touch `type Shape`:
`'जोडो' | 'बनाओ' | 'मेलः' | 'रिक्तम्' | 'प्रश्न' | 'क्रमः' | 'कर्ता-क्रिया'`

## Board copy

Tiles Devanagari only. English only after a correct Check.
Never तालు (Telugu). Sanskrit is तालस्य.
Never “throat pool origin”, “majestic walker”, “ancient cosmos tracing”.
One line: Pick a shelf. Tap tiles. Then Check.

## Stop when

Ports: seven tabs as above. Vastu shows पुस्तकम्. Day 1 का still holds. Deepakam still opens a lesson.
