import React, { useEffect, useId, useRef, useState } from 'react';
import type { VvmTab } from './VvmPreparationPage';
import {
  VVM_CLASS_TABS,
  VVM_EXAM_PATTERN,
  VVM_TRI_SHAKTI,
  getVvmTrack,
  type VvmClassTab,
  type VvmStream,
  type VvmTrack,
} from '../data/vvmTracks';
import { getVvmClassPack, vvmClassPackPath } from '../data/vvmClassPacks';
import { isLevel1LastMinuteWindow } from '../data/vvmLevel2';
import '../styles/vvm-hub.css';

export interface VvmHubProps {
  variant?: 'compact' | 'full';
  onOpenVvm?: (tab?: VvmTab) => void;
  onOpenVvmLevel2?: () => void;
}

export const VvmStageToggle: React.FC<{
  active: 'level-1' | 'level-2';
  onOpenLevel1?: () => void;
  onOpenLevel2?: () => void;
}> = ({ active, onOpenLevel1, onOpenLevel2 }) => {
  const goLevel1 = () => {
    if (active === 'level-1') return;
    if (onOpenLevel1) onOpenLevel1();
    else window.location.assign('/vvm');
  };
  const goLevel2 = () => {
    if (active === 'level-2') return;
    if (onOpenLevel2) onOpenLevel2();
    else window.location.assign('/vvm-level-2');
  };
  return (
    <div className="vvm-stage-toggle" role="group" aria-label="VVM exam stage">
      <button
        type="button"
        className={active === 'level-1' ? 'is-active' : undefined}
        aria-current={active === 'level-1' ? 'page' : undefined}
        onClick={goLevel1}
      >
        Level-I
      </button>
      <button
        type="button"
        className={active === 'level-2' ? 'is-active' : undefined}
        aria-current={active === 'level-2' ? 'page' : undefined}
        onClick={goLevel2}
      >
        Level-II
      </button>
    </div>
  );
};

function openTab(onOpenVvm: VvmHubProps['onOpenVvm'], tab: VvmTab) {
  onOpenVvm?.(tab);
}

