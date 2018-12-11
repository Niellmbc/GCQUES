
let url="http://NIELLAMBACO/GQUESAPI";
let lastqueue;
let lastqueueInReg;
let lastqueueInTransFin;
let LeastTransOfCashier;
let totalcashier;
let lastTimeArrival;
let totalTransaction;
let getOnlineCashier =[];
let a=0;
let lastcashiersatrans;
let tbl_trans=[];
let tbl_reg = [];
let getOnlineCashiers =()=>{
	fetch(url+'/tbl_cashier/fldStatus/Online').then(res=>res.json()).then(function(res){
		for(let i=0;i<res.length;i++){
			getOnlineCashier[i]=res[i].fldCashierID;
		}
		
	});
}
window.setInterval(getOnlineCashiers,1000);
let getlastcashierSaTrans =()=>{
	fetch(url+'/tbl_transaction?ORDERBY=fldTransID%20DESC').then(res=>res.json()).then(function(res){
		if(res.length==0){
		}else{
			lastcashiersatrans = res[0].fldCashierNo;
		}
	});
	
}

window.setInterval(getlastcashierSaTrans,1000);
let getCashier = ()=>{
	fetch(url+'/tbl_cashier').then(res=>res.json()).then(function(res){
		let ls="";
		for(let i=0;i<res.length;i++){
			if(res[i].fldRemarks=='Available'){

				ls+="<tr>";
				ls+="<td>"+res[i].fldLname+', '+res[i].fldFname+', '+res[i].fldMname+"</td>";
				ls+="<td>"+res[i].fldCashierID+"</td>";
				ls+="<td>"+res[i].fldUsername+"</td>";
				ls+='<td><a class="blue-text" data-placement="top" data-toggle="modal" data-target="#seeResult" onclick="getCashierID('+res[i].fldCashierID+')"><i class="fa fa-user"></i></a><a class="red-text" data-toggle="tooltip" data-placement="top" title="Archive" onclick="archiveCashier('+res[i].fldCashierID+')"><i class="fa fa-archive"></i></a></td>';
				if(res[i].fldStatus=='Offline'){
					ls+='<td><span class="badge badge-pill red">'+res[i].fldStatus+'</span></td>';
				}else{
					ls+='<td><span class="badge badge-pill green">'+res[i].fldStatus+'</span></td>';
				}
			} 
		}
		$('#cashierlist').html(ls);
	});
}
// let getCashier = ()=>{
// 	fetch(url+'/tbl_cashier/fldRemarks/Available').then(res=>res.json()).then(function(res){
// 		$('#dtMaterialDesignExample1').DataTable({
// 			"scrollY": "490px",
// 			"scrollCollapse": true,
// 			'sort':true,
// 			retrieve: true,
// 			searching: true,
// 			data: res,
// 			columns:[
// 			{'data':'fldLname'},
// 			{'data':'fldCashierID'},
// 			{'data':'fldUsername'},
// 			{
// 				'data':'fldCashierID',
// 				'render': function(id){
// 					return '<a class="blue-text" data-placement="top" data-toggle="modal" data-target="#seeResult" onclick="getCashierID('+id+')"><i class="fa fa-user"></i></a><a class="red-text" data-toggle="tooltip" data-placement="top" title="Archive" onclick="archiveCashier('+id+')"><i class="fa fa-archive"></i></a>'
// 				}
// 			},
// 			{
// 				'data':'fldStatus',
// 				'render':function(stats){
// 					var color="";
// 					var badge;
// 					if (stats == "Offline") {
// 						color = 'text-danger';
// 						badge='badge badge-danger'
// 					}else if(stats == "Online"){
// 						color = 'text-success';
// 						badge='badge badge-success'
// 					}

// 					return "<span class='"+badge+" "+color+"'>"+stats+"</span>";
// 				}

// 			}
// 			]
// 		});
// 		$('.dataTables_length').addClass('bs-select');
// 	});
// }

