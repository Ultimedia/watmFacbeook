<?php
	require_once("core_functions.php");

	$strength_score = $_POST['strength_score'];
	$stamina_score = $_POST['stamina_score'];
	$equipment_score = $_POST['equipment_score'];
	$user_id = $_POST['user_id'];

	$dbc = getDBConnection();		
	$stmt = null;
	$sql = "UPDATE watm_users SET strength_score=?, stamina_score=?, equipment_score=? WHERE user_id=" . $user_id;
	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("sss", $strength_score, $stamina_score, $equipment_score);
		
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



