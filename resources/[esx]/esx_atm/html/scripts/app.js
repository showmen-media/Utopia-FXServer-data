$(window).ready(function () {
	var t = [
		"Πες το!",
		"Τι έχουμε?",
		"Παίξε μπαλίτσα…",
		"Τι θα θέλαμε?",
		"Πείτε μας!",
		"Τι επιθυμείς?",
		"Δώσε!"
	];

	window.addEventListener('message', function (event) {
		let data = event.data;

		if (data.showMenu) {
			document.querySelector("#welcome-text span").innerText = (
				t[Math.floor(Math.random() * t.length)]
			);
			$('#container').fadeIn();
			$('#menu').fadeIn();
			$('#deposit_amount').val((data.player.money / 100).toFixed(2));

			let bankAmount = 0;
			for (let i = 0; i < data.player.accounts.length; i++) {
				if (data.player.accounts[i].name == 'bank') {
					bankAmount = data.player.accounts[i].money;
				}
			}

			$('#withdraw_amount').val((bankAmount / 100).toFixed(2));
		} else if (data.hideAll) {
			$('#container').fadeOut();
		}
	});

	document.onkeyup = function (data) {
		if (data.which == 27) {
			$.post('http://esx_atm/escape', '{}');
		}
	};

	$('#container').hide();

	$('#deposit_btn').on('click', function () {
		$.post('http://esx_atm/deposit', JSON.stringify({
			amount: $('#deposit_amount').val() * 100
		}));

		$('#deposit_amount').val(0);
	})

	$('#deposit_amount').on("keyup", function (e) {
		if (e.keyCode == 13) {
			$.post('http://esx_atm/deposit', JSON.stringify({
				amount: $('#deposit_amount').val() * 100
			}));

			$('#deposit_amount').val(0);
		}
	});

	$('#withdraw_btn').on('click', function () {
		$.post('http://esx_atm/withdraw', JSON.stringify({
			amount: $('#withdraw_amount').val() * 100
		}));

		$('#withdraw_amount').val(0);
	});

	$('#withdraw_amount').on("keyup", function (e) {
		if (e.keyCode == 13) {
			$.post('http://esx_atm/withdraw', JSON.stringify({
				amount: $('#withdraw_amount').val() * 100
			}));

			$('#withdraw_amount').val(0);
		}
	});

});