// let studentList=()=>{
// 	fetch(url+'/tbl_student').then(res=>res.json()).then(function(res){
// 		let ls="";
// 		for(let i=0;i<res.length;i++){
// 			if(res[i].fldRemarks=='Available'){

// 				ls+="<tr>";
// 				ls+="<td>"+res[i].fldStudentNo+"</td>";
// 				ls+="<td>"+res[i].fldLname+"</td>";
// 				ls+="<td>"+res[i].fldFname+"</td>";
// 				ls+="<td>"+res[i].fldMname+"</td>";
// 				ls+="<td>"+res[i].fldDateAdded+"</td>";
// 				ls+='<td><a class="blue-text" data-placement="top" data-toggle="modal" data-target="#seeResultStud" onclick="getStudentID('+res[i].fldStudentNo+')"><i class="fa fa-user"></i></a><a class="red-text" data-toggle="tooltip" data-placement="top" title="Archive" onclick="archiveStudent('+res[i].fldStudentID+')"><i class="fa fa-archive"></i></a></td>';
// 			}
// 		} 
// 		$('#studentList').html(ls);

// 	});
// }
// studentList();
let studentList=()=>{
	fetch(url+'/tbl_student/fldRemarks/Available').then(res=>res.json()).then(function(res){
		$('#dtMaterialDesignExample').DataTable({
			"scrollY": "490px",
			"scrollCollapse": true,
			'sort':true,
			retrieve: true,
			searching: true,
			data: res,
			columns:[
			{'data':'fldStudentNo'},
			{'data':'fldLname'},
			{'data':'fldFname'},
			{'data':'fldMname'},
			{'data':'fldDateAdded'},
			
			{
				'data':'fldStudentNo',
				'render': function(id){
					return '<a class="blue-text" data-placement="top" data-toggle="modal" data-target="#seeResultStud" onclick="getStudentID('+id+')"><i class="fa fa-user"></i></a><a class="red-text" data-toggle="tooltip" data-placement="top" title="Archive" onclick="archiveStudent('+id+')"><i class="fa fa-archive"></i></a>'
				}
			}
			]
		});
		$('.dataTables_length').addClass('bs-select');
	});
}

studentList();
getCashier();
let getLastqueue=()=>{
	fetch(url+'/tbl_transaction?ORDERBY=fldTransID DESC').then(res=>res.json()).then(function(res){
		
		if(res.length==0){
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			
			var time = 8 + ":" + 30 +" "+'AM';
		    // var t = setTimeout(startTime, 500);

		    if(dd<10) {
		    	dd = '0'+dd
		    } 
		    if(mm<10) {
		    	mm = '0'+mm
		    } 
		    today = mm + '/' + dd + '/' + yyyy;
		    lastqueue =0;
		    lastTimeArrival =time;
		}else{
			lastqueue = res[0].fldQueueNo;
			lastTimeArrival = res[0].fldArrival;
		}
		

	});
}
window.setInterval(getLastqueue,1000);
let getLastqInTransFin = () =>{
	fetch(url+'/lastqInTransFin').then(res=>res.json()).then(function(res){
		if(res.length == 0){
			lastqueueInTransFin = 0;
		}else{
			lastqueueInTransFin = res[0].fldQueueNo;
		}
	});
}
window.setInterval(getLastqInTransFin,1000);
let getLastqueueInReg=()=>{
	fetch(url+'/tbl_registrar?ORDERBY=fldRegID DESC').then(res=>res.json()).then(function(res){
		if(res.length==0){
			lastqueueInReg =1;
		}else{
			lastqueueInReg = res[0].fldQueueNo;	
		}
	});
}
window.setInterval(getLastqueueInReg,1000);
let getLastCashier=()=>{
	fetch(url+'/tbl_cashier?ORDERBY=fldCashierID DESC').then(res=>res.json()).then(function(res){
		let lastcashierInDB;
		if(res==0){
			lastcashierInDB=1;
		}else{	
			lastcashierInDB = res[0].fldCashierID;
			lastcashierInDB++
		}
		document.getElementById('cID').value=lastcashierInDB;
		
	});
}
getLastCashier();

