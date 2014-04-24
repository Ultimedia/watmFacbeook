<?php
	require_once("core_functions.php");

	$dbc = getDBConnection();		
	$sql = "SELECT * FROM watm_sports WHERE visible=1";

	$result = $dbc->query($sql);
	$projects = array();

	while($row = $result->fetch_assoc()){
		$project = array("sport_id" => $row["sport_id"], "sport_title" => $row["sport_title"], "description" => $row["description"], "icon" => $row["icon"]);
		$projects[] = $project;
	}
	
	$dbc->close();
	print json_encode($projects);
?>
