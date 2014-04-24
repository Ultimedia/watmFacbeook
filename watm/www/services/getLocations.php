<?php
	require_once("core_functions.php");

	$dbc = getDBConnection();		
	$sql = "SELECT * FROM watm_locations WHERE visible=1";

	$result = $dbc->query($sql);
	$locations = array();

	while($row = $result->fetch_assoc()){
		$location = array("location_id" => $row["location_id"],
			"location" => $row["location"], "coordinates" => $row["coordinates"]);
		$locations[] = $location;
	}
	
	$dbc->close();
	print json_encode($locations);
	
?>