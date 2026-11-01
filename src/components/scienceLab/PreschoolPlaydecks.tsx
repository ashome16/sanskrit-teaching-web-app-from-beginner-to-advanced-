import React, { useEffect, useMemo, useState } from 'react';
import { playPronunciation } from '../../utils/pronunciation';
import { soundEffects } from '../../utils/soundEffects';

export interface NatureDeckItem {
  id: string;
  dev: string;
  iast: string;
  en: string;
  emoji: string;
  bg: string;
  when: string;
  fact: string;
  img?: string;
}

export interface YogaDeckItem {
  id: string;
  dev: string;
  iast: string;
  en: string;
  icon: string;
  clue: string;
  bg: string;
}

export interface ActionDeckItem {
  id: string;
  dev: string;
  iast: string;
  en: string;
  emoji: string;
  clue: string;
  bg: string;
}

export interface WordQuestCard {
  id: string;
  dev: string;
  iast: string;
  en?: string;
  emoji: string;
  clue: string;
  bg: string;
  subBadge?: string;
  cognates?: string;
}

const shuffleList = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

/** Pick target + 3 deterministic-per-round distractors for 4-picture toddler choice */
function buildFourChoices<T extends { id: string }>(all: T[], target: T, seedNum: number): T[] {
  const others = all.filter((x) => x.id !== target.id);
  const code = target.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), seedNum * 13);
  const picked = others
    .map((item, idx) => ({ item, score: ((idx + 1) * 17 + code) % 97 }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((x) => x.item);
  const four = [target, ...picked];
  // Rotate deterministically so target isn't always first
  const rot = code % four.length;
  return [...four.slice(rot), ...four.slice(0, rot)];
}

/* ============================================================================
   1. LIVING NATURE EXPLORER (Bugs 🦋 · Birds 🦜 · Flowers 🌸)
   Modes: Explore & Hear | 4-Picture Sound Quest | Memory Twin Flip
   ============================================================================ */
interface LivingNatureExplorerProps {
  items: NatureDeckItem[];
  title: string;
  sub: string;
  whereLabel: string;
  accent: string;
  onEarnStar?: () => void;
}

interface MemoryTile {
  uid: string;
  item: NatureDeckItem;
}

export const LivingNatureExplorer: React.FC<LivingNatureExplorerProps> = ({
  items,
  title,
  sub,
  whereLabel,
  accent,
  onEarnStar,
}) => {
  const [mode, setMode] = useState<'explore' | 'quest' | 'memory'>('explore');
  const [sel, setSel] = useState<NatureDeckItem>(items[0]);
  const [seenIds, setSeenIds] = useState<string[]>([items[0].id]);

  // 4-Picture Quest state
  const [questRound, setQuestRound] = useState(0);
  const questOrder = useMemo(() => shuffleList(items), [items, questRound]);
  const [questIdx, setQuestIdx] = useState(0);
  const [wrongChoiceId, setWrongChoiceId] = useState<string | null>(null);
  const [questMsg, setQuestMsg] = useState('Listen to the Sanskrit name and tap its picture!');

  // Memory Flip state (6 pairs = 12 cards)
  const [memRound, setMemRound] = useState(0);
  const memoryBoard: MemoryTile[] = useMemo(() => {
    const six = shuffleList(items).slice(0, Math.min(6, items.length));
    const doubled = six.flatMap((it) => [
      { uid: `${it.id}-a`, item: it },
      { uid: `${it.id}-b`, item: it },
    ]);
    return shuffleList(doubled);
  }, [items, memRound]);
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [matchedItemIds, setMatchedItemIds] = useState<string[]>([]);
  const [memBusy, setMemBusy] = useState(false);

  // Reset internal state if items array changes (e.g. switching between insects/birds/flowers)
  useEffect(() => {
    setSel(items[0]);
    setSeenIds([items[0].id]);
    setQuestIdx(0);
    setWrongChoiceId(null);
    setFlippedUids([]);
    setMatchedItemIds([]);
    setMemBusy(false);
  }, [items]);

  const playCreature = (it: NatureDeckItem, speak = true) => {
    soundEffects.playNatureCreatureSound(it.id);
    if (speak) {
      setTimeout(() => playPronunciation(it.dev), 160);
    }
  };

  const currentQuestTarget = questOrder[questIdx] || null;
  const fourChoices = useMemo(() => {
    if (!currentQuestTarget) return [];
    return buildFourChoices(items, currentQuestTarget, questRound + questIdx);
  }, [items, currentQuestTarget, questRound, questIdx]);

  const handleQuestPick = (picked: NatureDeckItem) => {
    if (!currentQuestTarget) return;
    if (picked.id === currentQuestTarget.id) {
      soundEffects.playCelebrationChime();
      playPronunciation(picked.dev);
      onEarnStar?.();
      setWrongChoiceId(null);
      if (questIdx + 1 >= questOrder.length) {
        setTimeout(() => soundEffects.playVictoryFanfare(), 300);
        setQuestMsg(`🏆 शोभनम्! You found all ${questOrder.length}!`);
      } else {
        setQuestMsg(`🎉 शाबाश्! That is ${picked.dev} (${picked.en})!`);
        const nextTarget = questOrder[questIdx + 1];
        setTimeout(() => {
          if (nextTarget) playCreature(nextTarget, true);
        }, 650);
      }
      setQuestIdx((i) => i + 1);
    } else {
      setWrongChoiceId(picked.id);
      soundEffects.playPuzzleSnap();
      setQuestMsg(`🙂 That is ${picked.en} — listen again and find ${currentQuestTarget.dev}!`);
      setTimeout(() => setWrongChoiceId(null), 600);
    }
  };

  const handleMemoryFlip = (tile: MemoryTile) => {
    if (memBusy) return;
    if (flippedUids.includes(tile.uid) || matchedItemIds.includes(tile.item.id)) return;

    playCreature(tile.item, true);
    const nextFlipped = [...flippedUids, tile.uid];
    setFlippedUids(nextFlipped);

    if (nextFlipped.length === 2) {
      const firstTile = memoryBoard.find((t) => t.uid === nextFlipped[0]);
      if (firstTile && firstTile.item.id === tile.item.id) {
        const nextMatched = [...matchedItemIds, tile.item.id];
        setMatchedItemIds(nextMatched);
        setFlippedUids([]);
        setTimeout(() => soundEffects.playCelebrationChime(), 240);
        onEarnStar?.();
        if (nextMatched.length === memoryBoard.length / 2) {
          setTimeout(() => soundEffects.playVictoryFanfare(), 450);
        }
      } else {
        setMemBusy(true);
        setTimeout(() => {
          setFlippedUids([]);
          setMemBusy(false);
        }, 900);
      }
    }
  };

  return (
    <div className="psw-card-bench ppd-shell">
      <div className="ppd-header-row">
        <div>
          <h3 className="psw-section-heading" style={{ margin: 0 }}>{title}</h3>
          <p className="psw-section-sub" style={{ margin: '4px 0 0' }}>{sub}</p>
        </div>
        <div className="bharat-mode-pills" role="tablist" aria-label="Game play modes">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'explore'}
            className={`bharat-mode-btn ${mode === 'explore' ? 'is-active' : ''}`}
            onClick={() => { setMode('explore'); soundEffects.playStrokeChime(); }}
          >
            🌿 Explore &amp; Hear
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'quest'}
            className={`bharat-mode-btn ${mode === 'quest' ? 'is-active' : ''}`}
            onClick={() => {
              setMode('quest');
              setQuestIdx(0);
              setQuestRound((r) => r + 1);
              setQuestMsg('Listen & tap the matching picture!');
              soundEffects.playStrokeChime();
            }}
          >
            🎯 Picture Quest
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'memory'}
            className={`bharat-mode-btn ${mode === 'memory' ? 'is-active' : ''}`}
            onClick={() => {
              setMode('memory');
              setFlippedUids([]);
              setMatchedItemIds([]);
              soundEffects.playStrokeChime();
            }}
          >
            🃏 Memory Flip
          </button>
        </div>
      </div>

      {/* MODE 1: EXPLORE & HEAR */}
      {mode === 'explore' && (
        <>
          <div className="ppd-spotlight-banner" style={{ background: sel.bg, borderColor: accent }}>
            <div className="ppd-spot-visual" onClick={() => playCreature(sel, true)} role="button" tabIndex={0}>
              {sel.img ? (
                <img src={sel.img} alt={sel.en} width={68} height={68} style={{ width: 68, height: 68, objectFit: 'contain' }} />
              ) : (
                <span>{sel.emoji}</span>
              )}
            </div>
            <div className="ppd-spot-info">
              <div className="ppd-spot-where">{whereLabel} {sel.when}</div>
              <h4 lang="sa" className="ppd-spot-title">
                {sel.dev} <small>({sel.iast}) · {sel.en}</small>
              </h4>
              <p className="ppd-spot-fact">{sel.fact}</p>
            </div>
            <div className="ppd-spot-btns">
              <button type="button" className="bqc-btn bqc-btn--primary" onClick={() => playCreature(sel, true)}>
                🔊 Hear Sound &amp; Name
              </button>
            </div>
          </div>

          <div className="ppd-explore-grid">
            {items.map((f) => {
              const isSelected = sel.id === f.id;
              const wasSeen = seenIds.includes(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setSel(f);
                    playCreature(f, true);
                    if (!seenIds.includes(f.id)) {
                      const next = [...seenIds, f.id];
                      setSeenIds(next);
                      if (next.length % 4 === 0) onEarnStar?.();
                    }
                  }}
                  className={`ppd-nature-tile ${isSelected ? 'is-selected' : ''}`}
                  style={{
                    background: f.bg,
                    borderColor: isSelected ? accent : '#cbd5e1',
                  }}
                >
                  {wasSeen && <span className="ppd-seen-star" aria-hidden="true">★</span>}
                  {f.img ? (
                    <img src={f.img} alt={f.en} width={54} height={54} style={{ width: 54, height: 54, objectFit: 'contain' }} />
                  ) : (
                    <span className="ppd-tile-emoji">{f.emoji}</span>
                  )}
                  <strong lang="sa" className="ppd-tile-sa">{f.dev}</strong>
                  <small className="ppd-tile-iast">{f.iast}</small>
                  <span className="ppd-tile-en">{f.en}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* MODE 2: 4-PICTURE SOUND QUEST */}
      {mode === 'quest' && (
        <div className="ppd-quest-arena">
          {currentQuestTarget ? (
            <>
              <div className="ppd-quest-prompt-card" style={{ borderColor: accent }}>
                <div className="ppd-qp-top">
                  <span className="bqc-badge">Question {questIdx + 1} of {questOrder.length}</span>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#475569' }}>{questMsg}</span>
                </div>
                <div className="ppd-qp-main">
                  <div>
                    <span className="bqc-prompt-label">Listen &amp; tap the picture for…</span>
                    <h4 lang="sa" className="ppd-qp-word">{currentQuestTarget.dev}</h4>
                    <span className="ppd-qp-iast">({currentQuestTarget.iast})</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="bqc-btn bqc-btn--primary"
                      onClick={() => playCreature(currentQuestTarget, true)}
                    >
                      🔊 Hear Again
                    </button>
                  </div>
                </div>
              </div>

              <div className="ppd-four-grid">
                {fourChoices.map((ch) => {
                  const isWrong = wrongChoiceId === ch.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => handleQuestPick(ch)}
                      className={`ppd-choice-card ${isWrong ? 'is-wrong' : ''}`}
                      style={{ background: ch.bg }}
                    >
                      {ch.img ? (
                        <img src={ch.img} alt={ch.en} width={76} height={76} style={{ width: 76, height: 76, objectFit: 'contain' }} />
                      ) : (
                        <span className="ppd-choice-emoji">{ch.emoji}</span>
                      )}
                      <strong className="ppd-choice-en">{ch.en}</strong>
                      <small style={{ color: '#475569' }}>{ch.when}</small>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="bharat-victory-card" role="status">
              <div className="bvc-trophy">🏆🌟🎉</div>
              <h4 lang="sa" style={{ margin: '6px 0', fontSize: '1.45rem', color: '#14532d' }}>अति-शोभनम्! Wonderful!</h4>
              <p style={{ margin: '0 0 12px', fontWeight: 700, color: '#166534' }}>
                You found all {questOrder.length} friends by listening to their Sanskrit names!
              </p>
              <button
                type="button"
                className="psw-quiz-btn"
                onClick={() => { setQuestIdx(0); setQuestRound((r) => r + 1); soundEffects.playSuccessDing(); }}
              >
                🔁 Play Another Round
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: MEMORY TWIN FLIP */}
      {mode === 'memory' && (
        <div className="ppd-memory-arena">
          <div className="bharat-status-strip">
            <span className="bharat-status-text">
              🃏 Tap two cards to find matching twins! Every card speaks its Sanskrit name!
            </span>
            <div className="bharat-status-right">
              <span className="bharat-progress-pill">
                ⭐ Pairs: <strong>{matchedItemIds.length}</strong> / {memoryBoard.length / 2}
              </span>
              <button
                type="button"
                className="bharat-mini-action"
                onClick={() => {
                  setMemRound((r) => r + 1);
                  setFlippedUids([]);
                  setMatchedItemIds([]);
                  soundEffects.playSuccessDing();
                }}
              >
                🔀 New Cards
              </button>
            </div>
          </div>

          {matchedItemIds.length === memoryBoard.length / 2 && (
            <div className="psw-victory-banner" role="status">
              <span>🎉 <strong>अद्भुतम्! Super Memory!</strong> You matched all {matchedItemIds.length} pairs!</span>
              <button
                type="button"
                className="psw-quiz-btn"
                onClick={() => {
                  setMemRound((r) => r + 1);
                  setFlippedUids([]);
                  setMatchedItemIds([]);
                  soundEffects.playSuccessDing();
                }}
              >
                Play Again ↺
              </button>
            </div>
          )}

          <div className="ppd-memory-grid">
            {memoryBoard.map((tile) => {
              const isMatched = matchedItemIds.includes(tile.item.id);
              const isOpen = isMatched || flippedUids.includes(tile.uid);
              return (
                <button
                  key={tile.uid}
                  type="button"
                  onClick={() => handleMemoryFlip(tile)}
                  className={`ppd-mem-card ${isOpen ? 'is-open' : 'is-closed'} ${isMatched ? 'is-matched' : ''}`}
                  style={{ background: isOpen ? tile.item.bg : undefined }}
                  aria-label={isOpen ? `${tile.item.dev} (${tile.item.en})` : 'Mystery card — tap to flip'}
                >
                  {isOpen ? (
                    <>
                      {tile.item.img ? (
                        <img src={tile.item.img} alt={tile.item.en} width={48} height={48} style={{ width: 48, height: 48, objectFit: 'contain' }} />
                      ) : (
                        <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>{tile.item.emoji}</span>
                      )}
                      <strong lang="sa" style={{ fontSize: '0.95rem', color: '#0f172a' }}>{tile.item.dev}</strong>
                      <small style={{ fontSize: '0.75rem', color: '#475569' }}>{tile.item.en}</small>
                    </>
                  ) : (
                    <span className="ppd-mem-back" aria-hidden="true">🪷❓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   2. YOGA POSE STUDIO (योगासनानि · Ages 2-6)
   Modes: Pose & 5-Sec Breathe Timer | 4-Picture Pose Quest | Mini Pack Match
   ============================================================================ */
export const YogaPoseStudio: React.FC<{ poses: YogaDeckItem[]; onEarnStar?: () => void }> = ({
  poses,
  onEarnStar,
}) => {
  const [mode, setMode] = useState<'studio' | 'quest' | 'match'>('studio');
  const [idx, setIdx] = useState(0);
  const [heldIds, setHeldIds] = useState<string[]>([]);
  const [timerLeft, setTimerLeft] = useState<number | null>(null);

  // Quest state
  const [questRound, setQuestRound] = useState(0);
  const questOrder = useMemo(() => shuffleList(poses), [poses, questRound]);
  const [questIdx, setQuestIdx] = useState(0);
  const [wrongId, setWrongId] = useState<string | null>(null);

  // Mini pack match (5 poses per pack so zero scrolling wall!)
  const [packHalf, setPackHalf] = useState<0 | 1>(0);
  const packSlice = useMemo(() => (packHalf === 0 ? poses.slice(0, 5) : poses.slice(5, 10)), [poses, packHalf]);
  const [matchRound, setMatchRound] = useState(0);
  const leftCards = useMemo(() => shuffleList(packSlice), [packSlice, matchRound]);
  const rightCards = useMemo(() => shuffleList(packSlice), [packSlice, matchRound]);
  const [pick, setPick] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);

  const activePose = poses[idx] || poses[0];

  // 5-second breathing pose hold countdown
  useEffect(() => {
    if (timerLeft === null) return;
    if (timerLeft <= 0) {
      soundEffects.playCelebrationChime();
      if (!heldIds.includes(activePose.id)) {
        setHeldIds((prev) => [...prev, activePose.id]);
      }
      onEarnStar?.();
      const clearId = setTimeout(() => setTimerLeft(null), 1100);
      return () => clearTimeout(clearId);
    }
    const id = setTimeout(() => {
      soundEffects.playStrokeChime();
      setTimerLeft((t) => (t !== null ? t - 1 : null));
    }, 1000);
    return () => clearTimeout(id);
  }, [timerLeft, activePose.id, heldIds, onEarnStar]);

  const currentQuestPose = questOrder[questIdx] || null;
  const fourPoseChoices = useMemo(() => {
    if (!currentQuestPose) return [];
    return buildFourChoices(poses, currentQuestPose, questRound + questIdx);
  }, [poses, currentQuestPose, questRound, questIdx]);

  return (
    <div className="psw-card-bench ppd-shell">
      <div className="ppd-header-row">
        <div>
          <h3 className="psw-section-heading" style={{ margin: 0 }}>
            🧘 <span lang="sa">योगासन-वाटिका</span> · Little Yogi Pose Studio
          </h3>
          <p className="psw-section-sub" style={{ margin: '4px 0 0' }}>
            Stretch like a cat, stand tall like a tree, hold the 5-second breathing timer, or play Pose Quest!
          </p>
        </div>
        <div className="bharat-mode-pills" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'studio'}
            className={`bharat-mode-btn ${mode === 'studio' ? 'is-active' : ''}`}
            onClick={() => { setMode('studio'); setTimerLeft(null); soundEffects.playStrokeChime(); }}
          >
            🧘 Try Pose &amp; Timer
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'quest'}
            className={`bharat-mode-btn ${mode === 'quest' ? 'is-active' : ''}`}
            onClick={() => { setMode('quest'); setQuestIdx(0); setQuestRound((r) => r + 1); soundEffects.playStrokeChime(); }}
          >
            🎯 4-Pose Quest
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'match'}
            className={`bharat-mode-btn ${mode === 'match' ? 'is-active' : ''}`}
            onClick={() => { setMode('match'); setPick(null); setDone([]); soundEffects.playStrokeChime(); }}
          >
            🧩 Match Pairs (5)
          </button>
        </div>
      </div>

      {/* STUDIO + 5-SECOND POSE HOLD TIMER */}
      {mode === 'studio' && (
        <>
          <div className="ppd-yoga-stage" style={{ background: activePose.bg }}>
            <div className="ppd-yoga-art-box">
              <img
                src={`${import.meta.env.BASE_URL}preschool/yoga/${activePose.id}.webp`}
                alt={`${activePose.en} illustration`}
                className="ppd-yoga-hero-img"
              />
              <span className="ppd-yoga-corner-emoji" aria-hidden="true">{activePose.icon}</span>
            </div>

            <div className="ppd-yoga-details">
              <div className="bqc-kicker-row">
                <span className="bqc-badge">Āsana {idx + 1} of {poses.length}</span>
                <span className="bqc-step">⭐ Held: {heldIds.length}/{poses.length}</span>
              </div>

              <h4 lang="sa" className="ppd-yoga-sa">{activePose.dev}</h4>
              <div className="ppd-yoga-sub">
                <em>{activePose.iast}</em> · <strong>{activePose.en}</strong>
              </div>
              <p className="ppd-yoga-cue">✨ {activePose.clue}!</p>

              <div className="ppd-yoga-actions">
                <button
                  type="button"
                  className="bqc-btn bqc-btn--primary"
                  onClick={() => playPronunciation(activePose.dev)}
                >
                  🔊 Hear "{activePose.dev}"
                </button>
                <button
                  type="button"
                  disabled={timerLeft !== null && timerLeft > 0}
                  className="ppd-hold-timer-btn"
                  onClick={() => {
                    playPronunciation(activePose.dev);
                    soundEffects.playStrokeChime();
                    setTimerLeft(5);
                  }}
                >
                  {timerLeft === null
                    ? '🌟 Hold Pose 5s Together!'
                    : timerLeft > 0
                      ? `🧘 Breathe & Hold… ${timerLeft}s`
                      : '🎉 शाबाश्! Great Yogi!'}
                </button>
              </div>

              <div className="ppd-nav-strip">
                <button
                  type="button"
                  className="bharat-mini-action"
                  onClick={() => {
                    const prev = (idx - 1 + poses.length) % poses.length;
                    setIdx(prev);
                    setTimerLeft(null);
                    playPronunciation(poses[prev].dev);
                  }}
                >
                  ⬅ Prev Pose
                </button>
                <button
                  type="button"
                  className="bharat-mini-action"
                  onClick={() => {
                    const next = (idx + 1) % poses.length;
                    setIdx(next);
                    setTimerLeft(null);
                    playPronunciation(poses[next].dev);
                  }}
                >
                  Next Pose ➡
                </button>
              </div>
            </div>
          </div>

          <div className="ppd-thumb-strip" role="list" aria-label="All 10 yoga poses">
            {poses.map((p, pIdx) => {
              const isCur = pIdx === idx;
              const wasHeld = heldIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setIdx(pIdx);
                    setTimerLeft(null);
                    playPronunciation(p.dev);
                    soundEffects.playStrokeChime();
                  }}
                  className={`ppd-pose-thumb ${isCur ? 'is-active' : ''}`}
                  style={{ background: p.bg }}
                >
                  {wasHeld && <span className="ppd-seen-star">⭐</span>}
                  <span style={{ fontSize: '1.6rem' }}>{p.icon}</span>
                  <strong lang="sa" style={{ fontSize: '0.82rem' }}>{p.dev}</strong>
                  <small style={{ fontSize: '0.72rem', color: '#334155' }}>{p.en}</small>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* 4-PICTURE POSE QUEST */}
      {mode === 'quest' && (
        <div className="ppd-quest-arena">
          {currentQuestPose ? (
            <>
              <div className="ppd-quest-prompt-card" style={{ borderColor: '#8b5cf6' }}>
                <div className="ppd-qp-top">
                  <span className="bqc-badge">Pose {questIdx + 1} of {questOrder.length}</span>
                  <span style={{ fontWeight: 700, color: '#4c1d95' }}>Tap the picture that matches this Sanskrit āsana!</span>
                </div>
                <div className="ppd-qp-main">
                  <div>
                    <span className="bqc-prompt-label">Which yoga pose is…</span>
                    <h4 lang="sa" className="ppd-qp-word">{currentQuestPose.dev}</h4>
                    <span className="ppd-qp-iast">({currentQuestPose.iast})</span>
                  </div>
                  <button
                    type="button"
                    className="bqc-btn bqc-btn--primary"
                    onClick={() => playPronunciation(currentQuestPose.dev)}
                  >
                    🔊 Hear Āsana
                  </button>
                </div>
              </div>

              <div className="ppd-four-grid">
                {fourPoseChoices.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => {
                      if (ch.id === currentQuestPose.id) {
                        soundEffects.playCelebrationChime();
                        playPronunciation(ch.dev);
                        onEarnStar?.();
                        setWrongId(null);
                        if (questIdx + 1 >= questOrder.length) {
                          setTimeout(() => soundEffects.playVictoryFanfare(), 300);
                        } else {
                          const nxt = questOrder[questIdx + 1];
                          setTimeout(() => { if (nxt) playPronunciation(nxt.dev); }, 600);
                        }
                        setQuestIdx((i) => i + 1);
                      } else {
                        setWrongId(ch.id);
                        soundEffects.playPuzzleSnap();
                        setTimeout(() => setWrongId(null), 600);
                      }
                    }}
                    className={`ppd-choice-card ${wrongId === ch.id ? 'is-wrong' : ''}`}
                    style={{ background: ch.bg }}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}preschool/yoga/${ch.id}.webp`}
                      alt={ch.en}
                      style={{ height: 96, width: 'auto', maxWidth: 130, objectFit: 'contain', borderRadius: 12, background: '#fff', padding: 4 }}
                    />
                    <strong className="ppd-choice-en">{ch.icon} {ch.en}</strong>
                    <small style={{ color: '#475569' }}>{ch.clue}</small>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="bharat-victory-card" role="status">
              <div className="bvc-trophy">🧘🏆🌟</div>
              <h4 lang="sa" style={{ margin: '6px 0', fontSize: '1.45rem', color: '#14532d' }}>योग-वीरः! Little Yoga Champion!</h4>
              <p style={{ margin: '0 0 12px', fontWeight: 700, color: '#166534' }}>
                You recognized all {questOrder.length} Sanskrit yoga poses!
              </p>
              <button
                type="button"
                className="psw-quiz-btn"
                onClick={() => { setQuestIdx(0); setQuestRound((r) => r + 1); soundEffects.playSuccessDing(); }}
              >
                🔁 Play Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* BITE-SIZED 5-PAIR MATCH */}
      {mode === 'match' && (
        <div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            <button
              type="button"
              className={`bharat-pack-chip ${packHalf === 0 ? 'is-active' : ''}`}
              style={{ background: '#dcfce7', borderColor: packHalf === 0 ? '#16a34a' : '#cbd5e1' }}
              onClick={() => { setPackHalf(0); setPick(null); setDone([]); setMatchRound((r) => r + 1); }}
            >
              🌳 Pack 1: Nature Poses (5)
            </button>
            <button
              type="button"
              className={`bharat-pack-chip ${packHalf === 1 ? 'is-active' : ''}`}
              style={{ background: '#ede9fe', borderColor: packHalf === 1 ? '#7c3aed' : '#cbd5e1' }}
              onClick={() => { setPackHalf(1); setPick(null); setDone([]); setMatchRound((r) => r + 1); }}
            >
              🐱 Pack 2: Playful Poses (5)
            </button>
            <span className="bharat-progress-pill" style={{ marginLeft: 'auto' }}>
              ⭐ Matched: <strong>{done.length}</strong> / {packSlice.length}
            </span>
          </div>

          <div className="psw-two-col-match-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {leftCards.map((p) => {
                const ok = done.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    disabled={ok}
                    onClick={() => { setPick(p.id); playPronunciation(p.dev); }}
                    className={`bharat-name-row-btn ${pick === p.id ? 'is-picked' : ''} ${ok ? 'is-done' : ''}`}
                    style={{ background: ok ? '#dcfce7' : '#ffffff', borderColor: pick === p.id ? '#8b5cf6' : '#c7d2fe' }}
                  >
                    <span>
                      <strong lang="sa" style={{ fontSize: 18 }}>{p.dev}</strong>
                      <br />
                      <small style={{ fontStyle: 'italic', color: '#475569' }}>{p.iast}</small>
                    </span>
                    <span style={{ marginLeft: 'auto' }}>{ok ? '✅' : pick === p.id ? '👉' : '🔊'}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {rightCards.map((p) => {
                const ok = done.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    disabled={ok}
                    onClick={() => {
                      if (!pick || ok) return;
                      if (pick === p.id) {
                        setDone((d) => [...d, p.id]);
                        setPick(null);
                        soundEffects.playCelebrationChime();
                        onEarnStar?.();
                      } else {
                        setWrongId(p.id);
                        soundEffects.playPuzzleSnap();
                        setTimeout(() => setWrongId(null), 500);
                      }
                    }}
                    className={`bharat-name-row-btn ${ok ? 'is-done' : ''}`}
                    style={{
                      background: ok ? '#dcfce7' : p.bg,
                      borderColor: wrongId === p.id ? '#ef4444' : ok ? '#22c55e' : '#cbd5e1',
                    }}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}preschool/yoga/${p.id}.webp`}
                      alt={p.en}
                      style={{ height: 56, width: 56, objectFit: 'contain', borderRadius: 10, background: '#fff', flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 14 }}>
                      <strong>{p.icon} {p.en}</strong>
                      <br />
                      {p.clue}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   3. ACTION PLAY STUDIO (क्रियाः · "आचार्यः वदति / Guru Says!" + 4-Picture Quest)
   ============================================================================ */
export const ActionPlayStudio: React.FC<{ actions: ActionDeckItem[]; onEarnStar?: () => void }> = ({
  actions,
  onEarnStar,
}) => {
  const [mode, setMode] = useState<'gurusays' | 'quest' | 'match'>('gurusays');
  const [actIdx, setActIdx] = useState(0);
  const [didCount, setDidCount] = useState(0);
  const [cheerBounce, setCheerBounce] = useState(false);

  // Quest state
  const [questRound, setQuestRound] = useState(0);
  const questOrder = useMemo(() => shuffleList(actions), [actions, questRound]);
  const [questIdx, setQuestIdx] = useState(0);
  const [wrongId, setWrongId] = useState<string | null>(null);

  // Match pack (6 per pack)
  const [packHalf, setPackHalf] = useState<0 | 1>(0);
  const packSlice = useMemo(() => (packHalf === 0 ? actions.slice(0, 6) : actions.slice(6, 12)), [actions, packHalf]);
  const [matchRound, setMatchRound] = useState(0);
  const leftCards = useMemo(() => shuffleList(packSlice), [packSlice, matchRound]);
  const rightCards = useMemo(() => shuffleList(packSlice), [packSlice, matchRound]);
  const [pick, setPick] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);

  const curAction = actions[actIdx] || actions[0];
  const curQuest = questOrder[questIdx] || null;
  const fourChoices = useMemo(() => {
    if (!curQuest) return [];
    return buildFourChoices(actions, curQuest, questRound + questIdx);
  }, [actions, curQuest, questRound, questIdx]);

  return (
    <div className="psw-card-bench ppd-shell">
      <div className="ppd-header-row">
        <div>
          <h3 className="psw-section-heading" style={{ margin: 0 }}>
            🏃 <span lang="sa">क्रिया-क्रीडा</span> · Action Words &amp; “Ācārya Says!”
          </h3>
          <p className="psw-section-sub" style={{ margin: '4px 0 0' }}>
            Jump, run, clap, eat &amp; sleep — listen to the Sanskrit action word and act it out!
          </p>
        </div>
        <div className="bharat-mode-pills" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'gurusays'}
            className={`bharat-mode-btn ${mode === 'gurusays' ? 'is-active' : ''}`}
            onClick={() => { setMode('gurusays'); soundEffects.playStrokeChime(); }}
          >
            🎬 Ācārya Says!
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'quest'}
            className={`bharat-mode-btn ${mode === 'quest' ? 'is-active' : ''}`}
            onClick={() => { setMode('quest'); setQuestIdx(0); setQuestRound((r) => r + 1); soundEffects.playStrokeChime(); }}
          >
            🎯 4-Action Quest
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'match'}
            className={`bharat-mode-btn ${mode === 'match' ? 'is-active' : ''}`}
            onClick={() => { setMode('match'); setPick(null); setDone([]); soundEffects.playStrokeChime(); }}
          >
            🧩 Match Pairs (6)
          </button>
        </div>
      </div>

      {/* MODE 1: ACARYA SAYS MOVEMENT STAGE */}
      {mode === 'gurusays' && (
        <>
          <div className="ppd-gurusays-stage" style={{ background: curAction.bg }}>
            <div className={`ppd-guru-giant-emoji ${cheerBounce ? 'is-cheering' : ''}`} onClick={() => playPronunciation(curAction.dev)}>
              {curAction.emoji}
            </div>
            <div className="ppd-guru-content">
              <span className="bqc-badge">🗣️ आचार्यः वदति · Teacher Says! (⭐ {didCount} done)</span>
              <h4 lang="sa" className="ppd-yoga-sa">{curAction.dev}!</h4>
              <div className="ppd-yoga-sub">
                <em>{curAction.iast}</em> · <strong>{curAction.clue}</strong>
              </div>
              <div className="ppd-yoga-actions" style={{ marginTop: 8 }}>
                <button
                  type="button"
                  className="bqc-btn bqc-btn--primary"
                  onClick={() => playPronunciation(curAction.dev)}
                >
                  🔊 Hear "{curAction.dev}"
                </button>
                <button
                  type="button"
                  className="ppd-hold-timer-btn"
                  onClick={() => {
                    soundEffects.playCelebrationChime();
                    onEarnStar?.();
                    setDidCount((c) => c + 1);
                    setCheerBounce(true);
                    setTimeout(() => {
                      setCheerBounce(false);
                      const next = (actIdx + 1) % actions.length;
                      setActIdx(next);
                      playPronunciation(actions[next].dev);
                    }, 550);
                  }}
                >
                  🙌 I Did It! Next Action →
                </button>
                <button
                  type="button"
                  className="bqc-btn bqc-btn--hint"
                  onClick={() => {
                    const rand = Math.floor(Math.random() * actions.length);
                    setActIdx(rand);
                    soundEffects.playStrokeChime();
                    playPronunciation(actions[rand].dev);
                  }}
                >
                  🎲 Surprise!
                </button>
              </div>
            </div>
          </div>

          <div className="ppd-thumb-strip">
            {actions.map((a, i) => (
              <button
                key={a.id}
                type="button"
                onClick={() => {
                  setActIdx(i);
                  playPronunciation(a.dev);
                  soundEffects.playStrokeChime();
                }}
                className={`ppd-pose-thumb ${i === actIdx ? 'is-active' : ''}`}
                style={{ background: a.bg }}
              >
                <span style={{ fontSize: '1.75rem' }}>{a.emoji}</span>
                <strong lang="sa" style={{ fontSize: '0.86rem' }}>{a.dev}</strong>
                <small style={{ fontSize: '0.73rem', color: '#334155' }}>{a.en}</small>
              </button>
            ))}
          </div>
        </>
      )}

      {/* MODE 2: 4-ACTION PICTURE QUEST */}
      {mode === 'quest' && (
        <div className="ppd-quest-arena">
          {curQuest ? (
            <>
              <div className="ppd-quest-prompt-card" style={{ borderColor: '#16a34a' }}>
                <div className="ppd-qp-top">
                  <span className="bqc-badge">Action {questIdx + 1} of {questOrder.length}</span>
                  <span style={{ fontWeight: 700, color: '#166534' }}>Listen &amp; tap who is doing this action!</span>
                </div>
                <div className="ppd-qp-main">
                  <div>
                    <span className="bqc-prompt-label">Who is doing…</span>
                    <h4 lang="sa" className="ppd-qp-word">{curQuest.dev}</h4>
                    <span className="ppd-qp-iast">({curQuest.iast})</span>
                  </div>
                  <button
                    type="button"
                    className="bqc-btn bqc-btn--primary"
                    onClick={() => playPronunciation(curQuest.dev)}
                  >
                    🔊 Hear Verb
                  </button>
                </div>
              </div>

              <div className="ppd-four-grid">
                {fourChoices.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => {
                      if (ch.id === curQuest.id) {
                        soundEffects.playCelebrationChime();
                        playPronunciation(ch.dev);
                        onEarnStar?.();
                        setWrongId(null);
                        if (questIdx + 1 >= questOrder.length) {
                          setTimeout(() => soundEffects.playVictoryFanfare(), 300);
                        } else {
                          const nxt = questOrder[questIdx + 1];
                          setTimeout(() => { if (nxt) playPronunciation(nxt.dev); }, 600);
                        }
                        setQuestIdx((i) => i + 1);
                      } else {
                        setWrongId(ch.id);
                        soundEffects.playPuzzleSnap();
                        setTimeout(() => setWrongId(null), 600);
                      }
                    }}
                    className={`ppd-choice-card ${wrongId === ch.id ? 'is-wrong' : ''}`}
                    style={{ background: ch.bg }}
                  >
                    <span className="ppd-choice-emoji">{ch.emoji}</span>
                    <strong className="ppd-choice-en">{ch.clue}</strong>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="bharat-victory-card" role="status">
              <div className="bvc-trophy">🏃🏆🎉</div>
              <h4 lang="sa" style={{ margin: '6px 0', fontSize: '1.45rem', color: '#14532d' }}>क्रिया-कुशलः! Super Mover!</h4>
              <p style={{ margin: '0 0 12px', fontWeight: 700, color: '#166534' }}>
                You mastered all {questOrder.length} Sanskrit action words!
              </p>
              <button
                type="button"
                className="psw-quiz-btn"
                onClick={() => { setQuestIdx(0); setQuestRound((r) => r + 1); soundEffects.playSuccessDing(); }}
              >
                🔁 Play Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: BITE-SIZED 6-PAIR MATCH */}
      {mode === 'match' && (
        <div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            <button
              type="button"
              className={`bharat-pack-chip ${packHalf === 0 ? 'is-active' : ''}`}
              style={{ background: '#dcfce7', borderColor: packHalf === 0 ? '#16a34a' : '#cbd5e1' }}
              onClick={() => { setPackHalf(0); setPick(null); setDone([]); setMatchRound((r) => r + 1); }}
            >
              🤸 Pack 1: Play &amp; Move (6)
            </button>
            <button
              type="button"
              className={`bharat-pack-chip ${packHalf === 1 ? 'is-active' : ''}`}
              style={{ background: '#fef9c3', borderColor: packHalf === 1 ? '#eab308' : '#cbd5e1' }}
              onClick={() => { setPackHalf(1); setPick(null); setDone([]); setMatchRound((r) => r + 1); }}
            >
              🥛 Pack 2: Daily Routine (6)
            </button>
            <span className="bharat-progress-pill" style={{ marginLeft: 'auto' }}>
              ⭐ Matched: <strong>{done.length}</strong> / {packSlice.length}
            </span>
          </div>

          <div className="psw-two-col-match-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {leftCards.map((a) => {
                const ok = done.includes(a.id);
                return (
                  <button
                    key={a.id}
                    type="button"
                    disabled={ok}
                    onClick={() => { setPick(a.id); playPronunciation(a.dev); }}
                    className={`bharat-name-row-btn ${pick === a.id ? 'is-picked' : ''} ${ok ? 'is-done' : ''}`}
                    style={{ background: ok ? '#dcfce7' : '#ffffff', borderColor: pick === a.id ? '#16a34a' : '#cbd5e1' }}
                  >
                    <span>
                      <strong lang="sa" style={{ fontSize: 18 }}>{a.dev}</strong>
                      <br />
                      <small style={{ fontStyle: 'italic', color: '#475569' }}>{a.iast}</small>
                    </span>
                    <span style={{ marginLeft: 'auto' }}>{ok ? '✅' : pick === a.id ? '👉' : '🔊'}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {rightCards.map((a) => {
                const ok = done.includes(a.id);
                return (
                  <button
                    key={a.id}
                    type="button"
                    disabled={ok}
                    onClick={() => {
                      if (!pick || ok) return;
                      if (pick === a.id) {
                        setDone((d) => [...d, a.id]);
                        setPick(null);
                        soundEffects.playCelebrationChime();
                        onEarnStar?.();
                      } else {
                        setWrongId(a.id);
                        soundEffects.playPuzzleSnap();
                        setTimeout(() => setWrongId(null), 500);
                      }
                    }}
                    className={`bharat-name-row-btn ${ok ? 'is-done' : ''}`}
                    style={{
                      background: ok ? '#dcfce7' : a.bg,
                      borderColor: wrongId === a.id ? '#ef4444' : ok ? '#22c55e' : '#cbd5e1',
                    }}
                  >
                    <span style={{ fontSize: 32, flexShrink: 0 }}>{a.emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{a.clue}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   4. TODDLER CARD QUEST DECK (Family 👪 · Spices 🌶️ · 12 Months 🗓️ · Work 🧑‍🌾)
   Replaces 10-12 row text lists with:
   1. Touch & Explore Visual Cards | 2. 4-Picture Audio Quest | 3. Bite-Sized Match Packs
   ============================================================================ */
interface ToddlerCardQuestDeckProps {
  items: WordQuestCard[];
  icon: string;
  titleSa: string;
  titleEn: string;
  subtitle: string;
  accentColor: string;
  packLabels?: [string, string];
  onEarnStar?: () => void;
}

export const ToddlerCardQuestDeck: React.FC<ToddlerCardQuestDeckProps> = ({
  items,
  icon,
  titleSa,
  titleEn,
  subtitle,
  accentColor,
  packLabels = ['🌟 Pack 1 (Easy 6)', '✨ Pack 2 (Next)'],
  onEarnStar,
}) => {
  const [mode, setMode] = useState<'explore' | 'quest' | 'match'>('explore');
  const [sel, setSel] = useState<WordQuestCard>(items[0]);
  const [tappedIds, setTappedIds] = useState<string[]>([items[0].id]);

  // 4-Picture Quest state
  const [questRound, setQuestRound] = useState(0);
  const questOrder = useMemo(() => shuffleList(items), [items, questRound]);
  const [questIdx, setQuestIdx] = useState(0);
  const [wrongId, setWrongId] = useState<string | null>(null);

  // Bite-sized Match state (splits 10-12 items into 2 cozy halves of 5-6 items)
  const mid = Math.ceil(items.length / 2);
  const [packIdx, setPackIdx] = useState<0 | 1>(0);
  const packItems = useMemo(() => (packIdx === 0 ? items.slice(0, mid) : items.slice(mid)), [items, packIdx, mid]);
  const [matchRound, setMatchRound] = useState(0);
  const leftCards = useMemo(() => shuffleList(packItems), [packItems, matchRound]);
  const rightCards = useMemo(() => shuffleList(packItems), [packItems, matchRound]);
  const [pick, setPick] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    setSel(items[0]);
    setTappedIds([items[0].id]);
    setQuestIdx(0);
    setWrongId(null);
    setPackIdx(0);
    setPick(null);
    setDone([]);
  }, [items]);

  const curQuest = questOrder[questIdx] || null;
  const fourChoices = useMemo(() => {
    if (!curQuest) return [];
    return buildFourChoices(items, curQuest, questRound + questIdx);
  }, [items, curQuest, questRound, questIdx]);

  return (
    <div className="psw-card-bench ppd-shell">
      <div className="ppd-header-row">
        <div>
          <h3 className="psw-section-heading" style={{ margin: 0 }}>
            {icon} <span lang="sa">{titleSa}</span> · {titleEn}
          </h3>
          <p className="psw-section-sub" style={{ margin: '4px 0 0' }}>{subtitle}</p>
        </div>

        <div className="bharat-mode-pills" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'explore'}
            className={`bharat-mode-btn ${mode === 'explore' ? 'is-active' : ''}`}
            onClick={() => { setMode('explore'); soundEffects.playStrokeChime(); }}
          >
            👀 Touch &amp; Hear
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'quest'}
            className={`bharat-mode-btn ${mode === 'quest' ? 'is-active' : ''}`}
            onClick={() => {
              setMode('quest');
              setQuestIdx(0);
              setQuestRound((r) => r + 1);
              soundEffects.playStrokeChime();
            }}
          >
            🎯 4-Picture Quest
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'match'}
            className={`bharat-mode-btn ${mode === 'match' ? 'is-active' : ''}`}
            onClick={() => { setMode('match'); setPick(null); setDone([]); soundEffects.playStrokeChime(); }}
          >
            🧩 Cozy Match ({mid})
          </button>
        </div>
      </div>

      {/* MODE 1: TOUCH & EXPLORE CARDS */}
      {mode === 'explore' && (
        <>
          <div className="ppd-spotlight-banner" style={{ background: sel.bg, borderColor: accentColor }}>
            <div
              className="ppd-spot-visual"
              onClick={() => { soundEffects.playBubblePop(); playPronunciation(sel.dev); }}
              role="button"
              tabIndex={0}
            >
              <span>{sel.emoji}</span>
            </div>
            <div className="ppd-spot-info">
              {sel.subBadge && <div className="ppd-spot-where">{sel.subBadge}</div>}
              <h4 lang="sa" className="ppd-spot-title">
                {sel.dev} <small>({sel.iast})</small>
              </h4>
              <p className="ppd-spot-fact">{sel.clue}</p>
              {sel.cognates && (
                <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>
                  🗣️ Home words: {sel.cognates}
                </p>
              )}
            </div>
            <div className="ppd-spot-btns">
              <button
                type="button"
                className="bqc-btn bqc-btn--primary"
                onClick={() => { soundEffects.playStrokeChime(); playPronunciation(sel.dev); }}
              >
                🔊 Say "{sel.dev}"
              </button>
            </div>
          </div>

          <div className="ppd-explore-grid">
            {items.map((it) => {
              const isSelected = sel.id === it.id;
              const wasTapped = tappedIds.includes(it.id);
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => {
                    setSel(it);
                    soundEffects.playBubblePop();
                    playPronunciation(it.dev);
                    if (!tappedIds.includes(it.id)) {
                      const next = [...tappedIds, it.id];
                      setTappedIds(next);
                      if (next.length % 4 === 0) onEarnStar?.();
                    }
                  }}
                  className={`ppd-nature-tile ${isSelected ? 'is-selected' : ''}`}
                  style={{
                    background: it.bg,
                    borderColor: isSelected ? accentColor : '#cbd5e1',
                  }}
                >
                  {wasTapped && <span className="ppd-seen-star" aria-hidden="true">★</span>}
                  {it.subBadge && <span className="ppd-mini-pill">{it.subBadge}</span>}
                  <span className="ppd-tile-emoji">{it.emoji}</span>
                  <strong lang="sa" className="ppd-tile-sa">{it.dev}</strong>
                  <small className="ppd-tile-iast">{it.iast}</small>
                  <span className="ppd-tile-en">{it.clue.split('·')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* MODE 2: 4-PICTURE AUDIO QUEST */}
      {mode === 'quest' && (
        <div className="ppd-quest-arena">
          {curQuest ? (
            <>
              <div className="ppd-quest-prompt-card" style={{ borderColor: accentColor }}>
                <div className="ppd-qp-top">
                  <span className="bqc-badge">Card {questIdx + 1} of {questOrder.length}</span>
                  <span style={{ fontWeight: 700, color: '#334155' }}>Tap the picture that matches the Sanskrit word!</span>
                </div>
                <div className="ppd-qp-main">
                  <div>
                    <span className="bqc-prompt-label">Find the picture for…</span>
                    <h4 lang="sa" className="ppd-qp-word">{curQuest.dev}</h4>
                    <span className="ppd-qp-iast">({curQuest.iast})</span>
                    {curQuest.cognates && (
                      <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 2 }}>{curQuest.cognates}</div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="bqc-btn bqc-btn--primary"
                    onClick={() => playPronunciation(curQuest.dev)}
                  >
                    🔊 Hear Word
                  </button>
                </div>
              </div>

              <div className="ppd-four-grid">
                {fourChoices.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => {
                      if (ch.id === curQuest.id) {
                        soundEffects.playCelebrationChime();
                        playPronunciation(ch.dev);
                        onEarnStar?.();
                        setWrongId(null);
                        if (questIdx + 1 >= questOrder.length) {
                          setTimeout(() => soundEffects.playVictoryFanfare(), 300);
                        } else {
                          const nxt = questOrder[questIdx + 1];
                          setTimeout(() => { if (nxt) playPronunciation(nxt.dev); }, 600);
                        }
                        setQuestIdx((i) => i + 1);
                      } else {
                        setWrongId(ch.id);
                        soundEffects.playPuzzleSnap();
                        setTimeout(() => setWrongId(null), 600);
                      }
                    }}
                    className={`ppd-choice-card ${wrongId === ch.id ? 'is-wrong' : ''}`}
                    style={{ background: ch.bg }}
                  >
                    <span className="ppd-choice-emoji">{ch.emoji}</span>
                    <strong className="ppd-choice-en">{ch.clue}</strong>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="bharat-victory-card" role="status">
              <div className="bvc-trophy">{icon}🏆🎉</div>
              <h4 lang="sa" style={{ margin: '6px 0', fontSize: '1.45rem', color: '#14532d' }}>सर्वं सम्यक्! Champion!</h4>
              <p style={{ margin: '0 0 12px', fontWeight: 700, color: '#166534' }}>
                You matched all {questOrder.length} cards in {titleEn}!
              </p>
              <button
                type="button"
                className="psw-quiz-btn"
                onClick={() => { setQuestIdx(0); setQuestRound((r) => r + 1); soundEffects.playSuccessDing(); }}
              >
                🔁 Play Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: COZY BITE-SIZED TWO-COLUMN MATCH */}
      {mode === 'match' && (
        <div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            <button
              type="button"
              className={`bharat-pack-chip ${packIdx === 0 ? 'is-active' : ''}`}
              style={{ background: '#fef3c7', borderColor: packIdx === 0 ? accentColor : '#cbd5e1' }}
              onClick={() => { setPackIdx(0); setPick(null); setDone([]); setMatchRound((r) => r + 1); }}
            >
              {packLabels[0]} ({mid})
            </button>
            <button
              type="button"
              className={`bharat-pack-chip ${packIdx === 1 ? 'is-active' : ''}`}
              style={{ background: '#e0f2fe', borderColor: packIdx === 1 ? accentColor : '#cbd5e1' }}
              onClick={() => { setPackIdx(1); setPick(null); setDone([]); setMatchRound((r) => r + 1); }}
            >
              {packLabels[1]} ({items.length - mid})
            </button>
            <button
              type="button"
              className="bharat-mini-action"
              onClick={() => { setPick(null); setDone([]); setMatchRound((r) => r + 1); soundEffects.playStrokeChime(); }}
            >
              🔀 Shuffle
            </button>
            <span className="bharat-progress-pill" style={{ marginLeft: 'auto' }}>
              ⭐ Matched: <strong>{done.length}</strong> / {packItems.length}
            </span>
          </div>

          {done.length === packItems.length && (
            <div className="psw-victory-banner" role="status" style={{ marginBottom: 10 }}>
              <span>🎉 <strong>शोभनम्!</strong> Pack complete! Try the other pack or shuffle!</span>
              <button
                type="button"
                className="psw-quiz-btn"
                onClick={() => {
                  setPackIdx(packIdx === 0 ? 1 : 0);
                  setPick(null);
                  setDone([]);
                  setMatchRound((r) => r + 1);
                  soundEffects.playSuccessDing();
                }}
              >
                Next Pack →
              </button>
            </div>
          )}

          <div className="psw-two-col-match-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {leftCards.map((f) => {
                const ok = done.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    disabled={ok}
                    onClick={() => { setPick(f.id); playPronunciation(f.dev); }}
                    className={`bharat-name-row-btn ${pick === f.id ? 'is-picked' : ''} ${ok ? 'is-done' : ''}`}
                    style={{ background: ok ? '#dcfce7' : '#ffffff', borderColor: pick === f.id ? accentColor : '#cbd5e1' }}
                  >
                    <span>
                      <strong lang="sa" style={{ fontSize: 18 }}>{f.dev}</strong>
                      {f.cognates && <span style={{ fontSize: 12, color: '#64748b', marginLeft: 6 }}>({f.cognates})</span>}
                      <br />
                      <small style={{ fontStyle: 'italic', color: '#475569' }}>{f.iast}</small>
                    </span>
                    <span style={{ marginLeft: 'auto' }}>{ok ? '✅' : pick === f.id ? '👉' : '🔊'}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {rightCards.map((f) => {
                const ok = done.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    disabled={ok}
                    onClick={() => {
                      if (!pick || ok) return;
                      if (pick === f.id) {
                        setDone((d) => [...d, f.id]);
                        setPick(null);
                        soundEffects.playCelebrationChime();
                        onEarnStar?.();
                      } else {
                        setWrongId(f.id);
                        soundEffects.playPuzzleSnap();
                        setTimeout(() => setWrongId(null), 500);
                      }
                    }}
                    className={`bharat-name-row-btn ${ok ? 'is-done' : ''}`}
                    style={{
                      background: ok ? '#dcfce7' : f.bg,
                      borderColor: wrongId === f.id ? '#ef4444' : ok ? '#22c55e' : '#cbd5e1',
                    }}
                  >
                    <span style={{ fontSize: 32, flexShrink: 0 }}>{f.emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{f.clue}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
