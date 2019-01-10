Pusher.logToConsole = true;

var pusher = new Pusher('5fb69c9d534cd55d78e7', {
	cluster: 'ap1',
	forceTLS: true
});

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
	getOnlineCashiers();
	getlastcashierSaTrans();
	getLastqueue();
	getLastqInTransFin();
	getLastqueueInReg();
	countCashiers();
	numberOfTransOfCashier();
	totalTrans();
	// checkAvailability();
	studentList();
	getCashier();
});