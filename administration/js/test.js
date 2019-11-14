$(function() {
  $('#calcPriceBtn').click(function(){
    clearText();
    calcPrice();
    printResult();
  });

  function clearText(){
    $('#result').empty();
  }

  function calcPrice(){
    const sqm = getNum("inputSize");
    var percent = getNum("inputCoverage");
    var totalCost = getTotalCost();
    if(sqm<50){
      totalCost = (totalCost+600);
    } else if (sqm<150){
      totalCost = (totalCost+900);
    } else {
      totalCost = (totalCost+1200)
    }
    if (percent === 25) {
      percent = 20
    }
    $('#monthly').text((totalCost*(percent/100)/12));
    $('#yearly').text(totalCost*(percent/100));
  }

  function getTotalCost(){
    var a = getNum("inputAdults");
    if(a>3)a++;
    return (a * 10 * 12) + (getNum("inputKids") * 20 * 12) + 500 + 100;
  }

  function getNum(elemId){
    return parseInt($('#'+elemId).val());
  }

  function printResult(){
    $('#name').text($('#inputName').val() + " " + $('#inputSurname').val());
    $('#addr').text($('#inputAddress').val().substring(0,($('#inputAddress').val().length-1)));
    $('#sqm').text($('#inputSize').val());
    $('#adults').text($('#inputAdults').val());
    $('#kids').text($('#inputKids').val());
    $('#coverage').text($('#inputCoverage').val());
  }
});
