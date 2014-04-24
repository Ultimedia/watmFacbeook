<?php
	require_once("core_functions.php");

	$user_id = $_POST['user_id'];
	$sports = $_POST['favourite_sports'];

	$dbc = getDBConnection();		
	$sql = "INSERT INTO watm_user_sports (user_id, sport_data) VALUES (?,?)";
	$stmt = null;
	$status;
	
	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("is", $user_id, $sports);
		
		if($stmt->execute())
		{
			if($count == 0)
			{
				$status['id'] = mysqli_insert_id($dbc);
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

