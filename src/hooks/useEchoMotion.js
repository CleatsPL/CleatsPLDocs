import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fieldState } from '../fieldState.js';

gsap.registerPlugin(ScrollTrigger);

export function useEchoMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let onPointerMove = null;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 }
    );
    root.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    if (reduced) {
      root.querySelectorAll('[data-count]').forEach((el) => {
        el.textContent = el.dataset.count;
      });
      return () => io.disconnect();
    }

    const ctx = gsap.context(() => {
      const heroIntro = gsap.timeline({ delay: 0.16 });
      heroIntro
        .from('.hero-copy .eyebrow', { y: 22, opacity: 0, duration: 0.7, ease: 'power3.out' })
        .from(
          '.hero-char',
          { yPercent: 125, rotateX: -95, opacity: 0, duration: 1.05, stagger: 0.024, ease: 'power4.out' },
          -0.35
        )
        .from('.hero-bottom>*', { y: 28, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }, -0.62)
        .from('.hero-data span', { x: 16, opacity: 0, duration: 0.65, stagger: 0.06, ease: 'power2.out' }, -0.72)
        .from('.light-console', { x: 22, opacity: 0, duration: 0.7, ease: 'power3.out' }, -0.65);

      gsap.to('.hero-media img', {
        scale: 1.18,
        yPercent: 7,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
      });
      gsap.to('.hero-copy', {
        yPercent: -22,
        opacity: 0.32,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: '28% top', end: 'bottom top', scrub: 1 },
      });
      gsap.to('#progressFill', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 'top top', end: 'max', scrub: 0.15 },
      });

      const premiseBeats = gsap.utils.toArray('.premise-beat');
      const premiseStep = document.getElementById('premiseStep');
      const premiseMeter = document.getElementById('premiseMeter');
      const premiseLabels = ['01 — Listen', '02 — Understand', '03 — Recede'];
      let premiseIndex = 0;
      gsap.set(premiseBeats.slice(1), { opacity: 0, y: 65, rotateX: -12 });

      const premiseTL = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#premise',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            if (premiseMeter) premiseMeter.style.transform = `scaleY(${self.progress})`;
            const n = Math.min(2, Math.floor(self.progress * 3));
            if (n !== premiseIndex) {
              premiseIndex = n;
              if (premiseStep) premiseStep.textContent = premiseLabels[n];
            }
          },
        },
      });

      premiseTL
        .to('.premise-word', { xPercent: 12, letterSpacing: '-.06em', duration: 3 }, 0)
        .to('.premise-signal', { rotation: 250, scale: 0.62, xPercent: -18, duration: 3 }, 0)
        .to('.premise-signal i:first-child', { scale: 1.9, opacity: 0.08, duration: 3 }, 0)
        .to('.premise-signal i:nth-child(2)', { scale: 0.46, opacity: 0.92, duration: 3 }, 0)
        .to(premiseBeats[0], { opacity: 0, y: -45, rotateX: 10, duration: 0.3 }, 0.68)
        .to(premiseBeats[1], { opacity: 1, y: 0, rotateX: 0, duration: 0.48, ease: 'power3.out' }, 0.83)
        .to(premiseBeats[1], { opacity: 0, y: -45, rotateX: 10, duration: 0.3 }, 1.68)
        .to(premiseBeats[2], { opacity: 1, y: 0, rotateX: 0, duration: 0.48, ease: 'power3.out' }, 1.83)
        .to('.premise-signal b', { x: 390, y: 15, duration: 3 }, 0);

      const storyPanels = [...document.querySelectorAll('.story-panel')];
      const storyIndex = document.getElementById('storyIndex');
      const storyMeter = document.getElementById('storyMeter');
      let activeStory = 0;

      ScrollTrigger.create({
        trigger: '#story',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const n = Math.min(2, Math.floor(self.progress * 3));
          if (storyMeter) storyMeter.style.transform = `scaleY(${self.progress})`;
          if (n !== activeStory) {
            gsap.killTweensOf(storyPanels);
            storyPanels.forEach((panel, i) => {
              panel.classList.toggle('active', i === n);
              if (i !== n) gsap.set(panel, { opacity: 0, y: 35 });
            });
            activeStory = n;
            if (storyIndex) storyIndex.textContent = String(n + 1).padStart(2, '0');
            gsap.fromTo(
              storyPanels[n],
              { opacity: 0, y: 35 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', overwrite: true }
            );
          }
        },
      });

      gsap.to('.story-media', {
        scale: 1.22,
        xPercent: 4,
        ease: 'none',
        scrollTrigger: { trigger: '#story', start: 'top top', end: 'bottom bottom', scrub: 1 },
      });
      gsap.to('.story-orbit', {
        rotation: 220,
        scale: 0.64,
        xPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: '#story', start: 'top top', end: 'bottom bottom', scrub: 1 },
      });

      const quietShots = gsap.utils.toArray('.quiet-shot');
      const quietBeats = gsap.utils.toArray('.quiet-beat');
      const quietMeter = document.getElementById('quietMeter');
      const quietTime = document.getElementById('quietTime');
      const quietTimes = ['06:42', '13:18', '23:06'];
      let quietIndex = 0;
      gsap.set([...quietShots.slice(1), ...quietBeats.slice(1)], { opacity: 0 });

      const quietTL = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#quiet',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            if (quietMeter) quietMeter.style.transform = `scaleY(${self.progress})`;
            const n = Math.min(2, Math.floor(self.progress * 3));
            if (n !== quietIndex) {
              quietIndex = n;
              if (quietTime) quietTime.textContent = quietTimes[n];
            }
          },
        },
      });

      quietTL
        .to(quietShots[0].querySelector('img'), { scale: 1.25, xPercent: 4, yPercent: -3, duration: 2 })
        .to([quietShots[0], quietBeats[0]], { opacity: 0, duration: 0.35 }, 1.65)
        .to([quietShots[1], quietBeats[1]], { opacity: 1, duration: 0.35 }, 1.65)
        .fromTo(
          quietShots[1].querySelector('img'),
          { scale: 1.08, xPercent: -5, yPercent: 2 },
          { scale: 1.28, xPercent: 4, yPercent: -3, duration: 2 },
          1.65
        )
        .to([quietShots[1], quietBeats[1]], { opacity: 0, duration: 0.35 }, 3.3)
        .to([quietShots[2], quietBeats[2]], { opacity: 1, duration: 0.35 }, 3.3)
        .fromTo(
          quietShots[2].querySelector('img'),
          { scale: 1.08, xPercent: 5, yPercent: -2 },
          { scale: 1.3, xPercent: -4, yPercent: 3, duration: 2 },
          3.3
        );

      gsap.to(fieldState, {
        energy: 1,
        ease: 'none',
        scrollTrigger: { trigger: '#field', start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
      gsap.fromTo(
        '.field-copy',
        { scale: 0.72, opacity: 0.1 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: '#field', start: 'top 85%', end: 'center center', scrub: 1 },
        }
      );

      const labTrack = document.getElementById('labTrack');
      const mm = gsap.matchMedia();

      mm.add('(min-width:701px)', () => {
        const spaceCards = gsap.utils.toArray('.space-card');
        gsap.set(spaceCards[0], { z: -420, rotateY: -18, rotateX: 8, opacity: 0.18 });
        gsap.set(spaceCards[1], { z: -760, rotateY: 22, rotateX: -9, opacity: 0.1 });
        gsap.set(spaceCards[2], { z: -1080, rotateY: -15, rotateX: 12, opacity: 0.05 });

        const spaceTL = gsap.timeline({
          scrollTrigger: {
            trigger: '#spatial',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        });

        spaceTL
          .to(spaceCards[0], { z: 260, rotateY: 8, rotateX: -3, opacity: 1, duration: 1, ease: 'none' })
          .to(spaceCards[0], { z: 640, opacity: 0, duration: 0.45, ease: 'none' })
          .to(spaceCards[1], { z: 250, rotateY: -8, rotateX: 3, opacity: 1, duration: 1, ease: 'none' }, 0.7)
          .to(spaceCards[1], { z: 640, opacity: 0, duration: 0.45, ease: 'none' }, 1.7)
          .to(spaceCards[2], { z: 180, rotateY: 5, rotateX: -2, opacity: 1, duration: 1, ease: 'none' }, 1.4);

        gsap.to('.spatial-world', {
          rotationY: 5,
          rotationX: -2,
          ease: 'none',
          scrollTrigger: { trigger: '#spatial', start: 'top top', end: 'bottom bottom', scrub: 1 },
        });

        return () => spaceTL.kill();
      });

      mm.add('(min-width:901px)', () => {
        const distance = () => Math.max(0, labTrack.scrollWidth - window.innerWidth + 64);
        const move = gsap.to(labTrack, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '#lab',
            start: 'top top',
            end: () => `+=${distance() + 500}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.to('.acoustic-rings', {
          rotation: 180,
          ease: 'none',
          scrollTrigger: {
            trigger: '#lab',
            start: 'top top',
            end: () => `+=${distance() + 500}`,
            scrub: 1,
          },
        });
        return () => move.kill();
      });

      const kineticWords = gsap.utils.toArray('.kinetic-word');
      const kineticStep = document.getElementById('kineticStep');
      gsap.set(kineticWords.slice(1), { opacity: 0 });

      const kineticTL = gsap.timeline({
        scrollTrigger: {
          trigger: '#language',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            if (kineticStep) {
              kineticStep.textContent = `${String(Math.min(3, Math.floor(self.progress * 3) + 1)).padStart(2, '0')} / 03`;
            }
          },
        },
      });

      kineticTL
        .to('.kinetic-beam', { scaleX: 1, duration: 0.65, ease: 'power2.inOut' })
        .to(
          kineticWords[0],
          { yPercent: -38, rotateX: 72, z: 180, opacity: 0, filter: 'blur(10px)', duration: 0.8, ease: 'power2.in' },
          0.35
        )
        .fromTo(
          kineticWords[1],
          { yPercent: 45, rotateX: -72, z: -180, opacity: 0, filter: 'blur(12px)' },
          { yPercent: 0, rotateX: 0, z: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
          0.7
        )
        .to(
          kineticWords[1],
          { scale: 0.62, rotateY: -32, z: 260, opacity: 0, filter: 'blur(8px)', duration: 0.8, ease: 'power2.in' },
          1.65
        )
        .fromTo(
          kineticWords[2],
          { scale: 1.5, rotateY: 28, z: -260, opacity: 0, filter: 'blur(14px)' },
          { scale: 1, rotateY: 0, z: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
          1.95
        )
        .to('.kinetic-beam', { scaleX: 0.14, xPercent: 300, duration: 0.7, ease: 'power2.in' }, 2.2);

      document.querySelectorAll('[data-count]').forEach((el) => {
        const target = +el.dataset.count;
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.n);
          },
        });
      });

      gsap.to('#line1', {
        xPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: '.quote', start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
      gsap.to('#line2', {
        xPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: '.quote', start: 'top bottom', end: 'bottom top', scrub: 1 },
      });

      const orb = document.getElementById('cursorOrb');
      if (orb) {
        const qx = gsap.quickTo(orb, 'x', { duration: 0.35, ease: 'power3' });
        const qy = gsap.quickTo(orb, 'y', { duration: 0.35, ease: 'power3' });
        onPointerMove = (event) => {
          orb.style.opacity = '1';
          qx(event.clientX);
          qy(event.clientY);
        };
        window.addEventListener('pointermove', onPointerMove, { passive: true });
      }
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const raf = requestAnimationFrame(refresh);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('load', refresh);
      if (onPointerMove) window.removeEventListener('pointermove', onPointerMove);
      ctx.revert();
    };
  }, [rootRef]);
}
