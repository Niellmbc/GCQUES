'use strict';
let url="http://localhost/GQUESAPI";
let lastqueue;
let lastqueueInReg;
let lastcashierinTrans;
let lastcashier;
let totalcashier;
let lastTimeArrival;
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
	fetch(url+'/tbl_cashier?ORDERBY=fldCashierID DESC').then(res=>res.json()).then(function(res){
		lastcashier = res[0].fldCashierID;
		lastcashier++
		// document.getElementById('cID').value=lastcashier;
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
			QueueList();

		});
		
	}
}

let c = new MyCashier();


let updateAccount=()=>{
	let cID = localStorage.cashierNo;
	cpass =document.getElementById('cPassword').value;
	confirm =document.getElementById('cConfirmPass').value;

	let data = {
		lname:document.getElementById('cLname').value,
		fname:document.getElementById('cFname').value,
		mname:document.getElementById('cMname').value,
		bday:document.getElementById('cBday').value,
		status:document.getElementById('cStatus').value,
		username:document.getElementById('cUname').value,
		pass:document.getElementById('cPassword').value
	}
	c.updateData(cID,'tbl_cashier','fldCashierID',data);
	
}

let QueueList=()=>{
	fetch(url+"/tbl_transaction/fldCashierNo/"+1).then(res=>res.json()).then(function(res){
		let ls = "";
		for(let i=0;i<res.length;i++){
			if(res[i].fldRemarks=='In Line'){

				ls+='<div class="col-md-3 mb-4 text-center" data-toggle="modal" data-target="#modalID" onclick=showTrans('+res[i].fldTransID+')>';
				ls+='<div class="card card-image" style="background-image: url(assets/img/gcueslogo.png);">';
				ls+='<div class="text-white flex-center d-flex align-items-center rgba-black-strong py-5 px-4">';
				ls+='<div>';
				ls+='<h6 class="orange-text"><i class="fa fa-id-badge"></i><strong> QUEUE NO.</strong></h6>';
				ls+='<h3 class="card-title pt-4 pb-3 font-weight-bold "><strong># '+res[i].fldQueueNo+'</strong></h3>';
				ls+='</div>';
				ls+='</div>';
				ls+='</div>';
				ls+='</div>';
			}
		}
		$('#queuelist').html(ls);
	});
}
QueueList();
let showTrans=(id)=>{
	localStorage.setItem('TransID',id);
	fetch(url+'/tbl_transaction/fldTransID/'+id).then(res=>res.json()).then(function(res){
		let ls="";
		for(let i=0;i<res.length;i++){
			ls+="<tr>";
			ls+="<td>"+res[i].fldStudentNo+"</td>";
			ls+="<td>"+res[i].fldQueueNo+"</td>";
			ls+="<td>"+res[i].fldOffice+"</td>";
			ls+="<td>"+res[i].fldTransType+"</td>";
			ls+="<td>"+res[i].fldDate+"</td>";
			ls+="</tr>";
		}
		$('#transDet').html(ls);
	});

}
let doneTrans=()=>{
	let transID = localStorage.TransID;
	
	fetch(url+'/tbl_transaction/fldTransID/'+transID).then(res=>res.json()).then(function(res){
		let data={
			fldRemarks:'Done'
		}
		let log = {
			fldStudentNo:res[0].fldStudentNo,
			fldCashierNo:res[0].fldCashierNo,
			fldQueueNo:res[0].fldQueueNo,
			fldOffice:res[0].fldOffice,
			fldTransType:res[0].fldTransType,
			fldDate:res[0].fldDate,
			fldRemarks:'Done'
		}
		console.log(log);
		

		c.updateData(transID,'tbl_transaction','fldTransID',data);
		c.addData(log,'tbl_log');
	});
	
}
let noShowTrans=()=>{
	let transID = localStorage.TransID;
	fetch(url+'/tbl_transaction/fldTransID/'+transID).then(res=>res.json()).then(function(res){
		let data={
			fldRemarks:'No Show'
		}
		let log = {
			fldStudentNo:res[0].fldStudentNo,
			fldCashierNo:res[0].fldCashierNo,
			fldQueueNo:res[0].fldQueueNo,
			fldOffice:res[0].fldOffice,
			fldTransType:res[0].fldTransType,
			fldDate:res[0].fldDate,
			fldRemarks:'No Show'
		}
		console.log(log);
		

		c.updateData(transID,'tbl_transaction','fldTransID',data);
		c.addData(log,'tbl_log');	
	});
}
let showLog =()=>{
	fetch(url+'/tbl_log/fldCashierNo/'+1).then(res=>res.json()).then(function(res){
		let ls ="";
		for(let i=0;i<res.length;i++){
			ls+="<tr>";
			ls+="<td>"+res[i].fldStudentNo+"</td>";
			ls+="<td>"+res[i].fldQueueNo+"</td>";
			ls+="<td>"+res[i].fldOffice+"</td>";
			ls+="<td>"+res[i].fldTransType+"</td>";
			ls+="<td>"+res[i].fldDate+"</td>";
			ls+="<td>"+res[i].fldRemarks+"</td>";
			ls+="</tr>";
		}
		$('#log').html(ls);
	});
}
showLog();
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
let moveTransInFin=(id)=>{
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
	fetch(url+'/tbl_registrar/fldRegID/'+id).then(res=>res.json()).then(function(res){
		let dataTrans = {
			studentID:res[0].fldStudentNo,
			cashierNo:checkCashier(),
			queueNo:res[0].fldQueueNo,
			office:res[0].fldOffice,
			type:res[0].fldType,
			date:today+" "+time,
			arrival:timearrival,
			remarks:'In Line'
		}
		c.addData(dataTrans,'tbl_transaction');
	});
	
	
}

let doneTransInReg=(id)=>{
	fetch(url+'/tbl_registrar/fldRegID/'+id).then(res=>res.json()).then(function(res){
		let data={
			fldRemarks:'Done'
		}
		let log = {
			fldStudentNo:res[0].fldStudentNo,
			fldCashierNo:'reg-1',
			fldQueueNo:res[0].fldQueueNo,
			fldOffice:res[0].fldOffice,
			fldType:res[0].fldType,
			fldDate:res[0].fldDate,
			fldRemarks:'Done'
		}
		console.log(log);
		c.updateData(id,'tbl_registrar','fldRegID',data);
		c.addData(log,'tbl_log');
		moveTransInFin(id);
	});
}

