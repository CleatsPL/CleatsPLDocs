export default function Lab() {
  return (
    <section className="lab" id="lab">
      <div className="wrap lab-head">
        <div>
          <div className="section-tag mono">06 / Object laboratory</div>
          <h2>
            Built to be
            <br />
            opened.
          </h2>
        </div>
        <p>Every layer is accessible, replaceable and designed for a decade—not a launch cycle.</p>
      </div>
      <div className="lab-track" id="labTrack">
        <article className="lab-card">
          <div className="lab-card-top mono">
            <span>Layer 01</span>
            <span>Acoustic</span>
          </div>
          <div className="lab-visual">
            <div className="acoustic-rings" />
          </div>
          <div>
            <h3>Directional mesh.</h3>
            <p>A tensioned mono-material weave separates voices from the noise around them without recording the room.</p>
          </div>
        </article>
        <article className="lab-card dark">
          <div className="lab-card-top mono">
            <span>Layer 02</span>
            <span>Compute</span>
          </div>
          <div className="lab-visual">
            <div className="core-stack">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div>
            <h3>Private at the core.</h3>
            <p>Two isolated processors keep language and automation on-device. Physical disconnects are visible from the outside.</p>
          </div>
        </article>
        <article className="lab-card amber">
          <div className="lab-card-top mono">
            <span>Layer 03</span>
            <span>Material</span>
          </div>
          <div className="lab-visual">
            <div className="material-bars">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div>
            <h3>Four honest materials.</h3>
            <p>Ceramic, recycled aluminum, woven PET and a natural rubber foot. No glue. Six fasteners.</p>
          </div>
        </article>
        <article className="lab-card">
          <div className="lab-card-top mono">
            <span>Layer 04</span>
            <span>Lifetime</span>
          </div>
          <div className="lab-visual">
            <div className="spec-disc">
              <b>10Y</b>
            </div>
          </div>
          <div>
            <h3>Made for the long now.</h3>
            <p>Core modules upgrade independently. The shell stays with you; the intelligence can change.</p>
          </div>
        </article>
      </div>
      <div className="wrap swipe-hint mono">Four layers / one object</div>
    </section>
  );
}
