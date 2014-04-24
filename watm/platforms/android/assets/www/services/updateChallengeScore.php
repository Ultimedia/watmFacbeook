<?php
	require_once("core_functions.php");

	$status = $_POST['status'];
	$user_id = $_POST['user_id'];
	$challenge_id = $_POST["challenge_id"];
	$completed = $_POST["completed"];

	$dbc = getDBConnection();		
	$stmt = null;
	$sql = "UPDATE watm_user_challenges SET status=?, completed=? WHERE user_id=" . $user_id . " AND challenge_id=" . $challenge_id;
	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("ss", $status, $completed);
		
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

