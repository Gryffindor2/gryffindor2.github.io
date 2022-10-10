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
        this._ins = document.createElement(type);
        this._ins.id = id;
        this._ins.style.boxSizing = 'border-box';
    }
    instance(){
        return this._ins;
    }
    addClass(){
        for(var i = 0; i<arguments.length; i++)
            this._ins.classList.add(arguments[i]);
    }
    removeClass(className){
        this._ins.classList.remove(className);
    }
    set text(t){
        this._text = t;
        this._ins.innerHTML = this._text;
    }
    get text(){
        return this._Text;
    }
    appendComponent(){
        for(var i = 0; i<arguments.length; i++)
            addNewComponent(this._ins,arguments[i].instance());
    }
    setSize(width,height){
        this._ins.style.height = height;
        this._ins.style.width = width;
    }
    set width(w){
        this._ins.style.width = w + 'px';
    }
    get width(){
        return this._ins.offsetWidth;
    }
    set height(h){
        this._ins.style.height = h + 'px';
    }
    get height(){
        return this._ins.offsetHeight;
    }
    setPos(top,left){
        this._ins.style.top = top;
        this._ins.style.left = left;
    }
    get x(){
        return Number(this._ins.style.left.slice(0, -2));
    }
    set x(x){
        this._ins.style.left = x+'px';
    }
    get offsetX(){
        return this._ins.offsetLeft;
    }
    get offsetY(){
        return this._ins.offsetTop;
    }
    get y(){
        return Number(this._ins.style.top.slice(0, -2));
    }
    set y(y){
        this._ins.style.top = y+'px';
    }
    set margin(margin){
        this._ins.style.marginLeft = margin[0];
        this._ins.style.marginTop = margin[1]
        this._ins.style.marginRight = margin[2]
        this._ins.style.marginBottom = margin[3]
    }
    get margin(){
        return [this._ins.style.marginLeft,this._ins.style.marginTop,this._ins.style.marginRight,this._ins.style.marginBottom]
    }

    set maxHeight(mh){
        this._ins.style.maxHeight = mh +'px';
    }
    set maxWidth(mw){
        this._ins.style.maxWidth = mw + 'px';
    }
    get style(){
        return this._ins.style;
    }
    //functions

    //notes: the functions will be added to the component instead of replacing the existing function.
    set onClick(func){
        this._ins.addEventListener('click',func);
    }
    set onDrag(func){
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        this._ins.addEventListener('mousedown',dragMouseDown);
        this._ins.addEventListener('touchstart',dragTouchDown);
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        function dragTouchDown(e) {
            e = e || window.event;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
            document.addEventListener('touchmove', elementDrag_touch);
            document.addEventListener('touchend', closeDragElement_touch);
        }
        function elementDrag_touch(e) {
            pos1 = pos3 - e.touches[0].clientX;
            pos2 = pos4 - e.touches[0].clientY;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
            func(-pos1, -pos2);
        }
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            func(-pos1, -pos2);
        }
        function closeDragElement_touch() {
            document.removeEventListener('touchmove', elementDrag_touch);
            document.removeEventListener('touchend', closeDragElement_touch);
        }
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    set onMouseDown(func){
        this._ins.addEventListener('mousedown',event=>{func(event)});
        this._ins.addEventListener('touchstart',event=>{func(event)});
    }
}
