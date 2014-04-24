<?php
	require_once("core_functions.php");

	$user_id = $_POST["user_id"];

	$dbc = getDBConnection();		
	$sql = "SELECT * FROM watm_challenges a WHERE visible=1 and deadline >= CURRENT_DATE() AND NOT EXISTS (SELECT * FROM watm_user_challenges h WHERE h.challenge_id = a.challenge_id AND h.user_id =" . $user_id . ")";

	$result = $dbc->query($sql);
	$challenges = array();

	while($row = $result->fetch_assoc()){
		$challenge = array("challenge_id" => $row["challenge_id"],
			"title" => $row["title"], 
			"deadline" => $row["deadline"], 
			"description" => $row["description"],
			"badge_url" => $row["badge_url"],
			"challengeData" => json_decode($row["challengeData"]));
		$challenges[] = $challenge;
	}
	
	$dbc->close();
	print json_encode($challenges);
?>

