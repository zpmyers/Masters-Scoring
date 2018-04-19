var teams = [
    {
        'teamName': "ARNdrea's ARMY",
	'owner': 'Andrea',
	'player1': 'Jordan Spieth',
	'player2': 'Justin Rose',
	'player3': 'Rory McIlroy',
	'player4': 'Adam Scott',
	'alt1': 'Dustin Johnson',
	'alt2': 'Matt Kuchar',
	'thurScore': '0',
	'friScore': '0',
	'satScore': '0',
	'sunScore': '0',
	'totalScore': '0'
    },
    {
	'teamName': "Jon's Young List",
	'owner': 'Jon',
	'player1': 'Jason Day',
        'player2': 'Jordan Spieth',
        'player3': 'Rory McIlroy',
        'player4': 'Rickie Fowler',
        'alt1': 'Adam Scott',
        'alt2': 'Hideki Matsuyama',
        'thurScore': '0',
        'friScore': '0',
        'satScore': '0',
        'sunScore': '0',
        'totalScore': '0'
    },
    {
        'teamName': "Jamie's Wildcard",
        'owner': 'Jamie',
        'player1': 'Sean O&#39;Hair',
        'player2': 'Brandt Snedeker',
        'player3': 'Patrick Reed',
        'player4': 'Dustin Johnson',
        'alt1': 'William McGirt',
        'alt2': 'Rickie Fowler',
        'thurScore': '0',
        'friScore': '0',
        'satScore': '0',
        'sunScore': '0',
        'totalScore': '0'

    },
    {
        'teamName': "Steve's Selects",
        'owner': 'Steve',
        'player1': 'Dustin Johnson',
        'player2': 'Jordan Spieth',
        'player3': 'Rory McIlroy',
        'player4': 'Jon Rahm',
        'alt1': 'Phil Mickelson',
        'alt2': 'Rickie Fowler',
        'thurScore': '0',
        'friScore': '0',
        'satScore': '0',
        'sunScore': '0',
        'totalScore': '0'

    },
    {
	'teamName': "Sue's Master Plan",
        'owner': 'Sue',
        'player1': 'Justin Rose',
        'player2': 'Jordan Spieth',
        'player3': 'Dustin Johnson',
        'player4': 'Bubba Watson',
        'alt1': 'Jon Rahm',
        'alt2': 'Louis Oosthuizen',
        'thurScore': '0',
        'friScore': '0',
        'satScore': '0',
        'sunScore': '0',
        'totalScore': '0'
    },
    {
        'teamName': "Zach's Grateful Red",
        'owner': 'Zach',
        'player1': 'Dustin Johnson',
        'player2': 'Jordan Spieth',
        'player3': 'Sergio Garcia',
        'player4': 'Rickie Fowler',
        'alt1': 'Jon Rahm',
        'alt2': 'Phil Mickelson',
        'thurScore': '0',
        'friScore': '0',
        'satScore': '0',
        'sunScore': '0',
        'totalScore': '0'

    },
    {
        'teamName': "Ben's Going to UW",
        'owner': 'Ben',
        'player1': 'Jordan Spieth',
        'player2': 'Rickie Fowler',
        'player3': 'Rory McIlroy',
        'player4': 'Jason Day',
        'alt1': 'Dustin Johnson',
        'alt2': 'Phil Mickelson',
        'thurScore': '0',
        'friScore': '0',
        'satScore': '0',
        'sunScore': '0',
        'totalScore': '0'

    },
    {
        'teamName': "Jack's Attack",
        'owner': 'Jack',
        'player1': 'Phil Mickelson',
        'player2': 'Rory McIlroy',
        'player3': 'Bubba Watson',
        'player4': 'Patrick Reed',
        'alt1': 'Jordan Spieth',
        'alt2': 'Sergio Garcia',
        'thurScore': '0',
        'friScore': '0',
        'satScore': '0',
        'sunScore': '0',
        'totalScore': '0'

    }
];

function buildHtmlTable(selector) {

  for (var teamIndex = 0; teamIndex < teams.length; teamIndex++) {
    var thurCount = 0;
    var friCOunt = 0;
    var satCount = 0;
    var sunCount = 0;
    var columns  = addAllColumnHeaders(players, selector, teams[teamIndex]);

    for (var i = 0; i < players.length; i++) {
     
        if (players[i].PLAYER == teams[teamIndex].player1 || 
              players[i].PLAYER == teams[teamIndex].player2 ||
              players[i].PLAYER == teams[teamIndex].player3 ||
              players[i].PLAYER == teams[teamIndex].player4 ||
              players[i].PLAYER == teams[teamIndex].alt1    ||
              players[i].PLAYER == teams[teamIndex].alt2) {

       var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
          var cellValue = players[i][columns[colIndex]];
          if (cellValue == null) cellValue = ""; 
           row$.append($('<td style="padding:9px"/>').html(cellValue));         
        }
        $('#'+teams[teamIndex].owner).append(row$);
      } 
    } 
    $(selector).append($('</table><br><br>'));
  }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(myList, selector, team) {
  var columnSet = [];

  $(selector).append($('<h3>'+team.teamName+'</h3>'));
  var headerTr$ = $('<table id="'+team.owner+'" style="width:100%">');

    var rowHash = myList[0];
    for (var key in rowHash) {
      columnSet.push(key);
      headerTr$.append($('<th style="padding:9px"/>').html(key));
  }

  $(selector).append(headerTr$);

  return columnSet;
}

