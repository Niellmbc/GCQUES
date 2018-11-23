let userId = localStorage.userId;
function login(){
    let un = $("#un").val();
    let pw = $("#pw").val();
    
    $.post("http://localhost/lifecycleapi/__/login", {un:un, pw:pw}, function(data){
        if(data.status == "True"){
            localStorage.userId = data.user_ID;
            window.location.assign("index.html");
        } else {
            window.alert("Invalid Login credentials");
        }
    });
}

function logOut(){
    localStorage.userId = "";
    window.location.assign("login.html");
}

function validateLogin(){
    
}
