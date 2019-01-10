Pusher.logToConsole = true;

var pusher = new Pusher('5fb69c9d534cd55d78e7', {
	cluster: 'ap1',
	forceTLS: true
});

var channel = pusher.subscribe('channel2');
channel.bind('event2', function(data) {
	//Problems are here
	QueueList() ;
	tableTrans();
	tableReg();
	countInline();
	countOnline();
	showLog();
	showLogReg();
	queueServing1();
	queueServingTrans();

});