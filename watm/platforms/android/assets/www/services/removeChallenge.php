<?php
	require_once("core_functions.php");

	$challenge_id = $_POST['challenge_id'];
	$visible = 0;

	$dbc = getDBConnection();		
	$stmt = null;
	$sql = "UPDATE watm_challenges SET visible=?  WHERE challenge_id=" . $challenge_id;
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
	}else{
		$dbc->close();
		return false;
	}
?>



