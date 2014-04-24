<?php
	require_once("core_functions.php");

	$activity_id = $_POST['activity_id'];

	$dbc = getDBConnection();		
	$sql = "SELECT * FROM watm_messages LEFT JOIN watm_users ON watm_messages.user_id = watm_users.user_id WHERE activity_id =" . $activity_id;

	$result = $dbc->query($sql);
	$messages = array();

	while($row = $result->fetch_assoc()){
		$message = array("message_id" => $row["message_id"],
			"message" => $row["message"], 
			"activity_id" => $row["activity_id"], 
			"user_id" => $row["user_id"],
			"created" => $row["created"],
			"name" => $row["name"],
			"avatar" => $row["avatar"]
			);
		$messages[] = $message;
	}
	
	$dbc->close();
	print json_encode($messages);
?>

