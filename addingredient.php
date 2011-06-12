<?php
include_once "db_stuff.php";

header('Access-Control-Allow-Origin: *');

$db = connect();
$uid = mysqli_real_escape_string($db, $_GET['uid']);
$ingredients = explode(',',urldecode($_GET['ingredients']));

if (empty($uid))
{
  echo "NEED A UID!!!!";
  exit;
}
if (empty($ingredients))
{
   echo "NEED ingredients!!!";
   exit;
}
foreach ($ingredients as $ingredient)
{
   if (empty($ingredient))
   {
      continue;
   }
   $query = "INSERT INTO `users_bar` (`uid`, `ingredient`) VALUES ('%s', '%s')";
   $query = sprintf($query, $uid, $ingredient);
   $result = mysqli_query($db, $query);

   if (!isset($result))
   {
	echo "Error: " . $db->error;
   }
   
}


echo "DONE!";

?>
