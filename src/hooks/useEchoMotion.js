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
      const heroIntro = gsap.timeline({ delay: 0.04 });
      heroIntro
        .from('.hero-copy .eyebrow', { y: 16, opacity: 0, duration: 0.38, ease: 'power3.out' })
        .from(
          '.hero-char',
          { yPercent: 125, rotateX: -95, opacity: 0, duration: 0.58, stagger: 0.014, ease: 'power4.out' },
          -0.22
        )
        .from('.hero-bottom>*', { y: 18, opacity: 0, duration: 0.42, stagger: 0.06, ease: 'power3.out' }, -0.36);

      gsap.to('.hero-media img', {
        scale: 1.22,
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.25 },
      });
      gsap.to('.hero-copy', {
        yPercent: -28,
        opacity: 0.22,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: '22% top', end: 'bottom top', scrub: 0.25 },
      });
      gsap.to('#progressFill', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 'top top', end: 'max', scrub: 0.08 },
      });

      const premiseBeats = gsap.utils.toArray('.premise-beat');
      const premiseStep = document.getElementById('premiseStep');
      const premiseMeter = document.getElementById('premiseMeter');
      const premiseLabels = ['01 — Listen', '02 — Understand', '03 — Recede'];
      let premiseIndex = 0;
      gsap.set(premiseBeats.slice(1), { opacity: 0, y: 48, rotateX: -10 });

      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#premise',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.28,
          onUpdate: (self) => {
            if (premiseMeter) premiseMeter.style.transform = `scaleY(${self.progress})`;
            const n = Math.min(2, Math.floor(self.progress * 3));
            if (n !== premiseIndex) {
              premiseIndex = n;
              if (premiseStep) premiseStep.textContent = premiseLabels[n];
            }
          },
        },
      })
        .to('.premise-word', { xPercent: 16, letterSpacing: '-.05em', duration: 3 }, 0)
        .to('.premise-signal', { rotation: 320, scale: 0.58, xPercent: -22, duration: 3 }, 0)
        .to('.premise-signal i:first-child', { scale: 2.1, opacity: 0.06, duration: 3 }, 0)
        .to('.premise-signal i:nth-child(2)', { scale: 0.4, opacity: 0.95, duration: 3 }, 0)
        .to(premiseBeats[0], { opacity: 0, y: -40, rotateX: 10, duration: 0.22 }, 0.72)
        .to(premiseBeats[1], { opacity: 1, y: 0, rotateX: 0, duration: 0.32, ease: 'power3.out' }, 0.82)
        .to(premiseBeats[1], { opacity: 0, y: -40, rotateX: 10, duration: 0.22 }, 1.72)
        .to(premiseBeats[2], { opacity: 1, y: 0, rotateX: 0, duration: 0.32, ease: 'power3.out' }, 1.82)
        .to('.premise-signal b', { x: 420, y: 18, duration: 3 }, 0);

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
              if (i !== n) gsap.set(panel, { opacity: 0, y: 22 });
            });
            activeStory = n;
            if (storyIndex) storyIndex.textContent = String(n + 1).padStart(2, '0');
            gsap.fromTo(
              storyPanels[n],
              { opacity: 0, y: 22 },
              { opacity: 1, y: 0, duration: 0.32, ease: 'power3.out', overwrite: true }
            );
          }
        },
      });

      gsap.to('.story-media', {
        scale: 1.28,
        xPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: '#story', start: 'top top', end: 'bottom bottom', scrub: 0.28 },
      });

      const quietShots = gsap.utils.toArray('.quiet-shot');
      const quietBeats = gsap.utils.toArray('.quiet-beat');
      const quietMeter = document.getElementById('quietMeter');
      const quietTime = document.getElementById('quietTime');
      const quietTimes = ['06:42', '13:18', '23:06'];
      let quietIndex = 0;
      gsap.set([...quietShots.slice(1), ...quietBeats.slice(1)], { opacity: 0 });

      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#quiet',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.28,
          onUpdate: (self) => {
            if (quietMeter) quietMeter.style.transform = `scaleY(${self.progress})`;
            const n = Math.min(2, Math.floor(self.progress * 3));
            if (n !== quietIndex) {
              quietIndex = n;
              if (quietTime) quietTime.textContent = quietTimes[n];
            }
          },
        },
      })
        .to(quietShots[0].querySelector('img'), { scale: 1.32, xPercent: 6, yPercent: -4, duration: 2 })
        .to([quietShots[0], quietBeats[0]], { opacity: 0, duration: 0.22 }, 1.72)
        .to([quietShots[1], quietBeats[1]], { opacity: 1, duration: 0.22 }, 1.72)
        .fromTo(
          quietShots[1].querySelector('img'),
          { scale: 1.08, xPercent: -6, yPercent: 3 },
          { scale: 1.34, xPercent: 5, yPercent: -4, duration: 2 },
          1.72
        )
        .to([quietShots[1], quietBeats[1]], { opacity: 0, duration: 0.22 }, 3.44)
        .to([quietShots[2], quietBeats[2]], { opacity: 1, duration: 0.22 }, 3.44)
        .fromTo(
          quietShots[2].querySelector('img'),
          { scale: 1.08, xPercent: 6, yPercent: -3 },
          { scale: 1.36, xPercent: -5, yPercent: 4, duration: 2 },
          3.44
        );

      gsap.to(fieldState, {
        energy: 1,
        ease: 'none',
        scrollTrigger: { trigger: '#field', start: 'top bottom', end: 'bottom top', scrub: 0.28 },
      });
      gsap.fromTo(
        '.field-copy',
        { scale: 0.78, opacity: 0.08 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: '#field', start: 'top 88%', end: 'center center', scrub: 0.28 },
        }
      );

      const labTrack = document.getElementById('labTrack');
      const mm = gsap.matchMedia();

      mm.add('(min-width:701px)', () => {
        const spaceCards = gsap.utils.toArray('.space-card');
        gsap.set(spaceCards[0], { z: -520, rotateY: -24, rotateX: 10, opacity: 0.12 });
        gsap.set(spaceCards[1], { z: -900, rotateY: 28, rotateX: -12, opacity: 0.08 });
        gsap.set(spaceCards[2], { z: -1280, rotateY: -20, rotateX: 14, opacity: 0.04 });

        const spaceTL = gsap.timeline({
          scrollTrigger: {
            trigger: '#spatial',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.28,
          },
        });

        spaceTL
          .to(spaceCards[0], { z: 280, rotateY: 8, rotateX: -3, opacity: 1, duration: 0.7, ease: 'none' })
          .to(spaceCards[0], { z: 760, opacity: 0, duration: 0.26, ease: 'none' }, 0.7)
          .to(spaceCards[1], { z: 260, rotateY: -8, rotateX: 3, opacity: 1, duration: 0.7, ease: 'none' }, 0.48)
          .to(spaceCards[1], { z: 760, opacity: 0, duration: 0.26, ease: 'none' }, 1.18)
          .to(
            spaceCards[2],
            { z: 80, rotateY: 3, rotateX: -1, y: 0, opacity: 1, duration: 0.7, ease: 'none' },
            1.0
          )
          .to({}, { duration: 0.42 });

        gsap.to('.spatial-world', {
          rotationY: 8,
          rotationX: -3,
          ease: 'none',
          scrollTrigger: { trigger: '#spatial', start: 'top top', end: 'bottom bottom', scrub: 0.28 },
        });

        return () => spaceTL.kill();
      });

      mm.add('(min-width:701px)', () => {
        if (!labTrack) return undefined;
        const distance = () => Math.max(0, labTrack.scrollWidth - window.innerWidth + 80);
        const move = gsap.to(labTrack, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '#lab',
            start: 'top top',
            end: () => `+=${Math.max(distance() + 160, 640)}`,
            pin: true,
            scrub: 0.28,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            fastScrollEnd: true,
          },
        });
        gsap.to('.acoustic-rings', {
          rotation: 240,
          ease: 'none',
          scrollTrigger: {
            trigger: '#lab',
            start: 'top top',
            end: () => `+=${Math.max(distance() + 160, 640)}`,
            scrub: 0.28,
          },
        });
        return () => move.kill();
      });

      const kineticWords = gsap.utils.toArray('.kinetic-word');
      const kineticStep = document.getElementById('kineticStep');
      gsap.set(kineticWords.slice(1), { opacity: 0, immediateRender: true });

      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#language',
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.22,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (kineticStep) {
              kineticStep.textContent = `${p < 0.28 ? '01' : p < 0.58 ? '02' : '03'} / 03`;
            }
          },
        },
      })
        .to('.kinetic-beam', { scaleX: 1, duration: 0.1, ease: 'power2.inOut' })
        .to(
          kineticWords[0],
          { yPercent: -48, rotateX: 78, z: 220, opacity: 0, filter: 'blur(8px)', duration: 0.2, ease: 'power2.in' },
          0.12
        )
        .fromTo(
          kineticWords[1],
          { yPercent: 48, rotateX: -78, z: -220, opacity: 0, filter: 'blur(10px)' },
          {
            yPercent: 0,
            rotateX: 0,
            z: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.22,
            ease: 'power3.out',
            immediateRender: false,
          },
          0.18
        )
        .to(
          kineticWords[1],
          { scale: 0.55, rotateY: -36, z: 280, opacity: 0, filter: 'blur(8px)', duration: 0.2, ease: 'power2.in' },
          0.48
        )
        .fromTo(
          kineticWords[2],
          { scale: 1.28, rotateY: 18, z: -180, opacity: 0, filter: 'blur(10px)' },
          {
            scale: 1,
            rotateY: 0,
            z: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.24,
            ease: 'power3.out',
            immediateRender: false,
          },
          0.54
        )
        .to('.kinetic-beam', { scaleX: 0.14, xPercent: 180, duration: 0.2, ease: 'power2.in' }, 0.62)
        .to({}, { duration: 0.28 });

      document.querySelectorAll('[data-count]').forEach((el) => {
        const target = +el.dataset.count;
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 0.72,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.n);
          },
        });
      });

      gsap.to('#line1', {
        xPercent: -16,
        ease: 'none',
        scrollTrigger: { trigger: '.quote', start: 'top bottom', end: 'bottom top', scrub: 0.28 },
      });
      gsap.to('#line2', {
        xPercent: 16,
        ease: 'none',
        scrollTrigger: { trigger: '.quote', start: 'top bottom', end: 'bottom top', scrub: 0.28 },
      });

      const orb = document.getElementById('cursorOrb');
      if (orb) {
        const qx = gsap.quickTo(orb, 'x', { duration: 0.14, ease: 'power3' });
        const qy = gsap.quickTo(orb, 'y', { duration: 0.14, ease: 'power3' });
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
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    const raf = requestAnimationFrame(() => requestAnimationFrame(refresh));
    const later = window.setTimeout(refresh, 280);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(later);
      window.removeEventListener('load', refresh);
      if (onPointerMove) window.removeEventListener('pointermove', onPointerMove);
      ctx.revert();
    };
  }, [rootRef]);
}
