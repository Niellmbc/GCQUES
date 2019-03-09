
let month = [];
let dreq=[];
let dreqcount=[];
let other=[];
let othercount=[];
let bank=[];
let bankcount=[];
let enrol=[];
let enrolcount=[];
let drel=[];
let drelcount=[];

let week = [];
let dreq1=[];
let dreqcount1=[];
let other1=[];
let othercount1=[];
let bank1=[];
let bankcount1=[];
let enrol1=[];
let enrolcount1=[];
let drel1=[];
let drelcount1=[];

let daily = [];
let dreq2=[];
let dreqcount2=[];
let other2=[];
let othercount2=[];
let bank2=[];
let bankcount2=[];
let enrol2=[];
let enrolcount2=[];
let drel2=[];
let drelcount2=[];
let monthname=()=>{
fetch(url+'/div/MONTHNAME/MONTH').then(res=>res.json()).then(function(res){
    for(let i=0;i<res.length;i++){
        month.push(res[i].MONTH);
    }
});
}
let reqMonth=()=>{
fetch(url+'/graph/Document Request/MONTH').then(res=>res.json()).then(function(res){
    dreq.push(res[0].fldTransType);
    dreqcount.push(res[0].COUNT);

});
}
let otherMonth=()=>{   
fetch(url+'/graph/Other Transaction/MONTH').then(res=>res.json()).then(function(res){
    other.push(res[0].fldTransType);
    othercount.push(res[0].COUNT);

});
}
let bankMonth=()=>{   
fetch(url+'/graph/Bank Account/MONTH').then(res=>res.json()).then(function(res){
    bank.push(res[0].fldTransType);
    bankcount.push(res[0].COUNT);

});
}
let enMonth=()=>{   
fetch(url+'/graph/Enrolment/MONTH').then(res=>res.json()).then(function(res){
    enrol.push(res[0].fldTransType);
    enrolcount.push(res[0].COUNT);

});
}
let relMonth=()=>{   
fetch(url+'/graph/Document Releasing/MONTH').then(res=>res.json()).then(function(res){
    drel.push(res[0].fldTransType);
    drelcount.push(res[0].COUNT);

});
}
let weekname=()=>{   
fetch(url+'/div/WEEK/WEEK').then(res=>res.json()).then(function(res){
    for(let i=0;i<res.length;i++){
        week.push(res[i].WEEK);
    }
});
}
let reqWeek=()=>{   
fetch(url+'/graph/Document Request/WEEK').then(res=>res.json()).then(function(res){
    dreq1.push(res[0].fldTransType);
    dreqcount1.push(res[0].COUNT);

});
}
let otherWeek=()=>{   
fetch(url+'/graph/Other Transaction/WEEK').then(res=>res.json()).then(function(res){
    other1.push(res[0].fldTransType);
    othercount1.push(res[0].COUNT);

});
}
let bankWeek=()=>{
fetch(url+'/graph/Bank Account/WEEK').then(res=>res.json()).then(function(res){
    bank1.push(res[0].fldTransType);
    bankcount1.push(res[0].COUNT);

});
}
let enWeek=()=>{   
fetch(url+'/graph/Enrolment/WEEK').then(res=>res.json()).then(function(res){
    enrol1.push(res[0].fldTransType);
    enrolcount1.push(res[0].COUNT);

});
}
let relWeek=()=>{   
fetch(url+'/graph/Document Releasing/WEEK').then(res=>res.json()).then(function(res){
    drel1.push(res[0].fldTransType);
    drelcount1.push(res[0].COUNT);
});
}


let dayname=()=>{   
fetch(url+'/div/DAYNAME/DAY').then(res=>res.json()).then(function(res){
    for(let i=0;i<res.length;i++){
        daily.push(res[i].DAY);
    }
});
}
let reqDay=()=>{

fetch(url+'/graph/Document Request/DAY').then(res=>res.json()).then(function(res){
    dreq2.push(res[0].fldTransType);
    dreqcount2.push(res[0].COUNT);
});
}

let bankDay=()=>{

fetch(url+'/graph/Bank Account/DAY').then(res=>res.json()).then(function(res){
    bank2.push(res[0].fldTransType);
    bankcount2.push(res[0].COUNT);

});
}
let enDay=()=>{   
fetch(url+'/graph/Enrolment/DAY').then(res=>res.json()).then(function(res){
    enrol2.push(res[0].fldTransType);
    enrolcount2.push(res[0].COUNT);

});
}
let relDay =()=>{
fetch(url+'/graph/Document Releasing/DAY').then(res=>res.json()).then(function(res){
    drel2.push(res[0].fldTransType);
    drelcount2.push(res[0].COUNT);
});
}

let otherDay =()=>{
fetch(url+'/graph/Other Transaction/DAY').then(res=>res.json()).then(function(res){
    other2.push(res[0].fldTransType);
    othercount2.push(res[0].COUNT);
});
}

relDay();
enDay();
bankDay();
reqDay();
dayname();
otherDay();

relWeek();
enWeek();
bankWeek();
reqWeek();
weekname();
otherWeek();


otherMonth();
relMonth();
enMonth();
bankMonth();
reqMonth();
monthname();
var ctx = document.getElementById("monthly").getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
     labels: month,
     datasets: [{
        label: dreq,
        data: dreqcount,
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    },{
        label: other,
        data: othercount,
        backgroundColor: ['orange'
        ],
        borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    },{
        label: bank,
        data: bankcount,
        backgroundColor: ['blue'
        ],
        borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    },{
        label: enrol,
        data: enrolcount,
        backgroundColor: ['purple'
        ],
        borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    },{
        label: drel,
        data: drelcount,
        backgroundColor: ['red'
        ],
        borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
},
options: {
 scales: {
    yAxes: [{
       ticks: {
          beginAtZero:true
      }
  }]
}

}
});
var ctx1= document.getElementById("weekly").getContext('2d');
var myChart1 = new Chart(ctx1, {
  type: 'bar',
  data: {
     labels: week,
     datasets: [{
        label: dreq1,
        data: dreqcount1,
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    },{
        label: other1,
        data: othercount1,
        backgroundColor: ['orange'
        ],
        borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    },{
        label: bank1,
        data: bankcount1,
        backgroundColor: ['blue'
        ],
        borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    },{
        label: enrol1,
        data: enrolcount1,
        backgroundColor: ['purple'
        ],
        borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    },{
        label: drel1,
        data: drelcount1,
        backgroundColor: ['red'
        ],
        borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
},
options: {
 scales: {
    yAxes: [{
       ticks: {
          beginAtZero:true
      }
  }]
}

}
});

var ctx2= document.getElementById("daily").getContext('2d');
var myChart2 = new Chart(ctx2, {
  type: 'bar',
  data: {
     labels: daily,
     datasets: [{
        label: dreq2,
        data: dreqcount2,
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    },{
        label: other2,
        data: othercount2,
        backgroundColor: ['orange'
        ],
        borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    },{
        label: bank2,
        data: bankcount2,
        backgroundColor: ['blue'
        ],
        borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    },{
        label: enrol2,
        data: enrolcount2,
        backgroundColor: ['purple'
        ],
        borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    },{
        label: drel2,
        data: drelcount2,
        backgroundColor: ['red'
        ],
        borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
},
options: {
 scales: {
    yAxes: [{
       ticks: {
          beginAtZero:true
      }
  }]
}

}
});

setTimeout(function() {
 myChart.update();
myChart1.update();
myChart2.update();
 },3000);
