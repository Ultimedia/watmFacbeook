<?php
	require_once("core_functions.php");

	$dbc = getDBConnection();		
	$sql = "SELECT count(*) as total FROM watm_challenges a WHERE visible=1";

	$result = $dbc->query($sql);

	while($row = $result->fetch_assoc()){
		echo $row["total"];
	}
	$dbc->close();
?>

