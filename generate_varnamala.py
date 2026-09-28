import os
import time
from gTTS import gTTS

output_dir = "public/audio/barakhadi"
os.makedirs(output_dir, exist_ok=True)

vowels = {
    'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
    'ऋ': 'ri', 'ॠ': 'rii', 'ऌ': 'li', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
    'अं': 'am', 'अः': 'ah', 'अँ': 'an'
}

conjuncts = {
    'क्ष': 'ksha', 'ज्ञ': 'jnya', 'त्र': 'tra', 'श्र': 'shra'
}

print("Generating Varnamala audio...")

for char, eng in {**vowels, **conjuncts}.items():
    filename = f"{eng}.mp3"
    filepath = os.path.join(output_dir, filename)
    if not os.path.exists(filepath):
        print(f"Generating {char} -> {filename}")
        try:
            tts = gTTS(text=char, lang='hi')
            tts.save(filepath)
            time.sleep(0.5)
        except Exception as e:
            print(f"Failed to generate {char}: {e}")

print("Done!")