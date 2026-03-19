// @ts-nocheck

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ANLEITUNG FÜR ENTWICKLER: INTRO AN/AUS SCHALTEN
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Öffne die Browser-Konsole (F12).
 * 2. Tippe den Befehl: toggleIntro() ein und drücke Enter.
 * Dies speichert deine Präferenz dauerhaft im Browser-Speicher.
 * ─────────────────────────────────────────────────────────────────────────────
 */

let introTimer = null;

function closeIntro() {
  const overlay = document.getElementById('intro-overlay');
  const video = document.getElementById('intro-video');

  if (overlay) {
    overlay.style.display = 'none';
    if (video instanceof HTMLVideoElement) {
      video.pause();
    }
    if (introTimer) {
      clearTimeout(introTimer);
      introTimer = null;
    }
  }
}

function openIntro() {
  const overlay = document.getElementById('intro-overlay');
  const video = document.getElementById('intro-video');

  if (overlay && video instanceof HTMLVideoElement) {
    overlay.style.display = 'flex';
    video.currentTime = 0;
    video.play();
    introTimer = setTimeout(closeIntro, 5000);
  }
}

function toggleIntro() {
  const isCurrentlyDisabled = localStorage.getItem('disableIntro') === 'true';
  localStorage.setItem('disableIntro', !isCurrentlyDisabled ? 'true' : 'false');

  const status = !isCurrentlyDisabled ? "DEAKTIVIERT" : "AKTIVIERT";
  alert("Entwickler-Modus: Intro wurde für dich " + status + ".");
  location.reload();
}

// Funktionen für HTML verfügbar machen
window.closeIntro = closeIntro;
window.openIntro = openIntro;
window.toggleIntro = toggleIntro;

// Start-Logik beim Laden
window.addEventListener('load', () => {
  const isIntroDisabled = localStorage.getItem('disableIntro') === 'true';

  if (isIntroDisabled) {
    console.log("🛠️ Intro deaktiviert per LocalStorage (toggleIntro).");
    closeIntro();
  } else {
    introTimer = setTimeout(closeIntro, 5000);
  }
});