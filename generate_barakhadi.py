import os
import time
from gtts import gTTS

# Create the output directory matching your Vite public folder
output_dir = "public/audio/barakhadi"
os.makedirs(output_dir, exist_ok=True)

consonants = ["क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह"]
eng_consonants = ["k", "kh", "g", "gh", "ng", "ch", "chh", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "sh", "shh", "s", "h"]

matras = ["", "ा", "ि", "ी", "ु", "ू", "ृ", "े", "ै", "ो", "ौ", "ं", "ः"]
eng_vowels = ["a", "aa", "i", "ee", "u", "oo", "ri", "e", "ai", "o", "au", "am", "ah"]

print("Starting Barakhadi audio generation...")

for i, c in enumerate(consonants):
    for j, m in enumerate(matras):
        syllable = c + m
        filename = f"{eng_consonants[i]}_{eng_vowels[j]}.mp3"
        filepath = os.path.join(output_dir, filename)
        
        if not os.path.exists(filepath):
            print(f"Generating {syllable} -> {filename}")
            try:
                tts = gTTS(text=syllable, lang='hi')
                tts.save(filepath)
                time.sleep(0.5) 
            except Exception as e:
                print(f"Failed to generate {syllable}: {e}")

print(f"Done! All files saved to {output_dir}")
