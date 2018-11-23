       var doc = new jsPDF();

	
    doc.addHTML($('#mybody')[0], 15, 15, {
      'background': '#fff',
    }, function() {    
    doc.addFont('fonts/calibri.ttf', 'Calibri', 'normal');
	doc.setFont('Calibri');
    doc.setFontType("bold");
    doc.setFontSize(40);
	
    doc.save('sample-file.pdf');
        
	var file_data = doc.output('blob');
	var form_data = new FormData();

	form_data.append('file', file_data);
	$.ajax({
		url: 'http://localhost/lifecycleapi/upload.php?user='+ localStorage.userID,
		method: 'POST',
		contentType: false,
		processData: false,
		data:form_data,
		success: function(data){
			console.log(data);
		}
	});
    
    });

