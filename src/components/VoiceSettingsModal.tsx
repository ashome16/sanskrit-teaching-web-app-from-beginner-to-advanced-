import React, { useEffect, useState, useRef } from 'react';
import {
  type VoiceRole,
  VOICE_ROLES,
  getSavedVoiceName,
  setSavedVoiceName,
  getSavedRate,
  setSavedRate,
  resetVoicesToDefaults,
  playVoiceSample,
  stopVoiceSample,
  resolveVoiceForRole,
  scoreVoiceForRole,
} from '../utils/voiceConfig';
import { isWindowsPlatform, isApplePlatform, whenVoicesReady } from '../utils/speechPlatform';
import '../styles/voice-settings-modal.css';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Focus directly on a specific role if opened from a specific view (e.g. reader or course) */
  initialRole?: VoiceRole;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
  initialRole,
}) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [playingRole, setPlayingRole] = useState<VoiceRole | null>(null);
  const stopSampleRef = useRef<(() => void) | null>(null);

  // Local state for live editing before or upon change
  const [selectedVoices, setSelectedVoices] = useState<Record<VoiceRole, string>>(() => ({
    mantras: getSavedVoiceName('mantras'),
    reader: getSavedVoiceName('reader'),
    bodhi: getSavedVoiceName('bodhi'),
  }));

  const [rates, setRates] = useState<Record<VoiceRole, number>>(() => ({
    mantras: getSavedRate('mantras'),
    reader: getSavedRate('reader'),
    bodhi: getSavedRate('bodhi'),
  }));

  const stopSample = () => {
    stopSampleRef.current?.();
    stopSampleRef.current = null;
    stopVoiceSample();
    setPlayingRole(null);
  };

  // Load voices
  useEffect(() => {
    if (!isOpen) return;

    const refresh = () => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;
      const all = window.speechSynthesis.getVoices();
      setVoices(all);
    };

    void whenVoicesReady().then(refresh);
    window.speechSynthesis?.addEventListener('voiceschanged', refresh);

    return () => {
      window.speechSynthesis?.removeEventListener('voiceschanged', refresh);
      stopSample();
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopSample();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleVoiceChange = (role: VoiceRole, voiceName: string) => {
    setSelectedVoices((prev) => ({ ...prev, [role]: voiceName }));
    setSavedVoiceName(role, voiceName);
    stopSample();
  };

  const handleRateChange = (role: VoiceRole, rate: number) => {
    setRates((prev) => ({ ...prev, [role]: rate }));
    setSavedRate(role, rate);
  };

  const handleTestVoice = (role: VoiceRole) => {
    if (playingRole === role) {
      stopSample();
      return;
    }

    stopSample();
    setPlayingRole(role);

    const voiceName = selectedVoices[role];
    const rate = rates[role];

    const stopFn = playVoiceSample(role, voiceName || undefined, rate, () => {
      if (stopSampleRef.current === stopFn) {
        stopSampleRef.current = null;
        setPlayingRole(null);
      }
    });

    stopSampleRef.current = stopFn;
  };

  const handleResetDefaults = () => {
    stopSample();
    resetVoicesToDefaults();
    setSelectedVoices({
      mantras: '',
      reader: '',
      bodhi: '',
    });
    setRates({
      mantras: VOICE_ROLES.mantras.defaultRate,
      reader: VOICE_ROLES.reader.defaultRate,
      bodhi: VOICE_ROLES.bodhi.defaultRate,
    });
  };

  if (!isOpen) return null;

  const isWin = isWindowsPlatform();
  const isMac = isApplePlatform();
  const osLabel = isWin ? 'Windows' : isMac ? 'macOS / iOS' : 'Linux / Android / Web';

  const roleOrder: VoiceRole[] = initialRole
    ? [initialRole, ...(['mantras', 'reader', 'bodhi'] as VoiceRole[]).filter((r) => r !== initialRole)]
    : ['mantras', 'reader', 'bodhi'];

  return (
    <div
      className="voice-modal-backdrop"
      onClick={() => {
        stopSample();
        onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-modal-title"
    >
      <div className="voice-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <header className="voice-modal-header">
          <div className="voice-modal-title-wrap">
            <h2 id="voice-modal-title" className="voice-modal-title">
              🎙️ Voice Studio &amp; Audio Roles <span className="voice-modal-title-dev">ध्वनि-स्वर-विन्यासः</span>
            </h2>
            <p className="voice-modal-subtitle">
              Configure independent voices and speeds for Sacred Mantras, Textbook Reading, and Bodhi Companion.
            </p>
          </div>
          <button
            type="button"
            className="voice-modal-close-btn"
            onClick={() => {
              stopSample();
              onClose();
            }}
            aria-label="Close voice settings"
          >
            ✕
          </button>
        </header>

        <div className="voice-modal-body">
          {/* OS Platform Guidance */}
          <div className="voice-platform-banner">
            <span className="voice-platform-icon" aria-hidden="true">💻</span>
            <div className="voice-platform-text">
              <strong>Detected System: {osLabel}</strong>
              <p>
                Speech engines differ by OS: Windows uses Microsoft voices (Swara, Kalpana, Ravi, Zira) while Apple
                devices use Siri and Lekha. You can assign different voices below or test which one sounds best on your system.
              </p>
            </div>
          </div>

          {/* 3 Voice Role Cards */}
          <div className="voice-roles-list">
            {roleOrder.map((role) => {
              const meta = VOICE_ROLES[role];
              const autoVoice = resolveVoiceForRole(role, voices);
              const currentVoiceName = selectedVoices[role];
              const currentRate = rates[role];
              const isPlaying = playingRole === role;

              // Filter voices compatible with this role or sort best first
              const scoredVoices = [...voices].sort(
                (a, b) => scoreVoiceForRole(b, role) - scoreVoiceForRole(a, role) || a.name.localeCompare(b.name)
              );

              return (
                <div key={role} className={`voice-role-card voice-role-card--${role}`}>
                  <div className="voice-role-header">
                    <div className="voice-role-heading">
                      <h3 className="voice-role-title">
                        {role === 'mantras' && '🪔'}
                        {role === 'reader' && '📖'}
                        {role === 'bodhi' && '🧘'}
                        {meta.title} <span className="voice-modal-title-dev">({meta.devanagariTitle})</span>
                      </h3>
                      <p className="voice-role-desc">{meta.description}</p>
                    </div>
                    <span className="voice-role-tag">{role}</span>
                  </div>

                  <div className="voice-role-controls">
                    {/* Voice Dropdown */}
                    <div className="voice-select-wrap">
                      <label htmlFor={`voice-select-${role}`} className="voice-control-label">
                        Speech Voice
                      </label>
                      <select
                        id={`voice-select-${role}`}
                        className="voice-select"
                        value={currentVoiceName}
                        onChange={(e) => handleVoiceChange(role, e.target.value)}
                      >
                        <option value="">
                          Auto (Recommended: {autoVoice ? `${autoVoice.name} · ${autoVoice.lang}` : 'System Default'})
                        </option>
                        {scoredVoices.map((v) => {
                          const score = scoreVoiceForRole(v, role);
                          const isNatural = /online|natural|premium|enhanced/i.test(v.name);
                          const badge = score >= 50 ? ' ⭐ [Best]' : isNatural ? ' 🌐 [Natural]' : '';
                          return (
                            <option key={`${role}-${v.name}-${v.lang}`} value={v.name}>
                              {v.name} ({v.lang}){badge}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* Speed / Rate Slider */}
                    <div className="voice-rate-wrap">
                      <label htmlFor={`voice-rate-${role}`} className="voice-control-label">
                        Pace / Speed
                      </label>
                      <div className="voice-rate-row">
                        <input
                          id={`voice-rate-${role}`}
                          type="range"
                          min="0.5"
                          max="1.3"
                          step="0.05"
                          className="voice-rate-slider"
                          value={currentRate}
                          onChange={(e) => handleRateChange(role, parseFloat(e.target.value))}
                          aria-label={`${meta.title} recitation speed`}
                        />
                        <span className="voice-rate-val">{currentRate.toFixed(2)}x</span>
                      </div>
                    </div>

                    {/* Test Audio Button */}
                    <button
                      type="button"
                      className={`voice-test-btn${isPlaying ? ' voice-test-btn--playing' : ''}`}
                      onClick={() => handleTestVoice(role)}
                      title={`Preview how this voice sounds for ${meta.title}`}
                    >
                      {isPlaying ? '⏹ Stop' : '▶ Test Voice'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Device Voice Installation Tips */}
          <div className="voice-help-card">
            <h4 className="voice-help-title">
              <span>💡</span> Need more authentic Sanskrit / Hindi voices?
            </h4>
            <ul className="voice-help-list">
              <li>
                <strong>Windows 10/11:</strong> Go to <em>Settings → Time &amp; language → Speech → Add voices</em>. Download
                <strong> Hindi (Microsoft Swara / Hemant)</strong> or use Microsoft Edge for high-fidelity Natural Neural voices.
              </li>
              <li>
                <strong>macOS:</strong> Open <em>System Settings → Accessibility → Spoken Content → System Voice → Manage Voices</em>.
                Download <strong>Hindi (Lekha - Enhanced)</strong> or <strong>Indian English (Rishi)</strong>.
              </li>
            </ul>
          </div>
        </div>

        <footer className="voice-modal-footer">
          <div className="voice-footer-left">
            <button
              type="button"
              className="voice-reset-btn"
              onClick={handleResetDefaults}
              title="Restore standard recommended voices and speeds"
            >
              ↺ Reset to Recommended
            </button>
          </div>
          <button
            type="button"
            className="voice-save-btn"
            onClick={() => {
              stopSample();
              onClose();
            }}
          >
            ✓ Done
          </button>
        </footer>
      </div>
    </div>
  );
};

export default VoiceSettingsModal;
