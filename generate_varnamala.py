import os
import time
import urllib.request
import urllib.parse

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

print("Generating Varnamala audio via direct TTS stream...")

for char, eng in {**vowels, **conjuncts}.items():
    filename = f"{eng}.mp3"
    filepath = os.path.join(output_dir, filename)
    if not os.path.exists(filepath):
        print(f"Downloading {char} -> {filename}")
        try:
            encoded_text = urllib.parse.quote(char)
            url = f"https://translate.google.com/translate_tts?ie=UTF-8&q={encoded_text}&tl=hi&client=tw-ob"
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
                out_file.write(response.read())
            time.sleep(0.4)
        except Exception as e:
            print(f"Failed for {char}: {e}")

print("All Varnamala audio files generated successfully!")