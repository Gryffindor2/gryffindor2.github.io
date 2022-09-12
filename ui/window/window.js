class Window extends Frame{
    constructor(parentid,id){
        super('div',id);
        this.ins.classList.add("window");
        this.ins.classList.add('verticalFlexContainer');
        this.ins.classList.add('unselectable');
        this.titleBar = new Frame('div','titleBarOf'+id);
        this.titleBar.addClass('horizontalFlexContainer');
        this.titleBar.addClass('titleBar');
        this.title = new Frame('div','titleOf'+id);
        this.title.addClass('title');
        this.title.setText('title');
        addNewComponent(this.titleBar.instance(),this.title.instance());
        this.close = new Frame('div','closeOf'+id);
        this.close.addClass('close');
        this.close.setText('&#xE106;');
        addNewComponent(this.titleBar.instance(),this.close.instance())
        addNewComponent(this.ins,this.titleBar.instance());
        this.mainWindow = new Frame('div','mainWindowOf' + id);
        this.mainWindow.addClass('mainWindow');
        addNewComponent(this.ins,this.mainWindow.instance());
        addNewComponentById(parentid, this.ins);
        enableDrag(this.ins, this.title.instance());
        (this.close.instance()).addEventListener('click',event=>{
            instanceOf(parentid).removeChild(this.ins);
        })
    }
    show(){
        this.ins.style.display = 'block';
    }
    hide(){
        this.ins.style.display = 'none';
    }
    setSize(width,height){
        this.ins.style.height = height;
        this.ins.style.width = width;
    }
    setPos(top,left){
        this.ins.style.top = top;
        this.ins.style.left = left;
    }
    setTitle(text){
        this.title.setText(text);
    }
    getMainWindow(){
        return this.mainWindow.instance();
    }
}