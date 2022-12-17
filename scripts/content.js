const injectDOM = (userName)=>{
    const findElement = document.querySelector('[data-testid="UserName"]');
    document.getElementById('twitterNoteAction') && document.getElementById('twitterNoteAction').remove();
    const virtualP = document.createElement('div');
    virtualP.id = "twitterNoteAction"
    virtualP.innerHTML = '<b>Twitter Note (<div class="tooltip">AutoSave<span class="tooltiptext">Twitter Note saves your notes automatically, every key press.</span></div>):</b><br/><textarea id="twitterStory" name="story" rows="4" spellcheck="false" autocomplete="off" placeholder="Take a note about them!"></textarea>';
    findElement.appendChild(virtualP);
    const twitterStoryEl = document.getElementById('twitterStory');

    chrome.storage.local.get(["twitterNote"]).then(((note)=>{
        const storage = note["twitterNote"]?note["twitterNote"]:[];
        if(note["twitterNote"] && note["twitterNote"].some((obj)=>obj.userName == userName)){
            const objIndex = note["twitterNote"].findIndex((obj)=>obj.userName == userName);
            twitterStoryEl.value = note["twitterNote"][objIndex].story;
        }else{
            twitterStoryEl.value && storage.push({userName:`${userName}`, story:`${twitterStoryEl.value}`});
        }
        let jSONObj = {};
        jSONObj["twitterNote"] = storage;
        chrome.storage.local.set(jSONObj);
    }));

    twitterStoryEl.addEventListener('keyup', ()=>{
        
        chrome.storage.local.get(["twitterNote"]).then(((note)=>{
            const storage = note["twitterNote"]?note["twitterNote"]:[];
            if(note["twitterNote"] && note["twitterNote"].some((obj)=>obj.userName == userName)){
                const objIndex = note["twitterNote"].findIndex((obj)=>obj.userName == userName);
                note["twitterNote"][objIndex].story = twitterStoryEl.value;
            }else{
                storage.push({userName:`${userName}`, story:`${twitterStoryEl.value}`});
            }
            let jSONObj = {};
            jSONObj["twitterNote"] = storage;
            chrome.storage.local.set(jSONObj);
        }));
    })
};

document.addEventListener("DOMNodeInserted", function(e) {
    e.target.content && e.target.content.includes('twitter://user?screen_name=') && document.querySelector('[data-testid="UserName"]') && injectDOM(e.target.content.split('=')[1]);
}, false);