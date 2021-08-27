let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
function makeAJAXCall(methodType,url,callBack,async=true,data=null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        //console.log("State Change Called. Ready State: "+xhr.readyState+" Status: "+xhr.status);
        if(xhr.readyState ==4){
            if(xhr.status==200||xhr.status==201){
                callBack(xhr.responseText);
            }else if(xhr.status>=400){
                console.log("Handle 400 client error or 500 server error");
            }
        }
    }
    xhr.open(methodType,url,async);
    if(data){
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }else
        xhr.send();
        
    console.log(methodType+" request send to the server");
}
//get using get method and call back
const getURL = "http://localhost:3000/employees";
function getUserDetails(data){
    console.log("Get User Data: "+data);
}
makeAJAXCall("GET",getURL,getUserDetails);
//delete data cdusing delete method and call back
const delURL = "http://localhost:3000/employees/4";
function userDeleted(data){
    console.log(" User Deleted");
}
makeAJAXCall("DELETE",delURL,userDeleted,false);
//Add data using post method and call back
const postURL = "http://localhost:3000/employees";
const empData = {"first_name":"Lionel","last_name":"Messi","salary":50000};
function AddUser(data){
    console.log("Data Added");
}
makeAJAXCall("POST",postURL,AddUser,true,empData);