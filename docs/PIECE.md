# Puzzle piece — one shape, seven anecdotes

Pencil piece is **one path**. Recolour it. Put a tiny glyph plus one line inside so the child knows the shelf.

Do not draw seven illustrations. Do not add XP. After Day 1 ka works, persist Check-success per shelf.

## States

| State | Look |
|---|---|
| waiting | grey dashed outline |
| doing | pencil fill |
| done | chalk gold plus a small tick |

## Anecdote in the piece

| Shelf | Glyph | Child line | They are learning |
|---|---|---|---|
| Beginners | का | Join क to आ | A mark sticks to a letter |
| Body | क | नाद-पथः — क lives here | A letter is a place on the path |
| Maths | पञ्च | Five fingers | Number-words, not a calculator |
| Map | नदी | गङ्गा is a river | A name belongs to a kind |
| Sanskriti | तारा | One seed | A story-bit, labelled if it is a bridge |
| Play | मा ता | Make a word | The same board, as a game |
| Sūtram | glue | Watch the join | How का is made (शब्दः सिध्यति) |

Body is **नाद-पथः**. Never heading: sound breath, Sound path, breath-path.

Copy sits in public/labels.txt. Glyph is a Devanagari span inside the SVG, not a PNG.

## Code burden

Cheap: one component, state plus shelf props, swap stroke/fill, render the glyph.
Costly: unique art, animations, a second progress app. Do not.
