import React, { useId, useRef, useState } from 'react';
import {
  VVM_L2_ATTRIBUTION,
  VVM_L2_BAND_IDS,
  VVM_L2_CONTENT_SLOTS,
  VVM_L2_MODULE_COPY,
  VVM_L2_OFFICIAL_CALENDAR,
  VVM_L2_PUBLISHED_SCHEME,
  VVM_LEVEL2_JSON,
  getVvmLevel2Band,
  isLevel1LastMinuteWindow,
  type VvmLevel2BandId,
  type VvmLevel2Stream,
} from '../data/vvmLevel2';
import { VvmStageToggle } from './VvmHub';
import '../styles/vvm-level2.css';

export interface VvmLevel2PageProps {
  onGoHome?: () => void;
  onOpenLevel1?: () => void;
}

const UpcomingSlot: React.FC<{ title: string; note: string }> = ({ title, note }) => (
  <div className="vvm-l2-placeholder" role="note">
    <p className="vvm-l2-placeholder-label">Coming next</p>
    <h4>{title}</h4>
    <p>{note}</p>
  </div>
);

export const VvmLevel2Page: React.FC<VvmLevel2PageProps> = ({ onGoHome, onOpenLevel1 }) => {
  const reactId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [bandId, setBandId] = useState<VvmLevel2BandId>('6-7');
  const [stream, setStream] = useState<VvmLevel2Stream>('pcm');
  const band = getVvmLevel2Band(bandId);
  const panelId = `${reactId}-panel`;
  const showLastMinute = isLevel1LastMinuteWindow();
  const components = VVM_LEVEL2_JSON.components;

  const onBandKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = VVM_L2_BAND_IDS.length - 1;
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
    const next = VVM_L2_BAND_IDS[nextIndex];
    setBandId(next);
    tabRefs.current[nextIndex]?.focus();
  };

  const aosatReady = VVM_L2_CONTENT_SLOTS.aosatQuestions[bandId].length > 0;
  const cluesReady = VVM_L2_CONTENT_SLOTS.icastCrosswordClues[bandId].length > 0;
  const worksheetsReady = VVM_L2_CONTENT_SLOTS.estWorksheets[bandId].length > 0;
  const drillsReady = VVM_L2_CONTENT_SLOTS.multiCorrectDrills[bandId].length > 0;
  const labsReady = VVM_L2_CONTENT_SLOTS.virtualLabExercises[bandId].length > 0;
  const iksReady = Boolean(VVM_L2_CONTENT_SLOTS.iksDocumentary?.videoSrc);
  const logicReady = VVM_L2_CONTENT_SLOTS.logicArenaPuzzles.length > 0;

  return (
    <div className="vvm-l2-page">
      <div className="vvm-l2-wrap">
        <nav className="vvm-l2-topbar" aria-label="VVM Level-II navigation">
          <div className="vvm-l2-topbar-links">
            {onGoHome && (
              <button type="button" className="vvm-l2-linkbtn" onClick={onGoHome}>
                Home
              </button>
            )}
            {onOpenLevel1 && (
              <button type="button" className="vvm-l2-linkbtn" onClick={onOpenLevel1}>
                Level-I hub
              </button>
            )}
          </div>
          <a
            href={VVM_L2_OFFICIAL_CALENDAR.officialSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="vvm-l2-portal"
          >
            Official portal · vvm.org.in
          </a>
        </nav>

        {showLastMinute && (
          <aside className="vvm-l2-banner" aria-label="Level-I last-minute revision">
            <h2>Level-I last-minute revision · 20–21 November 2026</h2>
            <p>
              The Level-I online exam is still open for remaining class windows: Classes 8 and 9 on 20 November,
              and Classes 10 and 11 on 21 November, 10:00 AM–6:00 PM. Use the Level-I hub for the class-wise syllabus,
              Tri-Shakti biographies, and the 30-question mock test.
            </p>
            {onOpenLevel1 ? (
              <button type="button" className="vvm-l2-banner-link" onClick={onOpenLevel1}>
                Open the Level-I revision hub
              </button>
            ) : (
              <a href="/vvm">Open the Level-I revision hub</a>
            )}
          </aside>
        )}

        <header className="vvm-l2-hero">
          <VvmStageToggle active="level-2" onOpenLevel1={onOpenLevel1} />
          <div className="vvm-l2-kicker">VVM 2026–27 · Level-II</div>
          <h1>
            Level-II is the State-Level Camp (SLC)
            <span>विद्यार्थी विज्ञान मंथन · राज्य-स्तरीय शिविर</span>
          </h1>
          <p className="vvm-l2-lead">
            In the 2026–27 cycle, Level-II is the in-person State-Level Camp — not an online school-level
            exam. The top 25 rankers per class in each state, from Level-I, are invited to a one- or two-day camp
            that tests experimental skill, application, observation, and analysis.
          </p>
          <ol className="vvm-l2-timeline">
            <li>
              <strong>Level-I ends</strong>
              <p>{VVM_L2_OFFICIAL_CALENDAR.level1Ends}</p>
            </li>
            <li>
              <strong>Level-I results</strong>
              <p>{VVM_L2_OFFICIAL_CALENDAR.level1Result}</p>
            </li>
            <li>
              <strong>State-Level Camp</strong>
              <p>{VVM_L2_OFFICIAL_CALENDAR.slcDatesOfficialLine}</p>
            </li>
          </ol>
        </header>

        <section className="vvm-l2-card" aria-labelledby={`${reactId}-qualify`}>
          <h2 id={`${reactId}-qualify`}>Who qualifies</h2>
          <p>
            {VVM_L2_OFFICIAL_CALENDAR.qualificationOfficial} will be identified to participate in the
            one- or two-day State-Level Camp. Camps are held on one of these dates:{' '}
            {VVM_L2_OFFICIAL_CALENDAR.slcDates.join('; ')}. Selected students are told their state&apos;s date
            and venue through the VVM app and their school.
          </p>
          <p className="vvm-l2-note">
            Source: official VVM 2026–27 brochure, Important Dates and State Level Camp (Level-II) sections.
          </p>
        </section>

        <section className="vvm-l2-card" aria-labelledby={`${reactId}-blueprint`}>
          <h2 id={`${reactId}-blueprint`}>SLC evaluation blueprint · 100 marks</h2>
          <p className="vvm-l2-note">{VVM_L2_ATTRIBUTION}</p>
          <div className="vvm-l2-weight" aria-hidden="true">
            {components.map((c) => (
              <span
                key={c.id}
                className={`vvm-l2-seg vvm-l2-seg--${c.id}`}
                style={{ flexGrow: c.weightagePercent }}
              >
                {c.code} {c.weightagePercent}%
              </span>
            ))}
          </div>
          <div className="vvm-l2-table-wrap">
            <table className="vvm-l2-table">
              <caption>
                {VVM_L2_PUBLISHED_SCHEME.durationNote} Component times below add to {VVM_LEVEL2_JSON.totalDurationMinutes} minutes,
                not including breaks.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Component</th>
                  <th scope="col">Full name</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Marks</th>
                  <th scope="col">Format and focus</th>
                </tr>
              </thead>
              <tbody>
                {components.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <strong>{c.code}</strong>
                    </td>
                    <td>{c.title}</td>
                    <td>{c.durationMinutes} mins</td>
                    <td>
                      {c.weightagePercent}% ({c.marks} marks)
                    </td>
                    <td>
                      {c.id === 'est'
                        ? `Hands-on lab tasks in Physics, Chemistry, Biology and Math. Last published scheme: ${VVM_L2_PUBLISHED_SCHEME.estPerSubjectOfficial}.`
                        : c.format}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="vvm-l2-card" aria-labelledby={`${reactId}-modules`}>
          <h2 id={`${reactId}-modules`}>Prep modules by class band</h2>
          <p>
            Choose a class band to see the EST checklist and ICAST research theme for that group. Class 11 follows
            the Mathematics (PCM) or Biology (PCB) stream in EST and AOSAT, as in the last published scheme.
          </p>

          <div className="vvm-l2-bands" role="tablist" aria-label="VVM Level-II class band">
            {VVM_L2_BAND_IDS.map((id, index) => {
              const selected = bandId === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`${reactId}-tab-${id}`}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  className={`vvm-l2-band${selected ? ' is-active' : ''}`}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setBandId(id)}
                  onKeyDown={(event) => onBandKeyDown(event, index)}
                >
                  {VVM_LEVEL2_JSON.classBands[id].label}
                </button>
              );
            })}
          </div>

          {bandId === '10-11' && (
            <div className="vvm-l2-stream" role="group" aria-label="Class 11 stream">
              <span className="vvm-l2-stream-label">Class 11 stream</span>
              <button
                type="button"
                className={`vvm-l2-stream-btn${stream === 'pcm' ? ' is-active' : ''}`}
                aria-pressed={stream === 'pcm'}
                onClick={() => setStream('pcm')}
              >
                Maths / PCM
              </button>
              <button
                type="button"
                className={`vvm-l2-stream-btn${stream === 'pcb' ? ' is-active' : ''}`}
                aria-pressed={stream === 'pcb'}
                onClick={() => setStream('pcb')}
              >
                Biology / PCB
              </button>
            </div>
          )}

          <div role="tabpanel" id={panelId} aria-labelledby={`${reactId}-tab-${bandId}`}>
            <article className="vvm-l2-module" aria-labelledby={`${reactId}-est`}>
              <h3 id={`${reactId}-est`}>{VVM_L2_MODULE_COPY.est.title}</h3>
              <p className="vvm-l2-module-meta">40 marks · 120 minutes · {band.label}</p>
              <p>{VVM_L2_MODULE_COPY.est.whatStudentsDo}</p>
              <p className="vvm-l2-note">
                Station time in the last published official scheme is {VVM_L2_PUBLISHED_SCHEME.estPerSubjectOfficial},
                not a flat 30 minutes per subject.
              </p>
              <p>
                <strong>Prep checklist for {band.label}</strong>
                {bandId === '10-11' ? ` · ${stream === 'pcm' ? 'Maths / PCM' : 'Biology / PCB'} stream` : ''}
              </p>
              <ul className="vvm-l2-list">
                {band.estChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {!worksheetsReady && (
                <UpcomingSlot
                  title="Step-by-step EST lab worksheets"
                  note="Printable, station-by-station practice sheets for this class band will be added here so students can rehearse at home or in a school lab."
                />
              )}
              {!labsReady && (
                <UpcomingSlot
                  title="Virtual lab and observation exercises"
                  note="Guided practice for reading instruments, graphs, precipitates, flame tests, and specimens will appear in this slot."
                />
              )}
            </article>

            <article className="vvm-l2-module" aria-labelledby={`${reactId}-icast`}>
              <h3 id={`${reactId}-icast`}>{VVM_L2_MODULE_COPY.icast.title}</h3>
              <p className="vvm-l2-module-meta">20 marks · 20 minutes · {band.icastThemeOfficial}</p>
              <p>{VVM_L2_MODULE_COPY.icast.format}</p>
              <p>
                <strong>Theme for {band.label}:</strong> {band.icastThemeOfficial}. Prep focus:{' '}
                {band.icastTheme}.
              </p>
              <p>{band.icastPrepCopy}</p>
              <ul className="vvm-l2-chips">
                {band.icastKeywords.map((word) => (
                  <li key={word}>{word}</li>
                ))}
              </ul>
              {!cluesReady && (
                <UpcomingSlot
                  title="ICAST crossword clues for this band"
                  note="A 10-word scientific crossword and practice clues for this theme will be added here."
                />
              )}
            </article>

            <article className="vvm-l2-module" aria-labelledby={`${reactId}-aosat`}>
              <h3 id={`${reactId}-aosat`}>{VVM_L2_MODULE_COPY.aosat.title}</h3>
              <p className="vvm-l2-module-meta">20 marks · 20 minutes</p>
              <p>
                <strong>How it differs from Level-I:</strong> {VVM_L2_MODULE_COPY.aosat.howItDiffers}
              </p>
              <p className="vvm-l2-note">{VVM_L2_MODULE_COPY.aosat.siteFeatureIdea}</p>
              {!aosatReady && (
                <UpcomingSlot
                  title="AOSAT sample questions and 20-minute mini-sprints"
                  note="Timed application questions for this class band — graphs, unit conversions, and experimental error — will be added here."
                />
              )}
              {!drillsReady && (
                <UpcomingSlot
                  title="Multi-correct MCQ drills"
                  note="Practice items in which more than one option can be right, with partial and negative marking explained, will appear in this slot."
                />
              )}
            </article>

            <article className="vvm-l2-module" aria-labelledby={`${reactId}-iks`}>
              <h3 id={`${reactId}-iks`}>{VVM_L2_MODULE_COPY.iks.title}</h3>
              <p className="vvm-l2-module-meta">10 marks · 40 minutes</p>
              <p>{VVM_L2_MODULE_COPY.iks.howToTrain}</p>
              <p className="vvm-l2-note">{VVM_L2_PUBLISHED_SCHEME.iksOfficial}.</p>
              {!iksReady && (
                <UpcomingSlot
                  title="IKS documentary and locked observation quiz"
                  note="A 15–20 minute documentary will play here, and a 10-question observation quiz will stay locked until the video ends."
                />
              )}
            </article>

            <article className="vvm-l2-module" aria-labelledby={`${reactId}-oob`}>
              <h3 id={`${reactId}-oob`}>{VVM_L2_MODULE_COPY.oob.title}</h3>
              <p className="vvm-l2-module-meta">10 marks · 20 minutes</p>
              <p>{VVM_L2_MODULE_COPY.oob.howToTrain}</p>
              {!logicReady && (
                <UpcomingSlot
                  title="Timed Sudoku, Kakuro and logic arena"
                  note="A 20-minute countdown practice arena with 6×6 and 9×9 Sudoku, Kakuro, and science cryptic crosswords will be added here."
                />
              )}
            </article>
          </div>
        </section>

        <p className="vvm-l2-sources">
          Official sources:{' '}
          <a href={VVM_L2_OFFICIAL_CALENDAR.brochureUrl} target="_blank" rel="noopener noreferrer">
            VVM 2026–27 brochure
          </a>
          {' · '}
          <a href={VVM_L2_PUBLISHED_SCHEME.url} target="_blank" rel="noopener noreferrer">
            SLC evaluation scheme (2025–26)
          </a>
          {' · '}
          <a href={VVM_L2_OFFICIAL_CALENDAR.officialSiteUrl} target="_blank" rel="noopener noreferrer">
            vvm.org.in
          </a>
          . Always confirm dates and the current scheme on the official site.
        </p>
      </div>
    </div>
  );
};

export default VvmLevel2Page;
