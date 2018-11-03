//GET route with URL to /api/friends
//POST route to /api/friends

var friendsData = require("../data/friends");

module.exports = function(app){

    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res){
        var friendArray = friendsData;
        var bestFriendScore = 0;
        var bestFriend;
        for(var i = 0; i < friendArray.length; i++){
            var friendScore = 0;
            for( var j = 0; j < friendArray[i].scores.length; j++){
                friendScore += Math.abs(req.body.scores[j]-friendArray[i].scores[j]);
            }
            if(bestFriendScore === 0){
                bestFriendScore = friendScore;
                bestFriend = friendArray[i];
            }else if(friendScore < bestFriendScore){
                bestFriendScore = friendScore;
                bestFriend = friendArray[i];
            }
        }
        res.json(bestFriend);        
        friendsData.push(req.body);
    });
    
}