<?php
	require_once("core_functions.php");

	$user_id = $_POST['user_id'];
	$email = $_POST['email'];
	$location_id = $_POST['location_id'];
	$title = $_POST['title'];
	$sport_id = $_POST['sport_id'];
	$description = $_POST['description'];
	$dateRoot = $_POST['date'];
	$time = "";
	$participants = $_POST['participants'];
	$stopTime = $_POST['stopTime'];
	$activity_id = $_POST['activity_id'];
	$date = strtotime($dateRoot);
	$date = date('Y/m/d H:i:s', $date);

	$dbc = getDBConnection();		
	$sql = "UPDATE watm_activities SET title=?, sport_id=?, activity_description=?, date=?, time=?, user_id=?, location_id=?, participants=?, stopTime=? WHERE activity_id=" . $activity_id;
	$stmt = null;
	
	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("sssssssss", $title, $sport_id, $description, $date, $time, $user_id, $location_id, $participants, $stopTime);
		
		if($stmt->execute())
		{
			if($count == 0)
			{
				$status['activity_id'] = $activity_id;
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

