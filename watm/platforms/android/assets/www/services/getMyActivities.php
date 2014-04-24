<?php
	require_once("core_functions.php");

	$user_id = $_POST['user_id'];

	$dbc = getDBConnection();
	$sql = "SELECT * FROM watm_activities
			LEFT JOIN watm_sports ON watm_activities.sport_id = watm_sports.sport_id
			LEFT JOIN watm_users ON watm_activities.user_id = watm_users.user_id
			LEFT JOIN watm_buurten ON watm_activities.buurt_id = watm_buurten.buurt_id
			LEFT JOIN watm_locations ON watm_activities.location_id = watm_locations.location_id
			WHERE watm_activities.visible = 1 and watm_activities.user_id = " . $user_id . " and date >= CURRENT_DATE() ORDER BY date";

	$result = $dbc->query($sql);
	$projects = array();
	$index = 0;

	while($row = $result->fetch_assoc()){
		$mediaSQL = "SELECT * FROM watm_media WHERE activity_id =" . $row["activity_id"];

		$mediaResult = $dbc->query($mediaSQL);
		$mediaCollection = array();

		while($mediarow = $mediaResult->fetch_assoc()){
			$media = array("url" => $mediarow["url"], );
			$mediaCollection[] = $media;
		}

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

		$project = array("sql_index" => $index, "participants" => $row["participants"], "activity_id" => $row["activity_id"], "date" => $newDate, "title" => $row["title"], "sport_id" =>$row['sport_id'], "location_id"=>$row['location_id'], "location"=>$row['location'], "coordinates"=>$row['coordinates'], "user_id"=>$row['user_id'], "description"=>$row['description'], "media" => $mediaCollection, "buurt"=>$row['buurt'], "buurt_id"=>$row["buurt_id"], "today"=>$today, "tomorrow"=>$tomorrow );
		$projects[] = $project;
			$index++;


	}

	$dbc->close();
	print json_encode($projects);

?>
