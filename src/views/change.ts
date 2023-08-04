// renderer.js
import { ipcRenderer } from 'electron';
import Event from '../classes/Event';

function formatTimestampToReadableDate(timestamp: number): string {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
}

function combineDateAndTime(date: string, time: string): number {
  const dateObj = new Date(date);
  const timeArr = time.split(':');
  dateObj.setHours(Number(timeArr[0]));
  dateObj.setMinutes(Number(timeArr[1]));
  return dateObj.getTime();
}

window.addEventListener('DOMContentLoaded', () => {
  let currentEvent: Event;
  let NewCurrentEvent: Event;

  ipcRenderer.on('init-data', (event, params: Event) => {
    currentEvent = Event.hydrate(params);
    NewCurrentEvent = Event.hydrate({ ...currentEvent });

    const fromReadableDate = formatTimestampToReadableDate(currentEvent.from);
    const toReadableDate = formatTimestampToReadableDate(currentEvent.to);

    const DtitleElement = document.getElementById('Dtitle');
    if (DtitleElement) {
      DtitleElement.textContent = currentEvent.title;
    }

    const BdateElement = document.getElementById('Bdate');
    if (BdateElement) {
      BdateElement.textContent = `Début: ${fromReadableDate}`;
    }

    const EdateElement = document.getElementById('Edate');
    if (EdateElement) {
      EdateElement.textContent = `Fin: ${toReadableDate}`;
    }

    const EveDescElement = document.getElementById('EveDesc');
    if (EveDescElement) {
      EveDescElement.textContent = currentEvent.desc;
    }
  });

  const BChangeButton = document.getElementById('BChange');
  if (BChangeButton) {
    BChangeButton.addEventListener('click', () => {
      const newTitle = (document.getElementById('newTitle') as HTMLInputElement).value;
      const newDesc = (document.getElementById('newDescription') as HTMLInputElement).value;
      const newStartDate = (document.getElementById('newStartDate') as HTMLInputElement).value;
      const newStartTime = (document.getElementById('newStartTime') as HTMLInputElement).value;
      const newEndDate = (document.getElementById('newEndDate') as HTMLInputElement).value;
      const newEndTime = (document.getElementById('newEndTime') as HTMLInputElement).value;

      const newStartTimeStamp = combineDateAndTime(newStartDate, newStartTime);
      const newEndTimeStamp = combineDateAndTime(newEndDate, newEndTime);



      const DtitleElement = document.getElementById('Dtitle');
      if (DtitleElement) {
        DtitleElement.textContent = newTitle;
      }

      const BdateElement = document.getElementById('Bdate');
      if (BdateElement) {
        BdateElement.textContent = `Début: ${formatTimestampToReadableDate(newStartTimeStamp)}`;
      }

      const EdateElement = document.getElementById('Edate');
      if (EdateElement) {
        EdateElement.textContent = `Fin: ${formatTimestampToReadableDate(newEndTimeStamp)}`;
      }

      const EveDescElement = document.getElementById('EveDesc');
      if (EveDescElement) {
        EveDescElement.textContent = newDesc;
      }

      NewCurrentEvent.title = newTitle;
      NewCurrentEvent.desc = newDesc;
      NewCurrentEvent.from = newStartTimeStamp;
      NewCurrentEvent.to = newEndTimeStamp;

      console.log(newStartTimeStamp);
      console.log(newEndTimeStamp);
      console.log(NewCurrentEvent);
    });
  }
});
