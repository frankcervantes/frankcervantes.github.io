$(document).ready(function(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var WIDTH = 1280;
  var HEIGHT = 555;
  var articles = [];
  var total;
  var total_1;

  $("#search").click(function(e) {
    console.log($('#search_1').val(),$('#search_2').val())
      var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
        'api-key': "a535845b830a4944ac2237c8839f0267",
        'q': $('#search_1').val(),
        'begin_date': "20000101",
        'end_date': "20161231"
      });
      var url_1 = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url_1 += '?' + $.param({
        'api-key': "a535845b830a4944ac2237c8839f0267",
        'q': $('#search_2').val(),
        'begin_date': "20000101",
        'end_date': "20161231"
      });
      $.when(
        $.ajax({
              url: url,
              method: 'GET',
              dataType: 'json',
          }).done(function(result) {
            console.log(result)
            total = result.response.meta.hits
            //**********************SECOND REQUEST*************************
            $.ajax({
                url: url_1,
                method: 'GET',
                dataType: 'json',
            }).done(function(result) {
              console.log(result)
              total_1 = result.response.meta.hits
              draw(total,total_1);
            }).fail(function(err) {
                throw err;
            })
            //*************************************************************
          }).fail(function(err) {
              throw err;
          })
      )
  });

  function draw(total,total_1){
    console.log($('#search_1').val(),total,total_1)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    var lastend = 0;
    var data = [total, total_1]; // If you add more data values make sure you add more colors
    var myTotal = 0; // Automatically calculated so don't touch
    var myColor = ['#e74c3c', '#3498db']; // Colors of each slice

    for (var e = 0; e < data.length; e++) {
      myTotal += data[e];
    }
    for (var i = 0; i < data.length; i++) {
      ctx.fillStyle = myColor[i];
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
      ctx.font = "30px Arial";
      if(i == 0){
        ctx.fillText($('#search_1').val() + ":",i * 175 + 40,100);
        ctx.fillText(data[i],i * 175 + 40,150);
      }else{
        ctx.fillText($('#search_2').val() + ":",i * 175 + 40,100);
        ctx.fillText(data[i],i * 175 + 40,150);
      }
      ctx.arc(canvas.width / 2, canvas.height / 2, 200, lastend, lastend + (Math.PI * 2 * (data[i] / myTotal)), false);
      ctx.lineTo(canvas.width / 2, canvas.height / 2);
      ctx.fill();
      lastend += Math.PI * 2 * (data[i] / myTotal);
    }
  }


});
