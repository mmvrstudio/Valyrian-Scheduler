$(document).ready(function() {
  var events = [];
  $(".saveBtn").on("click", function() {
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
    var dateAdded = moment().format("dddd, MMMM Do");
    events.push({description: value, time: time, date: dateAdded});
    localStorage.setItem("events", JSON.stringify(events));
    
  });

  function hourUpdater() {
    var currentHour = moment().hours();
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      if(currentHour > blockHour) {
        $(this).addClass("past");
      }
      
      else if(currentHour === blockHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      }

      else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
      
    });
  }

  hourUpdater();








  var secondsLeft = 15;
  function setTime() {
    setInterval(function() {
      secondsLeft--;
      if(secondsLeft === 0) {
        hourUpdater();
        secondsLeft = 15;
      }
  
    }, 1000);
  }

  setTime();


  var currentDay = moment().format("dddd, MMMM Do");
  for(var i = 0; i < events.length; i++) {
    if(currentDay.isAfter(events[i].date)) {
      events[i].description = "";
      events[i].time = "";
      events[i].date = "";
      events.length = 0;
    }
  }

  var storedEvents = JSON.parse(localStorage.getItem("events"));
  if (storedEvents !== null) {
    events = storedEvents;
  }

  for(var i = 0; i < events.length; i++) {
    var userDescription = events[i].description;
    $("#" + events[i].time).children(".description").text(userDescription);
  }

  $("#currentDay").text(moment().format("dddd, MMMM Do"));
  
});
