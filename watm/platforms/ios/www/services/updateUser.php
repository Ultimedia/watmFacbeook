<?php
	require_once("core_functions.php");

	$avatar = $_POST['avatar'];
	$name = $_POST['name'];
	$gender = $_POST['gender'];
	$user_id = $_POST['user_id'];
	$age = $_POST['age'];
	$admin = $_POST['admin'];	

	$dbc = getDBConnection();		
	$sql = "UPDATE watm_users SET avatar=?, name=?, gender=?, age=?, admin=? WHERE user_id=" . $user_id;
	$stmt = null;
	
	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("sssss", $avatar, $name, $gender, $age, $admin);
		
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

