<?php
	require_once("core_functions.php");

	$user_id = $_POST["user_id"];

	$dbc = getDBConnection();
	$sql = "SELECT * FROM watm_friends INNER JOIN watm_users ON watm_friends.user_id = watm_users.user_id WHERE watm_friends.friend_from_id =". $user_id . " AND watm_friends.visible = 1";

	$result = $dbc->query($sql);
	$friends = array();

	while($row = $result->fetch_assoc()){
		if($row["avatar"] == null){
			$avatar = "default.png";
		}else{
			$avatar = $row["avatar"];
		}

		$friend = array("friend_id" => $row["friend_id"],
			"user_id" => $row["user_id"],
			"facebook_id" => $row["facebook_id"],
			"stamina_score"=>(float)$row["stamina_score"],
			"strength_score"=>(float)$row["strength_score"],
			"equipment_score"=>(float)$row["equipment_score"],
			"email" => $row["email"],
			"name" => $row["name"],
			"avatar" => $avatar,
			"facebook_data" => $row["facebook_data"],
			"current_location" => $row["current_location"],
			"current_location" => $row["current_location"]);
		$friends[] = $friend;
	}

	$dbc->close();
	print json_encode($friends);
?>
