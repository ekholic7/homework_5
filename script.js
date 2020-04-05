var timeOfDay = {
    "8 AM": "",
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": "",
};

$(document).ready(function(){
    if(!localStorage.getItem("timeOfDay")){
        updateCalendarTasks(timeOfDay);
    } else {
        updateCalendarTasks(JSON.parse(localStorage.getItem("timeOfDay")));
    }
})

$("#currentDay h4").text(moment().format("dddd") + ", " + moment().format("MMMM Do YYYY, h:mm:ss a"));

var counter = 1;

for (const property in timeOfDay) {
    var enterText = "#text-entry" + counter;
    $(enterText).text(timeOfDay[property]);
    var time = "#time" + counter;
    var presentHr = moment().hour();
    var timeString = $(time).text();
    var timeNum = hourNumberFromHourString(timeString);
    if (timeNum < presentHr) {
        $(enterText).addClass("past");       
    } else if (timeNum > presentHr) {
        $(enterText).addClass("future");
    } else {
        $(enterText).addClass("present");
    }
    counter ++;
}

$("button").addClass("save");
$("button").addClass("save i:hover");

$("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();
    
    saveSchedule(hourString, value);
});

function hourNumberFromHourString(hourString){
    switch(hourString) {
        case "8 AM": return 8;
        case "9 AM": return 9;
        case "10 AM": return 10;
        case "11 AM": return 11;
        case "12 PM": return 12;
        case "1 PM": return 13;
        case "2 PM": return 14;
        case "3 PM": return 15;
        case "4 PM": return 16;
        case "5 PM": return 17;
    }
}

function loadCorrectDataset() {
    result = localStorage.getItem("timeOfDay")
    return (result ? result : timeOfDay);
}

function formatLocalStorage () {
    localStorage.setItem("timeOfDay", JSON.stringify(timeOfDay));
};

function saveToLocalStorage (dayTask) {
    localStorage.setItem("timeOfDay", JSON.stringify(dayTask));
}

function saveSchedule (hourString, val) {
    if(!localStorage.getItem("timeOfDay")) {
        intializeLocalStorage();
    }

    var workHours = JSON.parse(localStorage.getItem("timeOfDay"));
    workHours[hourString] = val

    saveToLocalStorage(workHours);
}

function updateCalendarTasks(dayObject) {
    $(".calendar-row").each(function(index) {
        var res = $(this).children("div");
        $(this).children("textarea").text(dayObject[res.text()]);
    })
}