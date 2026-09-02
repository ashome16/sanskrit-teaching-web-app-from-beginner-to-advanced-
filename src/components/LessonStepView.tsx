import React from 'react';
import type { LessonStep } from '../utils/lessonSteps';
import { TextToSpeechHandler } from '../utils/speech';

interface ChecklistItem {
  label: string;
  done: boolean;
}

interface LessonStepViewProps {
  step: LessonStep;
  ttsHandler: TextToSpeechHandler;
  checklist?: ChecklistItem[];
  onWordSelected?: (word: {
    devanagari: string;
    transliteration: string;
    pronunciation: string;
  }) => void;
}

const stageIcon: Record<LessonStep['type'], string> = {
  introduction: '📖',
  sentence: '🔤',
  checklist: '✅',
  grammar: '📌',
};

const LessonStepView: React.FC<LessonStepViewProps> = ({
  step,
  ttsHandler,
  checklist,
  onWordSelected,
}) => {
  const handleWordClick = (word: string) => {
    ttsHandler.speak({ text: word, language: 'sa-IN', rate: 0.7 });
    onWordSelected?.({
      devanagari: word,
      transliteration: word,
      pronunciation: `Pronounced as: ${word}`,
    });
  };

  return (
    <div className={`lesson-flow-selector lesson-step-${step.type}`}>
      <div className="lesson-content-display">
        <div className="content-header">
          <div className="content-title-section">
            <span className="section-label">{stageIcon[step.type]} {step.type}</span>
            <h2>{step.title}</h2>
            {step.subtitle && <p className="content-description">{step.subtitle}</p>}
          </div>
        </div>

        <div className="content-box">
          {step.content.pdfUrl && (
            <div className="pdf-block">
              <div className="pdf-viewer-wrap">
                <object data={step.content.pdfUrl} type="application/pdf" className="pdf-viewer">
                  <p>
                    Your browser can't display embedded PDFs.{' '}
                    <a href={step.content.pdfUrl} target="_blank" rel="noreferrer">
                      Open the PDF here
                    </a>
                    .
                  </p>
                </object>
              </div>
              <a className="pdf-download-link" href={step.content.pdfUrl} target="_blank" rel="noreferrer">
                Open PDF in a new tab
              </a>
            </div>
          )}

          {step.type === 'grammar' && step.content.sanskritLines && step.content.sanskritLines.length > 0 && (
            <div className="examples-section">
              <div className="section-label">📌 Grammar Breakdown</div>
              <ul className="examples-list">
                {step.content.sanskritLines.map((line, idx) => (
                  <li key={idx} className="example-item">
                    {line.meaning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step.type !== 'grammar' &&
            step.content.sanskritLines?.map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
                {line.original && (
                  <div className="devanagari-section">
                    <div className="section-label">📖 Devanagari (click a word to hear it)</div>
                    <div className="interactive-content">
                      {line.original.split(/(\s+)/).map((part, idx) =>
                        !part || /^\s+$/.test(part) ? (
                          <span key={idx}>{part}</span>
                        ) : (
                          <span
                            key={idx}
                            className="interactive-word"
                            onClick={() => handleWordClick(part)}
                          >
                            {part}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {line.transliterated && (
                  <div className="transliteration-section">
                    <div className="section-label">🔤 Transliteration</div>
                    <div className="transliteration-text">{line.transliterated}</div>
                  </div>
                )}

                {line.breakdown && (
                  <div className="transliteration-section">
                    <div className="section-label">🗣️ Pronunciation Guide</div>
                    <div className="transliteration-text">{line.breakdown}</div>
                  </div>
                )}

                {line.meaning && (
                  <div className="meaning-section">
                    <div className="section-label">
                      💡 {step.type === 'introduction' ? 'Overview' : 'Meaning'}
                    </div>
                    <div className="meaning-text">{line.meaning}</div>
                  </div>
                )}
              </React.Fragment>
            ))}

          {step.content.bodyText && (
            <div className="meaning-section">
              <div className="section-label">
                💡 {step.type === 'introduction' ? 'Overview' : 'Notes'}
              </div>
              <div className="meaning-text">{step.content.bodyText}</div>
            </div>
          )}

          {step.type === 'checklist' && checklist && (
            <div className="study-checklist">
              <ul>
                {checklist.map((item) => (
                  <li key={item.label} className={item.done ? 'done' : ''}>
                    <span>{item.done ? '✓' : '○'}</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonStepView;
