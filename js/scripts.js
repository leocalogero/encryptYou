$(document).ready(function() {
	// $("#input-field").keyup(encodedOutput);
	var shiftId;
	var shiftNum;
	var container = $("#container");
	// Shuffle the contents of container
	shuffleAnim();

	function shuffleAnim() {
		container.shuffleLetters();
	}

	function loadAnim() {
		$(".loadscreen").shuffleLetters();
	}

	setTimeout(function () {
		$(".section__header button").css("opacity", "1");
	}, 800);

	setInterval(shuffleAnim, 4500);
	//Shuffle animation for intro to repeat


	//When clicking an img remove states and scramble the text
	$("#first_pick img").on("click", function(){
		shiftId = $(this).attr("src").match(/\d+/);
		shiftNum = Number(shiftId);
		var removeStates = $(".page").removeClass("active slide__right slide__left slide__up slide__down");
		scramble();
		removeStates;
		$("ul li").removeClass("active");
		$(".nav__secret").addClass("active");
     	$(".three").addClass("active");
     	$(".three").addClass("slide__left");

     	//Textarea will show after animating the text
     	$(".copyboard").addClass("not_visible");
     	$("#output-field, .btn__container").addClass("not_visible");
     	$(".text-container h2, .text-container h3").shuffleLetters();
     	setTimeout( function() {
     		$("#output-field, .btn__container").removeClass("not_visible")
     	},1000)
	});

	function scramble() {
		var inputStr = $("#input-field").val();
		var wordArr = inputStr.split("");
		var arrLength = wordArr.length;
		var scrambledArr = [];
		var shift = shiftNum;
		var emptySpace = 32; // so it does not shift empty spaces

		//Turns each string in array into a charcode on the keyboard.
		for (var i = 0; i < arrLength; i++){
			var wordCode = wordArr[i].charCodeAt();	
			scrambledArr.push(wordCode);
		};

		//Shifts array according to key
		var inputmix = scrambledArr.map(function(n){
			if (shift > 26) {    //makes it soo it loops the alphabet for one rotation.
				shift = shift - 26;
			}
			//shifts
			var updatedShift = n + shift;
				if ((updatedShift-shift) === emptySpace || n >= 91 && n <= 96 ){ 
					  return n;
					} else if ( n <= 90 && n >= 65 && updatedShift <= 90) {
						return updatedShift;
					} else if ( n <= 90 && n >= 65 && updatedShift > 90) {
						return (updatedShift - 91) + 65; //Loops back from Z to A
					} else if ( n >= 97 && n <= 122 && updatedShift > 122) {
						return (updatedShift - 123) + 97; //Loops back from a - z if passes its unicode
					} else if ( n <= 64 && n >= 33 && updatedShift >= 65) {
						return (updatedShift - 65) + 33;
					} else {
						return updatedShift;  //Gives new unicode if it can successfully go to z without looping
					}
			});
		var word = inputmix.map( function (n) {
			return word = String.fromCharCode(n);
		})
		var finalWord = word.join("");
		//Outputs final results of the scramble
		$("#output-field").val(finalWord);
	};

	function unscramble() {
		var inputStr = $("#decode-field").val();
		var wordArr = inputStr.split("");
		var arrLength = wordArr.length;
		var scrambledArr = [];
		var shift = shiftNum;
		var emptySpace = 32; // so it does not shift empty spaces

		for (var i = 0; i < arrLength; i++){
			var wordCode = wordArr[i].charCodeAt();	
			scrambledArr.push(wordCode);
		};


		var inputmix = scrambledArr.map(function(n){
			if (shift > 26) {    //makes it soo it loops the alphabet for one rotation.
				shift = shift - 26;
			}
			var updatedShift = n - shift;
				if ((updatedShift+shift) === emptySpace || n>=91 && n<=96){ 
					  return n;
					} else if ( n <= 90 && n >= 65 && updatedShift >= 65) {
						return updatedShift;
					} else if ( n <= 90 && n >= 65 && updatedShift < 65) {
						return (updatedShift - 65) + 91; //Loops back from Z to A
					} else if ( n >= 97 && n <= 122 && updatedShift < 97) {
						return (updatedShift - 97) + 123; //Loops back from a - z if passes its unicode
					} else if ( n <=64 && n>= 33 && updatedShift < 33) {
						return (updatedShift - 33) + 65;
					} else {
						return updatedShift;  //Gives new unicode if it can successfully go to z without looping
					}
			});
		var word = inputmix.map( function (n) {
			return word = String.fromCharCode(n);
		})
		var finalWord = word.join("");
		
		$("#decrypt-field").val(finalWord);
	};

	$(".logo").on('click', function() {
	   	$(".page, .nav__links li").removeClass("active slide__right slide__left slide__up slide__down");
	});

	//Removes all states of the current item.
	var removeStates = $(".page").removeClass("active slide__right slide__left slide__up slide__down");

	$('nav li').on('click', function(){
      	removeStates = $(".page").removeClass("active slide__right slide__left slide__up slide__down");
        $("nav li").removeClass("active");
        $(this).addClass("active");
        if($(this).hasClass("nav__pick")) {
         	removeStates;
         	$(".two").addClass("active");
         	$(".two").addClass("slide__right");
	    } else if ($(this).hasClass("nav__secret")) {
	    	removeStates;
         	$(".three").addClass("active");
         	$(".three").addClass("slide__left");
         	//Copy to clipboard is hidden until the submit button is pressed.
         	$(".copyboard").addClass("not_visible");

         	//Textarea will show after 1 sec to let animation play out
         	$("#output-field, .btn__container").addClass("not_visible");
         	$(".text-container h2, .text-container h3").shuffleLetters();
         	setTimeout( function() {
         		$("#output-field, .btn__container").removeClass("not_visible")
         	},1000)

	    } else if ($(this).hasClass("nav__decode")) {
	    	removeStates;
         	$(".four").addClass("active");
         	$(".four").addClass("slide__up");
         	//Prevents spamming of the decode nav btn for the animation to run smoothly
         	if ($(".loadscreen").css("display") == "none") {
         		$(".loadscreen").fadeIn(1);
         	}
         	loadAnim(); //Plays loading animation
         	$(".loadscreen").delay(1200).fadeOut(800);
         	$(".decode__text__container").addClass("not_visible");
         	if ($("#decode-cohort15").hasClass("not_visible")) {
         		$("#decode-cohort15").removeClass("not_visible").addClass("visible");
         	}
         	$("#decode-field, #decrypt-field").val("");
        } else {
        	removeStates;
         	$(".one").addClass("active");
         	$(".one").addClass("slide__down");
        }
	});

	$(".next-btn").on('click', function() {
		    removeStates;
		    $(".nav__write").addClass("active");
         	$(".one").addClass("active");
         	$(".one").addClass("slide__down");
	})


	$(".decode-btn").on('click', function() {

	    $("#output-field").select();
     	document.execCommand('copy');   // Copies encrypted text to clip board
     	$(".copyboard").removeClass("not_visible").addClass("visible");
     	//if decode button from intro is pressed run without delay
     	if ($(this).hasClass("header__button")) {
     		$("ul li").removeClass("active");
			removeStates;
			$(".nav__decode").addClass("active");
         	$(".four").addClass("active");
         	$(".four").addClass("slide__up");
         	$("#decode-field, #decrypt-field").val("");
         	if ($(".loadscreen").css("display") == "none") {
         		$(".loadscreen").fadeIn(1)
         	}
         	loadAnim();
         	$(".loadscreen").delay(1200).fadeOut(800);
         	$(".loadscreen").fadeOut(3100);

         	if ($("#decode-cohort15").hasClass("not_visible")) {
         		$("#decode-cohort15").removeClass("not_visible").addClass("visible");
         	}
         	$(".decode__text__container").addClass("not_visible");
     	}
		//Copies text and then send to next page after 1 sec
		setTimeout( function() {
			$("ul li").removeClass("active");
			removeStates;
			$(".nav__decode").addClass("active");
         	$(".four").addClass("active");
         	$(".four").addClass("slide__up");
         	$("#decode-field, #decrypt-field").val("");
         	if ($(".loadscreen").css("display") == "none") {
         		$(".loadscreen").fadeIn(1)
         	}
         	loadAnim();
         	$(".loadscreen").delay(1170).fadeOut(800);
         	$(".loadscreen").fadeOut(3100);

         	if ($("#decode-cohort15").hasClass("not_visible")) {
         		$("#decode-cohort15").removeClass("not_visible").addClass("visible");
         	}
         	$(".decode__text__container").addClass("not_visible");
		},1000)
	})

	$(".key-btn").on('click', function(){
			$("ul li").removeClass("active");
			removeStates;
			$(".nav__pick").addClass("active");
         	$(".two").addClass("active");
         	$(".two").addClass("slide__right");
	})

	$('#decode-cohort15 img').on('click',function () {
		//grabs the key from the img from filepath.
		shiftId = $(this).attr("src").match(/\d+/);
		shiftNum = Number(shiftId);
		var keyPicked = $(this).attr("src");
		$("#key__img").attr("src", keyPicked);
		$("#decode-cohort15").addClass("not_visible");
		$(".decode__text__container").removeClass("not_visible").addClass("visible");
	})


	$(".share").on('click', function(){
		var twitText = $("#output-field").val();
		$(".share").attr('href', `https://twitter.com/intent/tweet?text=${twitText} @DecryptYOU`);
	})

	$('#decode-field').keyup(unscramble)
});


//disables tab from jumping around the page.
$(document).keydown(function(objEvent) {
    if (objEvent.keyCode == 9) {  //when tab is pressed, it does not do anything
        objEvent.preventDefault(); // stops tab from working;
    }
})
