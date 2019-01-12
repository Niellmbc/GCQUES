let url="http://gordoncollegeccs-ssite.net/raniel/GQUESAPI";
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
let getCashier = ()=>{
	fetch(url+'/tbl_cashier/fldRemarks/Available').then(res=>res.json()).then(function(res){
		let ls="";
		for(let i=0;i<res.length;i++){
				ls+="<tr>";
				ls+="<td>"+res[i].fldLname+', '+res[i].fldFname+', '+res[i].fldMname+"</td>";
				ls+="<td>"+res[i].fldCashierID+"</td>";
				ls+="<td>"+res[i].fldUsername+"</td>";
				ls+='<td><a class="blue-text" data-placement="top" data-toggle="modal" data-target="#seeResult" onclick="getCashierID('+res[i].fldCashierID+')"><i class="fa fa-user"></i></a><a class="red-text" data-toggle="tooltip" data-placement="top" title="Archive" onclick="archiveCashier('+res[i].fldCashierNo+')"><i class="fa fa-archive"></i></a></td>';
				if(res[i].fldStatus=='Offline'){
					ls+='<td><span class="badge badge-pill red">'+res[i].fldStatus+'</span></td>';
				}else{
					ls+='<td><span class="badge badge-pill green">'+res[i].fldStatus+'</span></td>';
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
				'data':'fldStudentID',
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
			return response;
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
	sender(){
		fetch(url+'/pusher.php').then(res=>res.json()).then(function(res){
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
	c.sender();
	toastr.info('New Cashier Added');
	
}
let select = ()=>{
	c.selectTable('tbl_cashier');
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
	fetch(url+'/tbl_student/fldStudentID/'+studid).then(res=>res.json()).then(function(res){
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
	c.sender();
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
	c.sender();
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
	c.sender();
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
		c.sender();
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
	toastr.warning('Cashier Archived');
	c.sender();
}
let archiveStudent = (id)=>{
	let cRem = {
		fldRemarks:'Not Available'
	}
	c.updateData(id,'tbl_student','fldStudentID',cRem);
	toastr.warning('Student Archived');
	c.sender();
	console.log(id);
}

let setClosingTime = ()=>{
	let closing = document.getElementById('closingtime').value;
	localStorage.setItem('closing',closing);
	swal({
		title: "Closing Time",
		text: "Successfully Set",
		type: "success",
		timer: 1000,
		html: true
	},
	function(){
		window.location.assign('admin.html');
		c.sender();
	});
}
let tableTrans = ()=>{
	fetch(url+'/tbl_transaction').then(res=>res.json()).then(function(res){
		tbl_trans =res;
	});
}
tableTrans();
let tableReg = ()=>{
	fetch(url+'/tbl_registrar').then(res=>res.json()).then(function(res){
		tbl_reg =res;
	});
}
tableReg();

let offlineAll =()=>{
	let data = {
		fldStatus:"Offline"
	}
	c.updateDataNW('tbl_cashier',data);
	c.sender();
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

let endDay = ()=>{

	let closing = localStorage.closing;
	let hatiin = closing.split(":");
	let minuto = hatiin[1].split("");
	let minuto1= minuto[0]+minuto[1];
	let period = minuto[2]+minuto[3];
	let oras = hatiin[0].split("");
	let h2 = oras[1];
	let t = new Date();
	let h1 = t.getHours();
	let m1 = t.getMinutes();
	let s1 = t.getSeconds();
	let fm = "";
	m1 = checkTime(m1);
	s1 = checkTime(s1);
	if (h1 > 12) {
		h1 = h1-12;
		if(h1 == 0){
			h1 = 1;
		}
		fm = "PM"; 
	} else { 
		fm = "AM"; 
	}
	// console.log(h1+":"+m1+":"+s1+" "+fm);
	if(h1 == h2 && m1==minuto1 && s1=="00" && fm==period){
		for(let i=0;i<tbl_trans.length;i++){
			for(let j=0;j<tbl_reg.length;j++){
				if(tbl_trans[i].fldRemarks=='In Line' || tbl_reg[j].fldRemarks=='In Line'){
					swal({
						title: "Transaction Info",
						text: "Theres still a pending Transaction <br> Please Adjust the Closing Time",
						type: "error",
						timer: 5000,
						html: true
					},
					function(){
						offlineAll();
						c.sender();
					});
					
				}else{
					confirm('Are you Sure You want to clear Transaction?');
					// responsiveVoice.speak("Your Day has Ended, See you tomorrow!!");
					window.setTimeout(function(){
						swal({
							title: "Compiling Data Today",
							text: "Please Wait....",
							type: "success",
							timer: 5000,
							html: true
						},
						function(){
							c.deletetable('tbl_transaction');
							c.deletetable('tbl_registrar');
							offlineAll();
							window.location.assign('admin.html');
							c.sender();
						});
					},2000);
				}
				break;
			}
			break;
		}	
	}
}
endDay();
window.setInterval(endDay,1000);

