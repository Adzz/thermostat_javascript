	"use strict"
$( document ).ready(function() {

	let counter = 1;

	const thermostat = new Thermostat(),
				body = $("body"),
				dangerSound=$("audio")[0],
				celebrateSound=$("#audio2")[0],
				cityTemperature = $("#weather").val();



	function updateColour(){
		$("#thermostat-display").attr("class", thermostat.displayColour());
	};

	function updateDisplay(){
		$("#thermostat-temp").text(thermostat.getTemp());
		$("#thermostat-unit").text(thermostat.unit);
		$("#weather-unit").text(thermostat.unit);
		updateColour();
		
	};

	updateDisplay();


	$("#unit-change").click( function unitChange(){
		apiCall();
		thermostat.toggleUnits();
		updateDisplay();
	});


	$("#up").click( function upClick(){
		thermostat.up();
		updateDisplay();
	});

	$(document).keyup( function upKeyboard(upButton){
		if(upButton.which==38){
			thermostat.up();
			updateDisplay();
		}
	});


	$("#down").click(function downClick(){
		thermostat.down();
		updateDisplay();
	});


	$(document).keyup( function downKeyboard(downButton){
		if(downButton.which==40){
			thermostat.down();
			updateDisplay();
		}
	});

	$("#resetTemp").click( function resetTemp(){
		thermostat.resetTemp();
		updateDisplay();
	});


	$("#power-save").click( function powerSave(){
		thermostat.togglePowerSave();
		updateDisplay();
		if(thermostat.isPowerSaving===false){
			$("#power-save").css("background-color", "black");
		} else {
			$("#power-save").css("background-color", "green");
		}
	});


	$("#do-not-press").mouseenter(function dnpHoverIn(){
		if(celebrateSound.currentTime>0){
			dangerSound.pause();
		} else {
		dangerSound.play();
		celebrateSound.currentTime=0;
		}
		});


	$("#do-not-press").mouseleave(function dnpHoverOut(){
		dangerSound.pause();
		celebrateSound.currentTime=0;
	});


	$("#do-not-press").click(function dnpClick(){
		let clicks = $(this).data('clicks');
		if(clicks){
			dnpSoundOn();
			buttonCounter();
			bodyChange();
			bodyChangeBack();
			bodyChange();
		} else {
			dnpSoundOff();
			bodyChangeBack();
		}
		$(this).data("clicks", !clicks);
	});

	function bodyChangeBack(){
		body.css("background-color", "white");
		body.toggleClass("green");

	};

	function bodyChange(){
		body.css("background-color", "red");
		body.toggleClass("green");
	};

	function buttonCounter(){
		$("#counter").text(counter++);
	};

	function dnpSoundOff(){
		celebrateSound.pause();
		celebrateSound.currentTime=0;
		$("#badass").toggleClass("hidden");
	};

	function dnpSoundOn(){
		$("#do-not-press").trigger("mouseleave");
		celebrateSound.currentTime=0;
		celebrateSound.play();
		$("#badass").toggleClass("hidden");
	};


	$("#look-outside").click(function lookOutside(){
		if($("#current-city").val().length<1){
			let city = prompt("Please enter the city you are in")
			$("#current-city").val(city);
			apiCall();
		} else {
			apiCall();		
	}});

	function apiCall(){
		let city = $("#current-city").val();
		$.get("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=347020e833b5fdb5ed8ffb75b3c1f8c6&units=metric", function(data){
		apiData(data);
		});
  };

	function apiData(data){
		if(thermostat.unit==="Celsius"){
			$("#weather").text(data.main.temp);
		} else if(thermostat.unit==="Fahrenheit") {
			$("#weather").text(Math.round((data.main.temp)*1.8+32));
		} else {
			$("#weather").text(Math.round((data.main.temp)+273.15));
		}
	};



});














