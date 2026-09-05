export default function Chrome() {
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true">
        <i id="progressFill" />
      </div>
      <div className="cursor-orb" id="cursorOrb" aria-hidden="true" />
    </>
  );
}
