import React, { useState } from 'react';
import '../styles/vedic-knowledge-system.css';
import { soundEffects } from '../utils/soundEffects';

export interface VedicKnowledgeSystemShowcaseProps {
  onOpenPhilosophy?: () => void;
  onOpenVedicMaths?: () => void;
  onOpenScienceLab?: (segment?: string) => void;
  onOpenGrammar?: () => void;
  onOpenReader?: () => void;
  onOpenCourse?: () => void;
  className?: string;
  imageSrc?: string;
  imageWebpSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  artBadge?: string;
}

const DEFAULT_IKS_IMAGE_SRC = '/images/vedic-indian-knowledge-system.jpg';
const DEFAULT_IKS_IMAGE_ALT =
  'Vedic Indian Knowledge System · भारतीय ज्ञान परंपरा — Seven Branches of Ancient Indian Sciences: Philosophy, Mathematics, Cosmology, History, Ayurveda, Architecture, and Grammar';
const DEFAULT_IKS_IMAGE_WIDTH = 1024;
const DEFAULT_IKS_IMAGE_HEIGHT = 571;

interface IksPillar {
  id: string;
  icon: string;
  accent: string;
  glow: string;
  bg: string;
  btnBg: string;
  badge: string;
  titleSa: string;
  titleEn: string;
  subtitle: string;
  desc: string;
  treatises: string;
  actionLabel: string;
  action: (props: VedicKnowledgeSystemShowcaseProps) => void;
}

