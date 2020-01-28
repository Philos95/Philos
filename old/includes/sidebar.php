<?php
	$sidebar = true;

	$query ="SELECT * from moduli Order by Node";
    $sql= $db->prepare($query);
    $sql->execute();
    $moduliRows = $sql->fetchAll(PDO::FETCH_ASSOC);

	
?>

<div class="d-flex" id="wrapper">
<!-- sidebar menu -->
 <div class="sidebar bg-white-2">
	<div class="menu">
      	<ul class="menu scrollbar">
      	<!-- dropdown menu -->
			<li>
				<ul>
					<li><a href="<?php echo $http_root; ?>"><i class="fa fa-home" aria-hidden="true"></i>Home</a></li>
				</ul>
			</li>

			<?php 
				foreach ($moduliRows as $row){
					
				echo "<li>";
				echo 	"<ul>";
				echo		"<li><a href='".$http_root.$row['Url']."'><i class='".$row['Icon']."' aria-hidden='true'></i>".$row["NameMenu"]."</a></li>";
				echo 	"</ul>";
				echo "</li>";
				
				}
			?>




			<li>
				<ul>
					<li><a href="#" id = "logout"><i class="fas fa-sign-out-alt"></i>Logout</a></li>
				</ul>
			</li>
    	</ul>
    </div>
</div>



	<!-- website content -->
	<div class="content">
		<nav class="navbar navbar-expand-lg fixed-top bg-white-2">
			<a class="navbar-brand navbar-title" href="#">Sidebar menu</a>
				<span class="navbar-text">
					<a href="#" id="sidebar" class="bars">
						<i id="sidebarToggle" class="fas fa-angle-double-left"></i>				
					</a>
				</span>
		</nav>

		<div class="container-fluid">
			<div class="row">
				<div class="col-xs-12" >
                    <div class="box">
                        <div class="box-body">
							<h1><?php echo $titoloSezione;?></h1>
						</div>
                	</div>  
            	</div>
			</div>
			<div class="row">
				<div class="col-xs-12" >
                    <div class="box">
                        <div class="box-body">
					
		