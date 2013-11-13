var myDataRef = new Firebase('https://the-war-room.firebaseio.com/');
function moveEast(){
  var cell = $('table tr').find('.active');
  var nextCell = $('table tr').find('.active').next();
  var parent = $('table tr').find('.active').parent();
  var lastChild = parent.find(':last-child');
  if(lastChild.hasClass('active')){
  }else{
   if(nextCell.hasClass('point')){
       nextCell.removeClass('point') ;
       cell.removeClass('active'); 
       nextCell.addClass('player1score');
       nextCell.addClass('active');
    }else{
      nextCell.addClass('active');
      cell.removeClass('active');
    }
  }
}

function moveWest(){
  var cell = $('table tr').find('.active');
  var nextCell = $('table tr').find('.active').prev();
  var parent = $('table tr').find('.active').parent();
  var firstChild = parent.find(':first-child')
  console.log(firstChild);
  if(firstChild.hasClass('active')){
  }else{
   if(nextCell.hasClass('point')){
       nextCell.removeClass('point') ;
       cell.removeClass('active'); 
       nextCell.addClass('player1score');
       nextCell.addClass('active');
    }else{
      nextCell.addClass('active');
      cell.removeClass('active');
    }
  }
}

function moveSouth(){
  var cell = $('table tr').find('.active')
  var parent = $('table tr').find('.active').parent();
  var index = $('table tr').find('.active').index();
  var nthPlace = index + 1;
  var nextRow = parent.next();
  var nextCell = $(nextRow).find(':nth-child('+ nthPlace +')')
  var mid = $('tbody').find('tr:last-child')
  var bottom = $('tbody').find('tr:last-child').index()
  if(parent.index()==bottom){
  }else{    
     if(nextCell.hasClass('point')){
       nextCell.removeClass('point') ;
       cell.removeClass('active'); 
       nextCell.addClass('player1score');
       nextCell.addClass('active');
    }else{
      nextCell.addClass('active');
      cell.removeClass('active');
    }
  }
}  
function moveNorth(){
  var cell = $('table tr').find('.active');
  var index = $('table tr').find('.active').index();
  var nthPlace = index + 1
  var parent = $('table tr').find('.active').parent();
  var nextRow = parent.prev();
  var nextCell = $(nextRow).find(':nth-child('+ nthPlace +')');
  
  if(parent.index() == 0){
    console.log("top")
  }else{
    if(nextCell.hasClass('point')){
      nextCell.removeClass('point');
      cell.removeClass('active');  
      nextCell.addClass('player1score');
      nextCell.addClass('active');
    }else{
      nextCell.addClass('active');
      cell.removeClass('active');
    }
  }
}

function randomTd(){
  var bottom = $('tbody').find('tr:last-child').index() + 1;
  var randomRowNumber = Math.floor((Math.random()*bottom)+1)
  var randomRow = $('tbody').find('tr:nth-child('+ randomRowNumber +')');
  var length=randomRow.find(':last-child').index() + 1;
  var randomColNumber=Math.floor((Math.random()*length)+1);
  console.log(randomColNumber)
  var pointer = randomRow.find(':nth-child('+ randomColNumber+')');
  pointer.addClass('point');

  setInterval(function(){
    if(pointer.hasClass('player1score')== false){
      if(pointer.css("background-color") == "rgb(255, 165, 0)" ){
        pointer.css("background-color","yellow");
      }else{
        pointer.css("background-color","orange");
      }
    }else{
         pointer.removeAttr('style');
    }  
  },300);
}




// myDataRef.on('child_added', function(snapshot) {
//   var message = snapshot.val();
// });


$(document).ready(function() {
  setInterval(function(){
    randomTd();
  },3000)
	$(document).keyup(function (e) {
        if (e.keyCode == 40) {
          moveSouth();
       }
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 38) {
          moveNorth();
       }
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 39) {
          moveEast();
       }
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 37) {
          moveWest();
       }
    });
});



function displayChatMessage(name, text){
	$('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};
function setText(){
	var name = $('#nameInput').val();
	var text = $('#messageInput').val();
    myDataRef.push({name: name, text: text});
}
