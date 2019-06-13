$(function() {
  let sqm;
  let adults;
  let kids;
  let percent;
  let yearly;
  let monthly;


  /*$('#addScnt').live('click', function() {
    $('<p><label for="p_scnt"><input type="text" id="p_scnt" size="20" name="p_scnt_' + i +'" value="" placeholder="Input Value" /></label> <a href="#" id="remScnt">Remove</a></p>').appendTo(scntDiv);
    i++;
    return false;
  });*/

  //WORKING
  $('#calcPriceBtn').click(function(){
    clearText();
    calcPrice();
    printResult();
  });

  function clearText(){
    $('#result').empty();
  }

  function calcPrice(){
    sqm = getNum("inputSize");
    console.log("Sqm: "+sqm);
    adults = getNum("inputAdults");
    console.log("Adults: "+adults);
    kids = getNum("inputKids");
    console.log("Kids: "+kids);
    percent = getNum("inputCoverage");
    console.log("Perc: "+percent);
    var totalCost = 0;
    totalCost = (adults*10*12) + (kids*20*12) + 500 + 100;
    if(sqm<50){
      totalCost = (totalCost+600);
    } else if (sqm<150){
      totalCost = (totalCost+900);
    } else {
      totalCost = (totalCost+1200)
    }
    yearly = totalCost*(percent/100);
    monthly = yearly/12;
    $('#monthly').text(monthly);
    $('#yearly').text(yearly);
  }

  function getNum(elemId){
    return parseInt($('#'+elemId).val());
  }

  function printResult(){
    $('#name').text($('#inputName').val() + " " + $('#inputSurname').val());
    $('#addr').text($('#inputAddress').val());
    $('#sqm').text($('#inputSize').val());
    $('#adults').text($('#inputAdults').val());
    $('#kids').text($('#inputKids').val());
    $('#coverage').text($('#inputCoverage').val());
  }

  /*
<li>Name: <span id="name"></span></li>
  <li>Address: <span id="addr"></span></li>
  <li>Apartment size: <span id="sqm"></span></li>
  <li>Adults: <span id="adults"></span></li>
  <li>Kids: <span id="kids"></span></li>
  <li>Coverage percent: <span id="coverage"></span></li>
  </ul>
  <h5>Price estimate</h5>
  <p>Monthly cost: <span id="monthly"></span></p>
  <p>Yearly cost (12*monthly): <span id="yearly"></span></p>
*/


});
