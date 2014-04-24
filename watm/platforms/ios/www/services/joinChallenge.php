<?php
	require_once("core_functions.php");

	$user_id = $_POST['user_id'];
	$challenge_id = $_POST['challenge_id'];
	$completed = 0;


	$dbc = getDBConnection();		
	$sql = "INSERT INTO watm_user_challenges (user_id, challenge_id, completed) VALUES (?,?,?)";
	$stmt = null;
	
	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("sss", $user_id, $challenge_id, $completed);
		
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