const IKS_PILLARS: IksPillar[] = [
  {
    id: 'darshana',
    icon: 'I',
    accent: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.35)',
    bg: 'rgba(147, 51, 234, 0.15)',
    btnBg: 'linear-gradient(135deg, #7e22ce 0%, #9333ea 100%)',
    badge: 'Epistemology & Mind',
    titleSa: 'दर्शनम्',
    titleEn: 'Philosophy (Darśana)',
    subtitle: 'Nyāya, Vaiśeṣika, Sāṅkhya, Yoga, Mīmāṁsā & Vedānta',
    desc: 'The 6 orthodox systems investigating valid knowledge (pramāṇa), the nature of consciousness, atomic reality, and cognitive reasoning.',
    treatises: 'Nyāya Sūtras · Vaiśeṣika Sūtras · Sāṅkhya Kārikā · Yoga Sūtras',
    actionLabel: 'Explore 6 Darśanas ->',
    action: (props) => props.onOpenPhilosophy?.(),
  },
  {
    id: 'ganita',
    icon: 'II',
    accent: '#fb923c',
    glow: 'rgba(251, 146, 60, 0.35)',
    bg: 'rgba(234, 88, 12, 0.15)',
    btnBg: 'linear-gradient(135deg, #c2410c 0%, #ea580c 100%)',
    badge: 'Geometry & Algorithms',
    titleSa: 'गणितम्',
    titleEn: 'Mathematics (Gaṇita)',
    subtitle: 'Śulba Sūtras, 16 Vedic Sūtras & Piṅgala Binary Combinatorics',
    desc: 'Ancient geometric proofs (Baudhāyana theorem), lightning mental arithmetic algorithms, and the world’s first binary metric system.',
    treatises: 'Śulba Sūtras · Āryabhaṭīya · Brāhmasphuṭasiddhānta · Līlāvatī',
    actionLabel: 'Launch Vedic Gaṇitam ->',
    action: (props) => props.onOpenVedicMaths?.(),
  },
  {
    id: 'jyotisha',
    icon: 'III',
    accent: '#22d3ee',
    glow: 'rgba(34, 211, 238, 0.35)',
    bg: 'rgba(8, 145, 178, 0.15)',
    btnBg: 'linear-gradient(135deg, #0e7490 0%, #0891b2 100%)',
    badge: 'Celestial Mechanics & Sky',
    titleSa: 'ज्योतिषम्',
    titleEn: 'Cosmology & Astronomy (Jyotiṣa)',
    subtitle: 'Planetary Orbits, Earth Umbra & Heliocentric Geometry',
    desc: 'Diurnal earth rotation, astronomical calculation of lunar/solar eclipses, planetary orbits, and sidereal timekeeping in Sanskrit.',
    treatises: 'Sūrya Siddhānta · Āryabhaṭīya · Pañcasiddhāntikā',
    actionLabel: 'Launch Jyotiṣa Orbit ->',
    action: (props) => props.onOpenScienceLab?.('jyotisha'),
  },
  {
    id: 'itihasa',
    icon: 'IV',
    accent: '#facc15',
    glow: 'rgba(250, 204, 21, 0.35)',
    bg: 'rgba(202, 138, 4, 0.15)',
    btnBg: 'linear-gradient(135deg, #a16207 0%, #ca8a04 100%)',
    badge: 'Ethics & Statecraft',
    titleSa: 'इतिहास-पुराणम्',
    titleEn: 'History & Statecraft (Itihāsa)',
    subtitle: 'Civilizational Memory, Dharma & Kauṭilya Arthaśāstra',
    desc: 'Epic narratives of human decision-making, ethical leadership, and Kauṭilya’s comprehensive treatise on governance and diplomacy.',
    treatises: 'Mahābhārata · Rāmāyaṇa · Kauṭilīya Arthaśāstra · Purāṇas',
    actionLabel: 'Statecraft Simulation ->',
    action: (props) => props.onOpenScienceLab?.('kautilya'),
  },
  {
    id: 'ayurveda',
    icon: 'V',
    accent: '#34d399',
    glow: 'rgba(52, 211, 153, 0.35)',
    bg: 'rgba(5, 150, 105, 0.15)',
    btnBg: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
    badge: 'Holistic Health & Biology',
    titleSa: 'आयुर्वेदः',
    titleEn: 'Ayurveda (Medicine & Life)',
    subtitle: 'Tridoṣa Equilibrium, Surgery & Vṛkṣāyurveda Botany',
    desc: 'Biological homeostasis of Vāta-Pitta-Kapha, Suśruta’s surgical tools, pulse diagnosis, and Parāśara’s botanical taxonomy.',
    treatises: 'Caraka Saṃhitā · Suśruta Saṃhitā · Vṛkṣāyurveda',
    actionLabel: 'Prakṛti Balance Game ->',
    action: (props) => props.onOpenScienceLab?.('prakriti'),
  },
  {
    id: 'vastu',
    icon: 'VI',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.35)',
    bg: 'rgba(2, 132, 199, 0.15)',
    btnBg: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
    badge: 'Spatial Acoustics & Geometry',
    titleSa: 'वास्तुशास्त्रम्',
    titleEn: 'Architecture (Vāstu)',
    subtitle: 'Temple Engineering, Sanctum Acoustics & Seismic Joinery',
    desc: 'Vāstu Puruṣa Maṇḍala spatial harmonics, interlocking stone joins resisting seismic shock, and cardinal solar alignment.',
    treatises: 'Mānasāra · Mayamata · Samarāṅgaṇa Sūtradhāra',
    actionLabel: 'Temple Engineering Lab ->',
    action: (props) => props.onOpenScienceLab?.('temple-engineering'),
  },
  {
    id: 'vyakarana',
    icon: 'VII',
    accent: '#f43f5e',
    glow: 'rgba(244, 63, 94, 0.35)',
    bg: 'rgba(225, 29, 72, 0.15)',
    btnBg: 'linear-gradient(135deg, #be123c 0%, #e11d48 100%)',
    badge: 'Formal Generative Grammar',
    titleSa: 'व्याकरणम्',
    titleEn: 'Grammar & Linguistics (Vyākaraṇa)',
    subtitle: 'Pāṇini Aṣṭādhyāyī, Dhātupāṭha & Acoustic Phonetics',
    desc: 'The world’s first formal algorithmic grammar system: 4,000 recursive sūtras, 2,000+ verbal roots, context-free parsing, and vocal tract acoustics.',
    treatises: 'Aṣṭādhyāyī · Dhātupāṭha · Mahābhāṣya · Vākyapadīya',
    actionLabel: 'Pāṇinian Studio ->',
    action: (props) => props.onOpenGrammar?.(),
  },
];

