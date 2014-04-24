<?php
	require_once("core_functions.php");

	$location_id = $_POST['location_id'];
	$visible = 0;

	$dbc = getDBConnection();		
	$sql = "UPDATE watm_locations SET visible=? WHERE location_id=" . $location_id;

	$result = $dbc->query($sql);
	$stmt = null;

	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("s", $visible);
		
		if($stmt->execute())
		{
			if($count == 0)
			{
				$status['value'] = true;
			}else{
				$status['value'] = false;
			}
			print json_encode($status);
		}else{
			$status['value'] = false;
			print json_encode($status);
		}
	}
	$dbc->close();
?>