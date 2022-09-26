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
    set text(t){
        this.innerText = t;
        this.ins.innerHTML = this.innerText;
    }
    get text(){
        return this.innerText;
    }
    setText(t){
        this.innerText = t;
        this.ins.innerHTML = this.innerText;
    }
    appendComponent(comp){
        addNewComponent(this.ins,comp.instance());
    }
    setSize(width,height){
        this.ins.style.height = height;
        this.ins.style.width = width;
        //this.ins.style.lineHeight = this.ins.style.height;
    }
    set width(w){
        this.ins.style.width = w + 'px';
    }
    get width(){
        return this.ins.offsetWidth;
    }
    set height(h){
        this.ins.style.height = h + 'px';
        //this.ins.style.lineHeight = this.ins.style.height;
    }
    get height(){
        return this.ins.offsetHeight;
    }
    setPos(top,left){
        this.ins.style.top = top;
        this.ins.style.left = left;
    }
    get x(){
        return this.ins.offsetLeft;
    }
    set x(x){
        this.ins.style.left = x+'px';
    }
    get y(){
        return this.ins.offsetTop;
    }
    set y(y){
        this.ins.style.top = y+'px';
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
    get margin(){
        return [this.ins.style.marginLeft,this.ins.style.marginTop,this.ins.style.marginRight,this.ins.style.marginBottom]
    }
    set onClick(func){
        this.ins.addEventListener('click',func);
    }
    set maxHeight(mh){
        this.ins.style.maxHeight = mh +'px';
    }
    set maxWidth(mw){
        this.ins.style.maxWidth = mw + 'px';
    }
}
