import DepthCarousel from '../reactbits/DepthCarousel.jsx';
import TiltedCard from '../reactbits/TiltedCard.jsx';
import { galleryImages } from '../data/site.js';

export default function Visuals() {
  return (
    <section className="visuals" id="visuals">
      <div className="wrap visuals-head" data-reveal>
        <div>
          <div className="section-tag mono">05 / Reference set</div>
          <h2>Every surface, on black.</h2>
          <p>Five studies of the object — drag, scroll or steer the stack.</p>
        </div>
        <span className="mono">05 frames / 01 subject</span>
      </div>

      <div className="visuals-carousel">
        <DepthCarousel
          items={galleryImages}
          cardWidth={340}
          cardHeight={430}
          tint="#050505"
          depth={220}
          spread={90}
          tilt={22}
          tiltDirection="right"
          visibleCards={4}
          autoplay
          autoplayDelay={4200}
        />
      </div>

      <div className="wrap visuals-tilts" data-reveal>
        <TiltedCard
          imageSrc="/assets/echo01-detail.jpg"
          altText="Cleats object — detail, gold seam"
          captionText="Detail"
          containerHeight="360px"
          imageWidth="360px"
          imageHeight="360px"
          showMobileWarning={false}
          rotateAmplitude={10}
          scaleOnHover={1.07}
        />
        <TiltedCard
          imageSrc="/assets/echo01-quiet-night.jpg"
          altText="Cleats object — quiet night"
          captionText="Quiet night"
          containerHeight="360px"
          imageWidth="360px"
          imageHeight="360px"
          showMobileWarning={false}
          rotateAmplitude={10}
          scaleOnHover={1.07}
        />
      </div>
    </section>
  );
}
