<?php
    // Database connection with error handling
    $baza = mysqli_connect("localhost", "root", "", "web_shop");
    if ($baza->connect_error) {
        die("Greška pri konekciji sa bazom podataka: " . $baza->connect_error);
    }

    // Validate and sanitize input
    function sanitizeInput($data) {
        return htmlspecialchars(stripslashes(trim($data)));
    }

    // Check required fields
    $required = ['email', 'telefon', 'upit'];
    foreach ($required as $field) {
        if (empty($_POST[$field])) {
            header("Location: ../index.html?error=missing_$field");
            exit();
        }
    }

    // Prepare data
    $email = sanitizeInput($_POST['email']);
    $telefon = sanitizeInput($_POST['telefon']);
    $upit = sanitizeInput($_POST['upit']);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: ../index.html?error=invalid_email");
        exit();
    }

    // Prepare and execute SQL statement (prepared statement for security)
    $stmt = $baza->prepare("INSERT INTO sajt (email, telefon, upit) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $telefon, $upit);
    
    if ($stmt->execute()) {
        $poruka = "Uspešno ste poslali upit!";
        $status = "success";
    } else {
        $poruka = "Došlo je do greške: " . $baza->error;
        $status = "error";
    }
    $stmt->close();
    $baza->close();
?>

<!DOCTYPE html>
<html lang="sr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Potvrda upita - MD Studio Code</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #d70e5f;
            --secondary: #fdcc04;
            --dark: #000000;
            --light: #ffffff;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f5f5f5;
            color: #333;
        }
        
        nav {
            height: 80px;
            background: var(--dark);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 2rem;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .logo {
            color: var(--light);
            font-size: 1.8rem;
            font-weight: bold;
            font-style: italic;
        }
        
        .nav-items {
            display: flex;
            gap: 1.5rem;
        }
        
        nav a {
            text-decoration: none;
            color: var(--light);
            font-weight: 500;
            transition: color 0.3s;
        }
        
        nav a:hover {
            color: var(--primary);
        }
        
        .hero {
            background: var(--secondary);
            min-height: calc(100vh - 80px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .confirmation-container {
            max-width: 800px;
            width: 100%;
            margin: 0 auto;
        }
        
        .confirmation-card {
            background: var(--light);
            border-radius: 15px;
            padding: 3rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            text-align: center;
            transform: translateY(0);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .confirmation-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        
        .status-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
        }
        
        .success { color: #28a745; }
        .error { color: #dc3545; }
        
        .confirmation-card h1 {
            font-size: 2.2rem;
            margin-bottom: 1.5rem;
            color: var(--dark);
        }
        
        .confirmation-card p {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
            color: #555;
        }
        
        .btn-return {
            display: inline-block;
            padding: 1rem 2.5rem;
            background: var(--dark);
            color: var(--light);
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            border: 2px solid var(--dark);
        }
        
        .btn-return:hover {
            background: transparent;
            color: var(--dark);
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        @media (max-width: 768px) {
            .confirmation-card {
                padding: 2rem 1.5rem;
            }
            
            .confirmation-card h1 {
                font-size: 1.8rem;
            }
            
            nav {
                flex-direction: column;
                height: auto;
                padding: 1rem;
            }
            
            .nav-items {
                margin-top: 1rem;
                flex-wrap: wrap;
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <nav>
        <div class="logo">MD Studio Code</div>
        <div class="nav-items">
            <a href="../index.html"><i class="fas fa-home"></i> Početna</a>
            <a href="#"><i class="fas fa-users"></i> O nama</a>
            <a href="#"><i class="fas fa-envelope"></i> Kontakt</a>
        </div>
    </nav>

    <section class="hero">
        <div class="confirmation-container">
            <div class="confirmation-card">
                <div class="status-icon">
                    <?php if ($status === 'success'): ?>
                        <i class="fas fa-check-circle success"></i>
                    <?php else: ?>
                        <i class="fas fa-exclamation-circle error"></i>
                    <?php endif; ?>
                </div>
                <h1><?php echo htmlspecialchars($poruka); ?></h1>
                <p>Hvala Vam što ste nas kontaktirali. Naš tim će obraditi Vaš upit i javiti Vam se u najkraćem mogućem roku.</p>
                <a href="../index.html" class="btn-return">
                    <i class="fas fa-arrow-left"></i> Vratite se na početnu stranicu
                </a>
            </div>
        </div>
    </section>
</body>
</html>