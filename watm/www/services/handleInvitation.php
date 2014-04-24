<?php
	require_once("core_functions.php");
	
	$invitation_id = $_POST["invitation_id"];
	$accepted = $_POST["accepted"];
	$activity_id = $_POST["activity_id"];
	$user_id = $_POST["user_id"];
	$t = "0";

	$dbc = getDBConnection();		
	$stmt = null;
	$sql = "UPDATE watm_activity_invited SET accepted=?, visible=? WHERE invitation_id=" . $invitation_id;
	
	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("ss", $accepted, $t);
		
		if($stmt->execute())
		{
			if($count == 0)
			{
				if($accepted == 1){

					// if user accepts invitation we need to add him to the activity
					$sql = "INSERT INTO watm_activity_users (activity_id, user_id, going) VALUES (?,?,?)";
					$stmt = null;

					if($stmt = $dbc->prepare($sql)){
						$stmt->bind_param("sss", $activity_id, $user_id, $accepted);
						if($stmt->execute())
						{
							$status['value'] = true;
						}else{
							$status['value'] = false;
						}
					}else{
						$status['value'] = true;
					}

					$status['value'] = true;
					print json_encode($status);
				}else{
					$status['value'] = true;
					print json_encode($status);					
				}

			}else{
				$status['value'] = false;
				print json_encode($status);
			}
		}else{
			$status['value'] = false;
			print json_encode($status);
		}
	}else{
		$dbc->close();
		return false;
	}
?>




	
