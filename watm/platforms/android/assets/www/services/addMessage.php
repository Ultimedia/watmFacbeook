<?php
	require_once("core_functions.php");

	$message = $_POST['message'];
	$activity_id = $_POST['activity_id'];
	$user_id = $_POST['user_id'];

	$dbc = getDBConnection();		
	$sql = "INSERT INTO watm_messages (message, activity_id, user_id) VALUES (?,?,?)";
	$stmt = null;
	
	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("sss", $message, $activity_id, $user_id);
		
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