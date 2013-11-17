

var myDataRef = new Firebase('https://bemorecareful.firebaseio.com/');

function moveNorthInfo(playerNumber){
  var index = $('table tr').find(active).index();
  var nthPlace = index + 1
  var parentIndex = $('table tr').find(active).parent().index();
  var parent = $('table tr').find(active).parent()
  var nextRow = parent.prev().index();
  var nextCell = $(nextRow).find(':nth-child('+ nthPlace +')');
  myDataRef.push({player:playerNumber,from:"north",cellIndex: index, nextCell: nthPlace, parentIndex:parentIndex,nextRowIndex:nextRow})
}


function north(data){
  var parent = $('table').find( 'tr:eq('+data.parentIndex+')' )
  var cellNumber = data.cellIndex + 1;
  var cell = parent.find('td:nth-child('+ cellNumber +')');
  var nextRow = parent.prev()
  var nextCell = $(nextRow).find(':nth-child('+ cellNumber +')')
  if(parent.index() == 0){
  }
  else
  {
    if(nextCell.hasClass('point')){
      nextCell.removeClass('point');
      cell.removeClass(classString);  
      nextCell.addClass(score);
      nextCell.addClass(classString);
    }
    else
    {
      nextCell.addClass(classString);
      cell.removeClass(classString);
    }
  }
}


function moveSouthInfo(playerNumber){
  var cell = $('table tr').find(active).index();
  var parentIndex = $('table tr').find(active).parent().index();
  var parent = $('table tr').find(active).parent()
  var nthPlace = cell + 1;
  var nextRowIndex = parent.next().index();
  var nextRow = parent.next();
  var nextCell = $(nextRow).find(':nth-child('+ nthPlace +')')
  var mid = $('tbody').find('tr:last-child')
  var bottom = $('tbody').find('tr:last-child').index()
  myDataRef.push({player:playerNumber,from:"south",cellIndex: cell, nextRowIndex: nextRowIndex, parentIndex:parentIndex,nthPlace: nthPlace})
}
function south(data){
  var parent = $('table').find( 'tr:eq('+data.parentIndex+')' )
  var cellNumber=data.cellIndex + 1
  var cell = parent.find('td:nth-child('+ cellNumber +')');
  var nextRow = parent.next()
  var nextCell = $(nextRow).find(':nth-child('+ cellNumber +')')
  var bottom = $('tbody').find('tr:last-child').index()
  if(parent.index()==bottom){
  }else{    
     if(nextCell.hasClass('point')){
       nextCell.removeClass('point') ;
       cell.removeClass(classString); 
       nextCell.addClass(score);
       nextCell.addClass(classString);
    }else{
      nextCell.addClass(classString);
      cell.removeClass(classString);
    }
  }
}

function moveEastInfo(playerNumber){
  var cell = $('table tr').find(active).index();
  var nextCell = $('table tr').find(active).next().index();
  var parent = $('table tr').find(active).parent()
  var parentIndex = $('table tr').find(active).parent().index();
  var lastChild = parent.find(':last-child');
  myDataRef.push({player:playerNumber,from:"east", cellIndex: cell, nextCellIndex: nextCell, parentIndex:parentIndex});
}

function east(data){
  var parent = $('table').find( 'tr:eq('+data.parentIndex+')' );
  var cellNumber=data.cellIndex + 1;
  var cell = parent.find('td:nth-child('+ cellNumber +')');
  var nextCell = cell.next()
  var lastChild = parent.find(':last-child');
  if(lastChild.hasClass(classString)){
    
  }
  else{
   if(nextCell.hasClass('point')){
       nextCell.removeClass('point') ;
       cell.removeClass(classString); 
       nextCell.addClass(score);
       nextCell.addClass(classString);
    }
    else{
      nextCell.addClass(classString);
      cell.removeClass(classString);
    }
  }
}


function moveWestInfo(playerNumber){
  console.log(active)
  var cell = $('table tr').find(active).index();
  console.log(cell)
  var nextCell = $('table tr').find(active).prev().index();
  var parent = $('table tr').find(active).parent();
  var parentIndex = $('table tr').find(active).parent().index();
  var firstChild = parent.find(':first-child')
  myDataRef.push({player:playerNumber,from:"west",cellIndex: cell, nextCellIndex: nextCell, parentIndex: parentIndex})
}

function west(data){
  var parent = $('table').find( 'tr:eq('+data.parentIndex+')' );
  var cellNumber=data.cellIndex + 1;
  var cell = parent.find('td:nth-child('+ cellNumber +')');
  var nextCell = cell.prev();
  var firstChild = parent.find(':first-child');
  if(firstChild.hasClass(classString)){
  }else{
   if(nextCell.hasClass('point')){
       nextCell.removeClass('point') ;
       cell.removeClass(classString); 
       nextCell.addClass(score);
       nextCell.addClass(classString);
    }else{
      nextCell.addClass(classString);
      cell.removeClass(classString);
    }
  }
}



function randomTd(){
  var bottom = $('tbody').find('tr:last-child').index() + 1;
  var randomRowNumber = Math.floor((Math.random()*bottom)+1)
  var randomRow = $('tbody').find('tr:nth-child('+ randomRowNumber +')');
  var length=randomRow.find(':last-child').index() + 1;
  var randomColNumber=Math.floor((Math.random()*length)+1);
  myDataRef.push({randCol:randomColNumber, randRow: randomRowNumber});
}

function rando(data){
    var parent = $('table').find( 'tr:eq('+data.randRow+')' );
    var cell = parent.find('td:nth-child('+ data.randCol +')');
    cell.addClass('point');
    setInterval(function(){
      if(cell.hasClass('active1') || cell.hasClass('active2' == false)){
      if(cell.css("background-color") == "rgb(255, 165, 0)" ){
        cell.css("background-color","yellow");
      }else{
        cell.css("background-color","orange");
      }
    }else{
         cell.removeAttr('style');
    }  
  },300);
}

function setupBoard(playerNumber){
    myDataRef.push({set:playerNumber})
}
 






$(document).ready(function() {
  myDataRef.remove();
  var playerNumber = $('.number').text();
  setupBoard(playerNumber);
  setInterval(function(){
    randomTd();
  },3000)
  $(document).keyup(function (e) {
        if (e.keyCode == 40) {
          moveSouthInfo(playerNumber);
       }
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 38) {
          moveNorthInfo(playerNumber);
       }
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 39) {

          moveEastInfo(playerNumber);
       }
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 37) {
          moveWestInfo(playerNumber);
       }
    });

  myDataRef.on('child_added', function(snapshot) {
    var data = snapshot.val()
    if(data.player == 1)
    {
    active='.active1'
    score='player1score'
    classString='active1'
    }
    else
    {
    active='.active2'
    score='player2score'
    classString='active2'
    }
    if (snapshot.val().from == "south"){

      south(data);
    }
    else if(snapshot.val().from == "north"){

      north(data); 
    }
    else if(snapshot.val().from == "east"){

      east(data);
    }
    else if(snapshot.val().from == "west"){

      west(data);
    }
    else if(data.set == 1 ){
      var row = $('table tr').first();
      row.find('td:first-child').addClass('active1')
    }
    else if(data.set == 2 ){
      var row = $('table tr').last();
      row.find('td:last-child').addClass('active2')
    }
    else
    {
       rando(data);
    }
  });
});





