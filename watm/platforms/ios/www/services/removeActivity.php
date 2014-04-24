<?php
	require_once("core_functions.php");

	$activity_id = $_POST['activity_id'];
	$visible = 0;

	$dbc = getDBConnection();		
	$sql = "UPDATE watm_activities SET visible=? WHERE activity_id=" . $activity_id;

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