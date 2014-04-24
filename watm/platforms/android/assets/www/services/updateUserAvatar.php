<?php
	require_once("core_functions.php");

	$avatar = $_POST['avatar'];
	$user_id = $_POST['user_id'];

	$dbc = getDBConnection();		
	$stmt = null;
	$sql = "UPDATE watm_users SET avatar=? WHERE user_id=" . $user_id;
	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("s", $avatar);
		
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



