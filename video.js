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
    if (video instanceof HTMLVideoElement) {
      video.pause();
    }
    // Timer löschen, falls einer läuft
    if (introTimer !== null) {
      clearTimeout(introTimer);
      introTimer = null;
    }
    appendAnimationClasses();
  }
}

function appendAnimationClasses() {
  document.getElementById('grid-container').classList.add('fadeInFast');
  document.getElementById('header-bar').classList.add('slideInFromTop');
  document.getElementById('top-left').classList.add('slideInFromLeft');
  document.getElementById('top-center').classList.add('fadeInSlow');
  document.getElementById('top-right').classList.add('slideInFromRight');
  document.getElementById('bottom-left').classList.add('slideInFromBottomLeft');
  document.getElementById('bottom-center').classList.add('slideInFromBottomCenter');
  document.getElementById('bottom-right').classList.add('slideInFromBottomRight');
}

// 3. Funktion zum erneuten Öffnen (via Profilbild)
function openIntro() {
  const overlay = document.getElementById('intro-overlay');
  const video = document.getElementById('intro-video');

  if (overlay && video instanceof HTMLVideoElement) {
    overlay.style.display = 'flex'; // Zwingt das Overlay zur Anzeige
    video.currentTime = 0;

    // WICHTIG: Ein kleiner Delay für den Play-Befehl hilft Browsern
    video.play().catch(e => console.log("Autoplay blockiert:", e));

    // Starte den Timer zum automatischen Schließen (5 Sek)
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
    // Falls deaktiviert: Overlay gar nicht erst zeigen
    console.log("🛠️ Intro übersprungen (Entwickler-Modus)");
    closeIntro();
  } else {
    // Falls aktiviert: Normaler Ablauf
    // Wir stellen sicher, dass es sichtbar ist und starten den Timer
    const overlay = document.getElementById('intro-overlay');
    if (overlay) overlay.style.display = 'flex';

    introTimer = setTimeout(closeIntro, 5000);
  }
});