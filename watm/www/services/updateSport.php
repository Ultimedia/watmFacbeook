<?php
	require_once("core_functions.php");

	$sport_id = $_POST['sport_id'];
	$icon = $_POST['icon'];
	$sport_title = $_POST['sport_title'];


	$dbc = getDBConnection();		
	$sql = "UPDATE watm_sports SET icon=?, sport_title=? WHERE sport_id=" . $sport_id;
	$stmt = null;
	
	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("ss", $icon, $sport_title);
		
		if($stmt->execute())
		{
			if($count == 0)
			{
				$status['sport_id'] = $sport_id;
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

