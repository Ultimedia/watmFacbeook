<?php
	require_once("core_functions.php");
	
	$activity_id = $_POST['activity_id'];
	$user_id = $_POST['user_id'];
	$going = $_POST['going'];

	$dbc = getDBConnection();		
	$sql = "SELECT * FROM watm_activity_users WHERE activity_id =? AND user_id=?";
	if($stmt = $dbc->prepare($sql))
	{
		$stmt->bind_param('ss',$activity_id, $user_id);
		if($stmt->execute())
		{
			$stmt->store_result();
			$stmt->fetch();

			// new entry
			if($stmt->num_rows() == 0)
			{
				// insert
				$sql = "INSERT INTO watm_activity_users (activity_id, user_id, going) VALUES (?,?,?)";
				$stmt = null;

				if($stmt = $dbc->prepare($sql)){
					$stmt->bind_param("sss", $activity_id, $user_id, $going);
					if($stmt->execute())
					{
						$status['id'] = mysqli_insert_id($dbc);
						$status['value'] = true;
					}else{
						$status['value'] = "f";
					}
					print json_encode($status);
				}else{

				}
			}else{

				// update
				$sql = "UPDATE watm_activity_users SET going=? WHERE activity_id=? AND user_id=?";
				if($stmt = $dbc->prepare($sql))
				{
					$stmt->bind_param('iii',$going,$activity_id,$user_id);
					if($stmt->execute())
					{
						$status['status'] = true;
						$status['value'] = $stmt->affected_rows;
					}else{
						$status['status'] = "e";
						$status['error']=$stmt->error;
					}
					print json_encode($status);
				}else{
					$status['status'] = false;
					print json_encode($status);
				}
			}
		}else{
			$status['status'] = 'n';
			print json_encode($return);
		}
	}else{
		$status['status'] = "k";
		print json_encode($status);
	}
?>