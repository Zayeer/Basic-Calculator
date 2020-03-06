const display = document.querySelector(".screen");
		const numbers = document.querySelectorAll(".number");
		const displayStyle = document.querySelector("span");
		let initialValue = displayStyle.innerHTML;
		const buttons = document.querySelectorAll("button");
		const displayFontStyle = () => display.innerHTML = `<span style="fontSize=2ems"> ${initialValue} </span>`;
		const keyDownStyle = (e) => buttons.forEach((button) => {
			if(button.value == e.key) {
				button.style.setProperty("box-shadow", "0 0 red");
				button.style.setProperty("background-color", "#000");
			}
		});


		const keyUpStyle = (e) => buttons.forEach((button) => {
			if(button.value == e.key) {
				button.style.removeProperty("box-shadow");
				button.style.removeProperty("background-color");
			}
		});

		//event for what we see on display screen after clicking numbers and operator buttons.
		numbers.forEach(number => {
			number.addEventListener("click", () => {
				let nValue = number.value;
				numberClick(nValue); //calls the function to display on the screen 
		});
		});	

		numbers.forEach(number => {		
	   		window.addEventListener("keydown", (e) => {
				if(e.key == number.value) {
					keyDownStyle(event);
					let nValue = number.value;
					numberClick(nValue);
				}
			});
		});

		numbers.forEach(number => {
			window.addEventListener("keyup", (e) => {
				if(e.key == number.value) {
					keyUpStyle(event);
				}
			});
		});

		const numberClick = (numberValue) => {
			if((numberValue.toString() == "0") && (initialValue == "0")) return;
				initialValueStr = initialValue.toString();
				if(initialValueStr == "Error" || initialValueStr == "Infinity") return;
				if((initialValueStr[initialValueStr.length-1].search("\\.") !== -1) && (numberValue == ".")) return;
				if((initialValueStr[initialValueStr.length-1].search(/[\+\-\*\/]/)==0) && (numberValue.search(/[\+\-\*\/]/) == 0)) return;
				if(initialValueStr.search("/d+"))
				if((initialValueStr == "0") && (numberValue == "-")) {
					initialValue = "";
					initialValue = "-";	
					}  
				else if((initialValue.toString().indexOf("0") == 0) && (numberValue.search(/[\/\.]/) == -1) && (initialValueStr[initialValueStr.length-1] !== ".") && (numberValue.search(/[\+\-\*\/]/) == -1) && (initialValueStr[initialValueStr.length-1].search(/[\+\-\*\/]/) == -1)){
					 initialValue = (parseFloat(initialValue) + parseFloat(numberValue)).toString();
				}
				else {
					initialValue = initialValue.toString() + numberValue;
					}

				if(initialValue.toString().search(/\d+\.(\d+.)/) !== -1){
					initialValue = initialValue.toString().replace(/(\.\d+)(\.)/, (match, g1, g2) => g1);
					}      
				display.innerHTML = initialValue;
				displayFontStyle();
			}

		//below code deletes a number each time when clicked over delete button.
		const del = document.querySelector("#delete");
		const delKey = () => {
			let slicedValue = initialValue.toString().slice(0, -1);
			initialValue = slicedValue;
			display.innerHTML = "";
			display.innerHTML = initialValue;	
			if(initialValue == "") {
				initialValue = "0";
				display.innerHTML = initialValue;
				}
			displayFontStyle();			
		}

		del.addEventListener("click", () => delKey());

		window.addEventListener("keydown", (event) => {
			if(event.key == "Backspace") {
				keyDownStyle(event);
				delKey();
			}
		});

		window.addEventListener("keyup", (event) => {
			if(event.key == "Backspace") {
				keyUpStyle(event);
			}
		});

		//below code helps in clearing the display content in the screen to 0 after clicking over AC button
		const allClear = document.querySelector("#clear")
		const clearData = () => {
			initialValue = "0";
			display.innerHTML = initialValue;
			displayFontStyle();
		}

		allClear.addEventListener("click", () => clearData());

		window.addEventListener("keydown", (event) => {
			if(event.key == "Delete") {
				keyDownStyle(event);
				clearData();
			}
		});


		window.addEventListener("keyup", (event) => {
			if(event.key == "Delete") {
				keyUpStyle(event);
			}
		});

		//below code helps in displaying the result of the evaluated math expression one the display screen after clicking "=" button.
		const mathResult = () => {
			initialValueStr = initialValue.toString();
			initialValue = mathOperation(initialValueStr);
			if(initialValue.toString().search(/\./) !== -1) decimalValTest = initialValue.toString().slice(initialValue.toString().indexOf(".")+1,);
			(initialValue.toString().search(/\./) !== -1) && (decimalValTest > 5) ? display.innerHTML = initialValue.toFixed(5) : display.innerHTML = initialValue.toString();
			displayFontStyle();
		}

		equalButton = document.querySelector(".equal");
		equalButton.addEventListener("click", () => mathResult());
		window.addEventListener("keydown", (e) => {
			if((event.key == "Enter") || (event.key == "=")) {
				keyDownStyle(event);
				mathResult();
			}
		});

		window.addEventListener("keyup", (event) => {
			 if((event.key == "Enter") || (event.key == "=")) {
				keyUpStyle(event);
			}		
		});