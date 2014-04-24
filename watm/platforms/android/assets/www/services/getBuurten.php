<?php
	require_once("core_functions.php");

	$dbc = getDBConnection();		
	$sql = "SELECT * FROM watm_buurten";
	
	$result = $dbc->query($sql);
	$buurten = array();
	
	while($row = $result->fetch_assoc()){
		$buurt = array("buurt_id" => $row["buurt_id"], "buurt" => $row["buurt"]);
		$buurten[] = $buurt;
	}

	$dbc->close();
	print json_encode($buurten);
?>
