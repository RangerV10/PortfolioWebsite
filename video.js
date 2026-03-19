// @ts-nocheck

// 1. Variable für den Timer global initialisieren
let introTimer = null;

// 2. Funktion zum Schließen des Intros (Überspringen)
function closeIntro() {
  const overlay = document.getElementById('intro-overlay');
  const iframe = document.getElementById('intro-frame');

  if (overlay) {
    overlay.style.display = 'none';

    // Stoppt das YouTube Video, indem die Quelle geleert wird
    if (iframe) {
      iframe.setAttribute("src", "");
    }

    // Falls ein Timer läuft, wird dieser gestoppt
    if (introTimer !== null) {
      clearTimeout(introTimer);
      introTimer = null;
    }
  }
}

// 3. Funktion zum erneuten Öffnen (via Profilbild)
function openIntro() {
  const overlay = document.getElementById('intro-overlay');
  const iframe = document.getElementById('intro-frame');

  if (overlay && iframe) {
    // Die YouTube URL für dein Prozessor-Video
    const videoUrl = "https://www.youtube.com/embed/lBGzqXoRPIk?autoplay=1&mute=1&controls=0&showinfo=0&rel=0";
    iframe.setAttribute("src", videoUrl);

    overlay.style.display = 'flex';

    // Automatisches Schließen nach 6 Sekunden (Video-Länge)
    introTimer = setTimeout(closeIntro, 6000);
  }
}

// 4. Funktionen global verfügbar machen, damit das HTML sie findet
window.closeIntro = closeIntro;
window.openIntro = openIntro;

// 5. Automatischer Start beim ersten Laden der Seite
window.onload = () => {
  // Startet den 6-Sekunden-Countdown für das erste Mal
  introTimer = setTimeout(closeIntro, 6000);
};