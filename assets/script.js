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

