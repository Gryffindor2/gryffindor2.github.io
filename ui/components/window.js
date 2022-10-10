var window$onlyWindow;
class Window extends Frame{
    constructor(id, mono){
        super('div',id);
        this._mono = mono;
        this.addClass('window','verticalFlexContainer','unselectable');
        this._titleBar = new Frame('div','titleBar-'+id);
        this._titleBar.addClass('horizontalFlexContainer','titleBar');
        this._title = new Frame('div','title-'+id);
        this._title.addClass('title');
        this._title.text = 'title';
        this._titleBar.appendComponent(this._title);
        this._closeBG = new Frame('id', 'closeBG-'+id);
        this._closeBG.addClass('closeBG');
        this._close = new Image('close-'+id);
        this._close.addClass('close');
        this._close.source = './assets/icon/close.png';
        this._closeBG.appendComponent(this._close);
        this._titleBar.appendComponent(this._closeBG)
        this.appendComponent(this._titleBar)
        this._mainWindow = new Frame('div','mainWindow-' + id);
        this._mainWindow.addClass('mainWindow');
        this.appendComponent(this._mainWindow);
        addNewComponentById('windowContainer', this._ins);
        this._title.onDrag = (a,b)=>{
            this.x += a;
            this.y += b;
        }
        this._title.onMouseDown = event=>{
            if(instanceOf('windowContainer').children[instanceOf('windowContainer').children.length-1]!=this._ins){
                instanceOf('windowContainer').removeChild(this._ins);
                addNewComponentById('windowContainer', this._ins);
            }
        }
        if(this._mono == true){
            this.style.zIndex = '7';
            instanceOf('placeHolder').style.display = 'block';
            if(window$onlyWindow != null){
                throw 'multiple monoplied window is not allowed';
            }
            window$onlyWindow = this;
        }
        (this._close.instance()).addEventListener('click',event=>{
            this.hide();
        })
    }
    show(){
        this.ins.style.display = 'block';
    }
    hide(){
        if(this._mono == true){
            instanceOf('placeHolder').style.display = 'none';
            window$onlyWindow = null;
        }
        instanceOf('windowContainer').removeChild(this._ins);
    }
    set title(t){
        this._title.text = t;
    }
    getMainWindow(){
        return this._mainWindow;
    }
}
class MessageBox extends Window{
    constructor(title, msg){
        super('messageBox',true);
        this.title = title;
        var msgTextBlock = new TextBlock(msg,'text-'+'messagebox');
        msgTextBlock.margin = ['5px','5px','5px','5px'];
        (this.getMainWindow()).appendComponent(msgTextBlock);
        var okButton = new Button('确认','okButton-'+'messagebox');
        okButton.setSize('70px','30px');
        okButton.onClick = ()=>{this.hide()};
        okButton.horizontalAlignment = 'right';
        okButton.margin = ['5px','5px','5px','5px'];
        (this.getMainWindow()).appendComponent(okButton);
        this.setPos('50px','50px');
        this.setSize('300px','');
    }
}