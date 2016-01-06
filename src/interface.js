$( document ).ready(function() {

	var thermostat = new Thermostat(), updateDisplay;


	updateDisplay = function (){
		$("#thermostat-temp").text(thermostat.getTemp());
		$("#thermostat-unit").text(thermostat.unit);
	};

	updateDisplay();

});