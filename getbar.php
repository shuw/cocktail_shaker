<?php
include_once "db_stuff.php";

header('Access-Control-Allow-Origin: *');

$db = connect();
$uid = mysqli_real_escape_string($db, $_GET['uid']);
if (!isset($uid))
{
  echo "NEED A UID!!!!";
  exit;
}

$result = mysqli_query($db, 'SELECT * FROM `users_bar` WHERE `uid` = "'.$uid.'"');

if (!isset($result))
{
	echo "Error: " . $db->error;
}

$bar = array();
while($row = mysqli_fetch_array($result))
{
   $bar[] = $row['ingredient'];
}
echo json_encode($bar);

?>
