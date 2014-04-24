<?php
	require_once("core_functions.php");

	$facebook_id = $_GET['facebook_id'];

	$dbc = getDBConnection();		
	$sql = "SELECT user_id, stamina_score, strength_score, equipment_score, avatar, gender FROM watm_users WHERE facebook_id = ?";
	if($stmt = $dbc->prepare($sql))
	{
		$stmt->bind_param('s',$facebook_id);
		if($stmt->execute())
		{
			$stmt->store_result();
			$stmt->bind_result($userid, $stamina_score, $strength_score, $equipment_score, $avatar, $gender);
			$stmt->fetch();

			if($stmt->num_rows() == 0)
			{
				$return['facebook_user'] = false;

			}else{
				$return['facebook_user'] = true;
				$return['user_id'] = $userid;	
				$return['stamina_score'] = $stamina_score;
				$return['strength_score'] = $strength_score;
				$return['equipment_score'] = $equipment_score;
				$return['avatar'] = $avatar;
				$return['gender'] = $gender;
				
			}
			print json_encode($return);
		}else{
			$return['status'] = false;
			$return['error']=$stmt->error;
			print json_encode($return);
		}
	}else{
		return false;
	}


?>


