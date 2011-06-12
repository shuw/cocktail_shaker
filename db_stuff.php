<?php
function connect()
{
	$db = mysqli_connect("mysql2902int.dotsterhost.com", "u1008784_MyBar", "MyBar123", "db1008784_MyBar", "3306");
	return $db;
}
?>