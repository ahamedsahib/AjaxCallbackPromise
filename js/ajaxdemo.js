let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
function makePromiseCall(methodType,url,async=true,data=null)
{
    return new Promise(function(resolve,reject){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            //console.log("State Change Called. Ready State: "+xhr.readyState+" Status: "+xhr.status);
            if(xhr.readyState ==4){
                if(xhr.status==200||xhr.status==201){
                    resolve(xhr.responseText);
                }else if(xhr.status>=400){
                    reject({
                        status:xhr.status,
                        statusText:xhr.statusText
                    })
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
    });
}
//get using get method and call back
const getURL = "http://localhost:3000/employees";
makePromiseCall("GET",getURL,true)
.then(responseText=>{console.log("Get User Data: "+responseText)})
.catch(error=>console.log("GET error status: "+JSON.stringify(error)));
//delete data cdusing delete method and call back
const delURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE",delURL,false)
.then(responseText=>{console.log("User deleted : "+responseText)})
.catch(error=>console.log("GET error status: "+JSON.stringify(error)))
//Add data using post method and call back
const postURL = "http://localhost:3000/employees";
const empData = {"first_name":"Lionel","last_name":"Messi","salary":50000};
makePromiseCall("POST",postURL,true,empData)
.then(responseText=>{console.log("User Added : "+responseText)})
.catch(error=>console.log("GET error status: "+JSON.stringify(error)))
