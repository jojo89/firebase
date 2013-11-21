var myDataRef = new Firebase('https://bemorecareful.firebaseio.com/');


function setter(playerNumber){
  if(playerNumber == 1)
  {
     active = '.active1'
  }
  else if(playerNumber == 2)
  {
    active = '.active2'
  }
}

function moveNorthInfo(playerNumber){
  setter(playerNumber);
  var index = $('table tr').find(active).index();
  var nthPlace = index + 1
  var parentIndex = $('table tr').find(active).parent().index();
  var parent = $('table tr').find(active).parent()
  var nextRow = parent.prev().index();
  var nextCell = $(nextRow).find(':nth-child('+ nthPlace +')');
  myDataRef.push({player:playerNumber,from:"north",cellIndex: index, nextCell: nthPlace, parentIndex:parentIndex,nextRowIndex:nextRow})
}

function moveSouthInfo(playerNumber){
  setter(playerNumber);
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
function moveWestInfo(playerNumber){
  setter(playerNumber);
  var cell = $('table tr').find(active).index();
  var nextCell = $('table tr').find(active).prev().index();
  var parent = $('table tr').find(active).parent();
  var parentIndex = $('table tr').find(active).parent().index();
  var firstChild = parent.find(':first-child')
  myDataRef.push({player:playerNumber,from:"west",cellIndex: cell, nextCellIndex: nextCell, parentIndex: parentIndex})
}
function moveEastInfo(playerNumber){
  setter(playerNumber);
  var cell = $('table tr').find(active).index();
  var nextCell = $('table tr').find(active).next().index();
  var parent = $('table tr').find(active).parent()
  var parentIndex = $('table tr').find(active).parent().index();
  var lastChild = parent.find(':last-child');
  myDataRef.push({player:playerNumber,from:"east", cellIndex: cell, nextCellIndex: nextCell, parentIndex:parentIndex});
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
      scoreKeeper(data);
    }
    else
    {
      nextCell.addClass(classString);
      cell.removeClass(classString);
    }
  }
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
       scoreKeeper(data);
    }else{
      nextCell.addClass(classString);
      cell.removeClass(classString);
    }
  }
}


function checker(){
  var firstRow = $('table tr').first();
  var currentCell = firstRow.find('td:first-child')
  var lastRow = $('table tr').last();
  var lastChild = lastRow.find('td:last-child')
  while(currentCell.hasClass('player1score') || currentCell.hasClass('player2score')){
      if(currentCell.is(':last-child'))
      {
        var parent = currentCell.parent().index(); 
        if(currentCell.index() == lastChild.index() && lastRow.index() == parent)
        {
          $('tbody').hide()
          break

        }
        else
        {  
          var firstRow = firstRow.next();
          var currentCell = firstRow.find('td:first-child');
        }
      }
      else
      {
        var currentCell = currentCell.next();
        var parent = currentCell.parent().index(); 
      }
  }
}



function scoreKeeper(data){
  if(data.player == 1)
  {
    score1 = score1 + 1
    $("#player1").html(score1)
  }
  else if(data.player == 2)
  {
    score2= score2 + 1
    $("#player2").html(score1)
  }  
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
       scoreKeeper(data);
       console.log(score1);

    }
    else{
      nextCell.addClass(classString);
      cell.removeClass(classString);
    }
  }
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
       scoreKeeper(data);
    }
    else
    {
      nextCell.addClass(classString);
      cell.removeClass(classString);
    }
  }
}

function randomTd(){
  var bottom = $('tbody').find('tr:last-child').index() + 1;
  var randomRowNumber = Math.floor((Math.random()*bottom))
  var randomRow = $('tbody').find('tr:nth-child(1)');
  var length=randomRow.find(':last-child').index() + 1;
  var randomColNumber=Math.floor((Math.random()*length)+1);
  myDataRef.push({randCol:randomColNumber, randRow: randomRowNumber});
}

function rando(data){
    var parent = $('table').find( 'tr:eq('+data.randRow+')' );
    var cell = parent.find('td:nth-child('+ data.randCol +')');
    var statusSquare = cell.hasClass('player1score') == false && cell.hasClass('player2score') == false;
    if(statusSquare){
      cell.addClass('point');
      flasherTd(cell);
    }  
}

function setupBoard(playerNumber){
    myDataRef.push({set:playerNumber})
}

function findDirection(data){
    if (data.from == "south"){

      south(data);
    }
    else if(data.from == "north"){

      north(data); 
    }
    else if(data.from == "east"){

      east(data);
    }
    else if(data.from == "west"){

      west(data);
    }
}

 
function flasherTd(cell){
      setInterval(function(){
        if(cell.hasClass('player2score') == false && cell.hasClass('player1score') == false)
        {
          if(cell.css("background-color") == "rgb(255, 165, 0)" )
          {
            cell.css("background-color","yellow");
          }
          else
          {
            cell.css("background-color","rgb(255, 165, 0)");
          }
        }
        else
        {
         cell.removeAttr('style');
        }  
      },300);   
}   

$(document).ready(function() {
  myDataRef.remove();

  var playerNumber = $('.number').text();

  setupBoard(playerNumber);
  setInterval(function(){
    randomTd();
  },100)

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
      checker()
        if (e.keyCode == 37) {
          moveWestInfo(playerNumber);
       }
    });

  myDataRef.on('child_added', function(snapshot) {
    var data = snapshot.val();
    if(data.player == 1)
    {
      active='.active1'
      score='player1score'
      classString='active1'
      findDirection(data);
    }
    else if(data.player == 2)
    {
      active='.active2'
      score='player2score'
      classString='active2'
      findDirection(data);
    }
    else if(data.set == 1 ){
      var row = $('table tr').first();
      row.find('td:first-child').addClass('active1')
      score1 = 0
    }
    else if(data.set == 2 ){
      var row = $('table tr').last();
      row.find('td:last-child').addClass('active2')
      score2 = 0
    }
    else
    {
       rando(data);
    }
  });
});





