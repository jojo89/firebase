var myDataRef = new Firebase('https://the-war-room.firebaseio.com/');

function moveSouth(){
  var cell = $('table tr').find('.active')
  var parent = $('table tr').find('.active').parent();
  var index = $('table tr').find('.active').index();
  var nthPlace = index + 1;
  var nextRow = parent.next();
  var nextCell = $(nextRow).find(':nth-child('+ nthPlace +')')
  nextCell.addClass('active')
  cell.removeClass('active')
}  
function moveEast(){
  var cell = $('table tr').find('.active');
  var nextCell = $('table tr').find('.active').next();
  // nextCell.addClass('active')
  var lastChild = $('td').last()
  if(lastChild.hasClass('active') != true){
  	nextCell.addClass('active')
    cell.removeClass('active')
  }
}
function moveWest(){
  var cell = $('table tr').find('.active');
  var nextCell = $('table tr').find('.active').prev();
  var parent = $('table tr').find('.active').parent();
  var firstChild = parent.find(':first-child')
  console.log(firstChild);
  if(firstChild.hasClass('active')){
  console.log("first");
  }else{
  nextCell.addClass('active');
  cell.removeClass('active');
  }
}
function moveNorth(){
  var cell = $('table tr').find('.active')
  console.log(cell);
    var index = $('table tr').find('.active').index()
  var nthPlace = index + 1
  var parent = $('table tr').find('.active').parent();
  var nextRow = parent.prev();
  console.log(nextRow);
  var nextCell = $(nextRow).find(':nth-child('+ nthPlace +')')
  nextCell.addClass('active')
  cell.removeClass('active')
}


myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
});


$(document).ready(function() {
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
// function displayChatMessage(name, text){
// 	$('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
//     $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
// };
// function setText(){
// 	var name = $('#nameInput').val();
// 	var text = $('#messageInput').val();
//     myDataRef.push({name: name, text: text});
// }
