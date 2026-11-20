import React, { useEffect, useMemo, useState } from 'react';
import {
  getVvmClassPack,
  type VvmClassPack,
  type VvmQuizQuestion,
} from '../data/vvmClassPacks';
import '../styles/vvm-class-pack.css';

export interface VvmClassPackPageProps {
  classId: number;
  onGoHome?: () => void;
  onOpenVvm?: () => void;
}

type PackSection = 'notes' | 'worksheet' | 'quiz';

const optionLabel = (question: VvmQuizQuestion, id: VvmQuizQuestion['correct']) => {
  const option = question.options.find((item) => item.id === id);
  return option ? `${option.id}) ${option.text}` : id;
};

const VvmClassQuiz: React.FC<{ pack: VvmClassPack }> = ({ pack }) => {
  const questions = pack.quiz.questions;
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<VvmQuizQuestion['correct'] | null>(null);
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const question = questions[index];
  const isCorrect = choice === question?.correct;
  const score = results.filter(Boolean).length;

  const reset = () => {
    setIndex(0);
    setChoice(null);
    setChecked(false);
    setShowHint(false);
    setResults([]);
    setDone(false);
  };

  const check = () => {
    if (!choice || checked) return;
    setChecked(true);
    setResults((prev) => {
      const next = [...prev];
      next[index] = choice === question.correct;
      return next;
    });
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      setDone(true);
      return;
    }
    setIndex((n) => n + 1);
    setChoice(null);
    setChecked(false);
    setShowHint(false);
  };

  if (done) {
    return (
      <div className="vvm-pack-score">
        <p className="lead">
          Your score: {score} / {questions.length}
        </p>
        <p>
          {score === questions.length
            ? 'Every answer is correct. You are ready to revise the notes once more, then try the worksheet.'
            : 'Review the missed questions, then retry the quiz or return to the study notes.'}
        </p>
        <div className="vvm-pack-toolbar">
          <button type="button" className="vvm-pack-btn vvm-pack-btn--primary" onClick={reset}>
            Retry the quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="vvm-pack-progress">
        Question {question.number} of {questions.length}
      </p>
      <p className="vvm-pack-q">{question.prompt}</p>
      <div className="vvm-pack-options" role="group" aria-label={`Options for question ${question.number}`}>
        {question.options.map((option) => {
          const selected = choice === option.id;
          const showResult = checked && (option.id === question.correct || (selected && !isCorrect));
          const className = [
            'vvm-pack-option',
            selected ? 'is-selected' : '',
            checked && option.id === question.correct ? 'is-correct' : '',
            checked && selected && !isCorrect ? 'is-wrong' : '',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <button
              key={option.id}
              type="button"
              className={className}
              disabled={checked}
              aria-pressed={selected}
              onClick={() => setChoice(option.id)}
            >
              <span className="vvm-pack-option-id">{option.id})</span>
              <span>{option.text}</span>
              {showResult && option.id === question.correct ? <span> (correct)</span> : null}
            </button>
          );
        })}
      </div>
      <div className="vvm-pack-toolbar">
        <button type="button" className="vvm-pack-btn" onClick={() => setShowHint((open) => !open)}>
          {showHint ? 'Hide hint' : 'Show hint'}
        </button>
        <button type="button" className="vvm-pack-btn vvm-pack-btn--primary" onClick={check} disabled={!choice || checked}>
          Check answer
        </button>
        {checked ? (
          <button type="button" className="vvm-pack-btn" onClick={next}>
            {index + 1 >= questions.length ? 'See score' : 'Next question'}
          </button>
        ) : null}
      </div>
      {showHint ? <p className="vvm-pack-hint">Hint: {question.hint}</p> : null}
      {checked ? (
        <div className={`vvm-pack-explain ${isCorrect ? 'is-ok' : 'is-no'}`}>
          {isCorrect ? (
            <p>
              Correct! {question.explanation}
            </p>
          ) : (
            <p>
              Not quite. The correct answer is {optionLabel(question, question.correct)}. {question.explanation}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export const VvmClassPackPage: React.FC<VvmClassPackPageProps> = ({ classId, onGoHome, onOpenVvm }) => {
  const pack = getVvmClassPack(classId);
  const [section, setSection] = useState<PackSection>('notes');
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'worksheet' || hash === 'quiz' || hash === 'notes') {
        setSection(hash);
        window.setTimeout(() => {
          document.getElementById(`vvm-pack-${hash}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const matchRights = useMemo(() => {
    if (!pack) return [];
    return [...pack.worksheet.match.rows].sort((a, b) => a.key.localeCompare(b.key));
  }, [pack]);

  if (!pack) {
    return (
      <div className="vvm-pack">
        <p>A study pack for this class is not available yet.</p>
        {onOpenVvm ? (
          <button type="button" className="vvm-pack-linkbtn" onClick={onOpenVvm}>
            Back to the VVM hub
          </button>
        ) : null}
      </div>
    );
  }

  const goSection = (next: PackSection) => {
    setSection(next);
    const url = `${pack.path}#${next}`;
    window.history.replaceState(null, '', url);
  };

  return (
    <article className="vvm-pack">
      <nav className="vvm-pack-topbar vvm-pack-noprint" aria-label="VVM class pack navigation">
        {onGoHome ? (
          <button type="button" className="vvm-pack-linkbtn" onClick={onGoHome}>
            Home
          </button>
        ) : (
          <a className="vvm-pack-linkbtn" href="/">
            Home
          </a>
        )}
        {onOpenVvm ? (
          <button type="button" className="vvm-pack-linkbtn" onClick={onOpenVvm}>
            VVM hub
          </button>
        ) : (
          <a className="vvm-pack-linkbtn" href="/vvm/">
            VVM hub
          </a>
        )}
      </nav>

      <p className="vvm-pack-kicker">VVM 2026–27 · Class {pack.classId}</p>
      <h1 className="vvm-pack-title">{pack.title}</h1>

      <ul className="vvm-pack-toc vvm-pack-noprint">
        <li>
          <a href={`${pack.path}#notes`} className={section === 'notes' ? 'is-current' : undefined} onClick={(event) => { event.preventDefault(); goSection('notes'); }}>
            Quick-Revision Study Notes
          </a>
        </li>
        <li>
          <a href={`${pack.path}#worksheet`} className={section === 'worksheet' ? 'is-current' : undefined} onClick={(event) => { event.preventDefault(); goSection('worksheet'); }}>
            Printable Worksheet
          </a>
        </li>
        <li>
          <a href={`${pack.path}#quiz`} className={section === 'quiz' ? 'is-current' : undefined} onClick={(event) => { event.preventDefault(); goSection('quiz'); }}>
            Interactive Quiz
          </a>
        </li>
      </ul>

      {section === 'notes' ? (
        <section className="vvm-pack-section vvm-pack-notes" id="vvm-pack-notes" aria-labelledby="vvm-pack-notes-title">
          <h2 id="vvm-pack-notes-title">{pack.notes.title}</h2>
          {pack.notes.modules.map((module) => (
            <div className="vvm-pack-module" key={module.id}>
              <h3>{module.title}</h3>
              {module.blocks.map((block) => (
                <div className="vvm-pack-block" key={block.heading}>
                  <h4>{block.heading}</h4>
                  {block.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {block.bullets && block.bullets.length > 0 ? (
                    <ul>
                      {block.bullets.map((bullet) => (
                        <li key={(bullet.label ?? '') + bullet.text}>
                          {bullet.label ? <span className="vvm-pack-label">{bullet.label}: </span> : null}
                          {bullet.text}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </section>
      ) : null}

      {section === 'worksheet' ? (
        <section
          className="vvm-pack-section vvm-pack-print-root"
          id="vvm-pack-worksheet"
          aria-labelledby="vvm-pack-worksheet-title"
        >
          <h2 id="vvm-pack-worksheet-title">{pack.worksheet.title}</h2>
          <p>{pack.worksheet.intro}</p>
          <div className="vvm-pack-toolbar vvm-pack-noprint">
            <button type="button" className="vvm-pack-btn vvm-pack-btn--primary" onClick={() => window.print()}>
              Print
            </button>
            <button type="button" className="vvm-pack-btn" onClick={() => setShowAnswers((open) => !open)}>
              {showAnswers ? 'Hide answers' : 'Show answers'}
            </button>
          </div>

          <h3>Section A: Fill in the Blanks</h3>
          {pack.worksheet.blanks.map((item) => (
            <div className="vvm-pack-blank" key={item.number}>
              <p>
                {item.number}. {item.prompt}
              </p>
              <span className="vvm-pack-write-line" />
            </div>
          ))}

          <h3>{pack.worksheet.match.title}</h3>
          <table className="vvm-pack-table">
            <thead>
              <tr>
                <th scope="col">Column A</th>
                <th scope="col">Column B</th>
              </tr>
            </thead>
            <tbody>
              {pack.worksheet.match.rows.map((row, index) => {
                const right = matchRights[index];
                return (
                  <tr key={row.number}>
                    <td>
                      {row.number}. {row.left}
                    </td>
                    <td>
                      <span className="vvm-pack-match-key">{right.key}.</span> {right.right}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <h3>Section C: Short Application Problems</h3>
          {pack.worksheet.problems.map((item) => (
            <div className="vvm-pack-problem" key={item.number}>
              <p>
                {item.number}. {item.label ? `${item.label}: ` : null}
                {item.prompt}
              </p>
              <div className="vvm-pack-write-area" />
            </div>
          ))}

          <div className={`vvm-pack-answer-key${showAnswers ? ' is-visible' : ''}`}>
            <h3>Worksheet Answer Key</h3>
            <p>
              <span className="vvm-pack-label">Section A: </span>
              {pack.worksheet.blanks.map((item, index) => (
                <span key={item.number}>
                  {item.number}. {item.answer}
                  {index < pack.worksheet.blanks.length - 1 ? ' | ' : ''}
                </span>
              ))}
            </p>
            <p>
              <span className="vvm-pack-label">Section B: </span>
              {pack.worksheet.match.rows.map((row, index) => (
                <span key={row.number}>
                  {row.number} → {row.key}
                  {index < pack.worksheet.match.rows.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
            <div>
              <p className="vvm-pack-label">Section C:</p>
              {pack.worksheet.problems.map((item) => (
                <p key={item.number}>
                  {item.number}. {item.answer}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {section === 'quiz' ? (
        <section className="vvm-pack-section vvm-pack-quiz" id="vvm-pack-quiz" aria-labelledby="vvm-pack-quiz-title">
          <h2 id="vvm-pack-quiz-title">{pack.quiz.title}</h2>
          <VvmClassQuiz pack={pack} />
        </section>
      ) : null}
    </article>
  );
};

export default VvmClassPackPage;
