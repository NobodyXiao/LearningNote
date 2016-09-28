<?php

$username = $GET['username'];
$password = $GET['password'];
$flag = 1;

if($username == 'admin' && password == '123'){
	echo 2;
}else{
	echo 0;
}

?>