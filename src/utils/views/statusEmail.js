export const message = ({ username } = {}) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received</title>
  
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

    .highlight {
      color: #1976D2;
      font-weight: bold;
      font-size: 18px;
      display: block;
      margin-top: 20px;
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
      display: inline-block;
      font-size: 25px; 
      color: rgb(255, 255, 255); 
    }

    .social-icons a:hover {
      color: #1976D2; 
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>Thank You for Applying to ${username}!</h1>

    <p>We appreciate your interest in joining our team. Your application has been received, and our recruitment team will review it shortly.</p>

    <p>Your application reference code is:</p>
    <span class="highlight"></span>

    <div class="social-icons">
      <a href="#"><i class="fab fa-facebook"></i></a>
      <a href="#"><i class="fab fa-twitter"></i></a>
      <a href="#"><i class="fab fa-linkedin"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a>
    </div>
  </div>

</body>
</html>`;
