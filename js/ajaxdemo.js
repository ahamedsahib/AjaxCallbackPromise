//let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
function makePromiseCall(methodType,url,async=true,data=null)
{
    return new Promise(function(resolve,reject){
        let xhr = new XMLHttpRequest();
        xhr.onload=function(){
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
const getURL = "http://localhost:3000/employees/2";
makePromiseCall("GET",getURL,true)
    .then(responseText=>{document.querySelector("#get-services").textContent = "User data: "+responseText;}).
    catch(error=>{document.querySelector("#get-services").textContent = "Get Error status: "+JSON.stringify(error);});
//delete data cdusing delete method and call back
const delURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE",delURL,false)
    .then(responseText=>{document.querySelector("#delete-services").textContent = "Deleted data "}).
    catch(error=>{document.querySelector("#delete-services").textContent = "Delete Error status:: "+JSON.stringify(error);})
//Add data using post method and call back
const postURL = "http://localhost:3000/employees";
const empData = {"first_name":"Lionel","last_name":"Messi","salary":50000};
makePromiseCall("POST",postURL,true,empData)
    .then(responseText=>{document.querySelector("#post-services").textContent = "Added data: "+responseText;})
    .catch(error=>{document.querySelector("#post-services").textContent = "Post error status: "+JSON.stringify(error);})