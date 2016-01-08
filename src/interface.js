$( document ).ready(function() {

	var thermostat = new Thermostat(),
			updateDisplay,
			updateColour,
			apiCall,
			cityTemperature = $("#weather").val(),
			getCityTemp,
			dnpSound,
			buttonCounter,
			counter = 1,
			flashFont;

	updateColour = function(){
		$("#thermostat-display").attr("class", thermostat.displayColour());
	};

	updateDisplay = function (){
		$("#thermostat-temp").text(thermostat.getTemp());
		$("#thermostat-unit").text(thermostat.unit);
		$("#weather-unit").text(thermostat.unit);
		updateColour();
		
	};

	updateDisplay();


	$("#unit-change").click( function(){
		apiCall();
		thermostat.toggleUnits();
		updateDisplay();
	});


	$("#up").click( function(){
		thermostat.up();
		updateDisplay();
	});

	$(document).keyup( function(upButton){
		if(upButton.which==38){
			thermostat.up();
			updateDisplay();
		}
	});


	$("#down").click( function(){
		thermostat.down();
		updateDisplay();
	});

	$(document).keyup( function(downButton){
		if(downButton.which==40){
			thermostat.down();
			updateDisplay();
		}
	});

	$("#resetTemp").click( function(){
		thermostat.resetTemp();
		updateDisplay();
	});

	$("#power-save").click( function(){
		thermostat.togglePowerSave();
		updateDisplay();
		if(thermostat.isPowerSaving===false){
			$("#power-save").css("background-color", "black");
		} else {
			$("#power-save").css("background-color", "green");
		}
	});


	$("#do-not-press").mouseenter(function (){
		if($("#audio2")[0].currentTime>0){
			$("audio")[0].pause();
		} else {
		$("audio")[0].play();
		$("#audio2")[0].currentTime=0;
		}
		});


	$("#do-not-press").mouseleave(function (){
		$("audio")[0].pause();
		$("audio")[0].currentTime=0;
	});


	$("#do-not-press").click(function(){
		dnpSound();
		buttonCounter();
		flashFont();

	});


	flashFont = function(){
		var body = $("body");
		body.animate({fontSize: "4em"}, "fast");
		body.animate({fontSize: "0em"}, "fast");
		body.animate({fontSize: "3em"}, "fast");
	};

	buttonCounter = function(){
		$("#counter").text(counter++);

	};


	dnpSound = function(){
		var clicks = $(this).data('clicks');
		$("#do-not-press").trigger("mouseleave");
		if(clicks){
			$("#audio2")[0].currentTime=0;
			$("#audio2")[0].play();
			$("#badass").toggleClass("hidden");
		} else {
			$("#audio2")[0].pause();
			$("#audio2")[0].currentTime=0;
			$("#badass").toggleClass("hidden");
		}
		$(this).data("clicks", !clicks);
	};

	apiCall = function(){
		var city = $("#current-city").val();
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


	$("#look-outside").click(function(){
		apiCall();		
	});




});














