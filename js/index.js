var num = 5,
    bnum = 1,
    savenum = num,
    savebnum = bnum,
    counting = false,
    paused = false,
    count,
    bcount;

//set initial times
$("#number").html(num + ":00");
$("#b-number").html(bnum + ":00");

//start button
$("#start").click(function(){
  counting = true;
  start(num, bnum);
  $("#start").toggleClass("hidden");
  $("#pause").toggleClass("hidden");
});

//pause button shows up if you click start
$("#pause").click(function(){
  paused = true;
  $("#pause").toggleClass("hidden");
  $("#resume").toggleClass("hidden");
});

//resume button shows up if you click pause
$("#resume").click(function(){
  paused = false;
  $("#resume").toggleClass("hidden");
  $("#pause").toggleClass("hidden");
});

//reset button, rememberstimes from when you last clicked start
$("#reset").click(function(){
  clearInterval(count);
  clearInterval(bcount);
  $("#number").html(savenum + ":00");
  $("#b-number").html(savebnum + ":00");
  counting = false;
  paused = false;
  $(".timing").addClass("hidden");
  $("#start").removeClass("hidden");
});

//this is the main counting function
function start(num, bnum){
  //save the initial times
  savenum = num;
  savebnum = bnum;
  //turn minutes into 1/10 seconds (this makes transitions between colors smoother)
  num *= 600;
  var hue = 0;
  //set how much the hue will increment every tenth of a second
  var hueInc = 360/num;
  //start the main counter
  count = setInterval(function(){
    if (num > 0 && paused === false){
      num--;
      //this adds the time to the number span
      $("#number").html(Math.floor(num/600) + ":" + Math.floor(num%600/100) + Math.floor(num%600%100/10));
      //this changes the background color slightly every interval
      hue += hueInc;
      $("body").css("background-color", "hsl(" + hue + ", 100%, 30%)");
      //when the time gets to 0, reset the time and start the break counter
    } else if (num === 0){
      clearInterval(count);
      $("#number").html(savenum + ":00");
      takeBreak(savenum, savebnum);
    }
  }, 100);
}

//here's the break counter
function takeBreak(num, bnum){
  bnum *= 600;
  var sat = 100;
  var satInc = 200/bnum;
  var desat = true;
  bcount = setInterval(function(){
    if (bnum > 0 && paused === false){
      bnum--;
      //this drops the saturation down to 0, then climbs back up to 100
      if (sat > 1 && desat === true){
        sat -= satInc;
      } else {
        desat = false;
        sat += satInc;
      };
      $("body").css("background-color", "hsl(0, " + sat + "%, 30%)");
      $("#b-number").html(Math.floor(bnum/600) + ":" + Math.floor(bnum%600/100) + Math.floor(bnum%600%100/10));
    } else if (bnum === 0) {
      clearInterval(bcount);
      $("#b-number").html(savebnum + ":00");
      start(savenum, savebnum)
    }
  }, 100);
}

//these are the plus and minus buttons
$("#minus").click(function(){
  num = ($("#number").text()).replace(/:\d\d/, "");
  if (num >= 1 && counting === false){
    num--;
    $("#number").html(num + ":00");
  }
})

$("#plus").click(function(){
  num = ($("#number").text()).replace(/:\d\d/, "");
  if (counting === false){
    num++;
    $("#number").html(num + ":00");
  }
})

$("#b-minus").click(function(){
  bnum = ($("#b-number").text()).replace(/:\d\d/, "");
  if (bnum >= 1 && counting === false){
    bnum--;
    $("#b-number").html(bnum + ":00");
  }
})

$("#b-plus").click(function(){
  bnum = ($("#b-number").text()).replace(/:\d\d/, "");
  if (counting === false){
    bnum++;
    $("#b-number").html(bnum + ":00");
  }
})