let countCashiers= ()=>{
	fetch(url+'/tbl_cashier/fldCashierID').then(res=>res.json()).then(function(res){
		totalcashier = res[0].totalcashier;

	});
}
window.setInterval(countCashiers,1000);
let numberOfTransOfCashier=()=>{
	fetch(url+'/tbl_transaction/fldCashierNo/fldCashierNo/trans').then(res=>res.json()).then(function(res){
		
		if(res.length==0){
			LeastTransOfCashier=0;
		}else{
			LeastTransOfCashier = res[0].fldCashierNo;
			
		}
	});
}
window.setInterval(numberOfTransOfCashier,1000);
let totalTrans = () =>{
	fetch(url+'/countTrans').then(res=>res.json()).then(function(res){
		totalTransaction = parseInt(res[0].totaltrans);
	});
	
}
window.setInterval(totalTrans,1000);


const MyCashier = class gques{
	addData(data,tblname){
		fetch(url+"/insert/"+tblname,{
			method:"POST",
			body:JSON.stringify([data])
		}).then(function(response){
			console.log(response);
		});
	}
	selectTable(tbl){
		fetch(url+'/'+tbl).then(res=>res.json()).then(function(response){
			console.log(response);
		});
	}
	updateData(id,tblname,fld,data){
		fetch(url+'/update/'+tblname+'/'+fld+'/'+id,{
			method:"POST",
			body:JSON.stringify([data])
		}).then(function(res){
			studentList();
			getCashier();
		});
		
	}
	updateDataNW(tblname,data){
		fetch(url+'/updatenw/'+tblname,{
			method:"POST",
			body:JSON.stringify([data])
		}).then(function(res){

		});
	}
	deletetable(tblname){
		fetch(url+"/clearTable/"+tblname).then(function (res){
		});
	}
}


let c = new MyCashier();

let newCashier=()=>{
	let data = {
		a:document.getElementById('cID').value,
		b:document.getElementById('cLname').value,
		c:document.getElementById('cFname').value,
		d:document.getElementById('cMname').value,
		e:document.getElementById('cBday').value,
		f:"",
		g:"Offline",
		h:document.getElementById('cUsername').value,
		i:document.getElementById('cPassword').value,
		j:'Available'
	}
	c.addData(data,'tbl_cashier');
	getCashier();
	
}

