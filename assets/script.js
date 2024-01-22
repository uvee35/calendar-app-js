// Get the current date and format it
const formattedDate = dayjs().format("dddd, D MMMM YYYY");

// Set the formatted date in the header
$("#currentDay").text(formattedDate);


//Time status
const getTimeStatus = (hour) => {
    const currentHour = dayjs().hour();
    return hour < currentHour ? "past" : hour === currentHour ? "present" : "future";
  };
  
  // Initialize the planner with time blocks
for (let hour = 9; hour <= 17; hour++) {
    // Get the formatted time and time status
    const formattedTime = dayjs(`2024 ${hour}`).format("h A");
    const timeStatus = getTimeStatus(hour);
    
    // Create a time block element
    const timeBlock = $(`
        <form data-time="${hour}">
            <label class="col-1" for="entry"><p>${formattedTime}</p></label>
            <textarea class="col-10 ${timeStatus}" name="entry"></textarea>
            <button type="submit" class="saveBtn col-1"><i class="fa-solid fa-floppy-disk"></i></button>
        </form>
    `);

    // Append the time block to the schedule
    $("#schedule").append(timeBlock);
}

// Handle form submissions and store entries
$("form").on("submit", (event) => {
    event.preventDefault();
    const inputValue = $(event.target).find('textarea[name="entry"]').val();
    const time = $(event.target).data('time');
    console.log(`Input Value for time ${time}:`, inputValue);
    localStorage.setItem(`time-${time}`, inputValue);

    // Display a message in the header
    $("#header-message").text(` Appointment entered to localStorage ✓`);
   
    // Clear the message after 2 seconds
    setTimeout(() => {
        $("#header-message").text('');
    }, 2000); 
});

// Retrieve and populate stored entries
$(document).ready(() => {
    for (let hour = 9; hour <= 17; hour++) {
        const storedValue = localStorage.getItem(`time-${hour}`);
        if (storedValue) {
            $(`form[data-time="${hour}"] textarea[name="entry"]`).val(storedValue);

        }
    }
});

function clearCalendar() {
    // Loop over the hours for which we have stored events
    for (let hour = 9; hour <= 17; hour++) {
        // Remove the item from localStorage
        localStorage.removeItem(`time-${hour}`);
        // Clear the textarea value
        $(`form[data-time="${hour}"] textarea[name="entry"]`).val('');
    }
}

// Clear calendar click handler
$("#clear-cal").on("click", clearCalendar);


