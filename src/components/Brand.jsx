import { useEffect, useState } from 'react';

// The uploaded logo lives at public/cleats-logo.png. We probe for it on mount:
// if it loads, it replaces the drawn brandmark glyph everywhere (nav + footer);
// if the file is missing we keep the glyph, so nothing ever looks broken.
const LOGO_SRC = '/cleats-logo.png';

export default function Brand() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setReady(true);
    img.src = LOGO_SRC;
    return () => {
      img.onload = null;
    };
  }, []);

  if (!ready) return <span className="brandmark" aria-hidden="true" />;

  return <img className="brand-logo" src={LOGO_SRC} alt="Cleats logo" />;
}
