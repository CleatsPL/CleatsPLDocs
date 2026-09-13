// Central content + navigation data for the Cleats docs site.
// Copy below is carried over verbatim from the previous site / README.

export const GITHUB_ORG = 'https://github.com/CleatsPL';

export const hero = {
  eyebrow: 'FTC path following / time-optimal control',
  titleLine1: 'No lag.',
  titleLine2: 'Just limits.',
  copy:
    'Cleats is built on one principle: a robot should never travel slower than its hardware physically permits. Full throttle until the brakes are mandatory.',
};

export const premiseBeats = [
  {
    kicker: 'Premise 01 / The lag',
    title: 'A PID loop always chases a moving setpoint.',
    titleAccent: 'moving setpoint.',
    copy: 'Conventional followers hand a setpoint to a feedback loop and, by construction, trail behind it forever. The error never reaches zero because the target never stops moving.',
  },
  {
    kicker: 'Premise 02 / The reframe',
    title: 'Following is a time-optimal control problem.',
    titleAccent: 'time-optimal',
    copy: 'Cleats does not chase. It solves for the fastest legal trajectory directly, so the drivetrain is either at its acceleration limit or its deceleration limit — and effectively nowhere in between.',
  },
  {
    kicker: 'Premise 03 / The result',
    title: 'The hardware becomes the only limit.',
    titleAccent: 'only limit.',
    copy: 'Every constraint the robot obeys is a measured physical one: traction, acceleration envelope, braking distance. Nothing is left on the table by a tuning constant.',
  },
];

export const systemModules = [
  {
    num: 'A.01',
    title: 'Time-optimal solver',
    copy: 'Following is treated as a time-optimal control problem and solved directly. The drivetrain sits at its acceleration limit or its deceleration limit and effectively nowhere in between.',
  },
  {
    num: 'A.02',
    title: 'Projection, not pursuit',
    copy: 'The robot is projected onto the nearest point of the spline every loop. Tangential drive is blended with a perpendicular correction proportional to real cross-track error — so error is annihilated, not averaged away.',
  },
  {
    num: 'A.03',
    title: 'Directional acceleration envelope',
    copy: 'A mecanum drivetrain pushes far harder forward than sideways. Cleats models the achievable envelope as a smooth superellipse in the robot frame and looks up the true limit for whatever direction it is moving.',
  },
  {
    num: 'A.04',
    title: 'Per-wheel slip prevention',
    copy: 'Commanded torque is rate-shaped so each tire stays just inside the traction limit. Wheels that break loose are both slower and poison the odometry — preventing slip is a speed feature, not just a safety one.',
  },
];

export const features = [
  {
    title: 'Quintic Hermite splines',
    copy: 'Matches position, tangent and curvature at every waypoint, so acceleration never jumps across a segment boundary.',
  },
  {
    title: 'No lookahead',
    copy: 'The robot is projected onto the nearest point of the spline; tangential drive is blended with a perpendicular correction scaled to real cross-track error.',
  },
  {
    title: 'Superelliptical acceleration envelope',
    copy: 'The true directional limit of a mecanum drivetrain, not a single conservative scalar.',
  },
  {
    title: 'Per-wheel slip prevention',
    copy: 'Torque rate shaping keeps tires inside the traction limit.',
  },
  {
    title: 'LQR endgame',
    copy: 'Optimal state feedback on position, strafe and heading, with hysteresis that reclaims full transit authority if the robot is displaced.',
  },
  {
    title: 'Decoupled heading',
    copy: 'Constant, linear, exponential, point-at, long-way-around or tangent.',
  },
  {
    title: 'Live replanning',
    copy: 'Splines regenerate from actual pose past a per-path tolerance.',
  },
  {
    title: 'Arc-based localization',
    copy: 'Odometry integrated along true arcs, with outlier rejection.',
  },
  {
    title: 'Self-tuning',
    copy: 'Characterization runs measure real acceleration, deceleration, angular limits and settling behaviour, then derive the controller constants.',
  },
];

