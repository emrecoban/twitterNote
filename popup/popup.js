chrome.storage.local.get(["twitterNote"]).then(((note)=>{
    if(note["twitterNote"].length>0){
        document.getElementById('people').innerHTML = note["twitterNote"].map((elementLi)=>`<li><b>${elementLi.userName}:</b> ${elementLi.story}</li>`).join('');
        document.getElementById('count').textContent = `(${note["twitterNote"].length})`;
    }
})).catch(()=>{
    document.getElementById('people').innerHTML = "<li><b>There has not been any data yet!</b></li>";
    document.getElementById('count').textContent = "(0)";
});

document.getElementById('deleteBtn').addEventListener('click', ()=>{
    chrome.storage.local.clear();
    document.getElementById('people').innerHTML = "<li><b>There has not been any data yet!</b></li>";
    document.getElementById('count').textContent = "(0)";
});