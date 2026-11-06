
/* =================================
   SPARK113 — HOLOGRAPHIC ANIMATIONS
   ================================= */

:root {
  --holo-purple: #a879ff;
  --holo-blue: #70d8ff;
  --holo-glow: rgba(168, 121, 255, 0.35);
}

/* Ambient background movement */
body::before {
  content: "";
  position: fixed;
  inset: -50%;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(circle at 30% 40%,
      rgba(119, 65, 190, 0.13), transparent 35%),
    radial-gradient(circle at 75% 65%,
      rgba(63, 116, 180, 0.10), transparent 35%);
  animation: ambientDrift 18s ease-in-out infinite alternate;
}

@keyframes ambientDrift {
  from { transform: translate(-2%, -1%) rotate(0deg); }
  to   { transform: translate(2%, 1%) rotate(8deg); }
}

/* Holographic folders */
.folder {
  position: relative;
  overflow: hidden;
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}

.folder::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(
    120deg,
    transparent 20%,
    rgba(168, 121, 255, 0.28),
    rgba(112, 216, 255, 0.20),
    transparent 80%
  );
  transform: translateX(-120%);
  transition: transform 0.7s ease;
}

.folder:hover::before {
  transform: translateX(120%);
}

.folder:hover {
  transform: translateY(-7px) scale(1.025);
  border-color: var(--holo-purple);
  box-shadow:
    0 0 15px var(--holo-glow),
    0 0 35px rgba(112, 216, 255, 0.12);
}

/* Folder opening animation */
.folder.opening {
  animation: folderOpen 0.45s ease;
}

@keyframes folderOpen {
  0% { transform: scale(1); }
  45% { transform: scale(1.07); }
  100% { transform: scale(1); }
}

/* File window */
#file-window {
  transform-origin: top center;
  animation: windowAppear 0.4s ease both;
}

@keyframes windowAppear {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Files entering the window */
.file-item {
  animation: fileEnter 0.4s ease both;
  transition: background 0.25s ease, transform 0.25s ease;
}

.file-item:hover {
  transform: translateX(6px);
  background: rgba(168, 121, 255, 0.10);
}

@keyframes fileEnter {
  from {
    opacity: 0;
    transform: translateX(-15px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Floating icons */
.folder-icon,
.file-icon {
  display: inline-block;
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* Glowing text */
.holo-text {
  color: #d9c8ff;
  text-shadow:
    0 0 8px rgba(168, 121, 255, 0.65),
    0 0 20px rgba(168, 121, 255, 0.25);
}

/* Anime scene image support */
.anime-character {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  transform-origin: bottom center;
}

.anime-character:hover {
  filter: drop-shadow(0 0 14px var(--holo-glow));
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
