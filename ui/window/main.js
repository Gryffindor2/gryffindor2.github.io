class Window extends Frame{
    constructor(id){
        super('div',id);
        this.ins.classList.add("window");
        this.ins.classList.add('verticalFlexContainer');
        this.ins.classList.add('unselectable');
        var titleBar = new Frame('div','t1');
        titleBar.addClass('horizontalFlexContainer');
        titleBar.addClass('titleBar');
        var title = new Frame('div','title');
        title.setText('title');
        addNewComponent(titleBar.instance(),title.instance());
        var close = new Frame('div','close');
        close.setText('&#xE106;');
        addNewComponent(titleBar.instance(),close.instance())
        addNewComponent(this.ins,titleBar.ins);
        addNewComponent(this.ins,new Frame('div','mainWindow').instance());
        
    }
    show(){
        this.ins.style.display = 'block';
    }
    hide(){
        this.ins.style.display = 'none';
    }
}