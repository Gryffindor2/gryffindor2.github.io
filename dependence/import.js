/*$using('./main.js');
$using("./ui/menu/menu.js");
$using("./ui/main/layout.js");
$using('./webgl/kernel.js');
$using('./ui/toolbar/toolbar.js');
$using('./ui/components/main.js');
$using('./ui/components/window/window.js')
$using('./ui/menu/templete.js');
$using('./ui/components/components.js');*/
$resourceDictionary("./layout.css");
$resourceDictionary("./ui/toolbar/toolbar.css");
$resourceDictionary("./ui/public.css");
$resourceDictionary("./ui/components/fluent.css");
/*async function $using(path){

    var head = document.getElementsByTagName('head')[0];
    var  script = document.createElement("script");
    head.appendChild(script);
    var request = new XMLHttpRequest();
    await new Promise(()=>{
        request.open("GET",path,true);
        request.onreadystatechange = ()=>{
            js = request.responseText;
            script.innerHTML = js;
        };
        request.send(null);
    })
}*/
//temporarily abandoned
//f**k u javascript
function $resourceDictionary(path) {
    var head = document.getElementsByTagName("head")[0];
    var link = document.createElement("link");
    link.href = path;
    link.rel = "stylesheet";
    link.type = "text/css";
    head.appendChild(link);
}
