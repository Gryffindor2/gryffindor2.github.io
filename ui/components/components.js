class Button extends Frame{
    constructor(text,id){
        super('div',id);
        this.setText(text);
        this.addClass('buttonFluent');
        this.ins.style.textAlign = 'center';
    }
    setSize(width,height){
        super.setSize(width,height);
        this.ins.style.lineHeight = this.ins.style.height;
    }
}
class TextBlock extends Frame{
    constructor(text,id){
        super('p',id);
        this.setText(text);
        this.text=text;
        this.addClass('unselectable');
        this.addClass('textBlockFluent');
    }
    set text(t){
        this.setText(t);
    }
    get text(){
        return this.text;
    }
}
class Image extends Frame{
    constructor(id){
        super('img',id);
    }
    setSource(path){
        this.ins.src=path;
        return;
    }
    set source(path){
        this.ins.src=path;
    }
}
class TextBox extends Frame{
    constructor(id){
        super('input',id);
        this.ins.type = 'text';
        this.addClass('textBox');
        this.addClass('unactivatedTextBox');
        this.ins.addEventListener('mousedown',event=>{this.removeClass('unactivatedTextBox')});
        this.ins.addEventListener('blur',event=>{this.addClass('unactivatedTextBox')});
    }
    set placeHolder(text){
        this.ins.setAttribute('placeholder',text);
    }
    set text(t){
        this.ins.value = t;
    }
    get text(){
        return this.ins.value;
    }
}
class StackPanel extends Frame{
    constructor(id){
        super('div',id);
        this.addClass('verticalFlexContainer');
    }
    set direction(direct){
        switch(direct){
            case 'horizontal':
                this.removeClass('verticalFlexContainer');
                this.addClass('horizontalFlexContainer');
                break;
            case 'vertical':
                this.removeClass('horizontalFlexContainer');
                this.addClass('verticalFlexContainer');
            default:
                throw 'Invalid argument';
        }
    }
}
class ComboBox extends Frame{
    items = new Array();
    constructor(id){
        super('div',id);
        this.comboBoxContainer = new StackPanel('comboBoxContainer-'+id);
        this.comboBoxContainer.height=30;
        this.comboBoxContainer.addClass('comboBoxFluent');
        this.comboBoxContainer.addClass('fluentClickable');
        this.comboBoxContainer.addClass('fluentBorder');
        this.contentTextBlock = new TextBlock('','textBlock-'+id);
        this.contentTextBlock.margin = ['3px','0','0','0'];
        this.comboBoxContainer.direction = 'horizontal';
        var dropDownImage = new Image('image-'+id);
        dropDownImage.addClass('dropDownImage');
        this.comboBoxContainer.appendComponent(this.contentTextBlock);
        this.comboBoxContainer.appendComponent(dropDownImage);
        dropDownImage.setSource('./assets/icon/close.png');
        dropDownImage.width = 20;
        dropDownImage.height = 20;
        this.comboBoxContainer.ins.style.alignItems = 'center';
        this.appendComponent(this.comboBoxContainer);
        this.comboBoxContainer.onClick = ()=>{
            var comboBoxFlyout = new StackPanel('comboBoxFlyout-'+id);
            if(this.items.length==0){
                return;
            }
            else{
                comboBoxFlyout.setSize(this.width + 'px','auto');
                comboBoxFlyout.maxHeight = 150;
                comboBoxFlyout.addClass('flyoutFluent');
                comboBoxFlyout.addClass('fluentBorder');
                comboBoxFlyout.y=this.y;
                comboBoxFlyout.x = this.x;
                comboBoxFlyout.addClass('verticalScrollable');
                for(i=0; i<this.items.length;i++){
                    var s = new StackPanel();
                    s.height = 30;
                    s.ins.style.alignItems = 'center';
                    s.direction = 'horizontal';
                    s.addClass('fluentClickableNoBorder');
                    s.addClass('comboBoxItem');
                    if(i==this.selected){
                        s.addClass('comboBoxItemActivated');
                    }
                    s.margin = ['3px','1px','1px','1px'];
                    var indicator = new Frame('div','indicator-'+i+'-'+id);
                    indicator.addClass('comboBoxIndicator');
                    s.appendComponent(indicator);
                    var candidateTextBlock = new TextBlock(this.items[i],'item-'+i+'-'+id);
                    candidateTextBlock.margin = ['2px','','',''];
                    s.appendComponent(candidateTextBlock);
                    comboBoxFlyout.appendComponent(s);
                    s.onClick =event=>{
                        this._selected = event.target.childNodes[1].innerHTML;
                        this.contentTextBlock.text = this._selected;
                        this.ins.removeChild(comboBoxFlyout.ins);
                    };
                }
            }
            this.appendComponent(comboBoxFlyout);
        };

    }
    set placeHolder(text){
        if(this.selected==-1){
            this.content = text;
        }
    }
    set selected(index){
        this._selected=this.items[index];
        this.contentTextBlock.text = this._selected;
    }
    get selected(){
        if(this._selected==null){
            return -1;
        }
        else{
            for(var i=0; i<this.items.length; i++){
                if(this.items[i] == this._selected){
                    return i;
                }
            }
            throw 'Unknown Error';
        }
    }
    get content(){
        return this.contentTextBlock.text;
    }
    set content(text){
        this.contentTextBlock.text=text;
    }
    addItem(itemName){
        this.items.push(itemName);
    }
    setSize(width,height){
        this.comboBoxContainer.setSize(width,height);
    }
    set width(w){
        this.comboBoxContainer.width = w;
    }
    get width(){
        return this.comboBoxContainer.width
    }
    set height(h){
        this.comboBoxContainer.height = h;
    }
    get height(){
        return this.comboBoxContainer.height;
    }
}
class ToggleSwitch extends StackPanel{
    constructor(id){
        super(id);
        this.direction = 'horizontal';
        this.addClass('toggleSwitchFluentOff');
        this.setSize('56px','26px');
        this.ins.style.alignItems = 'center';
        var button = new Frame('div','switch'+id);
        button.addClass('switchFluent');
        this.appendComponent(button);
        this.onClick=()=>{
            this.selected = !this.selected;
        }
    }
    get selected(){
        return this._selected;
    }
    set selected(s){
        this._selected = s;
        switch(s){
            case true:
                this.removeClass('toggleSwitchFluentOff');
                this.addClass('toggleSwitchFluentOn');
                break;
            case false:
                this.addClass('toggleSwitchFluentOff');
                this.removeClass('toggleSwitchFluentOn');
                break;
        }
    }
}