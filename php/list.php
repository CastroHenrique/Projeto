<?php
include_once "conexao.php";
$query_usuarios = "SELECT id, nome, sobrenome, emai, senha  FROM usuario";
$result_usuarios = $conn->prepare($query_usuarios);
$result_usuarios->execute();
$dados = "";
while ($row_usuario = $result_usuarios->fetch(PDO::FETCH_ASSOC)) {
    extract($row_usuario);
    $dados .= "<tr>
    <td>$id</td>
    <td>$nome</td>
    <td>$sobrenome</td>
    <td>$emai</td>
    <td>$senha</td>
    </tr>";
}
echo $dados;