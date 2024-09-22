window.onload = function () {
    document.querySelectorAll('input[name=Settings][type=checkbox]').forEach( function(elem) {
        var name = elem.id;
        
        chrome.storage.local.get([name], function (result) {
            let def = true;
            
            if (elem.getAttribute("default") === "true") {
                def = true;
            } else if (elem.getAttribute("default") === "false") {
                def = false;
            }

            elem.checked = result[name] !== undefined ? result[name] : def;
        });

        elem.onclick = function () {
            const name = elem.id;
            const type = elem.checked;

            chrome.storage.local.set({ [name]: type }, ()=>{});
        };
    });
}