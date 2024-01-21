// Get the current date and format it
const formattedDate = dayjs().format("dddd, D MMMM YYYY");

// Set the formatted date in the header
$("#currentDay").text(formattedDate);


//Time status
const getTimeStatus = (hour) => {
    const currentHour = dayjs().hour();
    return hour < currentHour ? "past" : hour === currentHour ? "present" : "future";
  };
  