let getCashierID = (id)=>{
	localStorage.setItem('cashierID',id);
	fetch(url+'/tbl_cashier/fldCashierID/'+id).then(res=>res.json()).then(function(res){
		document.getElementById('cIDs').value=res[0].fldCashierID;
		document.getElementById('cLnames').value=res[0].fldLname;
		document.getElementById('cFnames').value=res[0].fldFname;
		document.getElementById('cMnames').value=res[0].fldMname;
		document.getElementById('cBdays').value=res[0].fldBday;
		if(res[0].fldStatus=='Online'){
			document.getElementById('cStatus').checked =true;
		}else if(res[0].fldStatus=='Offline'){
			document.getElementById('cStatus').checked =false;
		}
		document.getElementById('cUname').value=res[0].fldUsername;
		// document.getElementById('cPass').value=res[0].fldPassword;
	});
}
let getStudentID = (studid)=>{
	localStorage.setItem('studentID',studid);
	fetch(url+'/tbl_student/fldStudentNo/'+studid).then(res=>res.json()).then(function(res){
		document.getElementById('sIDs').value=res[0].fldStudentNo;
		document.getElementById('sLnames').value=res[0].fldLname;
		document.getElementById('sFnames').value=res[0].fldFname;
		document.getElementById('sMnames').value=res[0].fldMname;
		document.getElementById('sUname').value=res[0].fldUsername;

	});
}
let updateStatus = ()=>{
	let id=localStorage.cashierID;
	let status="";
	if(document.getElementById('cStatus').checked==true){
		status = "Online";
	}else{
		status = "Offline";
	}
	let data={
		fldStatus:status
	}
	if(status=="Online"){
		toastr.success('Cashier is Now Online');
	}else if(status=="Offline"){
		toastr.error('Cashier is Now Offline');
	}
	c.updateData(id,'tbl_cashier','fldCashierID',data);

}
let updateCashier=()=>{
	let id=localStorage.cashierID;
	let data ={
		fldCashierID:document.getElementById('cIDs').value,
		fldLname:document.getElementById('cLnames').value,
		fldFname:document.getElementById('cFnames').value,
		fldMname:document.getElementById('cMnames').value,
		fldBday:document.getElementById('cBdays').value,
		// fldStatus:document.getElementById('cStatus').value,
		fldUsername:document.getElementById('cUname').value,
		fldPassword:document.getElementById('cPass').value
	}
	toastr.success('Cashier Details Updated');
	c.updateData(id,'tbl_cashier','fldCashierID',data);
}
let updateStudents=()=>{
	let id=localStorage.studentID;
	let data ={
		fldStudentNo:document.getElementById('sIDs').value,
		fldLname:document.getElementById('sLnames').value,
		fldFname:document.getElementById('sFnames').value,
		fldMname:document.getElementById('sMnames').value,
		fldUsername:document.getElementById('sUname').value,
		fldPassword:document.getElementById('sPass').value
	}
	toastr.success('Student Details Updated');
	c.updateData(id,'tbl_student','fldStudentID',data);
}


