<?php
	require_once("core_functions.php");

	$dbc = getDBConnection();		
	$sql = "SELECT c.sport_id, c.activity_id, i.sport_title, count(c.sport_id) FROM watm_activities c
			LEFT JOIN watm_sports i on (c.sport_id=i.sport_id)
			GROUP BY c.sport_id
			ORDER BY count(i.sport_id)";
	
	$result = $dbc->query($sql);
	$sports = array();
	
	while($row = $result->fetch_assoc()){
		$sport = array("sport_id" => $row["sport_id"], "sport_title" => $row["sport_title"]);
		$sports[] = $sport;
	}
	

	$dbc->close();
	print json_encode($sports);
?>
