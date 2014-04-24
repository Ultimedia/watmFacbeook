<?php
	require_once("core_functions.php");

	$dbc = getDBConnection();		
	$sql = "SELECT * FROM watm_media WHERE visible=1";

	$result = $dbc->query($sql);
	$medias = array();

	while($row = $result->fetch_assoc()){
		$media = array("media_id" => $row["media_id"],
			"url" => $row["url"], 
			"type" => $row["type"], 
			"user_id" => $row["user_id"],
			"created" => $row["created"],
			"activity_id" => $row["activity_id"]);
		$medias[] = $media;
	}
	
	$dbc->close();
	print json_encode($medias);
	
?>