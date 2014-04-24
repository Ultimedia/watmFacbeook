<?php
	require_once("core_functions.php");

	$media_id = $_POST['media_id'];
	$visible = 0;

	$dbc = getDBConnection();		
	$stmt = null;
	$sql = "UPDATE watm_media SET visible=?  WHERE media_id=" . $media_id;
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



