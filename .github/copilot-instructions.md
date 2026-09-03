# Copilot — Sanskrit Learning (canonical rules)

Read this file before any edit. This is the only rules file.
Tabs come from `public/labels.txt` field 3. Never print a file tag.

After `git pull origin main --no-rebase --no-edit`, quote the seven `shelf|` lines before you patch UI.

## Do not create

`src/constants/navigation.ts`, `src/utils/engine.ts`, `packs.json`, `public/numbers.txt`.
Do not invent `shelf1`…`shelf7`. Silent ids stay `prarambhah` `sariram` `ganitam` `bhugolah` `prakrtih` `sanskritih` `krida`.
Do not `git add -A`. Do not `git push`. Do not `gh-pages` unless the user names that.

Do not open: Deepakam, gsde*, extract_txt.py, Analyse, Vibhakti Guide, vite.config.


## Week story (spatial, already the week proofs)

A mark on the board → the throat that made it → the book in the hand → the sun in the sky → a living creature → a star → the boy reads.

1 का · 2 कण्ठस्य · 3 पुस्तकम् · 4 सूर्यः · 5 गजः · 6 तारा · 7 बालकः पठति।

Do not replace this with anatomy-across-shelves (हस्तः नेत्रम् प्राणः) or a morning-routine that drops कण्ठस्य.
Naksha is सूर्यः / आकाशः, not नेत्रम्, not मार्गः this week.

## Seven child tabs

`shelf` button = field 3 only.

1. Beginners · मात्रा — जोडो — क+आ → का — “who? (feminine)”
2. nada · नाद-पथः — रिक्तम् — गकारः ____ → कण्ठस्य — “ga is a throat-letter”
3. Vastu · वस्तु — मेलः — पुस्तकम् tap पठति — “I read a book.”
4. Naksha · नक्शा — मेलः — सूर्यः tap आकाशः — “The sun is in the sky.”
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


## Meaning (do not lie to the child)

English only after a correct Check.
The big English line is the **sentence** meaning (`puzzle.english`), never a dictionary glued under the selected tile.

Wrong: tap आकाशः, show “आकाशः” + “the sun”.
Right: Check सूर्यः + आकाशः → Sanskrit `सूर्यः आकाशे अस्ति।` and English `The sun is in the sky.`

आकाशः is sky. सूर्यः is the sun. पठति is reads. जलम् is water. तारा is a star. कण्ठस्य is of the throat.
If you print a Devanagari word, the English next to it must be THAT word — or print the full sentence instead.

Do not invent puzzles (दीपः, भोजनम्, अत्र, लिखति, एकम् on Beginners). Use `public/board.json` only.
nada footer: ग lives in the throat when the target is गकारः. Never say क for ग.
Sanskriti तारा = a star. Not “star-dust” as the word-gloss.

## Board copy

Tiles Devanagari only. English only after a correct Check.
Never तालు (Telugu). Sanskrit is तालस्य.
Never “throat pool origin”, “majestic walker”, “ancient cosmos tracing”.
One line: Pick a shelf. Tap tiles. Then Check.

## Stop when

Ports: seven tabs as above. Vastu shows पुस्तकम्. Day 1 का still holds. Deepakam still opens a lesson.
