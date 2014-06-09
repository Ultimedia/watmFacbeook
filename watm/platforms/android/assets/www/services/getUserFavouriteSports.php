<?php
	require_once("core_functions.php");

	$user_id = 2;

	$dbc = getDBConnection();		
	$sql = "SELECT * FROM watm_user_sports WHERE user_id=" . $user_id;
	
	$result = $dbc->query($sql);
	$project;

	while($row = $result->fetch_assoc()){
		$project = $row["sport_data"];
	}

	$project = stripslashes($project);

	$dbc->close();
	echo $project;
?>
