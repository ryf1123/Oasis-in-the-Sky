/*
 * By ForMaLIN
 */

var myAnti_Jitter = (function (){
	function myAnti_Jitter( bound ){
		this.bound = bound;
		this.counter = null;
	}

	myAnti_Jitter.prototype.set = function( update ){
		this.bound = update;
	}

	myAnti_Jitter.prototype.clear = function() {
		this.counter = 0;
	}

	myAnti_Jitter.prototype.count = function() {
		this.counter++;
		if(this.counter >= this.bound){
			this.counter = 0;
			return true;
		}
		else
			return false;
	};
	return myAnti_Jitter;
})()