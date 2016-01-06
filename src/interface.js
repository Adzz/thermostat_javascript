$( document ).ready(function() {

	var thermostat = new Thermostat(), updateDisplay, up;


	updateDisplay = function (){
		$("#thermostat-temp").text(thermostat.getTemp());
		$("#thermostat-unit").text(thermostat.unit);
	
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

});














