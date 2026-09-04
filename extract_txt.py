#!/usr/bin/env python3
"""Convert spaced Sanskrit lesson .txt files into paragraph-block lessons for chapters.json."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PUBLIC_DIR = ROOT / 'public'
# Written to public/ (not src/data/) so GitHub Pages serves the freshly
# generated file at runtime instead of a stale bundled copy.
OUTPUT_PATHS = [
    PUBLIC_DIR / 'chapters.json',
    ROOT / 'src' / 'data' / 'chapters.json',
]

# Alphabet guide, numbers guide, then Deepakam chapters from public/gsde*.txt.
TXT_FILES = [
    ('varnamala', PUBLIC_DIR / 'varnamala.txt'),
    ('barakhadi', PUBLIC_DIR / 'barakhadi.txt'),
    ('samyukta', PUBLIC_DIR / 'samyukta.txt'),
    ('numbers', PUBLIC_DIR / 'numbers.txt'),
    ('gsde101', PUBLIC_DIR / 'gsde101.txt'),
    ('gsde102', PUBLIC_DIR / 'gsde102.txt'),
]

TITLE_OVERRIDES = {
    'gsde101': 'Chapter 1: वन्दे भारतमातरम्',
    'gsde102': 'Chapter 2: नित्यं पिबामः सुभाषितरसम्',
    'varnamala': 'Sanskrit Varṇamālā Guide',
    'barakhadi': 'बारहखड़ी · Audio Lesson',
    'samyukta': 'संयुक्त · Conjunct Games',
    'numbers': 'Sanskrit Numbers Guide (संख्या)',
}

# Ordered phonetic groupings used to label each block of public/varnamala.txt.
VARNAMALA_CATEGORIES = [
    ('स्वराः', 'स्वराः — Vowels'),
    ('क-वर्गः', 'क-वर्ग — Velars'),
    ('च-वर्गः', 'च-वर्ग — Palatals'),
    ('ट-वर्गः', 'ट-वर्ग — Retroflexes'),
    ('त-वर्गः', 'त-वर्ग — Dentals'),
    ('प-वर्गः', 'प-वर्ग — Labials'),
    ('अन्तःस्थाः', 'अन्तःस्थ व्यञ्जनानि — Semivowels'),
    ('ऊष्माणः', 'ऊष्माणि — Sibilants and Aspirate'),
    ('अनुस्वार', 'अं / अः — Anusvāra & Visarga'),
    ('संयुक्तवत्', 'संयुक्तवत् — Conjuncts'),
]

# Ordered groupings used to label each block of public/numbers.txt.
NUMBERS_CATEGORIES = [
    ('प्रथमावलिः', 'Numbers 1-10 (१-१०)'),
    ('द्वितीयावलिः', 'Numbers 11-20 (११-२०)'),
]

# Matches entry lines like "६ - षट् (ṣaṭ - 6)": numeral, Sanskrit word, romanization/value.
NUMBER_ENTRY_LINE = re.compile(r'^(\S+)\s*-\s*(.+?)\s*\([^)]*\)$')

# A line that is only digits (a stray page/line number) carries no content.
NUMBER_ONLY_LINE = re.compile(r'^\d+$')
# Leading enumeration markers such as "12.", "12)", "(12)" prefixed to a sentence.
LEADING_NUMBER_PREFIX = re.compile(r'^\(?\d+[\.\)]?\s*')


def clean_line(line: str) -> str:
    return re.sub(r'\s+', ' ', line).strip()


def strip_leading_number(line: str) -> str:
    return LEADING_NUMBER_PREFIX.sub('', line).strip()


def split_into_raw_blocks(raw_text: str) -> list[str]:
    """Split raw text into paragraph blocks separated by one or more blank lines."""
    return re.split(r'\n\s*\n+', raw_text.replace('\r\n', '\n').strip())


def split_into_blocks(raw_text: str) -> list[str]:
    """Group lines into paragraph blocks separated by one or more blank lines."""
    blocks: list[str] = []

    for raw_block in split_into_raw_blocks(raw_text):
        lines: list[str] = []
        for raw_line in raw_block.split('\n'):
            line = clean_line(raw_line)
            if not line or NUMBER_ONLY_LINE.match(line):
                continue
            lines.append(strip_leading_number(line))
        block = ' '.join(line for line in lines if line)
        if block:
            blocks.append(block)

    return blocks


def build_lesson(item_id: str, txt_path: Path, existing_lesson: dict | None = None) -> dict:
    raw_text = txt_path.read_text(encoding='utf-8')
    blocks = split_into_blocks(raw_text)
    if not blocks:
        raise ValueError(f'No paragraph blocks extracted from {txt_path}')

    # The first block is a single short title line (e.g. "प्रथमः पाठः : ...").
    title = TITLE_OVERRIDES.get(item_id, blocks[0])
    paragraph_blocks = blocks[1:] if len(blocks) > 1 else blocks

    # Preserve any hand-written paragraphTranslation values keyed by matching Sanskrit text.
    existing_translations = {
        item['sanskrit']: item.get('paragraphTranslation')
        for item in (existing_lesson or {}).get('sentences', [])
        if item.get('paragraphTranslation')
    }

    sentences = []
    for block in paragraph_blocks:
        words = [word for word in re.findall(r'[^\s]+', block) if word.strip()]
        sentence: dict = {
            'sanskrit': block,
            'meaning': '',
            'words': words,
        }
        translation = existing_translations.get(block)
        if translation:
            sentence['paragraphTranslation'] = translation
        sentences.append(sentence)

    return {
        'id': item_id,
        'fileName': txt_path.name,
        'title': title,
        'sentences': sentences,
    }


def build_varnamala_lesson(item_id: str, txt_path: Path) -> dict:
    """Parse the alphabet guide into one color-coded row per phonetic group."""
    raw_text = txt_path.read_text(encoding='utf-8')
    raw_blocks = split_into_raw_blocks(raw_text)
    # The first block is the guide's own title line; the rest are letter groups.
    group_blocks = raw_blocks[1:]

    sentences = []
    for index, raw_block in enumerate(group_blocks):
        lines = [clean_line(line) for line in raw_block.split('\n') if clean_line(line)]
        if not lines:
            continue
        letters_line = lines[0]
        description_line = lines[1] if len(lines) > 1 else ''
        letters = letters_line.split()
        category, label = (
            VARNAMALA_CATEGORIES[index] if index < len(VARNAMALA_CATEGORIES) else ('', '')
        )
        sentences.append({
            'sanskrit': description_line or letters_line,
            'meaning': label,
            'words': letters,
            'category': category,
        })

    return {
        'id': item_id,
        'fileName': txt_path.name,
        'title': TITLE_OVERRIDES.get(item_id, 'Sanskrit Varṇamālā Guide'),
        'sentences': sentences,
    }



def build_barakhadi_lesson(item_id: str, txt_path: Path) -> dict:
    """Parse बारहखड़ी into one tappable audio row per consonant."""
    raw_text = txt_path.read_text(encoding='utf-8')
    raw_blocks = split_into_raw_blocks(raw_text)
    group_blocks = raw_blocks[1:]  # skip title

    sentences = []
    for raw_block in group_blocks:
        lines = [clean_line(line) for line in raw_block.split('\n') if clean_line(line)]
        if not lines:
            continue
        letters_line = lines[0]
        description_line = lines[1] if len(lines) > 1 else ''
        letters = letters_line.split()
        # category = first consonant of the row
        category = letters[0] if letters else ''
        label = description_line or f'{category}-row'
        sentences.append({
            'sanskrit': description_line or letters_line,
            'meaning': label,
            'words': letters,
            'category': category,
        })

    return {
        'id': item_id,
        'fileName': txt_path.name,
        'title': TITLE_OVERRIDES.get(item_id, 'बारहखड़ी · Audio Lesson'),
        'sentences': sentences,
    }

def build_numbers_lesson(item_id: str, txt_path: Path) -> dict:
    """Parse the numbers guide into one row per decade block (1-10, 11-20, ...)."""
    raw_text = txt_path.read_text(encoding='utf-8')
    raw_blocks = split_into_raw_blocks(raw_text)
    # The first block is the guide's own title line; the rest are decade blocks.
    group_blocks = raw_blocks[1:]

    sentences = []
    for index, raw_block in enumerate(group_blocks):
        lines = [clean_line(line) for line in raw_block.split('\n') if clean_line(line)]
        if not lines:
            continue
        # lines[0] is the bare digit row, lines[1] the block description; the rest are entries.
        description_line = lines[1] if len(lines) > 1 else ''
        entries = []
        for line in lines[2:]:
            match = NUMBER_ENTRY_LINE.match(line)
            entries.append(f'{match.group(1)} - {match.group(2)}' if match else line)
        category, label = (
            NUMBERS_CATEGORIES[index] if index < len(NUMBERS_CATEGORIES) else ('', '')
        )
        sentences.append({
            'sanskrit': description_line or lines[0],
            'meaning': label,
            'words': entries,
            'category': category,
        })

    return {
        'id': item_id,
        'fileName': txt_path.name,
        'title': TITLE_OVERRIDES.get(item_id, 'Sanskrit Numbers Guide (संख्या)'),
        'sentences': sentences,
    }


def load_existing_lessons(output_path: Path) -> list[dict]:
    if not output_path.exists():
        return []
    data = json.loads(output_path.read_text(encoding='utf-8'))
    return data.get('lessons', [])


def build_samyukta_lesson(item_id: str, txt_path: Path) -> dict:
    title = TITLE_OVERRIDES[item_id]
    games = [
        ('game1', 'Game 1 · Drop the Stick', 'स + त → स्त'),
        ('game2', 'Game 2 · Piggyback Ride', 'द + व → द्व'),
        ('game3', 'Game 3 · Superhero Shape-Shifters', 'क्+ष / त्+र'),
    ]
    sentences = [
        {
            'sanskrit': note,
            'meaning': label,
            'words': [],
            'category': gid,
        }
        for gid, label, note in games
    ]
    return {
        'id': item_id,
        'fileName': txt_path.name,
        'title': title,
        'sentences': sentences,
    }

def main() -> None:
    existing_lessons = load_existing_lessons(OUTPUT_PATHS[0])
    existing_by_id = {item['id']: item for item in existing_lessons}
    allowed_ids = {item_id for item_id, _ in TXT_FILES}

    lessons: list[dict] = []
    for item_id, txt_path in TXT_FILES:
        if not txt_path.exists():
            # Keep a previously compiled lesson (e.g. numbers) if its .txt is absent.
            if item_id in existing_by_id:
                lessons.append(existing_by_id[item_id])
                print(f'Kept existing lesson {item_id} (missing {txt_path.name})')
                continue
            raise FileNotFoundError(f'Missing text file: {txt_path}')
        if item_id == 'varnamala':
            lessons.append(build_varnamala_lesson(item_id, txt_path))
        elif item_id == 'barakhadi':
            lessons.append(build_barakhadi_lesson(item_id, txt_path))
        elif item_id == 'samyukta':
            lessons.append(build_samyukta_lesson(item_id, txt_path))
        elif item_id == 'numbers':
            lessons.append(build_numbers_lesson(item_id, txt_path))
        else:
            existing = existing_by_id.get(item_id)
            # Keep hand-enriched Chapter 2 (शब्दार्थ + अभ्यास cards) if already present.
            if item_id == 'gsde102' and existing and any(
                (s.get('kind') or '').startswith(('glossary', 'exercise'))
                for s in existing.get('sentences', [])
            ):
                lessons.append(existing)
                print(f'Kept enriched lesson {item_id} ({len(existing["sentences"])} cards)')
            else:
                lessons.append(build_lesson(item_id, txt_path, existing))

    # Keep only the lessons listed in TXT_FILES.
    lessons = [lesson for lesson in lessons if lesson['id'] in allowed_ids]

    payload = {'lessons': lessons}
    json_text = json.dumps(payload, ensure_ascii=False, indent=2) + '\n'

    for output_path in OUTPUT_PATHS:
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(json_text, encoding='utf-8')

    print(f'Wrote {len(lessons)} lessons ({len(TXT_FILES)} refreshed from .txt) to:')
    for path in OUTPUT_PATHS:
        print(f' - {path.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
