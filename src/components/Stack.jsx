import InfiniteSpiral from '../reactbits/InfiniteSpiral.jsx';
import { stackCopy, features, galleryImages } from '../data/site.js';

/**
 * Section 02 — The stack.
 * Left: animated documentation copy.
 * Right: a NON-image background (gradient + hairline grid) with the
 * InfiniteSpiral of reference imagery layered on top.
 */
export default function Stack() {
  return (
    <section className="stack" id="stack" data-reveal>
      <div className="wrap stack-grid">
        <div className="stack-copy">
          <div className="section-tag mono">{stackCopy.kicker}</div>
          <h2>
            <span className="line-mask">
              <span>Documentation for</span>
            </span>
            <span className="line-mask" style={{ '--line-delay': '0.12s' }}>
              <span>
                the full <em>Cleats</em> stack.
              </span>
            </span>
          </h2>
          <p className="lede">{stackCopy.lede1}</p>
          <p className="lede">{stackCopy.lede2}</p>

          <ul className="stack-list" aria-label="Highlights">
            {features.map((f, i) => (
              <li key={f.title}>
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                <b>{f.title}</b>
                <span>{f.copy}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="stack-stage">
          <div className="spiral">
            <InfiniteSpiral
              items={galleryImages.map((g) => ({ src: g.src, alt: g.alt }))}
              animationMode="all"
              speed={0.5}
              radius={170}
              cardWidth={116}
              cardHeight={116}
              verticalSpacing={58}
              perspective={1000}
              cardRadius={12}
              centerScale={1.25}
              edgeBlur={6}
              cardsPerTurn={7}
              pauseOnHover
            />
          </div>
          <span className="stage-label mono">Reference set — drag to spin</span>
        </div>
      </div>
    </section>
  );
}
