<?php
	require_once("core_functions.php");

	$title = $_POST['title'];
	$deadline = $_POST['deadline'];
	$badge_url = $_POST['badge_url'];
	$challengeData = $_POST['challengeData'];
	$description = $_POST['description'];


	$dbc = getDBConnection();		
	$sql = "INSERT INTO watm_challenges (title, description, deadline, badge_url, challengeData) VALUES (?,?,?,?,?)";
	$stmt = null;
	
	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("sssss", $title, $description, $deadline, $badge_url, $challengeData);
		
		if($stmt->execute())
		{
			if($count == 0)
			{
				$status['challenge_id'] = mysqli_insert_id($dbc);
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