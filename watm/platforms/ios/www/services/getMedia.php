<?php
	require_once("core_functions.php");

	$activity_id = $_POST['activity_id'];

	$dbc = getDBConnection();		
	$sql = "SELECT * FROM watm_media WHERE activity_id =" . $activity_id . " AND visible=1 ORDER BY created DESC";

	$result = $dbc->query($sql);
	$medias = array();

	while($row = $result->fetch_assoc()){
		$media = array("media_id" => $row["media_id"],
			"url" => $row["url"], 
			"type" => $row["type"], 
			"user_id" => $row["user_id"],
			"activity_id" => $row["activity_id"]);
		$medias[] = $media;
	}
	
	$dbc->close();
	print json_encode($medias);
	
?>