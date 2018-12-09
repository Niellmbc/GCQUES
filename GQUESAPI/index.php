<?php 	
include_once 'db.php';
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Header:*');
header('Content-type:application/json');
header('Pragma: no-cache');
$db = new Connection;

$request = explode('/',rtrim($_REQUEST['res'],'/'));


switch ($_SERVER['REQUEST_METHOD']){
	case 'GET':	
	if(count($request)==1){
		$db->select('*')->from($request[0]);
	}else if(count($request)==3){
		$db->select('*')->from($request[0])->where($request[1],$request[2]);
	}elseif(count($request)==2){
		$db->countcashier($request[0],$request[1]);
	}elseif($request[0]=='count'){
		$db->select('COUNT('.$request[2].') as totalcount')->from($request[1])->where($request[2],$request[3]);
	}elseif(count($request)==4){
		$db->select('DISTINCT(fldCashierNo),COUNT('.$request[2].') as '.$request[3].'')->from($request[0])->where('fldRemarks','In Line')->groupby($request[1])->orderby($request[3]);
	}elseif(count($request)==5){
		$db->select('*')->from($request[0])->where($request[1],$request[2])->offsets($request[3],$request[4]);
	}
	
	if(isset($_GET['LIKE'])){
		$pieces = explode(" ", $_GET['LIKE']);
		$colname = $pieces[0];
		$pos = $pieces[1];            
		$db->like($colname, $pos);
	}

	if(isset($_GET['GROUPBY'])){
		$db->groupby($_GET['GROUPBY']);
	}
	

	if(isset($_GET['ORDERBY'])){
		$pieces = explode(" ", $_GET['ORDERBY']);
		$colname = $pieces[0];
		$pos = $pieces[1];            
		$db->orderby($colname, $pos);
	}
	if($request[0]=='countTrans'){
		$db->counttotalTrans();
	}else if ($request[0]=='lastqInTransFin'){
		$db->lastqInTransFin();
	}else if ($request[0]=='queueServing'){
		$db->queueEachCashier();
	}else if ($request[0]=='queueReg'){
		$db->select('*')->from($request[1])->where('fldRemarks','In Line')->limit(1);
	}else if($request[0]=='distinctCashier'){
		$db->select('DISTINCT(fldCashierNo)')->from($request[1]);
	}else if($request[0]=='waitingTrans'){
		$db->waitingTrans();
	}else if($request[0]=='onlineInTrans'){
		$db->onlineInTrans();
	}else if($request[0]=='range'){
		$db->select('*')->from($request[1])->between($request[2],$request[3],$request[4]);
	}else if($request[0]=='transwithDate'){
		$db->TranswithDate($request[1],$request[2],$request[3]);
	}else if($request[0]=='div'){
		$db->div($request[1],$request[2]);
	}else if($request[0]=='graph'){
		$db->graph($request[1],$request[2]);
	}
	$db->querys();

	case 'POST':
	if($request[0]=='insert'){
		$db->insert($request[1]);
	}else if($request[0]=='startAnew'){
		$db->startAnew();
	}
	case 'PUT':
	if($request[0]=='update'){
		$db->update($request[1],$request[2],$request[3]);
	}

	case 'DELETE':
	if($request[0]=='delete'){
		$db->delete($request[1],$request[2],$request[3]);
	}elseif($request[0]=='clearTable'){
		$db->deletetbl($request[1]);
	}
}



?>