export const stackCopy = {
  kicker: '02 / The stack',
  title: 'Documentation for the full Cleats stack.',
  lede1:
    'An FTC path-following library engineered around one principle: a robot should never travel slower than its hardware physically permits.',
  lede2:
    'Rather than handing a moving setpoint to a PID loop and lagging behind it by construction, Cleats treats following as a time-optimal control problem and solves it directly. The drivetrain is either at its acceleration limit or its deceleration limit and effectively nowhere in between.',
};

// Gallery imagery (existing assets)
export const galleryImages = [
  { src: '/assets/echo01-detail.jpg', alt: 'Cleats object — detail, gold seam' },
  { src: '/assets/echo01-quiet-night.jpg', alt: 'Cleats object — quiet night' },
  { src: '/assets/echo01-story-rain.jpg', alt: 'Cleats object — rain story' },
  { src: '/assets/echo01-quiet-midday.jpg', alt: 'Cleats object — quiet midday' },
  { src: '/assets/echo01-quiet-morning.jpg', alt: 'Cleats object — quiet morning' },
];

// Get Started — quick links (Pedro-Pathing-style doc tiles)
export const docsLinks = [
  {
    id: 'intro',
    name: 'Intro',
    tag: 'DOCS',
    icon: 'book',
    to: '/',
    desc: 'The introduction. The premise, the system and the stack — the whole story in one read.',
  },
  {
    id: 'cleats',
    name: 'Cleats',
    tag: 'REPO',
    icon: 'bolt',
    href: 'https://github.com/CleatsPL/Cleats',
    desc: 'The path-following core: quintic splines, the superelliptical envelope, per-wheel slip control.',
  },
  {
    id: 'dribble',
    name: 'Dribble',
    tag: 'REPO',
    icon: 'disc',
    href: 'https://github.com/CleatsPL/Dribble',
    desc: 'Source and documentation for Dribble. Landing soon.',
  },
  {
    id: 'playmaker',
    name: 'PlayMaker',
    tag: 'REPO',
    icon: 'robot',
    href: 'https://github.com/CleatsPL/Playmaker',
    desc: 'Source and documentation for PlayMaker. Landing soon.',
  },
];

// Doc pages on the way (rendered as coming-soon chips)
export const comingSoon = [
  'Splines & solver',
  'Acceleration envelope',
  'Slip prevention',
  'LQR endgame',
  'Self-tuning',
  'Localization',
];

// CardNav items (card nav used on every page)
export const navItems = [
  {
    label: 'Docs',
    bgColor: '#0d0d10',
    textColor: '#f4f2ee',
    links: [
      { label: 'Introduction', href: '/', ariaLabel: 'Documentation introduction' },
      { label: 'Quick Links', href: '/get-started', ariaLabel: 'Documentation quick links' },
      { label: 'Team', href: '/team', ariaLabel: 'The team behind Cleats' },
    ],
  },
  {
    label: 'Stack',
    bgColor: '#0d0d10',
    textColor: '#f4f2ee',
    links: [
      { label: 'Cleats', href: 'https://github.com/CleatsPL/Cleats', ariaLabel: 'Cleats on GitHub' },
      { label: 'Dribble', href: 'https://github.com/CleatsPL/Dribble', ariaLabel: 'Dribble on GitHub' },
      { label: 'PlayMaker', href: 'https://github.com/CleatsPL/Playmaker', ariaLabel: 'PlayMaker on GitHub' },
    ],
  },
  {
    label: 'Community',
    bgColor: '#0d0d10',
    textColor: '#f4f2ee',
    links: [
      { label: 'GitHub Org', href: GITHUB_ORG, ariaLabel: 'CleatsPL on GitHub' },
      { label: 'White Paper', href: '#', ariaLabel: 'White paper, coming soon' },
    ],
  },
];
