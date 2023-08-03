import { ipcRenderer } from 'electron'
import Event from '../classes/Event'

function formatTimestampToReadableDate(timestamp: number): string {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
}

window.addEventListener('DOMContentLoaded', () => {
  let currentEvent: Event;

  ipcRenderer.on('init-data', (event, params: Event) => {
    currentEvent = Event.hydrate(params);

    // Traduction des timestamps en dates lisible
    const fromReadableDate = formatTimestampToReadableDate(currentEvent.from);
    const toReadableDate = formatTimestampToReadableDate(currentEvent.to);

    // Utilisation des dates traduites
    console.log('From:', fromReadableDate);
    console.log('To:', toReadableDate);

    // Affichage du titre dans l'élément avec l'ID "Dtitle"
    const DtitleElement = document.getElementById('Dtitle');
    if (DtitleElement) {
      DtitleElement.textContent = currentEvent.title;
    }

    // Affichage de la date "from" formatée dans l'élément avec l'ID "Bdate"
    const BdateElement = document.getElementById('Bdate');
    if (BdateElement) {
      BdateElement.textContent = `Début: ${fromReadableDate}`;
    }

    // Affichage de la date "to" formatée dans l'élément avec l'ID "Edate"
    const EdateElement = document.getElementById('Edate');
    if (EdateElement) {
      EdateElement.textContent = `Fin: ${toReadableDate}`;
    }

    // Affichage de la description dans l'élément avec l'ID "EveDesc"
    const EveDescElement = document.getElementById('EveDesc');
    if (EveDescElement) {
      EveDescElement.textContent = currentEvent.desc;
    }
  });
});
