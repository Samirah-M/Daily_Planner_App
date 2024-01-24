// Set up variables
const dayEl = $('#currentDay');
const containerEl = $('.container');
const hours = [1, 2, 3, 4, 5 , 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

// Function to generate time blocks
function generateTimeBlocks() {
  hours.forEach(hour => {
    const timeBlock = $('<div>').addClass('time-block row');
    const hourColumn = $('<div>').addClass('hour col-2').text(dayjs().hour(hour).format('hA'));
    const textAreaColumn = $('<textarea>').addClass('description col-8');
    const saveBtnColumn = $('<button>').addClass('saveBtn col-2').append($('<i>').addClass('fas fa-save'));

    timeBlock.attr('data-hour', hour);
    timeBlock.append(hourColumn, textAreaColumn, saveBtnColumn);
    containerEl.append(timeBlock);
  });
}

// Function to apply styles to time blocks based on current time
function applyHourStyles() {
  const currentHour = dayjs().hour();

  $('.time-block').each(function () {
    const blockHour = parseInt($(this).attr('data-hour'));

    if (blockHour < currentHour) {
      $(this).removeClass('future present').addClass('past');
    } else if (blockHour === currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else {
      $(this).removeClass('present past').addClass('future');
    }
  });
}

// Function to load events from local storage
function loadEvents() {
  hours.forEach(hour => {
    const time = `event_${hour}`;
    const event = JSON.parse(localStorage.getItem(time));

    if (event) {
      $(`[data-hour='${hour}'] .description`).val(event);
    }
  });
}

// Function to save events to local storage
function saveEvent(event) {
  if ($(event.target).hasClass('saveBtn')) {
    const time = $(event.target).parent().attr('data-hour');
    const eventDescription = $(event.target).siblings('.description').val();

    localStorage.setItem(`event_${time}`, JSON.stringify(eventDescription));
  }
}

// Initialize time blocks
generateTimeBlocks();
applyHourStyles();
loadEvents();

// Set interval to update styles every 60 seconds
setInterval(applyHourStyles, 60000);

// Add click event listener to save events
containerEl.on('click', '.saveBtn', saveEvent);