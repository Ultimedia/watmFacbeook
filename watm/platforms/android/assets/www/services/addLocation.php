<?php
	require_once("core_functions.php");

	$location = $_POST['location'];
	$coordinates = $_POST['coordinates'];
	$description = "";

	$dbc = getDBConnection();
	$sql = "INSERT INTO watm_locations (location, coordinates, description) VALUES (?,?,?)";
	$stmt = null;

	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("sss", $location, $coordinates, $description);

		if($stmt->execute())
		{
			if($count == 0)
			{
				$status['location_id'] = mysqli_insert_id($dbc);
				$status['value'] = true;
			}else{
				$status['value'] = false;
			}
			print json_encode($status);
		}else{
			$status['value'] = false;
			print json_encode($status);
		}
	}else{
		$dbc->close();
		$status['value'] = false;
		print json_encode($status);
	}
?>