export const VedicKnowledgeSystemShowcase: React.FC<VedicKnowledgeSystemShowcaseProps> = (props) => {
  const {
    className = '',
    imageSrc = DEFAULT_IKS_IMAGE_SRC,
    imageWebpSrc,
    imageAlt = DEFAULT_IKS_IMAGE_ALT,
    imageWidth = DEFAULT_IKS_IMAGE_WIDTH,
    imageHeight = DEFAULT_IKS_IMAGE_HEIGHT,
    artBadge,
  } = props;
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const imageStyle = { aspectRatio: `${imageWidth} / ${imageHeight}` };

  const artImage = (
    <img
      src={imageSrc}
      alt={imageAlt}
      className="vks-art-image"
      width={imageWidth}
      height={imageHeight}
      style={imageStyle}
      loading="lazy"
      decoding="async"
    />
  );

  const handlePillarClick = (pillar: IksPillar) => {
    soundEffects.playStrokeChime();
    pillar.action(props);
  };

  return (
    <section
      className={`vks-section ${className}`}
      id="vedic-knowledge-system"
      aria-labelledby="vks-heading"
    >
      <div className="vks-card">
        <div className="vks-bg-stars" aria-hidden="true" />

        {/* Section Header */}
        <div className="vks-header">
          <div className="vks-eyebrow-row">
            <span>भारतीय ज्ञान परंपरा · INDIAN KNOWLEDGE SYSTEMS (IKS)</span>
          </div>

          <h2 id="vks-heading" className="vks-title">
            Vedic Indian Knowledge System
            <span className="vks-title-sa" lang="sa">भारतीय ज्ञान परंपरा · सप्त-विज्ञानानि</span>
          </h2>

          <p className="vks-subtitle">
            Aligned with India&apos;s National Education Policy (NEP 2020) — Where sacred sound, empirical physics,
            computational linguistics, celestial astronomy, and holistic health unite into a living, interconnected civilizational matrix.
          </p>
        </div>

        {/* Central Infographic Artwork Showcase */}
        <div
          className="vks-art-showcase"
          role="button"
          tabIndex={0}
          onClick={() => {
            soundEffects.playCelebrationChime();
            setIsLightboxOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsLightboxOpen(true);
            }
          }}
          aria-label="Enlarge Vedic Indian Knowledge System Infographic"
          title="Click to view full-screen high-resolution infographic"
        >
          {imageWebpSrc ? (
            <picture>
              <source srcSet={imageWebpSrc} type="image/webp" />
              {artImage}
            </picture>
          ) : (
            artImage
          )}

          <div className="vks-art-overlay">
            <span className="vks-art-badge">
              {artBadge ?? '7 Pillars of Vedic Sciences'}
            </span>
            <span className="vks-art-zoom-hint">
              Tap to Enlarge HD Infographic
            </span>
          </div>
        </div>

        {/* Pillars Header */}
        <div className="vks-pillars-header">
          <span className="vks-pillars-tag">सप्त-स्तम्भाः · Interactive Curriculum Tracks</span>
          <h3 className="vks-pillars-title">Explore the 7 Pillars in EdNet Gurukul</h3>
        </div>

        {/* 7 Interactive Pillars Grid */}
        <div className="vks-pillars-grid">
          {IKS_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="vks-pillar-card"
              style={
                {
                  '--pillar-accent': pillar.accent,
                  '--pillar-glow': pillar.glow,
                  '--pillar-bg': pillar.bg,
                  '--pillar-btn-bg': pillar.btnBg,
                } as React.CSSProperties
              }
            >
              <div>
                <div className="vks-pc-top">
                  <div className="vks-pc-icon-wrap" aria-hidden="true">
                    {pillar.icon}
                  </div>
                  <span className="vks-pc-badge">{pillar.badge}</span>
                </div>

                <div className="vks-pc-title-row">
                  <span className="vks-pc-title-sa" lang="sa">
                    {pillar.titleSa}
                  </span>
                  <span className="vks-pc-title-en">{pillar.titleEn}</span>
                </div>

                <div className="vks-pc-subtitle">{pillar.subtitle}</div>
                <p className="vks-pc-desc">{pillar.desc}</p>
                <div className="vks-pc-treatises">
                  <strong>मूल-ग्रन्थाः (Treatises):</strong> {pillar.treatises}
                </div>
              </div>

              <button
                type="button"
                className="vks-pc-btn"
                onClick={() => handlePillarClick(pillar)}
              >
                <span>{pillar.actionLabel}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="vks-lightbox-backdrop"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Vedic Indian Knowledge System Fullscreen Infographic"
        >
          <div
            className="vks-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="vks-lightbox-bar">
              <h4 className="vks-lightbox-title">
                VEDIC INDIAN KNOWLEDGE SYSTEM · भारतीय ज्ञान परंपरा
              </h4>
              <button
                type="button"
                className="vks-lightbox-close"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close Infographic"
              >
                ×
              </button>
            </div>
            <div className="vks-lightbox-content">
              {imageWebpSrc ? (
                <picture>
                  <source srcSet={imageWebpSrc} type="image/webp" />
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="vks-lightbox-img"
                    width={imageWidth}
                    height={imageHeight}
                  />
                </picture>
              ) : (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="vks-lightbox-img"
                  width={imageWidth}
                  height={imageHeight}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VedicKnowledgeSystemShowcase;
