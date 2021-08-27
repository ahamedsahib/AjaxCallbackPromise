function showTime(){
    const date = new Date();
    return "Hours : "+date.getHours()+" Mins : "+date.getMinutes()+" Seconds :"+date.getSeconds();
}
function showSessionExpire(){
    console.log('Activity-B : Excecuted at '+showTime());
}

console.log('Activity-A: Excecuted at '+showTime());
setTimeout(showSessionExpire,5000);
console.log('Activity-c: Excecuted at '+showTime());