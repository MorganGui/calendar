import { ipcRenderer } from 'electron'
import Event from '../classes/Event'

window.addEventListener('DOMContentLoaded', () => {
  let currentEvent
  
  ipcRenderer.on('init-data', (event, params: Event) => {
    currentEvent = Event.hydrate(params)
    console.log(currentEvent)
  })
})
