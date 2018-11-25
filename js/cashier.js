'use strict';
let url="http://localhost/GQUESAPI";
let lastqueue;
let lastqueueInReg;
let lastqueueInTransFin;
let LeastTransOfCashier;
let lastcashier;
let totalcashier;
let lastTimeArrival;
let totalTransaction;

let getCashier = ()=>{
	fetch(url+'/tbl_cashier').then(res=>res.json()).then(function(res){
		let ls="";
		for(let i=0;i<res.length;i++){
			ls+="<tr>";
			ls+="<td>"+res[i].fldLname+', '+res[i].fldFname+', '+res[i].fldMname+"</td>";
			ls+="<td>"+res[i].fldCashierID+"</td>";
			ls+="<td>"+res[i].fldUsername+"</td>";
			ls+='<td><a class="blue-text" data-placement="top" data-toggle="modal" data-target="#seeResult" onclick="getCashierID('+res[i].fldCashierID+')"><i class="fa fa-user"></i></a><a class="red-text" data-toggle="tooltip" data-placement="top" title="Archive"><i class="fa fa-archive"></i></a></td>';
			if(res[i].fldStatus=='Offline'){
				ls+='<td><span class="badge badge-pill red">'+res[i].fldStatus+'</span></td>';
			}else{
				ls+='<td><span class="badge badge-pill green">'+res[i].fldStatus+'</span></td>';
			}
		} 
		$('#cashierlist').html(ls);
	});


}
let studentList=()=>{
	fetch(url+'/tbl_student').then(res=>res.json()).then(function(res){
		let ls="";
		for(let i=0;i<res.length;i++){
			ls+="<tr>";
			ls+="<td>"+res[i].fldStudentNo+"</td>";
			ls+="<td>"+res[i].fldLname+"</td>";
			ls+="<td>"+res[i].fldFname+"</td>";
			ls+="<td>"+res[i].fldMname+"</td>";
			ls+="<td>"+res[i].fldUsername+"</td>";
			ls+='<td><a class="blue-text" data-placement="top" data-toggle="modal" data-target="#seeResultStud" onclick="getStudentID('+res[i].fldStudentID+')"><i class="fa fa-user"></i></a><a class="red-text" data-toggle="tooltip" data-placement="top" title="Archive"><i class="fa fa-archive"></i></a></td>';
		} 
		$('#studentList').html(ls);
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
		console.log(lastqueue);

	});
}
getLastqueue();
let getLastqInTransFin = () =>{
	fetch(url+'/lastqInTransFin').then(res=>res.json()).then(function(res){
		if(res.length == 0){
			lastqueueInTransFin = 0;
		}else{
			lastqueueInTransFin = res[0].fldQueueNo;
		}
	});
}
getLastqInTransFin();
let getLastqueueInReg=()=>{
	fetch(url+'/tbl_registrar?ORDERBY=fldRegID DESC').then(res=>res.json()).then(function(res){
		if(res.length==0){
			lastqueueInReg =1;
		}else{
			lastqueueInReg = res[0].fldQueueNo;	
		}
	});
}
getLastqueueInReg();

let getLastCashier=()=>{
	fetch(url+'/tbl_cashier?ORDERBY=fldCashierID DESC').then(res=>res.json()).then(function(res){
		let lastcashierInDB = res[0].fldCashierID;
		lastcashierInDB++
		document.getElementById('cID').value=lastcashierInDB;
		
	});
}
getLastCashier();

