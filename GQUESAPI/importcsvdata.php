<?php
include_once 'db.php';
 $csvMimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');
if(!empty($_FILES["file"]["name"])&& in_array($_FILES['file']['type'],$csvMimes))  
{  
  $connect = mysqli_connect("localhost", "root", "", "db_gques");  
  $output = '';  
  $allowed_ext = array("csv");  
  $extension = end(explode(".", $_FILES["file"]["name"]));  
  if(in_array($extension, $allowed_ext))  
  {  
     $file_data = fopen($_FILES["file"]["tmp_name"], 'r');  
     fgetcsv($file_data);  
     while($row = fgetcsv($file_data))  
     {    
        $studentno = mysqli_real_escape_string($connect, $row[0]);  
        $lname = mysqli_real_escape_string($connect, $row[1]);  
        $fname = mysqli_real_escape_string($connect, $row[2]);  
        $mname = mysqli_real_escape_string($connect, $row[3]);  
        $remarks = mysqli_real_escape_string($connect, $row[4]); 
        $query = "INSERT INTO tbl_student(fldStudentID,fldStudentNo,fldLname,fldFname,fldMname,fldRemarks) VALUES ('','$studentno', '$lname', '$fname', '$mname', '$remarks')";  
        mysqli_query($connect, $query);  
    }  
}  
else  
{  
 echo 'Error1';  
}  
}  
else  
{  
  echo "Error2";  
}  
?>