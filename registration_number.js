module.exports = function regNumbers(registrations){

    function isFromBellville(vehicle){
        if(vehicle = vehicle. startsWith("CA")){
              return true;
        }
        return false;
      }

      function isFromPaarl(vehicle){
        if(vehicle = vehicle.startsWith("CJ")){
          return true;
        }
        return false;
      }

      function isFromCapeTown(vehicle){
        if(vehicle = vehicle.startsWith("CY")){
          return true;
        }
        return false;
      }

      function isFrom(regNum,location){
  
        if(regNum.startsWith(location)){
          return true;
      }
      return false;
        
      }

      function regCheck(regPlates,location){
        var confirm = regPlates.endsWith(location);
               return confirm;
         }


const regNumbersEntered = [];

addRegNumberBtn.addEventListener("click", function() {

	if (regNumberEntered.value == "") {
		req.flash  ("Please enter a registration number");
		return;
	}

	const currentRegnumber = regNumberEntered.value.toUpperCase();

	if (currentRegnumber.startsWith ("CY") ||
		currentRegnumber.startsWith ("CA") ||
		currentRegnumber.startsWith ("CJ")) {

	    message.innerHTML = "";

	if (!regNumbersEntered.includes(currentRegnumber)){

	
	// add these 3 lines

 const regNumberElem = document.createElement("div");
 regNumberElem.classList.add("regNumber");
 regNumberElem.innerHTML = currentRegnumber;
 regNumbers.appendChild(regNumberElem);

 regNumbersEntered.push(currentRegnumber)



	} else {
		req.flash  ("This registration number already exists.");
	}
}else{
	req.flash ("Invalid registration number entered");
}

});


      return {
          isFromBellville,
          isFromCapeTown,
          isFromPaarl,
          isFrom,
          regCheck

      }


}