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

// 1. Funktion zum Schließen
function closeIntro() {
  const overlay = document.getElementById('intro-overlay');
  const video = document.getElementById('intro-video');

  if (overlay) {
    overlay.style.display = 'none'; // Hier wird es unsichtbar

    // WICHTIG: Scrollen wieder erlauben, wenn das Video weg ist
    document.body.style.overflow = "auto";

    if (video instanceof HTMLVideoElement) {
      video.pause();
    }

    // Timer löschen, falls einer läuft
    if (introTimer !== null) {
      clearTimeout(introTimer);
      introTimer = null;
    }

    // Die Animationen von Jens starten
    appendAnimationClasses();
  }
}

// Hilfsfunktion für Jens' Animationen
function appendAnimationClasses() {
  const elements = {
    'grid-container': 'fadeInFast',
    'header-bar': 'slideInFromTop',
    'top-left': 'slideInFromLeft',
    'top-center': 'fadeInSlow',
    'top-right': 'slideInFromRight',
    'bottom-left': 'slideInFromBottomLeft',
    'bottom-center': 'slideInFromBottomCenter',
    'bottom-right': 'slideInFromBottomRight'
  };

  for (const [id, className] of Object.entries(elements)) {
    const el = document.getElementById(id);
    if (el) el.classList.add(className);
  }
}

// 2. Funktion zum Öffnen (via Profilbild)
function openIntro() {
  const overlay = document.getElementById('intro-overlay');
  const video = document.getElementById('intro-video');

  if (overlay && video instanceof HTMLVideoElement) {
    overlay.style.display = 'flex'; // Zwingt das Overlay zur Anzeige

    // WICHTIG: Scrollen sperren, während das Video läuft
    document.body.style.overflow = "hidden";

    video.currentTime = 0;
    video.play().catch(e => console.log("Autoplay blockiert:", e));

    if (introTimer) clearTimeout(introTimer);
    introTimer = setTimeout(closeIntro, 5000);
  }
}

// 3. Der Toggle-Schalter (Licht an / Licht aus)
function toggleIntro() {
  const isCurrentlyDisabled = localStorage.getItem('disableIntro') === 'true';
  localStorage.setItem('disableIntro', !isCurrentlyDisabled ? 'true' : 'false');

  const status = !isCurrentlyDisabled ? "DEAKTIVIERT" : "AKTIVIERT";
  alert("Entwickler-Modus: Intro wurde für dich " + status + ".");
  location.reload();
}

// Global verfügbar machen
window.closeIntro = closeIntro;
window.openIntro = openIntro;
window.toggleIntro = toggleIntro;

// 4. Die Start-Logik beim Laden der Seite
window.addEventListener('load', () => {
  const isIntroDisabled = localStorage.getItem('disableIntro') === 'true';

  if (isIntroDisabled) {
    console.log("🛠️ Intro übersprungen (Entwickler-Modus)");
    closeIntro();
  } else {
    const overlay = document.getElementById('intro-overlay');
    const video = document.getElementById('intro-video');

    if (overlay) {
      overlay.style.display = 'flex';
      // Beim Start sofort Scrollen verhindern
      document.body.style.overflow = "hidden";

      if (video instanceof HTMLVideoElement) {
        video.play().catch(e => console.log("Autoplay beim Start verhindert:", e));
      }
    }

    introTimer = setTimeout(closeIntro, 5000);
  }
});