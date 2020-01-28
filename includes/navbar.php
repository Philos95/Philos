<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="<?php echo $http_root."index.php"?>">Philo's Coding</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="https://github.com/Philos95/philos">GitHub <span class="sr-only">(current)</span></a>
      </li>

      <li class="nav-item active" <?php if ($_SESSION["username"]!=""){echo "hidden";} ?>>
        <a class="nav-link" href="<?php echo $http_root."admin/adminlogin.php"?>">Login <span class="sr-only">(current)</span></a>
      </li>

      <li class="nav-item active" <?php if ($_SESSION["username"]==""){echo "hidden";} ?>>
        <a class="nav-link" href="<?php echo $http_root."admin/adminindex.php"?>">Admin <span class="sr-only">(current)</span></a>
      </li>
      
    </ul>
  </div>
</nav>
