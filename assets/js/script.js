$(function() {

	//global variables – TODO: change scope
	var d = new Date(),
	feedId,
	//date variables
	monthNames = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ],
	feedId = 'year_' + d.getFullYear() + '/' + 'month_' + ('0' + (d.getMonth()+1)).slice(-2) + '/' + 'day_' + ( '0' + d.getDate()).slice(-2) + '/',
	date =  d.getMonth() +'/'+ d.getDate() +'/'+ d.getFullYear(),
	longDate = monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	
	var getScores = function() {
		var url='http://isitbaseballseasonyet.com/ba-simple-proxy.php?url=http://gd2.mlb.com/components/game/mlb/' + feedId + 'miniscoreboard.json';
		$.getJSON(url,function(json) {
			var output = [];
			var inning,
			inningStatus = "",
			mlbFeed = json.contents.data.games.game;
	
			for (var i = 0, len = mlbFeed.length; i < len; i+=1) {
	
				if (mlbFeed[i].home_team_runs === undefined) {
					mlbFeed[i].home_team_runs = '';
				}
				
				if (mlbFeed[i].away_team_runs === undefined) {
					mlbFeed[i].away_team_runs = '';
				}
				
				if (mlbFeed[i].inning === undefined) {
					mlbFeed[i].inning = '';
				}
				
				if (mlbFeed[i].status === "Postponed") {
					mlbFeed[i].inning = "P";
				}
	
				switch (mlbFeed[i].ind) {
					case "F":
						var inning = mlbFeed[i].ind;
						break;
					
					case "S":
						var inning = "";
						break;
					
					case "P":
						var inning = "";
						break;
					
					default:
						var inning = mlbFeed[i].inning;
						break;
				};
	
				switch (mlbFeed[i].top_inning) {
					case "Y":
					var inningStatus = '▲';
					break;
					
					case "N":
					var inningStatus = '▼';
					break;
					
					default:
					var inningStatus = '';
					break;
				};
	
				if ((mlbFeed[i].top_inning === 'Y' && mlbFeed[i].ind === 'F') || (mlbFeed[i].top_inning === 'Y' && mlbFeed[i].ind === 'P') || (mlbFeed[i].top_inning === 'N' && mlbFeed[i].ind === 'F')) {
					var inningStatus = '';
				};
	
				output.push('<li class=' + mlbFeed[i].away_name_abbrev + '-' + mlbFeed[i].home_name_abbrev + '><span class=away_name_abbrev>' + 
					mlbFeed[i].home_name_abbrev + '</span><span class=home_score>'+ mlbFeed[i].home_team_runs +
				'</span><span class=inning_status>' + inningStatus + '</span><span class=home_name_abbrev>'+ 
					mlbFeed[i].away_name_abbrev +'</span><span class=away_score>'+ mlbFeed[i].away_team_runs +
				'</span> <span class=game_status_inning>' + 
					inning + 
				'</span></li>');
				
				};
	
				$("#scoreboard").html(output.join('')).slideDown('slow');
	
			})
			//on XHR complete, remove spinner, and check for updated scores in 5 minutes
			.complete(function() { 
				$("#scores").removeClass("loading").addClass("loaded");
				setTimeout(function() {
					getScores();
					console.log("New scores fetched");
				}, 10000);
			});
			
		}
		
		//today's date in day month, year format
		showDate = function() {
			$("#date").html(longDate);
		};
	
	//run the getScores, getDate function on document.ready
	showDate();
	getScores();
});
