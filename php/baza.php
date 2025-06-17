<?php
    $baza = mysqli_connect("localhost", "root", "", "web_shop");

    if(! $baza){
        die("Greska pri konekciji" .mysqli_connect_error());
    }
    


    $email = $_POST['Email'];
    $telefon = $_POST['Telefon'];
    $upit = $_POST['Upit'];

    $baza->query("INSERT INTO sajt (email, telefon, upit) VALUES ('$email', '$telefon', '$upit') ");










?>