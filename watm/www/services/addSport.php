<?php
	require_once("core_functions.php");

	$sport_title = $_POST['sport_title'];
	$description = $_POST['description'];
	$icon = $_POST['icon'];

	$dbc = getDBConnection();		
	$sql = "INSERT INTO watm_sports (sport_title, description, icon) VALUES (?,?,?)";
	$stmt = null;
	
	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("sss", $sport_title, $description, $icon);
		
		if($stmt->execute())
		{
			if($count == 0)
			{
				$status['sport_id'] = mysqli_insert_id($dbc);
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
