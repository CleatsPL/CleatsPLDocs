const shots = [
  {
    src: '/assets/echo01-quiet-morning.jpg',
    alt: 'Overhead morning study of ECHO/01 on pale ash wood',
    kicker: 'Morning / Anticipate',
    title: 'Light before language.',
    copy: 'The room is tuned before it is asked. Warmth arrives as a condition, never a notification.',
  },
  {
    src: '/assets/echo01-quiet-midday.jpg',
    alt: 'ECHO/01 in a graphic terracotta midday alcove',
    kicker: 'Midday / Attend',
    title: 'Focus has a shape.',
    copy: 'ECHO holds the edges of your attention—lowering noise, pacing the room and keeping itself out of sight.',
  },
  {
    src: '/assets/echo01-quiet-night.jpg',
    alt: 'ECHO/01 receding into an indigo room at night',
    kicker: 'Night / Withdraw',
    title: 'Silence is a feature.',
    copy: 'The aperture closes, the seam cools, and intelligence returns the room to the people inside it.',
  },
];

export default function Quiet() {
  return (
    <section className="quiet" id="quiet">
      <div className="quiet-stage">
        <div className="quiet-shots">
          {shots.map((shot) => (
            <figure className="quiet-shot" key={shot.src}>
              <img src={shot.src} alt={shot.alt} loading="lazy" />
            </figure>
          ))}
        </div>
        <div className="quiet-shade" />
        <div className="quiet-badge mono">A film measured in room tone</div>
        <div className="quiet-head">
          <div className="section-tag mono">03 / Quiet hours</div>
          <span className="quiet-time mono" id="quietTime">
            06:42
          </span>
        </div>
        <div className="quiet-copy">
          {shots.map((shot) => (
            <article className="quiet-beat" key={shot.kicker}>
              <span className="mono">{shot.kicker}</span>
              <h2>{shot.title}</h2>
              <p>{shot.copy}</p>
            </article>
          ))}
        </div>
        <div className="quiet-rail" aria-hidden="true">
          <i id="quietMeter" />
        </div>
      </div>
    </section>
  );
}
