import React from 'react';
import type { LessonContent as LessonContentType } from '../types';
import { TextToSpeechHandler } from '../utils/speech';
import '../styles/content.css';

interface LessonContentProps {
  content: LessonContentType;
  ttsHandler: TextToSpeechHandler;
}

const LessonContent: React.FC<LessonContentProps> = ({ content, ttsHandler }) => {
  const handleSpeak = () => {
    if (content.data.devanagari) {
      ttsHandler.speak({
        text: content.data.transliteration || content.data.devanagari,
        language: 'sa-IN',
      });
    } else if (content.data.text) {
      ttsHandler.speak({
        text: content.data.text,
      });
    }
  };

  return (
    <div className={`lesson-content content-type-${content.type}`}>
      <div className="content-header">
        <h2>{content.title}</h2>
        {content.data.devanagari && (
          <button
            className="speak-button"
            onClick={handleSpeak}
            title="Listen to pronunciation"
          >
            🔊 Listen
          </button>
        )}
      </div>

      <p className="content-description">{content.description}</p>

      <div className="content-body">
        {content.type === 'pdf' && content.data.pdfUrl && (
          <div className="pdf-block">
            <div className="pdf-viewer-wrap">
              <object
                data={content.data.pdfUrl}
                type="application/pdf"
                className="pdf-viewer"
              >
                <p>
                  Your browser does not support embedded PDFs. You can{' '}
                  <a href={content.data.pdfUrl} target="_blank" rel="noreferrer">
                    open the PDF here
                  </a>
                  .
                </p>
              </object>
            </div>
            <a
              className="pdf-download-link"
              href={content.data.pdfUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open PDF in a new tab
            </a>
          </div>
        )}

        {content.data.devanagari && (
          <div className="devanagari-block">
            <div className="devanagari-text">{content.data.devanagari}</div>
            {content.data.transliteration && (
              <div className="transliteration">
                <span className="label">Transliteration:</span>
                <div className="text">{content.data.transliteration}</div>
              </div>
            )}
          </div>
        )}

        {content.data.meaning && (
          <div className="meaning-block">
            <span className="label">Meaning:</span>
            <p>{content.data.meaning}</p>
          </div>
        )}

        {content.data.text && (
          <div className="text-block">
            <p>{content.data.text}</p>
          </div>
        )}

        {content.data.examples && content.data.examples.length > 0 && (
          <div className="examples-block">
            <h3>Examples</h3>
            <ul>
              {content.data.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>
        )}

        {content.data.pronunciation && (
          <div className="pronunciation-guide">
            <h3>Pronunciation Guide</h3>
            <p>{content.data.pronunciation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonContent;