let countCashiers= ()=>{
	fetch(url+'/tbl_cashier/fldCashierID').then(res=>res.json()).then(function(res){
		totalcashier = res[0].totalcashier;

	});
}
countCashiers();
let lastcashierinput =()=>{
	fetch(url+'/tbl_transaction?ORDERBY=fldTransID%20DESC').then(res=>res.json()).then(function(res){
		if(res.length==0){
			lastcashier = 0;
		}
		lastcashier = res[0].fldCashierNo;
		console.log(lastcashier);
	});
}
lastcashierinput()
let numberOfTransOfCashier=()=>{
	fetch(url+'/tbl_transaction/fldCashierNo/fldCashierNo/trans').then(res=>res.json()).then(function(res){
		
		if(res.length==0){
			LeastTransOfCashier=0;
		}else{
			LeastTransOfCashier = res[0].fldCashierNo;
			console.log(LeastTransOfCashier)
		}
	});
}
numberOfTransOfCashier();
let totalTrans = () =>{
	fetch(url+'/countTrans').then(res=>res.json()).then(function(res){
		totalTransaction = parseInt(res[0].totaltrans);
		
	});
}
totalTrans();


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
			toastr.success('Update Successfully!');
			studentList();
			getCashier();
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
		document.getElementById('cStatus').value=res[0].fldStatus;
		document.getElementById('cUname').value=res[0].fldUsername;
		document.getElementById('cPass').value=res[0].fldPassword;
	});
}
let getStudentID = (studid)=>{
	localStorage.setItem('studentID',studid);
	fetch(url+'/tbl_student/fldStudentID/'+studid).then(res=>res.json()).then(function(res){
		document.getElementById('sIDs').value=res[0].fldStudentID;
		document.getElementById('sLnames').value=res[0].fldLname;
		document.getElementById('sFnames').value=res[0].fldFname;
		document.getElementById('sMnames').value=res[0].fldMname;
		document.getElementById('sUname').value=res[0].fldUsername;

	});
}
let updateCashier=()=>{
	let id=localStorage.cashierID;
	let data ={
		fldCashierID:document.getElementById('cIDs').value,
		fldLname:document.getElementById('cLnames').value,
		fldFname:document.getElementById('cFnames').value,
		fldMname:document.getElementById('cMnames').value,
		fldBday:document.getElementById('cBdays').value,
		fldStatus:document.getElementById('cStatus').value,
		fldUsername:document.getElementById('cUname').value,
		fldPassword:document.getElementById('cPass').value
	}
	c.updateData(id,'tbl_cashier','fldCashierID',data);
}
let updateStudents=()=>{
	let id=localStorage.studentID;
	let data ={
		fldStudentID:document.getElementById('sIDs').value,
		fldLname:document.getElementById('sLnames').value,
		fldFname:document.getElementById('sFnames').value,
		fldMname:document.getElementById('sMnames').value,
		fldUsername:document.getElementById('sUname').value,
		fldPassword:document.getElementById('sPass').value
	}
	c.updateData(id,'tbl_student','fldStudentID',data);
}

let checkCashier = ()=>{
	if(totalTransaction >= 16){
		LeastTransOfCashier;
		return LeastTransOfCashier;
	}
	else if(lastcashier==0){
		if(lastcashier == totalcashier){
			lastcashier=1;
			lastcashier;
		}else{
			lastcashier++;
			return lastcashier;
		}
		
	}else{
		if(lastcashier == totalcashier){
			lastcashier =1;
			return lastcashier;
		}else{
			lastcashier++;
			return lastcashier;
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
let newTrans=()=>{
	lastqueueInTransFin++; 
	lastqueueInReg++;

	let goToC = checkCashier();
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
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
		arrival:timearrival,
		remarks:'In Line'
	}
	let dataReg = {
		studentID:document.getElementById('rStudentID1').value,
		queueNo:lastqueueInReg,
		office:document.getElementById('rOffice1').value,
		type:document.getElementById('rTrans1').value,
		date:today+" "+time,
		remarks:'In Line'
	}
	if(document.getElementById('rOffice1').value=='Finance'){
		c.addData(dataTrans,'tbl_transaction');
		toastr.success('Your Queue #: <h4>'+lastqueueInTransFin+'</h4><br>'+'Please Procceed to <h4>Cashier #:'+goToC+'</h4>');

	}else if(document.getElementById('rOffice1').value=='Registrar'){
		c.addData(dataReg,'tbl_registrar');
		toastr.success('Your Queue #: <h2>'+lastqueueInReg+'</h2><br>'+'Please Procceed to Registrar');
	}

	
}



