

var myDataRef = new Firebase('https://bemorecareful.firebaseio.com/');

function moveNorthInfo(){
  var index = $('table tr').find('.active').index();
  var nthPlace = index + 1
  var parentIndex = $('table tr').find('.active').parent().index();
  var parent = $('table tr').find('.active').parent()
  var nextRow = parent.prev().index();
  var nextCell = $(nextRow).find(':nth-child('+ nthPlace +')');
  myDataRef.push({from:"north",cellIndex: index, nextCell: nthPlace, parentIndex:parentIndex,nextRowIndex:nextRow})
}


function north(data){
  var parent = $('table').find( 'tr:eq('+data.parentIndex+')' )
  var cellNumber = data.cellIndex + 1;
  var cell = parent.find('td:nth-child('+ cellNumber +')');
  var nextRow = parent.prev()
  var nextCell = $(nextRow).find(':nth-child('+ cellNumber +')')
  if(parent.index() == 0){
    console.log("top")
  }
  else
  {
    if(nextCell.hasClass('point')){
      nextCell.removeClass('point');
      cell.removeClass('active');  
      nextCell.addClass('player1score');
      nextCell.addClass('active');
    }
    else
    {
      nextCell.addClass('active');
      cell.removeClass('active');
    }
  }
}


function moveSouthInfo(){
  var cell = $('table tr').find('.active').index();
  var parentIndex = $('table tr').find('.active').parent().index();
  var parent = $('table tr').find('.active').parent()
  var nthPlace = cell + 1;
  var nextRowIndex = parent.next().index();
  var nextRow = parent.next();
  var nextCell = $(nextRow).find(':nth-child('+ nthPlace +')')
  var mid = $('tbody').find('tr:last-child')
  var bottom = $('tbody').find('tr:last-child').index()
  myDataRef.push({from:"south",cellIndex: cell, nextRowIndex: nextRowIndex, parentIndex:parentIndex,nthPlace: nthPlace})
}
function south(data){
  var parent = $('table').find( 'tr:eq('+data.parentIndex+')' )
  var cellNumber=data.cellIndex + 1
  var cell = parent.find('td:nth-child('+ cellNumber +')');
  var nextRow = parent.next()
  var nextCell = $(nextRow).find(':nth-child('+ cellNumber +')')
  var bottom = $('tbody').find('tr:last-child').index()
  //South
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

function moveEastInfo(){
  var cell = $('table tr').find('.active').index();
  var nextCell = $('table tr').find('.active').next().index();
  var parent = $('table tr').find('.active').parent()
  var parentIndex = $('table tr').find('.active').parent().index();
  var lastChild = parent.find(':last-child');
  myDataRef.push({from:"east", cellIndex: cell, nextCellIndex: nextCell, parentIndex:parentIndex});
}

function east(data){
  var parent = $('table').find( 'tr:eq('+data.parentIndex+')' );
  var cellNumber=data.cellIndex + 1;
  var cell = parent.find('td:nth-child('+ cellNumber +')');
  var nextCell = cell.next()
  var lastChild = parent.find(':last-child');
  if(lastChild.hasClass('active')){
    
  }
  else{
   if(nextCell.hasClass('point')){
       nextCell.removeClass('point') ;
       cell.removeClass('active'); 
       nextCell.addClass('player1score');
       nextCell.addClass('active');
    }
    else{
      nextCell.addClass('active');
      cell.removeClass('active');
    }
  }
}


function moveWestInfo(){
  var cell = $('table tr').find('.active').index();
  var nextCell = $('table tr').find('.active').prev().index();
  var parent = $('table tr').find('.active').parent();
  var parentIndex = $('table tr').find('.active').parent().index();
  var firstChild = parent.find(':first-child')
  myDataRef.push({from:"west",cellIndex: cell, nextCellIndex: nextCell, parentIndex: parentIndex})
}

function west(data){
  var parent = $('table').find( 'tr:eq('+data.parentIndex+')' );
  var cellNumber=data.cellIndex + 1;
  var cell = parent.find('td:nth-child('+ cellNumber +')');
  var nextCell = cell.prev();
  var firstChild = parent.find(':first-child');
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
    console.log(cell)
    cell.addClass('point');
    if(cell.hasClass('player1score')== false){
      if(cell.css("background-color") == "rgb(255, 165, 0)" ){
        console.log(cell.css("background-color"));
        cell.css("background-color","yellow");
      }
      else
      {
        cell.css("background-color","orange");
      }
    }
    // else
    // {
    //      cell.removeAttr('style');
    // }  
}







$(document).ready(function() {
 
  
  setInterval(function(){
    randomTd();
  },3000)
  $(document).keyup(function (e) {
        if (e.keyCode == 40) {
          moveSouthInfo();
       }
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 38) {
          moveNorthInfo();
       }
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 39) {

          moveEastInfo();
       }
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 37) {
          moveWestInfo();
       }
    });

  myDataRef.on('child_added', function(snapshot) {
    var data = snapshot.val()
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
    else{
       rando(data);
    }
  });
});





