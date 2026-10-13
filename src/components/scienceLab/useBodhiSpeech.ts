import { useCallback, useEffect, useRef, useState } from 'react';
import { speakAsBodhi, type BodhiSpeechLang } from '../../utils/pronunciation';

/**
 * One shared Play/Stop helper for every Bodhi narration button in the labs.
 * - toggle(text, lang, key): starts Bodhi; pressing the same key again stops him.
 * - Starting a new narration stops the previous one (no overlap, no repeats).
 * - Speech stops when the component unmounts.
 * No time limit: speakAsBodhi reads the full text sentence by sentence.
 */
export const useBodhiSpeech = () => {
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);
  const stopRef = useRef<(() => void) | null>(null);
  const keyRef = useRef<string | null>(null);

  const stop = useCallback(() => {
    const fn = stopRef.current;
    stopRef.current = null;
    keyRef.current = null;
    fn?.();
    setSpeakingKey(null);
  }, []);

  const toggle = useCallback(
    (text: string, lang: BodhiSpeechLang, key: string = lang) => {
      if (stopRef.current && keyRef.current === key) {
        stop();
        return;
      }
      stop();
      if (!text || !text.trim()) return;
      let fn: (() => void) | null = null;
      let endedSync = false;
      keyRef.current = key;
      setSpeakingKey(key);
      try {
        fn = speakAsBodhi(text, {
          lang,
          onEnd: () => {
            endedSync = fn === null;
            if (fn !== null && stopRef.current !== fn) return;
            stopRef.current = null;
            keyRef.current = null;
            setSpeakingKey(null);
          },
        });
      } catch {
        fn = null;
        endedSync = true;
      }
      if (endedSync || !fn) {
        keyRef.current = null;
        setSpeakingKey(null);
        return;
      }
      stopRef.current = fn;
    },
    [stop],
  );

  useEffect(() => () => stop(), [stop]);

  return { speakingKey, toggle, stop };
};

export default useBodhiSpeech;
