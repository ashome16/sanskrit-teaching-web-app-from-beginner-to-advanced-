import React, { useState } from 'react';
import type { DeconstructionResult } from '../utils/paninianEngine';
import { playPronunciation } from '../utils/pronunciation';

interface DhatuDeconstructionFlowchartProps {
  deconResult: DeconstructionResult;
  onExploreDhatu?: (dhatuName: string) => void;
}

export const DhatuDeconstructionFlowchart: React.FC<DhatuDeconstructionFlowchartProps> = ({
  deconResult,
  onExploreDhatu,
}) => {
  const [activeStep, setActiveStep] = useState<number>(4); // default to final pada
  const [copied, setCopied] = useState(false);

  const { formula, rootDevanagari, rootIast, rootMeaningEn, rootMeaningHi, gana, grammaticalLabel, paniniSutra, notes, query, englishTranslation, hindiTranslation, morphologyType } = deconResult;

  const handleCopyWord = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Derive Step 2 (Anga / Vikarana) details
  const vikaranaText = formula.vikarana || (morphologyType === 'krdanta' ? 'कृत्-विकरणः' : 'शप् (अ - भ्वादि)');
  const hasPrefix = Boolean(formula.prefix);

  // Derive step explanation for active inspection
  const stepDetails = [
    {
      step: 1,
      numeral: '१',
      title: 'मूल-प्रकृति (Base Root & Prefix)',
      subtitle: hasPrefix ? 'उपसर्ग + धातु' : 'मूल-धातु',
      content: (
        <div>
          <div className="dp-flow-inspector-row">
            <strong>मूल-धातु (Root):</strong>{' '}
            <span className="dp-flow-hi-text">{rootDevanagari} ({rootIast})</span>
            {gana && <span className="dp-flow-tag">गण {gana}</span>}
          </div>
          {hasPrefix && (
            <div className="dp-flow-inspector-row">
              <strong>उपसर्ग (Prefix):</strong>{' '}
              <span className="dp-flow-hi-text">{formula.prefix}</span>
              <span className="dp-flow-desc"> — Modifies root action direction and semantic scope per <em>उपसर्गेण धात्वर्थो बलादन्यत्र नीयते</em>.</span>
            </div>
          )}
          <div className="dp-flow-inspector-row">
            <strong>Semantic Core:</strong> {rootMeaningEn} {rootMeaningHi ? `· हिन्दी: ${rootMeaningHi}` : ''}
          </div>
          <div className="dp-flow-inspector-actions">
            <button
              type="button"
              className="dp-flow-audio-btn"
              onClick={() => playPronunciation(rootDevanagari)}
              title={`Pronounce root ${rootDevanagari}`}
            >
              🔊 Listen to Root ({rootDevanagari})
            </button>
            {onExploreDhatu && (
              <button
                type="button"
                className="dp-flow-explore-btn"
                onClick={() => onExploreDhatu(rootDevanagari)}
              >
                📖 View {rootDevanagari} in Dhātupāṭha
              </button>
            )}
          </div>
        </div>
      ),
    },
    {
      step: 2,
      numeral: '२',
      title: 'अङ्ग-संस्कारः & विकरणः (Stem Mutation)',
      subtitle: 'Stem Gradation & Infix',
      content: (
        <div>
          <div className="dp-flow-inspector-row">
            <strong>विकरण-प्रत्ययः (Class Infix):</strong>{' '}
            <span className="dp-flow-hi-text">{vikaranaText}</span>
          </div>
          <div className="dp-flow-inspector-row">
            <strong>अङ्ग-परिवर्तनम् (Phonetic Gradation):</strong>{' '}
            <span>
              {notes?.includes('गुण') || notes?.includes('Guṇa') || notes?.includes('वृद्धि') || notes?.includes('Vṛddhi')
                ? notes
                : 'The verbal base undergoes morphological mutation (Guṇa/Vṛddhi/Dīrgha) to accept conjugation.'}
            </span>
          </div>
          <div className="dp-flow-desc">
            Per Pāṇinian morphological synthesis, the root stem unites with the class-specific infix (विकरण) to form the inflectable base stem (धात्वङ्गम्).
          </div>
        </div>
      ),
    },
    {
      step: 3,
      numeral: '३',
      title: 'प्रत्यय-विधानम् (Affixation & Rule)',
      subtitle: morphologyType === 'krdanta' ? 'कृत्-प्रत्ययः' : 'तिङ्-प्रत्ययः',
      content: (
        <div>
          <div className="dp-flow-inspector-row">
            <strong>प्रत्ययः (Affix Ending):</strong>{' '}
            <span className="dp-flow-hi-text">{formula.suffix}</span>
            <span className="dp-flow-tag">{morphologyType === 'krdanta' ? 'कृत् (Primary Derivative)' : 'तिङ् (Verbal Ending)'}</span>
          </div>
          <div className="dp-flow-inspector-row">
            <strong>Pāṇinian Sūtra (सूत्र-प्रमाणम्):</strong>{' '}
            <span className="dp-flow-sutra">{paniniSutra || 'सुप्तिङन्तं पदम् (१.४.१४)'}</span>
          </div>
          {notes && (
            <div className="dp-flow-inspector-row">
              <strong>Grammar Note:</strong> {notes}
            </div>
          )}
        </div>
      ),
    },
    {
      step: 4,
      numeral: '४',
      title: 'पद-सिद्धिः (Finished Synthesized Pada)',
      subtitle: 'सुप्तिङन्तं पदम्',
      content: (
        <div>
          <div className="dp-flow-inspector-row">
            <strong>सिद्ध-पदम् (Final Form):</strong>{' '}
            <span className="dp-flow-hi-word">{query}</span>
            <span className="dp-flow-tag">{grammaticalLabel}</span>
          </div>
          <div className="dp-flow-inspector-row">
            <strong>Meaning in Context:</strong> {englishTranslation} · <em>{hindiTranslation}</em>
          </div>
          <div className="dp-flow-inspector-actions">
            <button
              type="button"
              className="dp-flow-audio-btn dp-flow-audio-btn--primary"
              onClick={() => playPronunciation(query)}
              title={`Recite ${query}`}
            >
              🔊 Pronounce {query}
            </button>
            <button
              type="button"
              className="dp-flow-copy-btn"
              onClick={handleCopyWord}
              title="Copy word to clipboard"
            >
              {copied ? '✓ Copied!' : '📋 Copy Word'}
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="dp-flowchart-container" role="region" aria-label="Step-by-step Pāṇinian Deconstruction Flowchart">
      {/* Header bar */}
      <div className="dp-flowchart-header">
        <div className="dp-flowchart-title-group">
          <span className="dp-flowchart-badge">🧬 व्याकरण-प्रक्रिया · Structural Flowchart</span>
          <h4 className="dp-flowchart-heading">
            Pāṇinian Word Assembly: <span className="dp-flowchart-target">{query}</span>
          </h4>
        </div>
        <div className="dp-flowchart-help-tip">
          💡 Click any stage below to inspect its morpho-phonetic breakdown
        </div>
      </div>

      {/* Visual Step-by-Step Flowchart Pipeline */}
      <div className="dp-flowchart-pipeline" role="tablist" aria-label="Deconstruction Steps">
        {/* Step 1: Root & Upasarga */}
        <button
          type="button"
          role="tab"
          aria-selected={activeStep === 1}
          className={`dp-flow-node dp-flow-node--step1${activeStep === 1 ? ' dp-flow-node--active' : ''}`}
          onClick={() => setActiveStep(1)}
        >
          <div className="dp-flow-node-badge">
            <span className="dp-flow-node-step">१</span>
            <span className="dp-flow-node-role">मूल-प्रकृति</span>
          </div>
          <div className="dp-flow-node-body">
            {hasPrefix && (
              <div className="dp-flow-node-prefix">
                <span className="dp-flow-chip dp-flow-chip--prefix">{formula.prefix}</span>
                <span className="dp-flow-symbol">+</span>
              </div>
            )}
            <div className="dp-flow-node-root">
              <span className="dp-flow-chip dp-flow-chip--root">{rootDevanagari}</span>
            </div>
          </div>
          <div className="dp-flow-node-label">{rootMeaningEn}</div>
        </button>

        {/* Arrow 1 -> 2 */}
        <div className="dp-flow-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="dp-flow-arrow-icon" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <span className="dp-flow-arrow-label">+ विकारः</span>
        </div>

        {/* Step 2: Vikarana & Gradation */}
        <button
          type="button"
          role="tab"
          aria-selected={activeStep === 2}
          className={`dp-flow-node dp-flow-node--step2${activeStep === 2 ? ' dp-flow-node--active' : ''}`}
          onClick={() => setActiveStep(2)}
        >
          <div className="dp-flow-node-badge">
            <span className="dp-flow-node-step">२</span>
            <span className="dp-flow-node-role">अङ्ग-संस्कारः</span>
          </div>
          <div className="dp-flow-node-body">
            <span className="dp-flow-chip dp-flow-chip--vikarana">{vikaranaText}</span>
          </div>
          <div className="dp-flow-node-label">Infix / Stem Gradation</div>
        </button>

        {/* Arrow 2 -> 3 */}
        <div className="dp-flow-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="dp-flow-arrow-icon" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <span className="dp-flow-arrow-label">+ प्रत्ययः</span>
        </div>

        {/* Step 3: Affix / Suffix */}
        <button
          type="button"
          role="tab"
          aria-selected={activeStep === 3}
          className={`dp-flow-node dp-flow-node--step3${activeStep === 3 ? ' dp-flow-node--active' : ''}`}
          onClick={() => setActiveStep(3)}
        >
          <div className="dp-flow-node-badge">
            <span className="dp-flow-node-step">३</span>
            <span className="dp-flow-node-role">{morphologyType === 'krdanta' ? 'कृत्-प्रत्ययः' : 'तिङ्-प्रत्ययः'}</span>
          </div>
          <div className="dp-flow-node-body">
            <span className="dp-flow-chip dp-flow-chip--suffix">{formula.suffix}</span>
          </div>
          <div className="dp-flow-node-label">Inflectional Affix</div>
        </button>

        {/* Arrow 3 -> 4 */}
        <div className="dp-flow-arrow dp-flow-arrow--final" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="dp-flow-arrow-icon" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <span className="dp-flow-arrow-label">= सिद्धिः</span>
        </div>

        {/* Step 4: Final Synthesized Pada */}
        <button
          type="button"
          role="tab"
          aria-selected={activeStep === 4}
          className={`dp-flow-node dp-flow-node--step4${activeStep === 4 ? ' dp-flow-node--active' : ''}`}
          onClick={() => setActiveStep(4)}
        >
          <div className="dp-flow-node-badge">
            <span className="dp-flow-node-step">४</span>
            <span className="dp-flow-node-role">सिद्ध-पदम्</span>
          </div>
          <div className="dp-flow-node-body">
            <span className="dp-flow-chip dp-flow-chip--result">{formula.result || query}</span>
          </div>
          <div className="dp-flow-node-label">{grammaticalLabel.split(',')[0]}</div>
        </button>
      </div>

      {/* Step Inspector Card */}
      <div className="dp-flow-inspector" role="tabpanel" aria-label={`Step ${activeStep} Details`}>
        <div className="dp-flow-inspector-header">
          <div className="dp-flow-inspector-badge-row">
            <span className="dp-flow-step-num">Stage {stepDetails[activeStep - 1].numeral} of ४</span>
            <span className="dp-flow-step-title">{stepDetails[activeStep - 1].title}</span>
            <span className="dp-flow-step-sub">({stepDetails[activeStep - 1].subtitle})</span>
          </div>
          <div className="dp-flow-inspector-nav">
            <button
              type="button"
              disabled={activeStep === 1}
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
              className="dp-flow-nav-btn"
              title="Previous Step"
            >
              ← Previous
            </button>
            <button
              type="button"
              disabled={activeStep === 4}
              onClick={() => setActiveStep((prev) => Math.min(4, prev + 1))}
              className="dp-flow-nav-btn"
              title="Next Step"
            >
              Next →
            </button>
          </div>
        </div>

        <div className="dp-flow-inspector-body">
          {stepDetails[activeStep - 1].content}
        </div>
      </div>
    </div>
  );
};
