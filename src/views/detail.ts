import { ipcRenderer } from 'electron';
import Event from '../classes/Event';

window.addEventListener('DOMContentLoaded', () => {
  let currentEvent: Event;

  ipcRenderer.on('init-data', (event, params: Event) => {
    currentEvent = Event.hydrate(params);
    console.log(currentEvent);

    // Afficher les valeurs dans les éléments HTML appropriés
    displayEventInHTML(currentEvent);
  });

  // Méthode pour afficher les valeurs dans les éléments HTML appropriés
  function displayEventInHTML(event: Event): void {
    if (event) {
      const { from, title, to } = event;

      // Découper "from" en deux parties
      const fromD = from.toString().slice(0, 8);
      const fromH = from.toString().slice(8);

      // Découper "to" en deux parties
      const toD = to.toString().slice(0, 8);
      const toH = to.toString().slice(8);

      // Formater "fromD" et "toD" au format "00/00/0000"
      const formattedFromD = formatDateString(fromD);
      const formattedToD = formatDateString(toD);

      // Extraire les heures et les minutes de "fromH" et "toH"
      const fromHours = fromH.slice(0, 2);
      const fromMinutes = fromH.slice(2, 4);
      const toHours = toH.slice(0, 2);
      const toMinutes = toH.slice(2, 4);

      // Afficher les valeurs dans les éléments HTML
      const titleElement: HTMLElement | null = document.getElementById("Dtittle");
      const fromElement: HTMLElement | null = document.getElementById("Bdate");
      const toElement: HTMLElement | null = document.getElementById("Edate");

      if (titleElement) {
        titleElement.textContent = title;
      }

      if (fromElement) {
        const formattedFrom = formattedFromD + ' à ' + fromHours + ':' + fromMinutes;
        fromElement.textContent = "Date de début : " + formattedFrom;
      }

      if (toElement) {
        const formattedTo = formattedToD + ' à ' + toHours + ':' + toMinutes;
        toElement.textContent = "Date de fin : " + formattedTo;
      }
    }
  }

  // Fonction pour formater la date sous la forme "DD/MM/YYYY"
  function formatDateString(dateString: string): string {
    const day = dateString.slice(0, 2);
    const month = dateString.slice(2, 4);
    const year = dateString.slice(4, 8);
    return day + '/' + month + '/' + year;
  }
});