function predicateBy(prop){
   return function(a,b){
      if( a[prop] > b[prop]){ 
          return 1;
      }else if( a[prop] < b[prop] ){
          return -1;
      }
      return 0;
   }
}


function buildScoreBoard(selector){
  var columns = ['POS','NAME', 'TOT','R1', 'R2', 'R3', 'R4'];

  var header$ = $('<table id="leaderTable" style="width:100%"><thead>');
  
  for (var k = 0; k < columns.length; k++) {
    header$.find('thead').append($('<th style="text-align: center;padding:9px"/>').html(columns[k]));
  }
  $(selector).append(header$);
	

  for (var i = 0; i < teams.length; i++) {
    var thurScore = Number(teams[i].thurScore);
    var friScore = Number(teams[i].friScore);
    var satScore = Number(teams[i].satScore);
    var sunScore = Number(teams[i].sunScore);
    var totalScore = thurScore + friScore + satScore + sunScore;
  
    teams[i].totalScore = totalScore; 

 }
 
  console.log(teams); 
  teams.sort(predicateBy('totalScore'));
  console.log(teams);

 for (var i = 0; i < teams.length; i++) {

    var row$ = $('<tr/>');
 
    row$.append($('<td align="center" style="padding:9px"/>').html(i + 1));
    row$.append($('<td align="center" style="padding:9px"/>').html(teams[i].owner));
    row$.append($('<td align="center" style="padding:9px"/>').html(teams[i].totalScore));
    row$.append($('<td align="center" style="padding:9px"/>').html(teams[i].thurScore));
    row$.append($('<td align="center" style="padding:9px"/>').html(teams[i].friScore));
    row$.append($('<td align="center" style="padding:9px"/>').html(teams[i].satScore));
    row$.append($('<td align="center" style="padding:9px"/>').html(teams[i].sunScore));
    $('#leaderTable').append(row$);
 
}
  $(selector).append($('</table><br><br>'));

}

function findCurrRound(RX){
  var found = false;
  for(var i = 0; i < players.length; i++) {
    if (players[i][RX] == '--') {
        found = true;
        break;
    }
  }
}

