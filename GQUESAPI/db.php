<?php 	
class Connection {
	protected $db;
	protected $string;
	function __construct(){
		define('SERVER','localhost');
		define('USERNAME','root');
		define('PASSWORD','');
		define('DB','db_gques');
		$this->db=mysqli_connect(SERVER,USERNAME,PASSWORD,DB);
		if(mysqli_connect_error()){
			$info = ['status'=>'','message'=>'Cant Connect'];
			echo json_encode($info);
		}
	}
	public function select($fldname){
		$this->string = "SELECT $fldname ";
		return $this;
	}
	public function from($tblname){
		$this->string.="FROM $tblname ";
		return $this;
	}
	public function where($fldname,$id){
		$this->string .="WHERE $fldname = '$id' ";
		return $this;
	}
	public function groupby($fldname){
		$this->string .="GROUP BY $fldname";
		return $this;
	}
	public function limit($val){
		$this->string .= " LIMIT $val";
		return $this;
	}
	public function offsets($limit,$offset){
		$this->string .= " LIMIT $limit OFFSET $offset";
		return $this;
	}
	public function orderby($fld, $order='ASC'){
		$this->string .=" ORDER BY $fld $order LIMIT 1";
		
	}
	public function between($fld,$start,$end){
		$this->string .=" WHERE $fld BETWEEN '$start' AND '$end'";
		return $this;
	}
	public function like($fldname, $value){
		if($this->x == 0){
			$this->sql .= " WHERE $fldname LIKE '%$value%'";
		} else {
			$this->sql .= " AND $fldname LIKE '%$value%'";
		}
		return $this;
	}
	public function countcashier($tblname,$id){
		$this->string = "SELECT COUNT($id) as totalcashier FROM $tblname where fldStatus='Online'";
		return $this;
	}
	public function counttotalTrans(){
		$this->string = "SELECT COUNT(fldTransID) as totaltrans FROM tbl_transaction where fldRemarks='In Line'";
		return $this;
	}
	public function lastqInTransFin(){
		$this->string = "SELECT * FROM tbl_transaction where fldOffice='Finance' and fldRemarks='In Line' ORDER BY fldTransID DESC LIMIT 1";
		return $this;
	}
	public function queueEachCashier(){
		$this->string ="SELECT DISTINCT(fldCashierNo),fldQueueNo,fldDate,fldArrival FROM tbl_transaction where fldRemarks='In Line' group by fldCashierNo ORDER BY fldCashierNo ASC";
		return $this;
	}
	public function waitingTrans(){
		$this->string = "SELECT * FROM tbl_transaction LIMIT 10";
		return $this;
	} public function onlineInTrans(){
		$this->string = "SELECT COUNT(DISTINCT(fldCashierNo)) as totalcount from tbl_transaction where fldRemarks='In Line'";
		return $this;
	}
	public function TranswithDate($type,$start,$end){
		$this->string = "SELECT * FROM tbl_log WHERE fldTransType='$type' AND fldDay BETWEEN '$start' AND '$end'";
	}
	public function div($divname, $div){
		$this->string = "SELECT DISTINCT($divname(fldDay)) $div FROM tbl_log WHERE YEAR(fldDay)='2018'";
		return $this;
	}
	public function graph($type,$div){
	$this->string = "SELECT DISTINCT(fldTransType), COUNT(*) COUNT FROM tbl_log WHERE YEAR(fldDay)='2018' AND fldTransType='$type' GROUP BY $div(fldDay),fldTransType";
		return $this;	
	}

	public function querys(){
		$info = [];
		if($result= $this->db->query($this->string)){
			while($rows=$result->fetch_assoc()){
				array_push($info,$rows);
				header('HTTP:/1.0 200 OK');
			}
		}else{
			header('HTTP:/1.0 404 Not Found');
			$info = ['status'=>404,'message'=>'Data Not Found'];
		}
		echo json_encode($info);
	}
	public function insert($tblname){
		$data = json_decode(file_get_contents("php://input"));
		$alldata = "";
		foreach($data as $key => $value){
			if($key != 0){
				$alldata .= ", ";
			}
			$alldata .= "(NULL";  
			foreach($data[$key] as $skey => $svalue){
				$alldata .= ", '" . $svalue . "'";
			}
			$alldata .= ")";
		}
		$this->string = "INSERT INTO $tblname VALUES $alldata";
		if($this->db->query($this->string)){
			header('HTTP:/1.0 201 Created');
			$info = ['status'=>'success','message'=>'Data Created'];

		}else{
			$info = ['status'=>'error','message'=>'Data Not Created'];
		}
		echo json_encode($info);
	}
	public function insertNew($tblname){
		$data = json_decode(file_get_contents("php://input"));
		print_r($data);
		$this->string ="INSERT INTO $tblname VALUES(NULL,'".$data->a."','".$data->b."','".$data->c."')";
		if($this->db->query($this->string)){
			header('HTTP:/1.0 201 Created');
			$info = ['status'=>'success','message'=>'Data Created'];
		}else{
			$info = ['status'=>'error','message'=>'Data Not Created'];
			echo json_encode($info);
		}
	}
	public function startAnew(){
		$this->string ="INSERT INTO tbl_record(fldTransID,fldStudentNo,fldCashierNo,fldQueueNo,fldOffice,fldTransType,fldDate,fldArrival,fldRemarks)";
		$this->string.="SELECT * FROM tbl_transaction";
		$this->string.="DELETE FROM tbl_transaction";
		if($this->db->multi_query($this->string)){
			header('HTTP:/1.0 201 Created');
			$info = ['status'=>'success','message'=>'Data Created'];
		}else{
			$info = ['status'=>'error','message'=>'Data Not Created'];
			echo json_encode($info);
		}
		
	}
	public function update($table, $fld, $id){
		$mykey = "";
		$myval = "";
		$finaldata = "";
		$myCount = 0;
		$data = json_decode(file_get_contents("php://input"));
		foreach($data as $key => $value){
			$myCount = 0;
			foreach($data[$key] as $skey => $svalue){
				$mykey =  $skey;
				$myval =  $svalue;
				if($myCount == 0){
					$finaldata .= "$skey = '$svalue'";
					$myCount += 1;
				}else {
					$finaldata .= ", $skey = '$svalue'";
				}
			}
		}

		if(isset($fld)){				
			if(is_int($id)){
				$this->sql = "UPDATE $table set $finaldata WHERE $fld = $id";
			} else {
				$this->sql = "UPDATE $table set $finaldata WHERE $fld = '$id'";            
			}
		} else {
			$this->sql = "UPDATE $table set $finaldata";
		}
		if($this->db->query($this->sql)){
			header('HTTP:/1.0 201 Created');
			$info = ['status'=>'success','message'=>'Data Updated'];
			
		}else{
			$info = ['status'=>'error','message'=>'Data Not Update'];
		}
		echo json_encode($info);
	}

	public function delete($tblname,$fldname,$id){
		$this->string = "DELETE FROM $tblname where $fldname='$id'";
		if($result= $this->db->query($this->string)){
			header('HTTP:/1.0 200 OK');
			$info=['status'=>200,'message'=>'Data Deleted'];
			echo json_encode($info);
		}
	}
	public function deletetbl($tblname){
		$this->string = "DELETE FROM $tblname";
		if($result= $this->db->query($this->string)){
			header('HTTP:/1.0 200 OK');
			$info=['status'=>200,'message'=>'Data Deleted'];
			echo json_encode($info);
		}
	}
}


?>