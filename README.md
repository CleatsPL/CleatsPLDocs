# Cleats

Documentation site for **Cleats** — an FTC path-following library engineered around one
principle: a robot should never travel slower than its hardware physically permits.

Rather than handing a moving setpoint to a PID loop and lagging behind it by construction,
Cleats treats following as a time-optimal control problem and solves it directly. The
drivetrain is either at its acceleration limit or its deceleration limit and effectively
nowhere in between.

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
  App.jsx
  styles.css
  hooks/useEchoMotion.js   # GSAP + ScrollTrigger
  components/              # page sections
public/assets/             # imagery
```
