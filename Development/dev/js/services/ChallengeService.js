/**
* Updating a users avatar according to app usage
*/
appData.services.CHallengeService = Backbone.Model.extend({

	initialize: function() {

	},

	checkChallenges: function(userModel, sportsFilter, activityCreateFilter, fotoCreateFilter, participateFilter, activityModel){
	
		userModel.attributes.myChallenges.each(function(challenge){
            var status = challenge.attributes.status;
            var total;
            var sc = false;
            var sa = false;
            var fs = false;
            var ps = false;
            var isChallenge = false;

            if(challenge.attributes.challengeData.sportsFilter && sportsFilter){
                total = challenge.attributes.challengeData.sportsFilter.total;
                var sport = challenge.attributes.challengeData.sportsFilter.sport_id;
                isChallenge = true;

                if(activityModel.attributes.sport_id == sport){
                    if(typeof status.sportsFilter === 'undefined'){
                       // your code here.
                       status.sportsFilter = {};
                       status.sportsFilter.count =0;
                       status.sportsFilter.count++;

                    }else{
                        status.sportsFilter.count++;
                    }

                    if(status.sportsFilter.count >= total){
                        status.sportsFilter.complete = true;
                        sc = true;
                    }
                }
            }else{
                sc = true
            }

            if(challenge.attributes.challengeData.activityCreateFilter && activityCreateFilter){
                total = challenge.attributes.challengeData.activityCreateFilter.total;
                isChallenge = true;


                 if(typeof status.activityCreateFilter === 'undefined'){
                   // your code here.
                   status.activityCreateFilter = {};
                   status.activityCreateFilter.count =0;
                   status.activityCreateFilter.count++;

                }else{
                    status.activityCreateFilter.count++;
                }

                if(status.activityCreateFilter.count >= total){
                    status.activityCreateFilter.complete = true;
                    sa = true;
                }
            }else{
                sa = true;
            }

            if(challenge.attributes.challengeData.fotoCreateFilter && fotoCreateFilter){
                total = challenge.attributes.challengeData.fotoCreateFilter.total;
                isChallenge = true;

                if(typeof status.fotoCreateFilter === 'undefined'){
                   // your code here.
                   status.fotoCreateFilter = {};
                   status.fotoCreateFilter.count =0;
                   status.fotoCreateFilter.count++;

                }else{
                    status.fotoCreateFilter.count++;
                }

                console.log(status.fotoCreateFilter.count + '-' + total);

                if(status.fotoCreateFilter.count >= total){
                    status.fotoCreateFilter.complete = true;
                   fs = true;
                }
            }else{
                fs = true;
            }

            if(challenge.attributes.challengeData.participateFilter && participateFilter){
                total = challenge.attributes.challengeData.participateFilter.total;
                isChallenge = true;

                if(typeof status.participateFilter === 'undefined'){
                   // your code here.
                   status.participateFilter = {};
                   status.participateFilter.count =0;
                   status.participateFilter.count++;

                }else{
                    status.participateFilter.count++;
                }

                if(status.participateFilter.count >= total){
                    status.participateFilter.complete = true;
                    ps = true;
                }
            }else{
                ps = true;
            }

            var complete = 0;

            // need to do a more complex complete check
            if(sc && sa && fs && ps && isChallenge){
                complete = 1;
                console.log("challenge complete");
            }

            // update challenge on the database
            Backbone.on('updateChallengeScore', this.updateChallengeScore);
            appData.services.phpService.updateChallenge(challenge.attributes.challenge_id, status, complete);
    
		});
	},

    updateChallengeScore: function(){
        alert('updated');
    }

});
