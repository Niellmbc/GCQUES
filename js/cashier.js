'use strict';
let url="http://localhost/GQUESAPI";
let lastqueue;
let lastqueueInReg;
let lastcashierinTrans;
let lastcashier;
let totalcashier;
let lastTimeArrival;
let getCashier = ()=>{
	fetch(url+'/tbl_cashier').then(res=>res.json()).then(function(res){
		let ls="";
		for(let i=0;i<res.length;i++){
			ls+="<tr>";
			ls+="<td>"+res[i].fldLname+', '+res[i].fldFname+', '+res[i].fldMname+"</td>";
			ls+="<td>"+res[i].fldCashierID+"</td>";
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

getCashier();
let getLastqueue=()=>{
	fetch(url+'/tbl_transaction?ORDERBY=fldTransID DESC').then(res=>res.json()).then(function(res){
		lastqueue = res[0].fldQueueNo;
		lastcashierinTrans = res[0].fldCashierNo;
		lastTimeArrival = res[0].fldArrival;
		console.log(lastTimeArrival);
	});
}
getLastqueue();
let getLastqueueInReg=()=>{
	fetch(url+'/tbl_registrar?ORDERBY=fldRegID DESC').then(res=>res.json()).then(function(res){
		lastqueueInReg = res[0].fldQueueNo;
		console.log(lastqueueInReg);
	});
}
getLastqueueInReg();
let getLastCashier=()=>{
	fetch(url+'/tbl_cashier/fldStatus/Online?ORDERBY=fldCashierID DESC').then(res=>res.json()).then(function(res){
		lastcashier = res[0].fldCashierID;
		lastcashier++
		document.getElementById('cID').value=lastcashier;
	});
}
getLastCashier();
let countCashiers= ()=>{
	fetch(url+'/tbl_cashier/fldCashierID').then(res=>res.json()).then(function(res){
		totalcashier = res[0].totalcashier;

	});
}
countCashiers();

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
		g:"Offline"
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
		fldStatus:document.getElementById('cStatus').value
	}
	c.updateData(id,'tbl_cashier','fldCashierID',data);
}



let checkCashier = ()=>{
	if(lastcashierinTrans == totalcashier){
		lastcashierinTrans = 1;
		return lastcashierinTrans;
	}else{
		lastcashierinTrans++;
		return lastcashierinTrans;
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
	lastqueue++; 
	lastqueueInReg++;
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
	if (h > 12) { h = h-12; aorp = "PM"; } else { aorp = "AM"; }
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
		studentID:document.getElementById('rStudentID').value,
		cashierNo:checkCashier(),
		queueNo:lastqueue,
		office:document.getElementById('rOffice').value,
		type:document.getElementById('rTrans').value,
		date:today+" "+time,
		arrival:timearrival,
		remarks:'In Line'
	}
	let dataReg = {
			studentID:document.getElementById('rStudentID').value,
			queueNo:lastqueueInReg,
			office:document.getElementById('rOffice').value,
			type:document.getElementById('rTrans').value,
			date:today+" "+time,
			remarks:'In Line'
		}
	if(document.getElementById('rOffice').value=='Finance'){
		c.addData(dataTrans,'tbl_transaction');
		toastr.success('Your Queue #: <h4>'+lastqueue+'</h4><br>'+'Please Procceed to <h4>Cashier #:'+checkCashier()+'</h4>');
	
	}else{
		c.addData(dataReg,'tbl_registrar');
		toastr.success('Your Queue #: <h2>'+lastqueueInReg+'</h2><br>'+'Please Procceed to Registrar');
	}

	
}
let loginCashier=()=>{
	
}



