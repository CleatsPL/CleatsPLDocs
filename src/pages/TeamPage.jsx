import { useState } from 'react';
import Topography from '../reactbits/Topography.jsx';
import TiltedCard from '../reactbits/TiltedCard.jsx';
import ProfileCard from '../reactbits/ProfileCard.jsx';
import TeamModal from '../components/TeamModal.jsx';
import { useReveals } from '../hooks/useReveals.js';
import { team, groupPhoto } from '../data/team.js';

export default function TeamPage() {
  const [selected, setSelected] = useState(null);
  useReveals();

  return (
    <div className="team-page">
      <div className="team-topo" aria-hidden="true">
        <Topography
          lowColor="#6e1219"
          midColor="#8a6d2f"
          highColor="#d4af37"
          speed={0.28}
          morphAmount={3.4}
          morphSpeed={0.04}
          bands={2.4}
          thickness={0.008}
          scale={1.1}
          glow={0.45}
          contrast={3.2}
          brightness={0.95}
          grain
          grainIntensity={0.04}
          mouseInteraction
          mouseRadius={0.3}
          mouseStrength={0.4}
        />
      </div>

      <div className="team-content">
        <div className="wrap">
          <header className="team-head" data-reveal>
            <div className="section-tag mono">06 / Team</div>
            <h1>
              The people behind <em>the cleats.</em>
            </h1>
            <p>
              Everyone who built, tested and broke this in the garage.
              Click a member for the full story.
            </p>
          </header>

          <div className="team-group" data-reveal>
            <TiltedCard
              imageSrc={groupPhoto.src}
              altText={groupPhoto.alt}
              captionText={groupPhoto.caption}
              containerHeight="min(52vh, 460px)"
              containerWidth="min(920px, 100%)"
              imageHeight="min(52vh, 460px)"
              imageWidth="min(920px, 100%)"
              showMobileWarning={false}
              showTooltip={false}
              rotateAmplitude={5}
              scaleOnHover={1.02}
            />
          </div>

          <div className="team-grid">
            {team.map((m, i) => (
              <div
                className="team-card-slot"
                key={m.id}
                data-reveal
                style={{ '--reveal-delay': `${i * 0.1}s` }}
                role="button"
                tabIndex={0}
                aria-label={`Open ${m.name}'s profile`}
                onClick={() => setSelected(m)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelected(m);
                  }
                }}
              >
                <div className="pc-slot">
                  <ProfileCard
                    avatarUrl={m.photo}
                    name={m.name}
                    title={m.role}
                    handle={m.handle}
                    status={m.status}
                    contactText="Read more"
                    showUserInfo
                    enableTilt
                    enableMobileTilt={false}
                    onContactClick={() => setSelected(m)}
                    behindGlowEnabled
                    behindGlowColor="rgba(193, 18, 31, 0.42)"
                    behindGlowSize="55%"
                    innerGradient="linear-gradient(145deg, rgba(193,18,31,0.16) 0%, rgba(212,175,55,0.10) 100%)"
                  />
                </div>
                <span className="team-card-hint">Open profile →</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && <TeamModal member={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
