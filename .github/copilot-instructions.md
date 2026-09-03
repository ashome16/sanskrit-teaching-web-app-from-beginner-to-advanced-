# Copilot — Sanskrit Learning (canonical rules)

Read this file before any edit. This is the only rules file.
Visitor/parent copy: `docs/VISITOR.md` and `public/visitor.txt`. If you add a Welcome on the Board, fetch visitor.txt. Do not dump it as nav.
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

1. Beginners · मात्रा — जोडो — क+आ → का — “Who is the girl reading?”
2. nada · नाद-पथः — रिक्तम् — गकारः ____ → कण्ठस्य — “The sound ga belongs to the throat repository.”
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


## Meaning (sentence + highlight)

After a correct Check only:
1. Show `puzzle.sentence` (Devanagari).
2. Highlight `puzzle.highlight` inside that sentence (different colour/weight). The highlight is the form in the sentence (`पुस्तकं`, `आकाशे`), which may differ from the tile (`पुस्तकम्`, `आकाशः`).
3. Show `puzzle.english` under it. That English is the **sentence**, not a dictionary for the tapped tile.

Never: tapped tile आकाशः + English “the sun”.
Never show English before Check.

Week bank (do not rewrite these English lines):
- का · का बालिका पठति। · Who is the girl reading?
- कण्ठस्य · गकारः कण्ठस्य स्थानस्य अस्ति। · The sound ga belongs to the throat repository.
- पुस्तकम् · अहं पुस्तकं पठामि। · I read a book.
- सूर्यः · सूर्यः आकाशे अस्ति। · The sun is in the sky.
- गजः · गजः मन्दं चलति। · The elephant walks slowly.
- तारा · वयं सर्वे तारा-धूलयः। · We are all star-dust.
- बालकः · बालकः पठति। · The boy reads.

Read `public/board.json` `highlight` + `sentence` + `english`. Do not invent दीपः / भोजनम् / एकम् on Beginners.


## Board copy

Tiles Devanagari only. English only after a correct Check.
Never तालు (Telugu). Sanskrit is तालस्य.
Never “throat pool origin”, “majestic walker”, “ancient cosmos tracing”.
One line: Pick a shelf. Tap tiles. Then Check.

## Stop when

Ports: seven tabs as above. Vastu shows पुस्तकम्. Day 1 का still holds. Deepakam still opens a lesson.