export const VvmHub: React.FC<VvmHubProps> = ({ variant = 'full', onOpenVvm, onOpenVvmLevel2 }) => {
  const isCompact = variant === 'compact';
  const reactId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [classTab, setClassTab] = useState<VvmClassTab>(6);
  const [stream, setStream] = useState<VvmStream>('pcm');
  const track: VvmTrack = getVvmTrack(classTab, stream);
  const panelId = `${reactId}-panel`;
  const tablistId = `${reactId}-tabs`;

  const selectClass = (next: VvmClassTab) => {
    setClassTab(next);
  };

  const onClassTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = VVM_CLASS_TABS.length - 1;
    let nextIndex = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = index === last ? 0 : index + 1;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = index === 0 ? last : index - 1;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = last;
    } else {
      return;
    }
    event.preventDefault();
    const next = VVM_CLASS_TABS[nextIndex];
    setClassTab(next);
    tabRefs.current[nextIndex]?.focus();
  };

  useEffect(() => {
    const index = VVM_CLASS_TABS.indexOf(classTab);
    tabRefs.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [classTab]);

  const coreTotalQs = track.sectionB.subjects.length * track.coreQuestionsPerSubject;
  const sectionATotal = track.sectionA.heritage + track.sectionA.triShakti;

  return (
    <section
      className={`vvm-hub${isCompact ? ' vvm-hub--compact' : ' vvm-hub--full'}`}
      id={isCompact ? 'vvm-talent-search' : 'vvm-2026-hub'}
      aria-labelledby={`${reactId}-title`}
    >
      <header className="vvm-hub-header">
        <div className="vvm-hub-toolbar">
          <VvmStageToggle active="level-1" onOpenLevel2={onOpenVvmLevel2} />
          {isCompact && isLevel1LastMinuteWindow() ? (
            <div className="vvm-hub-revision-banner" role="status">
              <p className="vvm-hub-revision-title">Level-I last-minute revision · 20–21 November 2026</p>
              <p className="vvm-hub-revision-copy">
                Remaining Level-I windows: Classes 8 and 9 on 20 November, and Classes 10 and 11 on 21 November, 10:00 AM–6:00 PM.
              </p>
              {onOpenVvm ? (
                <button
                  type="button"
                  className="vvm-hub-revision-link"
                  onClick={() => openTab(onOpenVvm, 'blueprint')}
                >
                  Open the Level-I revision hub
                </button>
              ) : (
                <a href="/vvm" className="vvm-hub-revision-link">
                  Open the Level-I revision hub
                </a>
              )}
            </div>
          ) : null}
        </div>
        <div className="vvm-hub-kicker-row">
          <span
            className="vvm-hub-meta"
            title="Vijnana Bharati (VIBHA) · National Council of Educational Research and Training (NCERT) · National Council of Science Museums (NCSM)"
          >
            VIBHA · NCERT · NCSM
          </span>
          <span className="vvm-hub-meta">Classes 6–11</span>
        </div>
        <h2 id={`${reactId}-title`} className="vvm-hub-title">
          Vidyarthi Vigyan Manthan (VVM) 2026–27
        </h2>
        <p className="vvm-hub-intro">
          Vidyarthi Vigyan Manthan (VVM) is a national science talent search programme for students of Classes 6–11, conceptualized to identify students with a scientific aptitude. It is an initiative of Vijnana Bharati (VIBHA), in collaboration with the National Council of Educational Research and Training (NCERT) and the National Council of Science Museums (NCSM).
        </p>
        <p className="vvm-hub-lead">
          {isCompact
            ? 'Choose your class to see the official Level-I split, Module 1 focus, core science and maths topics, and logic skills for that track.'
            : 'Select a class to update the badge split, Section A focus, Section B weightage, Module 3 topics, and Module 4 logic skills. Class 11 has a Maths/PCM and Biology/PCB stream toggle.'}
        </p>
      </header>

      <div className="vvm-hub-switcher">
        <div
          className="vvm-hub-tabs"
          role="tablist"
          id={tablistId}
          aria-label="VVM class"
        >
          {VVM_CLASS_TABS.map((tab, index) => {
            const selected = classTab === tab;
            const tabId = `${reactId}-tab-${tab}`;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                id={tabId}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                className={`vvm-hub-tab${selected ? ' is-active' : ''}`}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectClass(tab)}
                onKeyDown={(event) => onClassTabKeyDown(event, index)}
              >
                Class {tab}
              </button>
            );
          })}
        </div>

        {classTab === 11 && (
          <div className="vvm-hub-stream" role="group" aria-label="Class 11 stream">
            <span className="vvm-hub-stream-label">Stream</span>
            <button
              type="button"
              className={`vvm-hub-stream-btn${stream === 'pcm' ? ' is-active' : ''}`}
              aria-pressed={stream === 'pcm'}
              onClick={() => setStream('pcm')}
            >
              Maths / PCM
            </button>
            <button
              type="button"
              className={`vvm-hub-stream-btn${stream === 'pcb' ? ' is-active' : ''}`}
              aria-pressed={stream === 'pcb'}
              onClick={() => setStream('pcb')}
            >
              Biology / PCB
            </button>
          </div>
        )}
      </div>

      <div
        className="vvm-hub-panel"
        role="tabpanel"
        id={panelId}
        aria-labelledby={`${reactId}-tab-${classTab}`}
      >
        <div className="vvm-hub-badge-row">
          <p className="vvm-hub-track-label">{track.label}</p>
          <p className="vvm-hub-badge-split">{track.badgeSplit}</p>
        </div>

        <div className="vvm-hub-weight-bar" aria-hidden="true">
          <span className="vvm-hub-seg vvm-hub-seg--heritage" style={{ flexGrow: track.sectionA.heritage }}>
            Heritage {track.sectionA.heritage}%
          </span>
          <span className="vvm-hub-seg vvm-hub-seg--trishakti" style={{ flexGrow: track.sectionA.triShakti }}>
            Tri-Shakti {track.sectionA.triShakti}%
          </span>
          <span className="vvm-hub-seg vvm-hub-seg--core" style={{ flexGrow: track.sectionB.core }}>
            Core {track.sectionB.core}%
          </span>
          <span className="vvm-hub-seg vvm-hub-seg--logic" style={{ flexGrow: track.sectionB.logic }}>
            Logic {track.sectionB.logic}%
          </span>
        </div>
        <p className="vvm-hub-sr-only">
          Section A {sectionATotal} percent: Module 1 heritage {track.sectionA.heritage} percent,
          Module 2 Tri-Shakti {track.sectionA.triShakti} percent.
          Section B {track.sectionB.core + track.sectionB.logic} percent:
          core {track.sectionB.core} percent, logic {track.sectionB.logic} percent.
        </p>

        <div className="vvm-hub-sections">
          <article className="vvm-hub-card" aria-labelledby={`${reactId}-sec-a`}>
            <div className="vvm-hub-card-head">
              <h3 id={`${reactId}-sec-a`} className="vvm-hub-card-title">
                Section A · 40%
              </h3>
              <p className="vvm-hub-card-meta">Common themes, grade-scaled difficulty</p>
            </div>

            <div className="vvm-hub-module">
              <div className="vvm-hub-module-top">
                <h4>Module 1: {VVM_EXAM_PATTERN.module1.title}</h4>
                <span className="vvm-hub-count">
                  {VVM_EXAM_PATTERN.module1.percent}% · {VVM_EXAM_PATTERN.module1.questions} Qs
                </span>
              </div>
              <p className="vvm-hub-focus">
                <span className="vvm-hub-focus-label">Focus for {track.label}:</span> {track.module1Focus}
              </p>
              <p className="vvm-hub-note">{VVM_EXAM_PATTERN.module1.studyMaterial}</p>
            </div>

            <div className="vvm-hub-module">
              <div className="vvm-hub-module-top">
                <h4>Module 2: {VVM_EXAM_PATTERN.module2.title}</h4>
                <span className="vvm-hub-count">
                  {VVM_EXAM_PATTERN.module2.percent}% · {VVM_EXAM_PATTERN.module2.questions} Qs
                </span>
              </div>
              <ul className="vvm-hub-scientists">
                {VVM_TRI_SHAKTI.map((name) => (
                  <li key={name}>
                    {onOpenVvm ? (
                      <button type="button" className="vvm-hub-scientist-link" onClick={() => openTab(onOpenVvm, 'scientists')}>
                        {name}
                      </button>
                    ) : (
                      name
                    )}
                  </li>
                ))}
              </ul>
              <p className="vvm-hub-note">{VVM_EXAM_PATTERN.module2.note}</p>
            </div>
          </article>

          <article className="vvm-hub-card" aria-labelledby={`${reactId}-sec-b`}>
            <div className="vvm-hub-card-head">
              <h3 id={`${reactId}-sec-b`} className="vvm-hub-card-title">
                Section B · 60%
              </h3>
              <p className="vvm-hub-card-meta">Class and stream specific</p>
            </div>
            <div className="vvm-hub-b-split">
              <div>
                <strong>{track.sectionB.core}%</strong> Core Science
                {track.sectionB.subjects.includes('Mathematics') ? ' & Maths' : ''}
              </div>
              <div>
                <strong>{track.sectionB.logic}%</strong> Logic &amp; Reasoning
              </div>
            </div>
            <ul className="vvm-hub-qcounts">
              {track.sectionB.subjects.map((subject) => (
                <li key={subject}>
                  <span>{subject}</span>
                  <strong>{track.coreQuestionsPerSubject} Qs</strong>
                </li>
              ))}
              <li>
                <span>Logic &amp; Reasoning</span>
                <strong>{track.module4QuestionCount} Qs</strong>
              </li>
            </ul>
            <p className="vvm-hub-note">
              {coreTotalQs} core questions
              {track.sectionB.subjects.length === 4
                ? ` (12 Physics + 12 Chemistry + 12 Biology + 12 Maths)`
                : track.stream === 'pcm'
                  ? ` (15 Physics + 15 Chemistry + 15 Maths)`
                  : ` (15 Physics + 15 Chemistry + 15 Biology)`}
              {' '}plus {track.module4QuestionCount} logic questions.
            </p>
          </article>
        </div>

        <article className="vvm-hub-card vvm-hub-card--wide" aria-labelledby={`${reactId}-mod3`}>
          <div className="vvm-hub-card-head">
            <h3 id={`${reactId}-mod3`} className="vvm-hub-card-title">
              Module 3: Science &amp; Maths Booster
            </h3>
            <p className="vvm-hub-card-meta">
              {track.sectionB.core}% · {coreTotalQs} Qs · {track.label}
            </p>
          </div>
          <div className={`vvm-hub-subjects vvm-hub-subjects--${track.sectionB.subjects.length}`}>
            {track.sectionB.subjects.map((subject) => (
              <div key={subject} className="vvm-hub-subject">
                <h4>
                  {subject}
                  <span>
                    {track.coreQuestionsPerSubject} Qs
                  </span>
                </h4>
                <ul>
                  {(track.module3TopicsFull[subject] ?? track.module3Topics[subject] ?? []).map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        <article className="vvm-hub-card vvm-hub-card--wide" aria-labelledby={`${reactId}-mod4`}>
          <div className="vvm-hub-card-head">
            <h3 id={`${reactId}-mod4`} className="vvm-hub-card-title">
              Module 4: Logic &amp; Mental Aptitude
            </h3>
            <p className="vvm-hub-card-meta">
              {track.sectionB.logic}% · {track.module4QuestionCount} Qs
            </p>
          </div>
          <ul className="vvm-hub-skills">
            {track.module4SkillsFull.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </article>


        {getVvmClassPack(classTab, classTab === 11 ? stream : undefined) && (
          <article className="vvm-hub-card vvm-hub-card--wide" aria-label="Class study pack">
            <div className="vvm-hub-card-head">
              <h3 className="vvm-hub-card-title">
                Class {classTab} Study Notes, Worksheet, and Quiz
              </h3>
              <p className="vvm-hub-card-meta">Quick-revision pack</p>
            </div>
            <p className="vvm-hub-note">
              Open the Class {classTab} pack for Quick-Revision Study Notes, a printable worksheet, and an interactive quiz.
            </p>
            <div className="vvm-hub-cta vvm-hub-cta--pack">
              <a className="vvm-hub-btn vvm-hub-btn--primary" href={vvmClassPackPath(classTab, 'notes')}>
                Quick-Revision Study Notes
              </a>
              <a className="vvm-hub-btn" href={vvmClassPackPath(classTab, 'worksheet')}>
                Printable Worksheet
              </a>
              <a className="vvm-hub-btn" href={vvmClassPackPath(classTab, 'quiz')}>
                Interactive Quiz
              </a>
            </div>
          </article>
        )}

        {onOpenVvm && (
          <div className="vvm-hub-cta">
            {isCompact ? (
              <button type="button" className="vvm-hub-btn vvm-hub-btn--primary" onClick={() => openTab(onOpenVvm, 'blueprint')}>
                Open the full VVM 2026–27 Hub
              </button>
            ) : null}
            <button type="button" className="vvm-hub-btn vvm-hub-btn--primary" onClick={() => openTab(onOpenVvm, 'quiz')}>
              Start 30-Question VVM Mock Test
            </button>
            <button type="button" className="vvm-hub-btn" onClick={() => openTab(onOpenVvm, 'heritage')}>
              Indian Contributions to Science
            </button>
            <button type="button" className="vvm-hub-btn" onClick={() => openTab(onOpenVvm, 'scientists')}>
              Tri-Shakti biographies
            </button>
            <button type="button" className="vvm-hub-btn" onClick={() => openTab(onOpenVvm, 'ncert')}>
              NCERT labs
            </button>
            <button type="button" className="vvm-hub-btn" onClick={() => openTab(onOpenVvm, 'logic')}>
              Logic guide
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VvmHub;
