document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  const updateBackgroundShift = (x, y) => {
    root.style.setProperty("--bg-shift-x", `${x}px`);
    root.style.setProperty("--bg-shift-y", `${y}px`);
  };

  const handlePointerMove = (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 38;
    const y = (event.clientY / window.innerHeight - 0.5) * 38;
    updateBackgroundShift(x, y);
  };

  const handlePointerLeave = () => {
    root.style.setProperty("--bg-shift-x", "0px");
    root.style.setProperty("--bg-shift-y", "0px");
  };

  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerleave", handlePointerLeave);
  window.addEventListener("blur", handlePointerLeave);
});
