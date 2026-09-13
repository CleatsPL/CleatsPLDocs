# Cleats

Documentation site for **Cleats** — an FTC path-following library engineered around one
principle: a robot should never travel slower than its hardware physically permits.

Rather than handing a moving setpoint to a PID loop and lagging behind it by construction,
Cleats treats following as a time-optimal control problem and solves it directly. The
drivetrain is either at its acceleration limit or its deceleration limit and effectively
nowhere in between.

## Design system

- **Palette** — black (`#050505`), red (`#c1121f`), gold (`#d4af37`). No neon.
- **Type** — DM Sans for display, Space Mono for kickers, labels and HUD elements.
- **Motion** — GSAP + ScrollTrigger (hero intro, premise scrub), pointer parallax,
  magnetic CTAs, IntersectionObserver reveals. Honors `prefers-reduced-motion`.
- **Navigation** — the React Bits `CardNav` (black/red/gold themed) on every page.

## Pages

| Route           | What it is                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------ |
| `/`             | The introduction — hero (video-ready), premise, the stack + InfiniteSpiral, highlights, system, reference set (DepthCarousel + TiltedCards), final CTA. |
| `/get-started`  | Docs quick links in the Pedro-Pathing style — Hyperspeed WebGL background, floating logo marks, four BorderGlow bubbles: **Intro**, **Cleats**, **Dribble**, **PlayMaker**, plus coming-soon doc chips. |
| `/team`         | The crew — group photo (TiltedCard), per-member ProfileCards (Topography background). Clicking a member opens a popup with their full story. |

## Highlights

- **Quintic Hermite splines** — matches position, tangent and curvature at every waypoint,
  so acceleration never jumps across a segment boundary.
- **No lookahead** — the robot is projected onto the nearest point of the spline; tangential
  drive is blended with a perpendicular correction scaled to real cross-track error.
- **Superelliptical acceleration envelope** — the true directional limit of a mecanum
  drivetrain, not a single conservative scalar.
- **Per-wheel slip prevention** — torque rate shaping keeps tires inside the traction limit.
- **LQR endgame** — optimal state feedback on position, strafe and heading, with hysteresis
  that reclaims full transit authority if the robot is displaced.
- **Decoupled heading** — constant, linear, exponential, point-at, long-way-around or tangent.
- **Live replanning** — splines regenerate from actual pose past a per-path tolerance.
- **Arc-based localization** — odometry integrated along true arcs, with outlier rejection.
- **Self-tuning** — characterization runs measure real acceleration, deceleration, angular
  limits and settling behaviour, then derive the controller constants.

## Development

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (default `http://localhost:5173`).

## Structure

```
src/
  App.jsx                # router, global chrome (noise, progress, cursor orb), card nav shell
  styles.css             # design system (black/red/gold tokens + all section styles)
  data/
    site.js              # all intro copy (verbatim) + nav/quick-link data
    team.js              # team roster — edit names/handles/bios here
  hooks/
    useIntroMotion.js    # GSAP: hero intro timeline, premise scrub
    useReveals.js        # lightweight scroll reveals for other pages
  components/            # page sections + chrome + team modal
  pages/
    IntroPage.jsx        # /
    GetStartedPage.jsx   # /get-started (Hyperspeed + BorderGlow bubbles)
    TeamPage.jsx         # /team (ProfileCard + popup)
  reactbits/             # React Bits components (CardNav, Hyperspeed, Topography,
                         # InfiniteSpiral, TiltedCard, DepthCarousel, BorderGlow, ProfileCard)
public/
  assets/                # imagery + logo mark (logo.svg)
  team/                  # per-member crops of the group photo
```

### Dropping in a hero video later

`src/components/Hero.jsx` exposes a `HERO_MEDIA` constant. Swap it to:

```js
const HERO_MEDIA = { type: 'video', src: '/assets/intro.mp4', poster: '/assets/echo01-hero.jpg' };
```

and the same animated text intro plays over the video.

### Team page

Members 02 and 03 in `src/data/team.js` are placeholders — drop in real names, handles and
bios and the cards and popups update automatically. Photos are crops of the group photo in
`public/pranavvvs.webp` (see `public/team/`).
