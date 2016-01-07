$( document ).ready(function() {

	var thermostat = new Thermostat(),
			updateDisplay,
			updateColour,
			apiCall;

	updateColour = function(){
		$("#thermostat-display").attr("class", thermostat.displayColour());
	};

	updateDisplay = function (){
		$("#thermostat-temp").text(thermostat.getTemp());
		$("#thermostat-unit").text(thermostat.unit);
		updateColour();
		
	};



	updateDisplay();


	$("#unit-change").click( function(){
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



	$("#do-not-press").hover(function(){
		$("audio")[0].play();
		}, function(){
		$("audio")[0].pause();
		$("audio")[0].currentTime=0;
	});


	$("do-not-press").click(function(){


	});


	apiCall = function(){
		var city = $("#current-city").val();
		$.get("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=52115bea41e04c74ffb6205b4ecbd623", function(data){
			$("#weather").text(data.main.temp);
		});
  };

	$("#look-outside").click(function(){
		apiCall();
	});






});














