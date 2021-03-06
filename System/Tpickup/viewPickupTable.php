<?php // change all to mysqli format

	include '../db_connect_conf.php';
	if (isset($_GET['error']))
		$error = $_GET['error'];
?>

<html>

<head><meta charset="UTF-8">
<title>Pickups table</title>
</head>

<link rel="stylesheet" type="text/css" href="../css/simpleTablePage.css">
<script src="../jsq/jquery-3.1.0.min.js"></script>
<script src="../jsq/submitAndBg.js"></script>
<script src="js/pickupDelete.js"></script>

<body>
	<div id='home-logo' ><a href='../home.php'></a></div>
	<img id='bg' src='../background/waves_beach.jpg'>
	<h2 id='page-title'> All pickups</h2>
	<div id='message_boxes'>
		<div id="editsuccessbox" style="display:none;">
			<img id="editsuccessV" src="../msgicon/bluetick.png" height="32" width="32">
			<span id="editsuccessmsg">Edit successful</span>
		</div>
<?php if (isset($_GET['error']))
	echo"<div id='errorbox'>
			<img id='errorx' src='../msgicon/x2.png' alt='Error' height='32' width='32'>
			<span id='errormsg'>$error</span>
		</div>";
?>
	</div>

<?php
	$query = "SELECT * FROM pickup ORDER BY PPointGroup, idPickup";  //You don't need a ; like you do in SQL
	$result = mysqli_query($conn, $query);
	$max = mysqli_fetch_assoc(mysqli_query($conn, "SELECT MAX(idPickup) AS max FROM pickup"));
?>

<?php
	echo "<table id='ptable'>"; // start a table tag in the HTML

	echo "<tr id='Cnames'>
			<td class='empty_cell'></td>
			<td> Pickup ID </td>
			<td> Pickup Point </td>
			<td> Pickup Point Group </td>
			<td class='empty_cell'></td>
		  </tr>";

	if(@mysqli_num_rows($result)>0){ //throws warning if table is empty - @<function> hides it
		while($row = mysqli_fetch_array($result)){ //Creates a loop to loop through results
			echo "<tr>
				<td class='deleteCell'>
					<div class='deleteDiv' onmouseover='showDelRow(this.parentNode.parentNode)' onmouseout='hideDelRow(this.parentNode.parentNode)' onclick='deleteRow(this.parentNode.parentNode)'> &#8210 </div>
				</td>
				<td class='c1'><p>" . $row['idPickup'] . "</p></td>
				<td class='c2'><p>" . $row['PPoint'] . "</p></td>
				<td class='c3'><p>" . $row['PPointGroup'] . "</p></td>
				<td class='empty_cell'></td>
			</tr>"; //$row['index'] the index here is a field name
		}
	}

	//the add new table entry button shows up as a table field with full table width marked by '+'
	//colspan='<num of columns>' to give full table width
	//echo "<tr><td id='add' colspan=".mysqli_num_rows(mysqli_query($conn, 'DESCRIBE bus'))."><a href='#'><div class='opBtn'> + </div></a></td></tr>";
	$tableCols = mysqli_num_rows(mysqli_query($conn, 'DESCRIBE pickup'));
?>
			<tr id='add_new'>
				<form id='add1' action='insertIntoPickupTable.php' method='post'>
					<td class='empty_cell'></td> <!-- 'delete-button' column -->
					<td class='last_row_cell'>
						<input type='text' name='idPickup' id='txtcell' value = '<?php print_r((int)($max['max']+10)) ?>' style='text-align:center'>
					</td>
					<td class='last_row_cell'>
						<input type='text' name='PPoint' id='txtcell'>
					</td>
					<!-- <td>
						<input type='text' name='PPRow' id='txtcell'>
					</td> -->
					<td class='last_row_cell'>
						<input type='text' name='PPointGroup' id='txtcell'>
					</td>
					<td class='submit_cell'>
						<div id='add'>
							<button type='submit' id='submit'> + </button>
						</div>
					</td>
				</form>
			</tr>
		</table>

<?php
	mysqli_close($conn); //Make sure to close out the database connection
?>
	</body>
</html>
