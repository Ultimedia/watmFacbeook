<?php
	require_once("core_functions.php");

	$user_id = $_POST["user_id"];

	$dbc = getDBConnection();		
	$sql = "SELECT * FROM watm_activity_invited 
			INNER JOIN watm_activities ON watm_activity_invited.activity_id = watm_activities.activity_id  
			LEFT JOIN watm_sports ON watm_activities.sport_id = watm_sports.sport_id
			LEFT JOIN watm_users ON watm_activities.user_ID = watm_users.user_id
			LEFT JOIN watm_buurten ON watm_activities.buurt_id = watm_buurten.buurt_id
			LEFT JOIN watm_locations ON watm_activities.location_id = watm_locations.location_id
			WHERE watm_activity_invited.visible = 1 and watm_activity_invited.user_id =". $user_id . " and date >= CURRENT_DATE() ORDER BY date";

	$result = $dbc->query($sql);
	$invitations = array();

	while($row = $result->fetch_assoc()){
		$originalDate =  $row["date"];
		$newDate = date("d-m-Y", strtotime($originalDate));
		$today = false;
		$tomorrow = false;

		// Analyse dates
		if($newDate == date("d-m-Y")){
		   $newDate = "Vandaag om " . date("H:i",strtotime($row["date"]));
		   $feature = true;
	   	   $today = true;
		}else if($newDate == date("d-m-Y")+1){
		   $newDate = "Morgen om " . date("H:i",strtotime($row["date"]));
		   $tomorrow = true;
		}


		$invitation = array("title" => $row["title"], "activity_id" => $row["activity_id"], "invitation_id" => $row["invitation_id"], "buurt"=>$row['buurt'], "buurt_id"=>$row["buurt_id"], "today"=>$today, "tomorrow"=>$tomorrow, "date" => $newDate, "title" => $row["title"], "sport_id" =>$row['sport_id'], "location_id"=>$row['location_id'], "location"=>$row['location'], "coordinates"=>$row['coordinates'], "user_id"=>$row['user_id'], "description"=>$row['description']);
		$invitations[] = $invitation;
	}
	
	$dbc->close();
	print json_encode($invitations);
?>
