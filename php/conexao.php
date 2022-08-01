<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "proj";
$port = 3306;


try {
    //conexão com a porta
    $conn = new PDO("mysql:host=$host;port=$port;dbname=" . $dbname, $user, $pass );
    //conexão sem a porta
  // $conn = new PDO("mysql:host=$host;dbname=" . $dbname, $user, $pass );
    //echo "Conexão com banco de dados realizado com sucesso!";
} catch(PDOException $err){
    echo "Erro: Conexão com banco de dados não foi realixada com sucesso.". $err->getMessage();
}
?>