let checkCashier = ()=>{
	if(totalTransaction >= 20){
		return LeastTransOfCashier;
	}else if(totalTransaction==0){
		return getOnlineCashier[0];
	}else if(getOnlineCashier.length==1){
		return getOnlineCashier[0];
	}else{
		for(let i=0;i<getOnlineCashier.length;i++){
			if(getOnlineCashier[i]==lastcashiersatrans){
				return getOnlineCashier[i+1];
			}else{
				if(getOnlineCashier[getOnlineCashier.length-1] == lastcashiersatrans){
					return getOnlineCashier[0];
				}else if(getOnlineCashier.length <3 ){
					if(getOnlineCashier.length-1<=a){
						a=0;
						return getOnlineCashier[a];
					}else{
						a++;
						return getOnlineCashier[a];
					}
				}
			}
		}
	}
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
function gotoReg(){
	window.location.assign('register.html');
}
let refreshRegister = ()=>{
	window.location.assign('register.html');
}
let newTrans=()=>{
	lastqueueInTransFin++; 
	lastqueueInReg++;
	var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	let goToC = checkCashier();
	var today = new Date();
	var dd = today.getDate();
	var dd1 = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var monthName = month[today.getMonth()];
	var yyyy = today.getFullYear();
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	var aorp = "";
	m = checkTime(m);
	s = checkTime(s);
	if (h > 12) {
		h = h-12;
		if(h == 0){
			h = 1;
		}
		aorp = "PM"; 
	} else { 
		aorp = "AM"; 
	}
	var time = h + ":" + m + ":" + s + " " + aorp;
    // var t = setTimeout(startTime, 500);
    if(dd<10) {
    	dd = '0'+dd
    } 
    if(mm<10) {
    	mm = '0'+mm
    } 
    today = mm + '/' + dd + '/' + yyyy;
    let t = lastTimeArrival.split(" ");
    let tm = t[0].split(":");
    let aorps = t[1];
    let hrs= tm[0];
    let minss= tm[1];
    let minss1 = parseInt(minss) + 5;
    if(minss >= 60 || minss1 >= 60 ){
    	minss = "00";
    	minss1 = "00";
    	hrs++;
    }
    if(hrs >= 12){
    	hrs = parseInt(hrs) - 12;
    	aorps= "PM";
    }else{
    	aorps = "AM";
    }
	//Add 5 mins in transaction for time arrival
	let timearrival=hrs+':'+checkTime(minss1)+" "+aorps;
	let dataTrans = {
		studentID:document.getElementById('rStudentID1').value,
		cashierNo:goToC,
		queueNo:lastqueueInTransFin,
		office:document.getElementById('rOffice1').value,
		type:document.getElementById('rTrans1').value,
		date:today+" "+time,
		day:yyyy+"-"+mm+"-"+dd1,
		arrival:timearrival,
		remarks:'In Line'
	}
	let dataReg = {
		studentID:document.getElementById('rStudentID1').value,
		queueNo:lastqueueInReg,
		office:document.getElementById('rOffice1').value,
		type:document.getElementById('rTrans1').value,
		date:today+" "+time,
		day:yyyy+"-"+mm+"-"+dd1,
		remarks:'In Line'
	}
	if(document.getElementById('rOffice1').value=='Finance'){
		if(getOnlineCashier.length==0){
			swal({
				title: "Invalid",
				text: "No Cashier Available At the Moment",
				type: "error",
				timer: 5000,
				html: true
			},
			function(){
				window.location.assign('register.html');
			});
		}else{
			c.addData(dataTrans,'tbl_transaction');
			toastr.success('Your Queue #: <h4>'+lastqueueInTransFin+'</h4><br>'+'Please Procceed to <h4>Cashier #:'+goToC+'</h4>');
			window.setTimeout(function(){
				swal({
					title: "Next Transaction",
					text: "Please Wait....",
					type: "success",
					timer: 1000,
					html: true
				},
				function(){
					window.location.assign('register.html');
				});
			},3000);
		}
	}else if(document.getElementById('rOffice1').value=='Registrar'){
		c.addData(dataReg,'tbl_registrar');
		toastr.success('Your Queue #: <h2>'+lastqueueInReg+'</h2><br>'+'Please Procceed to Registrar');
		window.setTimeout(function(){
			swal({
				title: "Next Transaction",
				text: "Please Wait....",
				type: "success",
				timer: 1000,
				html: true
			},
			function(){
				window.location.assign('register.html');
			});
		},3000);

	}
	// console.log(goToC);
	// console.log(goToC);


}
let logOutAccount =()=>{
	let status = {
		fldStatus: 'Offline'
	}
	let id = localStorage.cID;
	c.updateData(id,'tbl_cashier','fldCashierNo',status);
	localStorage.setItem('cID','');
	swal({
		title: "Logout Successful",
		text: "You are not Logged in",
		type: "success",
		timer: 1000,
		html: true
	},
	function(){
		window.location.assign('login.html');
	});
}
let logOutAdmin=()=>{
	localStorage.setItem('adminID','');
	swal({
		title: "Logout Successful",
		text: "You are not Logged in",
		type: "success",
		timer: 1000,
		html: true
	},
	function(){
		window.location.assign('login.html');
	});
}
let archiveCashier = (id)=>{
	let cRem = {
		fldRemarks:'Not Available'
	}
	c.updateData(id,'tbl_cashier','fldCashierNo',cRem);
	getCashier();
}
let archiveStudent = (id)=>{
	let cRem = {
		fldRemarks:'Not Available'
	}
	c.updateData(id,'tbl_student','fldStudentID',cRem);
	studentList();
}

let checkAvailability = ()=>{
	if(getOnlineCashier==0){
		document.getElementById('rStudentID').disabled=true;
		document.getElementById('rOffice').disabled=true;
		document.getElementById('rTrans').disabled=true;
		document.getElementById('rTypeStud').disabled=true;
	}else{
		document.getElementById('rStudentID').disabled=false;
		document.getElementById('rOffice').disabled=false;
		document.getElementById('rTrans').disabled=false;
		document.getElementById('rTypeStud').disabled=false;
	}
}
window.setInterval(checkAvailability,1000);
