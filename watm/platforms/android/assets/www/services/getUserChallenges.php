<?php
	require_once("core_functions.php");

	$user_id = $_POST["user_id"];

	$dbc = getDBConnection();		
	$sql = "SELECT * FROM watm_user_challenges INNER JOIN watm_challenges ON watm_user_challenges.challenge_id = watm_challenges.challenge_id WHERE watm_user_challenges.user_id =". $user_id;

	$result = $dbc->query($sql);
	$user_challenges = array();

	while($row = $result->fetch_assoc()){
		$challenge = array("challenge_id" => $row["challenge_id"],
			"status" => $row["status"], 
			$challenge = array(
				"challenge_id" => $row["avatar_id"],
				"title"=>$row["title"],
				"deadline"=>$row["deadline"],
				"description"=>$row["description"],
				"badge_url"=>$row["badge_url"]
			));
		$user_challenges[] = $challenge;
	}
	
	$dbc->close();
	print json_encode($user_challenges);
?>