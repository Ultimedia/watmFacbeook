<?php
	require_once("core_functions.php");

	$dbc = getDBConnection();		
	$sql = "SELECT * FROM watm_challenges WHERE visible=1";

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

