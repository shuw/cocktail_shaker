<?php
include_once "db_stuff.php";

header('Access-Control-Allow-Origin: *');

$db = connect();
$uid = mysqli_real_escape_string($db, $_GET['uid']);
$ingredient = urldecode($_GET['ingredient']);

if (empty($uid))
{
  echo "NEED A UID!!!!";
  exit;
}
if (empty($ingredient))
{
   echo "NEED ingredient!!!";
   exit;
}
$query = "DELETE FROM `users_bar` WHERE `uid` = '%s' AND `ingredient` = '%s' LIMIT 1";
$query = sprintf($query, $uid, $ingredient);
$result = mysqli_query($db, $query);

if (!isset($result))
{
	echo "Error: " . $db->error;
}

echo "DONE!";

?>
