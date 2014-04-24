<?php
	require_once("core_functions.php");

	$activity_id = $_POST['activity_id'];
	$dbc = getDBConnection();		
	$sql = "SELECT * FROM watm_activity_users LEFT JOIN watm_users ON watm_activity_users.user_id = watm_users.user_id WHERE activity_id =" . $activity_id;

	$result = $dbc->query($sql);
	$project_user_info = array();

	while($row = $result->fetch_assoc()){
		$pr = array("user_id" => $row["user_id"], "avatar" => $row["avatar"], "going" => $row["going"], "activity_id" => $row["activity_id"]);
		$project_user_info[] = $pr;
	}

	$dbc->close();
	print json_encode($project_user_info);
?>