import { useRef } from 'react';
import Hero from '../components/Hero.jsx';
import SpeedTicker from '../components/SpeedTicker.jsx';
import Premise from '../components/Premise.jsx';
import Stack from '../components/Stack.jsx';
import System from '../components/System.jsx';
import Features from '../components/Features.jsx';
import Visuals from '../components/Visuals.jsx';
import Final from '../components/Final.jsx';
import { useIntroMotion } from '../hooks/useIntroMotion.js';

export default function IntroPage() {
  const rootRef = useRef(null);
  useIntroMotion(rootRef);

  return (
    <main className="intro-page" ref={rootRef}>
      <Hero />
      <SpeedTicker />
      <Premise />
      <Stack />
      <Features />
      <System />
      <Visuals />
      <Final />
    </main>
  );
}
