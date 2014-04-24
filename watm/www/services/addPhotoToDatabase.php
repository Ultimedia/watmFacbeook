<?php
	require_once("core_functions.php");

	$url = $_POST['url'];
	$user_id = $_POST['user_id'];
	$type = $_POST['type'];
	$activity_id = $_POST['activity_id'];

	$dbc = getDBConnection();
	$sql = "INSERT INTO watm_media (url, user_id, type, activity_id) VALUES (?,?,?,?)";
	$stmt = null;
	
	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("ssss", $url, $user_id, $type, $activity_id);
		
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
	}else{
		$dbc->close();
		return false;
	}
?>
