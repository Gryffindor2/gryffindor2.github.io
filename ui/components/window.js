var window$onlyWindow;
class Window extends Frame{
    constructor(id,mono){
        super('div',id);
        this.mono = mono;
        this.ins.classList.add("window");
        this.ins.classList.add('verticalFlexContainer');
        this.ins.classList.add('unselectable');
        this.titleBar = new Frame('div','titleBar-'+id);
        this.titleBar.addClass('horizontalFlexContainer');
        this.titleBar.addClass('titleBar');
        this.title = new Frame('div','title-'+id);
        this.title.addClass('title');
        this.title.setText('title');
        addNewComponent(this.titleBar.instance(),this.title.instance());
        this.closeBG = new Frame('id', 'closeBG-'+id);
        this.closeBG.addClass('closeBG');
        this.close = new Image('close-'+id);
        this.close.addClass('close');
        this.close.setSource('./assets/icon/close.png');
        addNewComponent(this.closeBG.instance(),this.close.instance());
        addNewComponent(this.titleBar.instance(),this.closeBG.instance());
        addNewComponent(this.ins,this.titleBar.instance());
        this.mainWindow = new Frame('div','mainWindow-' + id);
        this.mainWindow.addClass('mainWindow');
        addNewComponent(this.ins,this.mainWindow.instance());
        addNewComponentById('windowContainer', this.ins);
        enableDrag(this.ins, this.title.instance());
        if(this.mono == true){
            this.ins.style.zIndex = '7';
            instanceOf('placeHolder').style.display = 'block';
            if(window$onlyWindow != null){
                throw 'multiple monoplied window is not allowed';
            }
            window$onlyWindow = this;
        }
        (this.close.instance()).addEventListener('click',event=>{
            this.hide();
        })
    }
    show(){
        this.ins.style.display = 'block';
    }
    hide(){
        if(this.mono == true){
            instanceOf('placeHolder').style.display = 'none';
            window$onlyWindow = null;
        }
        instanceOf('windowContainer').removeChild(this.ins);
    }
    setTitle(text){
        this.title.setText(text);
    }
    getMainWindow(){
        return this.mainWindow;
    }
}
class MessageBox extends Window{
    constructor(title, msg){
        super('messageBox',true);
        this.setTitle(title);
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