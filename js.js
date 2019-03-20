$( document ).ready(function() {
    console.log( "ready!" );
    $("#skilllist").attr("href", "http://hoff.is/knowledgeable/in/this");
    $("#whoami").attr("href", "http://hoff.is/who");
	$("#whatami").attr("href", "http://hoff.is/")
});

function whatami(){
	var skills =[	"awesome",
					"knowledgeable/in/teaching",
					"knowledgeable/in/selenium",
					"knowledgeable/in/restassured",
					"knowledgeable/in/java",
					"knowledgeable/in/javascript",
          "testautomater"
				];

	var randNum = Math.floor(Math.random()*skills.length);
	while(window.location.href.endsWith(skills[randNum])){
		randNum = Math.floor(Math.random()*skills.length);
	}
	window.location.href = "http://hoff.is/"+skills[randNum];
}
