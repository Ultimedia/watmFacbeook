<?php
	$new_image_name =  $_POST["value1"];
	$destination = $_SERVER['DOCUMENT_ROOT'] ."/watm/common/uploads/".$new_image_name;
	move_uploaded_file($_FILES["file"]["tmp_name"], $destination);
?>


