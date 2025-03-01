export const form = ({code}={}) =>`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Activate Your Account</title>
  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <style>
   
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      word-wrap: break-word;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Ubuntu, sans-serif;
    }
    body {
      min-height: 100%;
      background-color: #121212; 
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }
    h1, p {
      text-align: center;
      font-family: 'Ubuntu Mono', monospace;
    }

    .container {
      max-width: 600px;
      background-color: #1E1E1E; 
      padding: 30px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      text-align: center;
    }

    h1 {
      font-size: 24px;
      font-weight: bold;
      color: #1976D2; 
    }

    p {
      font-size: 16px;
      line-height: 1.5;
      color: #D1D1D1; 
    }

  
    .button {
      background-color: #1976D2;
      color: #ffffff;
      font-weight: bold;
      padding: 12px 20px;
      text-decoration: none;
      border-radius: 5px;
      display: inline-block;
      margin-top: 20px;
    }

    .button:hover {
      background-color: #1565C0;
      color: #ffffff; 
    }

   
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #D1D1D1; 
    }

    .footer a {
      text-decoration: underline;
      color: #ffffff; 
    }

    .footer a:hover {
      color: #ffffff; 
    }

    .social-icons {
      margin-top: 20px;
    }

    .social-icons a {
      margin: 0 10px;
      display: block;
      font-size: 25px; 
      color:rgb(255, 255, 255); 
    }

    .social-icons a:hover {
      color: #1976D2; 
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>Thank You for !</h1>

   
    <p>You are just one step away from completing your registration. Activate your account by clicking the button below to start your web development career and gain access to CodeWiz courses, tutorials, and freebies!</p>

  
    <h2 href=""class="button"> ${code}</h2>

   
    <div class="social-icons">
      <a href="https://www.facebook.com/TheCodeWiz"><i class="fab fa-facebook"></i></a>
      <a href="https://twitter.com/The_Code_Wiz"><i class="fab fa-twitter"></i></a>
      <a href="https://www.linkedin.com/company-beta/25038583"><i class="fab fa-linkedin"></i></a>
      <a href="https://www.instagram.com/the.codewiz"><i class="fab fa-instagram"></i></a>
    </div>
  </div>

</body>
</html>`
