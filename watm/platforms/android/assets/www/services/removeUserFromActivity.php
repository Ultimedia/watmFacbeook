<?php
	require_once("core_functions.php");
	
	$activity_id = $_POST['activity_id'];
	$user_id = $_POST['user_id'];
	$going = 0;

	$dbc = getDBConnection();		
	$sql = "UPDATE watm_activity_users SET going=? WHERE activity_id=? AND user_id=?";
	if($stmt = $dbc->prepare($sql))
	{
		$stmt->bind_param('iii',$going,$activity_id,$user_id);
		if($stmt->execute())
		{
			$status['status'] = true;
		}else{
			$status['status'] = "e";
			$status['error']=$stmt->error;
		}
		print json_encode($status);
	}else{
		$status['status'] = false;
		print json_encode($status);
	}

?>