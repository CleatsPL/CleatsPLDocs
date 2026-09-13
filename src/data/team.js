// Team roster.
// NOTE: names/roles for members 02 and 03 are placeholders —
// drop the real names, handles and bios in here and the whole page updates.

export const groupPhoto = {
  src: '/pranavvvs.webp',
  alt: 'The Cleats crew testing a robot in the garage',
  caption: 'Garage session — the Cleats crew',
};

export const team = [
  {
    id: 'member-01',
    index: '01',
    name: 'Pranav',
    role: 'Founder & lead developer',
    handle: 'pranavvvs',
    status: 'In the garage',
    photo: '/team/crew-center.webp',
    github: 'https://github.com/CleatsPL',
    bio: 'Pranav started Cleats with a frustration: every path follower he could find left speed on the table by design. He reworked path following as a time-optimal control problem and has been obsessing over the envelope, the solver and the slip model ever since.',
    contributions: [
      'Time-optimal trajectory solver',
      'Superelliptical acceleration envelope',
      'Per-wheel slip prevention',
      'Self-tuning characterization routines',
    ],
  },
  {
    id: 'member-02',
    index: '02',
    name: 'Member 02',
    role: 'Drivetrain & field testing',
    handle: 'tbd',
    status: 'On the floor',
    photo: '/team/crew-left.webp',
    github: 'https://github.com/CleatsPL',
    bio: 'The pair of hands that actually puts a drivetrain under load. This is the person taping down the mini field, watching tires for slip and turning "it feels faster" into measured numbers the library can trust.',
    contributions: [
      'Garage field setups & dry runs',
      'Traction and slip observation',
      'Drivetrain characterization runs',
    ],
  },
  {
    id: 'member-03',
    index: '03',
    name: 'Member 03',
    role: 'Controls & simulation',
    handle: 'tbd',
    status: 'In the loop',
    photo: '/team/crew-right.webp',
    github: 'https://github.com/CleatsPL',
    bio: 'The person with the laptop open next to the robot — simulating the spline before the drivetrain ever sees it, and tuning the corrections until the robot tracks the line like it printed it.',
    contributions: [
      'Simulation and replay tooling',
      'Projection & cross-track correction',
      'Waypoint and endgame tuning',
    ],
  },
];
