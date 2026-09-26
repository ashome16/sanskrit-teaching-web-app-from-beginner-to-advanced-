# Audio Assets Directory

This folder hosts local, offline-capable audio assets for the Gurukul application.

## Swami Dhyanananda Saha Nāvavatu Recitation
- **Source**: [https://audio.com/swami-dhyanananda/audio/sahana-lf-slow](https://audio.com/swami-dhyanananda/audio/sahana-lf-slow)
- **License**: Free-to-use traditional Vedic recitation
- **Target Filename**: `public/audio/sahana-navavatu.mp3` or `public/audio/sahana-lf-slow.mp3`

When this file is placed here, the `<ShantiMantraPlayer />` component will automatically detect and play it using native HTML5 `<audio>`, enabling instant offline buffering, no tracking cookies, and precise playback synchronization.
