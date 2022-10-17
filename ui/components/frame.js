function styleOf(id) {
    return document.getElementById(id).style;
}
function instanceOf(id) {
    return document.getElementById(id);
}
function addNewComponentById(idOfParent, components) {
    instanceOf(idOfParent).appendChild(components);
}
function addNewComponent(parent, components) {
    parent.appendChild(components);
}
function addNewComponentBefore(parent, components) {
    parent.insertBefore(components, parent.children[0]);
}
function addNewComponentBeforeById(idOfParent, components) {
    instanceOf(idOfParent).insertBefore(
        components,
        instanceOf(idOfParent).children[0]
    );
}
base$blurAnouncingList = new Array();
document.addEventListener('click', (event) => {
    for (var i = 0; i < base$blurAnouncingList.length; i++) {
        obj = base$blurAnouncingList[i];
        if (!obj.contains(event.target)) {
            obj._blur();
        }
    }
});
class Frame {
    static bind(id){
        return new Frame(null,id);
    }
    constructor(type, id) {
        if(type == null){
            this._ins = instanceOf(id);
        }
        else{
            this._ins = document.createElement(type);
        }
        this._ins.id = id;
        this._id = id;
        this._ins.style.boxSizing = 'border-box';
        this._touch=false;
    }
    instance() {
        return this._ins;
    }
    addClass() {
        for (var i = 0; i < arguments.length; i++)
            this._ins.classList.add(arguments[i]);
    }
    removeClass(className) {
        this._ins.classList.remove(className);
    }
    set text(t) {
        this._text = t;
        this._ins.innerHTML = this._text;
    }
    get text() {
        return this._Text;
    }
    get id() {
        return this._id;
    }
    appendComponent() {
        for (var i = 0; i < arguments.length; i++){
            addNewComponent(this._ins, arguments[i].instance());
            arguments[i]._parent = this;
        }
            
    }
    setSize(width, height) {
        this._ins.style.height = height;
        this._ins.style.width = width;
    }
    set width(w) {
        this._ins.style.width = w + 'px';
    }
    get width() {
        return this._ins.offsetWidth;
    }
    set height(h) {
        this._ins.style.height = h + 'px';
    }
    get height() {
        return this._ins.offsetHeight;
    }
    setPos(left, top) {
        this._ins.style.top = top;
        this._ins.style.left = left;
    }
    get x() {
        return Number(this._ins.style.left.slice(0, -2));
    }
    set x(x) {
        this._ins.style.left = x + 'px';
    }
    get offsetX() {
        return this._ins.offsetLeft;
    }
    get offsetY() {
        return this._ins.offsetTop;
    }
    get y() {
        return Number(this._ins.style.top.slice(0, -2));
    }
    set y(y) {
        this._ins.style.top = y + 'px';
    }
    set margin(margin) {
        this._ins.style.marginLeft = margin[0];
        this._ins.style.marginTop = margin[1];
        this._ins.style.marginRight = margin[2];
        this._ins.style.marginBottom = margin[3];
    }
    get margin() {
        return [
            this._ins.style.marginLeft,
            this._ins.style.marginTop,
            this._ins.style.marginRight,
            this._ins.style.marginBottom,
        ];
    }

    set maxHeight(mh) {
        this._ins.style.maxHeight = mh + 'px';
    }
    set maxWidth(mw) {
        this._ins.style.maxWidth = mw + 'px';
    }
    get style() {
        return this._ins.style;
    }
    get parentNode(){
        return this._parent;
    }
    //functions

    //notes: the functions will be added to the component instead of replacing the existing function.
    set onClick(func) {
        if(func!=null){
            this._ins.addEventListener('click', (event) => {
                func(this);
            });
        }
    }
    set onMouseClick(func){
        if(func!=null){
            this.onClick=()=>{
                if(this._touch==false){
                    func(this);
                }
            }
        }
    }
    set onTouchStart(func){
        this._ins.addEventListener('touchstart', (event) => {
            if (func != null) {
                func(this);
            }
        });
    }
    set onDrag(func) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        this._ins.addEventListener('mousedown', dragMouseDown);
        this._ins.addEventListener('touchstart', dragTouchDown);
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = e=>{
                if(this.timeStamp!=null){
                    return;
                }
                else{
                    this._timeStamp = setTimeout(() => {
                        elementDrag(e);
                        this._timeStamp = null;
                    }, 7);
                }
                
            };
        }
        function dragTouchDown(e) {
            e = e || window.event;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
            document.addEventListener('touchmove', e=>{
                if(this._timeStamp!=null){
                    return;
                }
                else{
                    this._timeStamp = setTimeout(() => {
                        elementDrag_touch(e);
                        this._timeStamp = null;
                    }, 7);
                }
                
            });
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
    set onMouseDown(func) {
        if(func!=null){
            this._ins.addEventListener('mousedown', (event) => {
                func(this);
            });
        }

        this._ins.addEventListener('touchstart', (event) => {
            if (func != null) {
                func(this);
            }
        });
    }
    set onBlur(func) {
        this._blur = func;
        base$blurAnouncingList.push(this);
    }
    set onHover(func){
        if(func!=null){
            this._ins.addEventListener("mouseover",()=>{
                func(this);
            });
        }
    }
    contains(domElemnt) {
        return (
            this._ins.compareDocumentPosition(domElemnt) > 16 ||
            this._ins == domElemnt
        );
    }
    set visiable(b) {
        switch (b) {
            case true:
                this.style.display = 'block';
                break;
            case false:
                this.style.display = 'none';
                break;
        }
    }
    //if using onblur function, this function must be called before the object is collected by GC.
    destructure() {
        for (var i = 0; i < base$blurAnouncingList.length; i++) {
            if (this == base$blurAnouncingList[i]) {
                base$blurAnouncingList.splice(i, 1);
            }
        }
    }
    set backgroundColor(c){
        this.style.backgroundColor = c;
    }
    set onMouseOut(func){
        if(func!=null){
            this._ins.addEventListener('mouseleave',()=>{
                func(this);
            });
        }
    }
    set onTapped(func){
        if(func!=null){
            this.onTouchStart = ()=>{
                this._touch = true;
            };
            this.onClick=()=>{
                if(this._touch == true){
                    func(this);
                    this._touch = false;
                }
            }
        }

    }
}
