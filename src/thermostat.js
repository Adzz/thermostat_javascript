
function Thermostat(){

	this.temp = 20;
	this.minTemp = 10;
	this.isPowerSaving = true;
	this.unit = "Celsius";


};



Thermostat.prototype.up = function(){
	if(this.temp===this._maxTemp()) throw "It's too hot already!" && alert("It's too hot already!");
	this.temp++;
};


Thermostat.prototype.down = function(){
	if(this.temp===this.minTemp) throw "It's wayyyy too cold for that. Go back to Canada" && alert("It's wayyyy too cold for that. Go back to Canada");
	this.temp--;
};


Thermostat.prototype._maxTemp = function(){
	return this.isPowerSaving ? 25 : 32;
};


Thermostat.prototype.togglePowerSave = function(){
	if(this.isPowerSaving){
		this.isPowerSaving=false;
	} else {
		if (this.temp > 25) this.temp = 25;
		this.isPowerSaving=true;
	} 

};

Thermostat.prototype.resetTemp = function() {
	this.temp = 20;
};

Thermostat.prototype.displayColour = function() {
	if(this.temp>=25){
		return "red";
	} else {
		return "blue";
	}
};

Thermostat.prototype.toggleUnits = function() {
	if(this.unit==="Celsius"){
		this.unit = "Fahrenheit";
	} else if(this.unit==="Fahrenheit") {
		this.unit = "Kelvin";
	} else {
		this.unit="Celsius";
	}
};



Thermostat.prototype.getTemp = function() {
	if (this.unit==="Celsius") {
		return this.temp;
	} else if (this.unit==="Fahrenheit") {
		return Math.round(this.temp*1.8+32);
	} else {
		return Math.round(this.temp+273.15);
	}
}


