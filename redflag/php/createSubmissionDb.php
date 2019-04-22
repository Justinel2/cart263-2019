<?php
class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('/db/submissions.db');
      }
   }
try
{
   $db = new MyDB();
   echo ("Opened or created the data base successfully<br \>");
}
catch(Exception $e)
{
   die($e);
}
$theQuery = 'CREATE TABLE submission (ID INTEGER PRIMARY KEY NOT NULL, firstName TEXT, lastName TEXT, age INT, location TEXT, social TEXT, description TEXT, flags TEXT, platform TEXT)';
 $ok = $db ->exec($theQuery);
	// make sure the query executed
	if (!$ok)
	die($db->lastErrorMsg());
	// if everything executed error less we will arrive at this statement
	echo "Submission database successfully created<br \>";
?>
