<?php
	require_once("core_functions.php");

	$email = $_POST['email'];
	$password = $_POST['password'];

	$dbc = getDBConnection();
	$sql = "SELECT user_id FROM watm_users WHERE email = ? AND password = ? AND admin=1";
	if($stmt = $dbc->prepare($sql))
	{
		$stmt->bind_param('ss',$email,md5($password));
		if($stmt->execute())
		{
			$stmt->store_result();
			$stmt->bind_result($userid);
			$stmt->fetch();

			if($stmt->num_rows() == 0)
			{
				$return['status'] = false;
			}else{
				$return['status'] = true;
			}
			print json_encode($return);
		}else{
			$return['status'] = false;
			print json_encode($return);
		}
	}else{
		return false;
	}
?>

