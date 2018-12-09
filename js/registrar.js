let url="http://NIELLAMBACO/GQUESAPI";
const MyAdmin = class gques{
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
		});
		
	}
}

let c = new MyAdmin();
var base64img = "";
let existingimg = ""
let existingpass = "";
let id= localStorage.regID;
fetch(url+'/tbl_user/fldUserID/'+id).then(res=>res.json()).then(function(res){
	document.getElementById('names').innerHTML=res[0].fldLname+', '+res[0].fldFname+', '+res[0].fldMname;
	document.getElementById('rRole').innerHTML=res[0].fldRole;
	document.getElementById('rFname').value=res[0].fldFname;
	document.getElementById('rLname').value=res[0].fldLname;
	document.getElementById('rMname').value=res[0].fldMname;
	document.getElementById('rEmail').value=res[0].fldEmail;
	document.getElementById('rContact').value=res[0].fldContactNo;
	document.getElementById('rBday').value=res[0].fldBday;
	document.getElementById('rAddress').value=res[0].fldAddress;
	document.getElementById('rUname').value=res[0].fldUsername;
	document.getElementById('imgPs').src=res[0].fldImg;
	document.getElementById('profPic').src=res[0].fldImg;
	document.getElementById('pName').innerHTML=res[0].fldFname+' '+res[0].fldMname+' '+res[0].fldLname;
	document.getElementById('pEmail').innerHTML=res[0].fldEmail;
	existingimg = res[0].fldImg;
	existingpass = res[0].fldPassword;
});
function readFile() {
	if (this.files && this.files[0]) {
		var FR = new FileReader();
		FR.addEventListener("load", function (e) {
			document.getElementById("imgPs").src= e.target.result;
			base64img = e.target.result;
		});
		FR.readAsDataURL(this.files[0]);
	}
}

try {
	document.getElementById("profileP").addEventListener("change", readFile);
} catch (err) {

}
let updateReg=()=>{

	let id= localStorage.regID;
	if (base64img === '') {
		base64img = existingimg;
	}
	let pass = document.getElementById('rPass').value;
	let cpass=document.getElementById('rConfirmPass').value;
	if(document.getElementById('rPass').value===''){
		document.getElementById('rPass').value = existingpass;
	}
	let data = {
		fldEmail:document.getElementById('rEmail').value,
		fldLname:document.getElementById('rLname').value,
		fldFname:document.getElementById('rFname').value,
		fldMname:document.getElementById('rMname').value,
		fldBday:document.getElementById('rBday').value,
		fldContactNo:document.getElementById('rContact').value,
		fldAddress:document.getElementById('rAddress').value,
		fldImg:base64img,
		fldUsername:document.getElementById('rUname').value,
		fldPassword:document.getElementById('rPass').value
	}
	if(pass!=cpass){
		toastr.error('Password Not Match');
	}else{
		swal({
		title: "Account",
		text: "Updated Successfully",
		type: "success",
		timer: 1000,
		showConfirmButton: false
	},
	function(){
		window.location.assign('registrarAccount.html');
	});
		c.updateData(id,'tbl_user','fldUserID',data);
	}
	

}
let logOutReg=()=>{
    		localStorage.setItem('regID','');
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