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