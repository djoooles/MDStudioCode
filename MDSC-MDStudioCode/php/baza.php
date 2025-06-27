<?php
header('Content-Type: application/json');

// Provera da li su podaci poslati POST metodom
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $tel = $_POST['tel'] ?? '';
    $upit = $_POST['upit'] ?? '';
    
    // Ovde dodajte logiku za čuvanje podataka u bazu
    
    // Simulacija uspešnog slanja
    echo json_encode([
        'success' => true,
        'message' => 'Poruka je uspešno poslata!'
    ]);
    exit;
}

// Ako nije POST zahtev
echo json_encode([
    'success' => false,
    'message' => 'Nevalidan zahtev'
]);
exit;
?>