function calculateScore() {
  var columns = [];
  var rowHash = players[0];
  for(var key in rowHash) {
    columns.push(key);
  } 

  for (var teamIndex = 0; teamIndex < teams.length; teamIndex++) {
    var thurCount = 0;
    var friCount = 0;
    var satCount = 0;
    var sunCount = 0;

    for(var i = 0; i < players.length; i++) {
      if (players[i].PLAYER == teams[teamIndex].player1 || 
              players[i].PLAYER == teams[teamIndex].player2 ||
              players[i].PLAYER == teams[teamIndex].player3 ||
              players[i].PLAYER == teams[teamIndex].player4) {
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {       
          var cellValue = players[i][columns[colIndex]];
          if (cellValue == null) cellValue = ""; 
          if (columns[colIndex] == 'R1' && cellValue != '--') { 
            var cur = Number(teams[teamIndex].thurScore);
            var playerScore = Number(cellValue);
	    cur = cur + playerScore;
	    teams[teamIndex].thurScore = cur;
            thurCount++;
          }          
          if (columns[colIndex] == 'R2' && cellValue != '--') { 
            var cur = Number(teams[teamIndex].friScore);
            var playerScore = Number(cellValue);
	    cur = cur + playerScore;
	    teams[teamIndex].friScore = cur;
            friCount++;
          }
          if (columns[colIndex] == 'R3' && cellValue != '--') { 
            var cur = Number(teams[teamIndex].satScore);
            var playerScore = Number(cellValue);
	    cur = cur + playerScore;
	    teams[teamIndex].satScore = cur;
            satCount++;
          }
          if (columns[colIndex] == 'R4' && cellValue != '--') { 
            var cur = Number(teams[teamIndex].sunScore);
            var playerScore = Number(cellValue);
	    cur = cur + playerScore;
	    teams[teamIndex].sunScore = cur;
            sunCount++;
          }
        }
      }
    }
    if (thurCount < 4) {
      for (var k = 0; k < players.length; k++) {
        if (thurCount < 4 && players[k].PLAYER == teams[teamIndex].alt1) { 
          for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = players[k][columns[colIndex]];
            if (cellValue == null) cellValue = ""; 
            if (columns[colIndex] == 'R1' && cellValue != '--') {
              var cur = Number(teams[teamIndex].thurScore);
              var playerScore = Number(cellValue);
              cur = cur + playerScore;
              teams[teamIndex].thurScore = cur;
              thurCount++;
            }
          }
        }
      }
    }
    if (thurCount < 4) {
      for (var k = 0; k < players.length; k++) {
        if (thurCount < 4 && players[k].PLAYER == teams[teamIndex].alt2) { 
          for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = players[k][columns[colIndex]];
            if (cellValue == null) cellValue = ""; 
            if (columns[colIndex] == 'R1' && cellValue != '--') {
              var cur = Number(teams[teamIndex].thurScore);
              var playerScore = Number(cellValue);
              cur = cur + playerScore;
              teams[teamIndex].thurScore = cur;
              thurCount++;
            }
          }
        }
      }
    }
    if (friCount < 4) {
      for (var k = 0; k < players.length; k++) {
        if (friCount < 4 && players[k].PLAYER == teams[teamIndex].alt1) {

          for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = players[k][columns[colIndex]];
            if (cellValue == null) cellValue = ""; 
            if (columns[colIndex] == 'R2' && cellValue != '--') {
              var cur = Number(teams[teamIndex].friScore);
              var playerScore = Number(cellValue);
              cur = cur + playerScore;
              teams[teamIndex].friScore = cur;
              friCount++;
            }
          }
        }
     } 
   }
    if (friCount < 4) {
      for (var k = 0; k < players.length; k++) {
        if (friCount < 4 && players[k].PLAYER == teams[teamIndex].alt2) {

          for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = players[k][columns[colIndex]];
            if (cellValue == null) cellValue = ""; 
            if (columns[colIndex] == 'R2' && cellValue != '--') {
              var cur = Number(teams[teamIndex].friScore);
              var playerScore = Number(cellValue);
              cur = cur + playerScore;
              teams[teamIndex].friScore = cur;
              friCount++;
            }
          }
        }
      } 
    }

    if (satCount < 4) {
      for (var k = 0; k < players.length; k++) {
        if (satCount < 4 && players[k].PLAYER == teams[teamIndex].alt1) {
          
          for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = players[k][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            if (columns[colIndex] == 'R3' && cellValue != '--') {
              var cur = Number(teams[teamIndex].satScore);
              var playerScore = Number(cellValue);
              cur = cur + playerScore;
              teams[teamIndex].satScore = cur;
              satCount++;
            }
          }
        }
      } 
    }
   if (satCount < 4) {
      for (var k = 0; k < players.length; k++) {
        if (satCount < 4 && players[k].PLAYER == teams[teamIndex].alt2) {
          
          for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = players[k][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            if (columns[colIndex] == 'R3' && cellValue != '--') {
              var cur = Number(teams[teamIndex].satScore);
              var playerScore = Number(cellValue);
              cur = cur + playerScore;
              teams[teamIndex].satScore = cur;
              satCount++;
            }
          }
          if (satCount < 4) {
	    var cur = Number(teams[teamIndex].satScore);
            cur += 78;
            teams[teamIndex].satScore = cur;
          }
        }
      } 
    }

    if (sunCount < 4) {
      for (var k = 0; k < players.length; k++) {
        if (sunCount < 4 && players[k].PLAYER == teams[teamIndex].alt1) {
          
          for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = players[k][columns[colIndex]];
            if (cellValue == null) cellValue = "";  
            if (columns[colIndex] == 'R4' && cellValue != '--') {
              var cur = Number(teams[teamIndex].sunScore);
              var playerScore = Number(cellValue);
              cur = cur + playerScore;
              teams[teamIndex].sunScore = cur;
              sunCount++;
            }
          }
        }
      } 
    }
   if (sunCount < 4) {
      for (var k = 0; k < players.length; k++) {
        if (sunCount < 4 && players[k].PLAYER == teams[teamIndex].alt2) {
          
          for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = players[k][columns[colIndex]];
            if (cellValue == null) cellValue = "";  
            if (columns[colIndex] == 'R4' && cellValue != '--') {
              var cur = Number(teams[teamIndex].sunScore);
              var playerScore = Number(cellValue);
              cur = cur + playerScore;
              teams[teamIndex].sunScore = cur;
              sunCount++;
            }
          }
          if (sunCount < 4 && players[0].R4 != '--') {
	    var cur = Number(teams[teamIndex].sunScore);
            cur += 78;
            teams[teamIndex].sunScore = cur;
          }
        }
      }
    }
  }
}
buildHtmlTable("#field");
calculateScore();
buildScoreBoard("#leaderboard");
$(document).ready(function() { 
    // call the tablesorter plugin, the magic happens in the markup 
    $("#leaderTable").tablesorter({sortlist:[[3,0]]}); 
}); 
//console.log(players);
