<?php
	require_once("core_functions.php");

	$facebook_id = $_POST['facebook_id'];
	$name = $_POST['name'];
	$password = "";
	$facebook_data = $_POST['facebook_data'];
	$email = $_POST['email'];
	$avatar = $_POST['avatar'];
	$avatarfile = "avatar" . $facebook_id . ".jpg";
	$current_location = $_POST['current_location'];


	$dbc = getDBConnection();		
	$sql = "INSERT INTO watm_users (facebook_data, name, password, facebook_id, email, avatar, current_location) VALUES (?,?,?,?,?,?,?)";
	$stmt = null;


	// save facebook avatar to local storage
	$content = file_get_contents($avatar);
	//Store in the filesystem.
	$fp = fopen($_SERVER['DOCUMENT_ROOT'] ."/common/uploads/" . $avatarfile, "w");
	fwrite($fp, $content);
	fclose($fp);

	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("sssssss", $facebook_data, $name, $password, $facebook_id, $email, $avatarfile, $current_location);
		
		if($stmt->execute())
		{
			if($count == 0)
			{
				$status['user_id'] = mysqli_insert_id($dbc);
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

