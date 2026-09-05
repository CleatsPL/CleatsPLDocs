const panels = [
  {
    kicker: '06:42 / Arrive',
    title: 'The room wakes first.',
    copy: 'Before a command is spoken, ECHO softens the light, holds the temperature and leaves the morning quiet.',
  },
  {
    kicker: '13:18 / Understand',
    title: 'Context, not surveillance.',
    copy: 'It understands that “turn it down” means the music—not the lights—without building an identity profile.',
  },
  {
    kicker: '23:06 / Recede',
    title: 'Then it disappears.',
    copy: 'At rest, the acoustic path closes mechanically and the amber seam goes dark. Presence becomes absence.',
  },
];

export default function Story() {
  return (
    <section className="story" id="story">
      <div className="story-stage">
        <div className="story-media">
          <img src="/assets/echo01-story-rain.jpg" alt="ECHO/01 in a rain-lit brutalist living room" loading="lazy" />
        </div>
        <div className="story-orbit" aria-hidden="true">
          <i />
        </div>
        <div className="story-top">
          <div className="section-tag mono">02 / A day with ECHO</div>
          <div className="story-index">
            <span>CHAPTER</span>
            <b id="storyIndex">01</b>
          </div>
        </div>
        <div className="story-panels">
          {panels.map((panel, index) => (
            <article className={`story-panel${index === 0 ? ' active' : ''}`} key={panel.kicker}>
              <span className="mono">{panel.kicker}</span>
              <h2>{panel.title}</h2>
              <p>{panel.copy}</p>
            </article>
          ))}
        </div>
        <div className="story-meter" aria-hidden="true">
          <i id="storyMeter" />
        </div>
      </div>
    </section>
  );
}
