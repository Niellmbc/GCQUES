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
		echo $this->string;
		if($this->db->query($this->string)){
			header('HTTP:/1.0 201 Created');
		}else{
			$info = ['status'=>'error','message'=>'Data Not Created'];
			echo json_encode($info);
		}
	}
	public function insertNew($tblname){
		$data = json_decode(file_get_contents("php://input"));
		print_r($data);
		$this->string ="INSERT INTO $tblname VALUES(NULL,'".$data->a."','".$data->b."','".$data->c."')";
		if($this->db->query($this->string)){
			header('HTTP:/1.0 201 Created');
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
        echo $this->sql;
        if($this->db->query($this->sql)){
            echo "it works";
        }
    }

	public function delete($tblname,$fldname,$id){
		$this->string = "DELETE FROM $tblname where $fldname='$id'";
		if($result= $this->db->query($this->string)){
			header('HTTP:/1.0 200 OK');
			$info=['status'=>200,'message'=>'Data Deleted'];
			echo json_encode($info);
		}
	}
}


?>