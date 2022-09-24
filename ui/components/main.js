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
        this.ins.style.boxSizing = 'border-box';
    }
    instance(){
        return this.ins;
    }
    addClass(className){
        this.ins.classList.add(className);
    }
    removeClass(className){
        this.ins.classList.remove(className);
    }
    setText(text){
        this.ins.innerHTML = text;
    }
    appendComponent(comp){
        addNewComponent(this.ins,comp.instance());
    }
    setSize(width,height){
        this.ins.style.height = height;
        this.ins.style.width = width;
    }
    setPos(top,left){
        this.ins.style.top = top;
        this.ins.style.left = left;
    }
    set horizontalAlignment(direction){
        switch(direction){
            case 'left':
                this.ins.style.float = 'left';
                break;
            case 'right':
                this.ins.style.float = 'right';
                break;
            default:
                throw 'invalid value';
        }
    }
    set margin(margin){
        this.ins.style.marginLeft = margin[0];
        this.ins.style.marginTop = margin[1]
        this.ins.style.marginRight = margin[2]
        this.ins.style.marginBottom = margin[3]
    }
    set onClick(func){
        this.ins.addEventListener('click',func);
    }
}
