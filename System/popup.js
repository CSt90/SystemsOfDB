//$('.datepicker').prop('disabled', false); //enable calendar input
function pwPopup(link){
	console.log(link);
	if ($('#custom-popup').css('visibility') == 'visible'){
		$('#custom-popup').show();
		$('#pw-input').css('background-color', 'white');
		$('#pw-status').css('visibility', 'hidden');
	}
	else{
		$('#custom-popup').css('visibility','visible');
	}
	$('#pw-input').focus();
	$('#pw-input').keyup(function (e) {
	//    console.log(e.which);
		if (e.which == 13){
			$('#pw-confirm').click();
			e.preventDefault();
		}
		else if(e.which==27){
			$('#pw-cancel').click();
		}
	});

	$('#pw-confirm').on('click', function(){
		pw = $('#pw-input').val();
		console.log('li clicked');
		$.ajax({
			url: 'dbmanagement/checkPassword.php',
			type: 'POST',
			cache: false,
			data: {'upass': pw},
			success: function(data){
				if (data == 'Password match'){
					$('#custom-popup').hide();//css('visibility', 'hidden');
					$('#pw-input').val('');
					switch(link){
						case 'Invoices':
							link = 'Invoices/selectInvoices.php';
							break;
						case 'Delete Reservations':
							link = 'Cleanup/selectCleanup.php';
							break;
						/* case 'Backup':
							link = 'dbmanagement/backup.php';
							break;
						case 'Restore':
							link = '/dbmanagement/restore.php';
							break; */
					}
					window.location.href = link;
					console.log(link);
					link ='';
					pw = true;
					/* if (win) {
						//Browser has allowed it to be opened
						//win.focus();

						//location.reload();
						console.log('yolo');
					} else {
						//Browser has blocked it
						alert('Please allow popups for this website');
					} */
				}
				else{
					$('#pw-input').css('background-color', 'rgba(255, 120, 120, 0.7)');
					$('#pw-status').text('Wrong password. Try again');
					$('#pw-status').css('visibility', 'visible');
					$('#pw-status').css('color', 'red');
					pw = false;
				}
			data = '';
			}
		});
		return pw;
	});

	$('#pw-cancel').on('click', function(){
		$('#pw-input').val('');
		$('#pw-input').focus();
		$('#custom-popup').css('visibility','hidden');
	});

	$('#change-pw-btn').on('click', function(){
		if($('#pw-block').attr('class') == 'short'){
			$('#pw-block').removeClass('short');
			$('#pw-block').addClass('long');
			$('#change-pw-block').css('visibility', 'visible');
			$('#old-pw-input').focus();
		}
		else{
			$('#old-pw-input').val('');
			$('#new-pw-input').val('');
			$('#pw-block').removeClass('long');
			$('#pw-block').addClass('short');
			$('#change-pw-block').css('visibility', 'hidden');
			$('#pw-input').focus();
		}
	});

	$('#change-pw-btn').keyup(function(e){
		if (e.which == 9)
			if($('#pw-block').attr('class') == 'short')
				$('#pw-input').focus();
	});


	$('#old-pw-input').keyup(function(e){
		if(e.which == 13 && $('#old-pw-input').val() != ''){
			$('#new-pw-input').focus();
		}
		else if (e.which == 27){
			$('#old-pw-input').val('');
	//        $('#old-pw-input').css('background-color', 'white');
		}
	});

	$('.show-hide-chars').mousedown(function(){
		$(this).prev().attr('type', 'text');
	}).mouseup(function(){
		$(this).prev().attr('type', 'password');
	}).mouseout(function(){
		$(this).prev().attr('type', 'password');
	});

	$('#new-pw-confirm').on('click', function(){
		if($('#old-pw-input').val() == ''){
			$('#old-pw-input').focus();
			$('#old-pw-input').css('background-color', 'rgba(255, 120, 120, 0.7)');
		}
		else{
			$('#old-pw-input').css('background-color', 'white');
			oldpw = $('#old-pw-input').val();
		}
		if($('#new-pw-input').val().length < 4){
			$('#new-pw-input').css('background-color', 'rgba(255, 120, 120, 0.7)');
			$('#pw-status').text('Password too short. Try again');
			$('#pw-status').css('visibility', 'visible');
			$('#pw-status').css('color', 'red');
		}
		else{
			$('#new-pw-input').css('background-color', 'white');
			newpw = $('#new-pw-input').val();
			$.ajax({
				url: '/dbmanagement/setNewPassword.php',
				type: 'POST',
				cache:false,
				data: {'oldpass':oldpw, 'newpass': newpw},
				success: function(data){
					console.log(data);
					if (data == 'Password changed.'){
						$('#change-pw-btn').click();
						$('#pw-status').text(data);
						$('#pw-status').css('visibility', 'visible');
						$('#pw-status').css('color', 'black');
					}
					else{
						if (data == 'Password incorrect. Try again'){
							$('#old-pw-input').css('background-color', 'rgba(255, 120, 120, 0.7)');
						}
						else{
							$('#old-pw-input').css('background-color', 'rgba(255, 120, 120, 0.7)');
							$('#new-pw-input').css('background-color', 'rgba(255, 120, 120, 0.7)');
						}
						$('#pw-status').text(data);
						$('#pw-status').css('visibility', 'visible');
						$('#pw-status').css('color', 'red');
					}
				}
			});
		}
	});

	$('#new-pw-input').keyup(function(e){
		if (e.which == 13){
			$('new-pw-confirm').click();
		}
		else if (e.which == 27){
			$('#new-pw-input').val('');
	//        $('#new-pw-input').css('background-color', 'white');
		}
	});

	$('#new-pw-cancel').on('click', function(){
		$('#change-pw-btn').click();
	});

	$('#new-pw-cancel').keyup(function(e){
		if(e.which == 9)
			$('#pw-input').focus();
	});
}
