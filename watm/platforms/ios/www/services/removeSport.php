<?php
	require_once("core_functions.php");

	$sport_id = $_POST['sport_id'];
	$visible = 0;

	$dbc = getDBConnection();		
	$stmt = null;
	$sql = "UPDATE watm_sports SET visible=?  WHERE sport_id=" . $sport_id;
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



