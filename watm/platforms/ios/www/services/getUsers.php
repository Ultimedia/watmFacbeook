<?php
	require_once("core_functions.php");

	$dbc = getDBConnection();
	$sql = "SELECT * FROM watm_users WHERE visible=1";

	$result = $dbc->query($sql);
	$users = array();
	$avatar;

	while($row = $result->fetch_assoc()){

		if($row["avatar"] == null){
			$avatar = "default.png";
		}else{
			$avatar = $row["avatar"];
		}

		$user = array("user_id" => $row["user_id"],
			"facebook_id" => $row["facebook_id"],
			"stamina_score"=>(float)$row["stamina_score"],
			"strength_score"=>(float)$row["strength_score"],
			"equipment_score"=>(float)$row["equipment_score"],
			"email" => $row["email"],
			"name" => $row["name"],
			"avatar" => $avatar,
			"age" => $row["age"],
			"gender" => $row["gender"],
			"facebook_data" => $row["facebook_data"],
			"current_location" => $row["current_location"],
			"admin" => $row["admin"]);
		$users[] = $user;
	}

	$dbc->close();
	print json_encode($users);
?>
