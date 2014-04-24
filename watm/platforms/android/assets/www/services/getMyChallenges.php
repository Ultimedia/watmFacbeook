<?php
	require_once("core_functions.php");

	$user_id = $_POST["user_id"];

	$dbc = getDBConnection();		
	$sql = "SELECT * FROM watm_user_challenges LEFT JOIN watm_challenges ON watm_user_challenges.challenge_id = watm_challenges.challenge_id WHERE user_id =" . $user_id . " AND deadline >= CURRENT_DATE() AND completed = 0";

	$result = $dbc->query($sql);
	$user_challenges = array();

	while($row = $result->fetch_assoc()){
		$challenge = array("challenge_id" => $row["challenge_id"],
			"status" => json_decode($row["status"]), 
			"challenge_id" => $row["challenge_id"],
			"title"=>$row["title"],
			"deadline"=>$row["deadline"],
			"description"=>$row["description"],
			"badge_url"=>$row["badge_url"],
			"challengeData" => json_decode($row["challengeData"]));
			
		$user_challenges[] = $challenge;
	}
	
	$dbc->close();
	print json_encode($user_challenges);
?>

