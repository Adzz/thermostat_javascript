$( document ).ready(function() {

	let thermostat = new Thermostat(),
			updateDisplay,
			updateColour,
			apiCall,
			getCityTemp,
			dnpSoundOn,
			dnpSoundOff,
			buttonCounter,
			counter = 1,
			bodyChange,
			bodyChangeBack;

	const thermostat = new Thermostat(),
				body = $("body"),
				dangerSound=$("audio")[0],
				celebrateSound=$("#audio2")[0],
				cityTemperature = $("#weather").val();



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
		if(celebrateSound.currentTime>0){
			dangerSound.pause();
		} else {
		dangerSound.play();
		celebrateSound.currentTime=0;
		}
		});


	$("#do-not-press").mouseleave(function (){
		dangerSound.pause();
		celebrateSound.currentTime=0;
	});


	$("#do-not-press").click(function(){
		var clicks = $(this).data('clicks');
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

	bodyChangeBack = function(){
		body.css("background-color", "white");
		body.toggleClass("green");

	};

	bodyChange = function(){
		body.css("background-color", "red");
		body.toggleClass("green");
	};

	buttonCounter = function(){
		$("#counter").text(counter++);
	};

	dnpSoundOff = function(){
		celebrateSound.pause();
		celebrateSound.currentTime=0;
		$("#badass").toggleClass("hidden");
	};

	dnpSoundOn = function(){
		$("#do-not-press").trigger("mouseleave");
		celebrateSound.currentTime=0;
		celebrateSound.play();
		$("#badass").toggleClass("hidden");
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














