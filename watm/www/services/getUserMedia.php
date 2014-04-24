<?php
	require_once("core_functions.php");

	$user_id = $_POST["user_id"];

	$dbc = getDBConnection();		
	$sql = "SELECT * FROM watm_media WHERE user_id =" . $user_id . " AND visible = 1 ORDER BY created ASC";

	$result = $dbc->query($sql);
	$medias = array();

	while($row = $result->fetch_assoc()){
		$media = array("url" => $row["url"]);
		$medias[] = $media;
	}
	
	$dbc->close();
	print json_encode($medias);
?>