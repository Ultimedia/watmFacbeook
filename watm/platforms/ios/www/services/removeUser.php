<?php
	require_once("core_functions.php");

	$user_id = $_POST['user_id'];
	$visible = 0;

	$dbc = getDBConnection();		
	$sql = "UPDATE watm_users SET visible=? WHERE user_id=" . $user_id;

	$result = $dbc->query($sql);
	$stmt = null;

	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("s", $visible);
		
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
	}
	$dbc->close();
?>