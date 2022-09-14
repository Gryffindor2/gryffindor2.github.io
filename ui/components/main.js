function styleOf(id){
    return document.getElementById(id).style;
}

function instanceOf(id){
    return document.getElementById(id);
}

function addNewComponentById(idOfParent,components){
    instanceOf(idOfParent).appendChild(components);
}
function addNewComponent(parent,components){
    parent.appendChild(components);
}
function addNewComponentBefore(parent,components){
    parent.insertBefore(components, parent.children[0]);
}
function addNewComponentBeforeById(idOfParent,components){
    instanceOf(idOfParent).insertBefore(components, instanceOf(idOfParent).children[0]);
}
class Frame{
    constructor(type,id){

        this.ins = document.createElement(type);

        this.ins.id = id;
    }
    instance(){
        return this.ins;
    }
    addClass(className){
        this.ins.classList.add(className);
    }
    setText(text){
        this.ins.innerHTML = text;
    }
}
class Image extends Frame{
    constructor(id){
        super('img',id);
    }
    setSource(path){
        this.ins.src=path;
    }
}
/*class SVG extends Frame{
    constructor(id){
        super('svg',id);
        this.ins.setAttribute("verson", '1.1');
        this.ins.setAttribute('baseProfile',"full");
        this.ins.setAttribute('xmlns',"http://www.w3.org/2000/svg");
        this.ins.setAttribute('viewBox',"0 0 1024 1024");
        this.ins.width="200"; 
        this.ins.height="200";
        this.path = new Frame('path', 'pathOf' + id);
        addNewComponent(this.ins,this.path.instance());
    }
    setPath(d){
        this.path.instance().setAttribute('d', d);
    }
}*/