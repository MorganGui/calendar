import Event from './classes/Event'

window.addEventListener(`DOMContentLoaded`, () => {
  /**
   * CALENDAR
   */
  const dom = {
    calendar: document.querySelector('.calendar'),
    date: document.querySelector('.date'),
    daysContainer: document.querySelector('.days'),
    prev: document.querySelector('.prev'),
    next: document.querySelector('.next'),

    todayBtn: document.querySelector('.today-btn'),
    gotoBtn: document.querySelector('.goto-btn'),
    gotoInput: <HTMLInputElement>document.querySelector('.date-input'),
    eventDay: document.querySelector('.event-day'),
    eventDate: document.querySelector('.event-date'),



    addEventBtn: document.querySelector('.add-event'),
    addEventContainer: document.querySelector('.add-event-wrapper'),
    addEventCloseBtn: document.querySelector('.close'),
    addEventTitle: <HTMLInputElement>document.querySelector('.event-name'),
    addEventFrom: <HTMLInputElement>document.querySelector('.event-time-from'),
    addEventTo: <HTMLInputElement>document.querySelector('.event-time-to')
  }

  const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre'
  ]
  const days = [
    'dimanche',
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi'
  ]

  const today = new Date()
  let month = today.getMonth()
  let year = today.getFullYear()
  dom.gotoInput.placeholder = `${month.toString().length === 1 ? '0' : ''}${month}/${year}`

  function initCalendar(firstInit: boolean = false) {
    // get : prev month days + current month days + next month days
    const lastDateOfMonth = new Date(year, month + 1, 0)
    const lastDateOfPrevMonth = new Date(year, month, 0)
    const nbDaysInMonth = lastDateOfMonth.getDate()
    const nbDaysInPrevMonth = lastDateOfPrevMonth.getDate()
    const nextDays = 7 - lastDateOfMonth.getDay()

    // current date
    dom.date.innerHTML = `${months[month]} ${year}`

    // days
    let days = ''

    // prev month
    for (let i = lastDateOfPrevMonth.getDay(); i > 0; i--) {
      days += `<div class="day prev-date">${nbDaysInPrevMonth - i}</div>`
    }

    // current month
    for (let j = 1; j <= nbDaysInMonth; j++) {
      let haveEvent = false
      events.forEach(event => {
        const eventDate = new Date(event.from)
        if (
          eventDate.getDate() === j &&
          eventDate.getMonth() === month &&
          eventDate.getFullYear() === year
        ) {
          haveEvent = true
        }
      })

      if (j === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
        days += `<div class="day today ${firstInit ? 'active' : ''}${haveEvent ? ' event' : ''}">${j}</div>`
        if (firstInit) {
          getActiveDay(j)
        }
      } else {
        days += `<div class="day${haveEvent ? ' event' : ''}">${j}</div>`
      }
    }

    // next month
    for (let k = 1; k <= nextDays; k++) {
      days += `<div class="day next-date">${k}</div>`
    }

    dom.daysContainer.innerHTML = days
    addListener()
  }
  function prevMonth() {
    month--
    if (month < 0) {
      month = 11
      year--
    }
    initCalendar()
  }
  function nextMonth() {
    month++
    if (month > 11) {
      month = 0
      year++
    }
    initCalendar()
  }
  function gotoToday() {
    month = today.getMonth()
    year = today.getFullYear()
    initCalendar()
  }
  function gotoDate() {
    if (dom.gotoInput.value.length === 0) {
      gotoToday()
      return
    } else {
      const splitedDate = dom.gotoInput.value.split('/')
      if (splitedDate.length === 2) {
        if (parseFloat(splitedDate[0]) > 0 && parseFloat(splitedDate[0]) < 13 && splitedDate[1].length === 4) {
          month = parseFloat(splitedDate[0]) - 1
          year = parseFloat(splitedDate[1])
          initCalendar()
          return
        }
      }
    }
    alert('Date invalide.')
  }
  function gotoInputCheck(e: InputEvent) {
    const input = e.target as HTMLInputElement
    input.value = input.value.replace(/[^0-9/]/g, '')
    if (input.value.length === 2) {
      if (parseFloat(input.value) > 12) input.value = '12'
      if (input.value === '00') input.value = '01'
      input.value += '/'
    }
    if (input.value.length > 7) {
      input.value = input.value.slice(0, 7)
    }
    if (e.inputType === 'deleteContentBackward' && input.value.length === 3) {
      input.value = input.value.slice(0, 1)
    }
  }
  function addListener() {
    const days = document.querySelectorAll('.day')
    days.forEach(day => {
      day.addEventListener('click', e => {
        const target = e.target as HTMLElement

        getActiveDay(parseFloat(target.innerHTML))

        days.forEach(day => {
          day.classList.remove('active')
        })

        if (target.classList.contains('prev-date')) {
          prevMonth()

          document.querySelectorAll('.day').forEach(day => {
            if (target.innerHTML === day.innerHTML && !day.classList.contains('prev-date')) {
              day.classList.add('active')
            }
          })
        } else if (target.classList.contains('next-date')) {
          nextMonth()

          document.querySelectorAll('.day').forEach(day => {
            if (target.innerHTML === day.innerHTML && !day.classList.contains('next-date')) {
              day.classList.add('active')
            }
          })
        } else {
          target.classList.add('active')
        }
      })
    })
  }
  function getActiveDay(date: number) {
    const day = new Date(year, month, date)
    const dayName = days[day.getDay()]
    dom.eventDay.innerHTML = dayName
    dom.eventDate.innerHTML = date + ' ' + months[month] + ' ' + year
  }




  /**
   * EVENTS
   */
  const events = [
    new Event(0, 1686133800000, 1686139200000, 'Pause déjeuner'),
    new Event(1, 1688716968429, 1688720568429, 'test'),
    new Event(1, 1688893368429, 1688893488429, 'test2')
  ]

  function eventTitleInputCheck() {
    dom.addEventTitle.value = dom.addEventTitle.value.slice(0, 50)
  }
  function eventTimeInputCheck(e: InputEvent) {
    const input = e.target as HTMLInputElement

    input.value = input.value.replace(/[^0-9:]/g, '')
    if (input.value.length === 2) {
      input.value += ':'
    }
    if (input.value.length > 5) {
      input.value = input.value.slice(0, 5)
    }
  }



  // Calendar
  initCalendar(true)
  dom.prev.addEventListener('click', prevMonth)
  dom.next.addEventListener('click', nextMonth)
  dom.todayBtn.addEventListener('click', gotoToday)
  dom.gotoInput.addEventListener('input', gotoInputCheck)
  dom.gotoBtn.addEventListener('click', gotoDate)

  // Events
  dom.addEventTitle.addEventListener('input', eventTitleInputCheck)
  dom.addEventFrom.addEventListener('input', eventTimeInputCheck)
  dom.addEventTo.addEventListener('input', eventTimeInputCheck)
  dom.addEventBtn.addEventListener('click', () => {
    dom.addEventContainer.classList.toggle('active')
    dom.addEventBtn.classList.toggle('active')
  })
  dom.addEventCloseBtn.addEventListener('click', () => {
    dom.addEventContainer.classList.remove('active')
    dom.addEventBtn.classList.remove('active')
  })
})
