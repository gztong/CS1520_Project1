<!DOCTYPE html>
<html>
<head>
  <title>Site Admin - Gangzheng </title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  <link rel="stylesheet" href="../css/admin-style.css">
  <link rel="shortcut icon" href="../favicon.ico"/>
</head>
<body>
  <div class="info">
    <h1>
      Login to My Admin
    </h1>
  </div>
  <div class="content">
    <form action="checklogin.php" method="POST">
      <div class="input-group input-group-lg row">
        <span class="input-group-addon" id="sizing-addon1">username</span>
        <input type="text" class="form-control" name="username" required="required" />
      </div>

      <div class="input-group input-group-lg row">
        <span class="input-group-addon" id="sizing-addon1">password</span>
        <input type="password" class="form-control" name="password" required="required" />  
      </div>
      <div class="row">
        <input class="btn btn-primary btn-lg login-button" type="submit" value="submit">
      </div>
    </form>
  </div>
</body>
</html>