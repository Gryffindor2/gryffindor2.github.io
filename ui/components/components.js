class Button extends Frame{
    constructor(text,id){
        super('div',id);
        this.text = text;
        this.addClass('buttonFluent');
        this.style.textAlign = 'center';
        this.style.lineHeight = this.style.height;
    }
    setSize(width,height){
        super.setSize(width,height);
        this.style.lineHeight = this.style.height;
    }
    set height(height){
        this.height = height;
        this.style.lineHeight = this,this.style.height;
    }
}
class TextBlock extends Frame{
    constructor(text,id){
        super('p',id);
        this.text = text;
        this.addClass('unselectable','textBlockFluent');
    }
}
class Image extends Frame{
    constructor(id){
        super('img',id);
    }
    set source(path){
        this._ins.src=path;
    }
}
class TextBox extends Frame{
    constructor(id){
        super('input',id);
        this._ins.type = 'text';
        this.addClass('textBox', 'unactivatedTextBox');
        this._ins.addEventListener('mousedown',event=>{this.removeClass('unactivatedTextBox')});
        this._ins.addEventListener('blur',event=>{this.addClass('unactivatedTextBox')});
    }
    set placeHolder(text){
        this._ins.setAttribute('placeholder',text);
    }
    set text(t){
        this._ins.value = t;
    }
    get text(){
        return this._ins.value;
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
    _flyoutShowed = false;
    constructor(id, cancelArea){
        super('div',id);
        this._comboBoxContainer = new StackPanel('comboBoxContainer-'+id);
        this._comboBoxContainer.height=30;
        this._comboBoxContainer.addClass('comboBoxFluent', 'fluentClickable', 'fluentBorder');
        this._contentTextBlock = new TextBlock('','textBlock-'+id);
        this._contentTextBlock.margin = ['3px','0','0','0'];
        this._comboBoxContainer.direction = 'horizontal';
        var dropDownImage = new Image('dropDownImage-'+id);
        dropDownImage.addClass('dropDownImage');
        this._comboBoxContainer.appendComponent(this._contentTextBlock);
        this._comboBoxContainer.appendComponent(dropDownImage);
        dropDownImage.source = './assets/icon/dropdown.png';
        dropDownImage.width = 20;
        dropDownImage.height = 20;
        this._comboBoxContainer.style.alignItems = 'center';
        this.appendComponent(this._comboBoxContainer);
        this._comboBoxContainer.onClick = ()=>{
            this._comboBoxFlyout = new StackPanel('comboBoxFlyout-'+id);
            if(this.items.length==0){
                return;
            }
            else{
                this._comboBoxFlyout.setSize(this.width + 'px','auto');
                this._comboBoxFlyout.maxHeight = 150;
                this._comboBoxFlyout.addClass('flyoutFluent', 'fluentBorder');
                this._comboBoxFlyout.y = this.offsetY;
                this._comboBoxFlyout.x = this.offsetX;
                this._comboBoxFlyout.addClass('verticalScrollable');
                for(i=0; i<this.items.length;i++){
                    var s = new StackPanel();
                    s.height = 30;
                    s.style.alignItems = 'center';
                    s.direction = 'horizontal';
                    s.addClass('fluentClickableNoBorder', 'comboBoxItem');
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
                    this._comboBoxFlyout.appendComponent(s);
                    s.onClick =event=>{
                        this._selected = event.target.childNodes[1].innerHTML;
                        this._contentTextBlock.text = this._selected;
                        this._ins.removeChild(this._comboBoxFlyout.instance());
                        this._flyoutShowed = false;
                    };

                }
            }
            this.appendComponent(this._comboBoxFlyout);

            this._flyoutShowed = true;
        };
        cancelArea.onClick = event=>{
            if(this._flyoutShowed && this._ins.compareDocumentPosition(event.target) < 16 ){
                this._ins.removeChild(this._comboBoxFlyout.instance());
                this._flyoutShowed = false;
            }
        }
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
        return this._contentTextBlock.text;
    }
    set content(text){
        this._contentTextBlock.text=text;
    }
    addItem(itemName){
        this.items.push(itemName);
    }
    setSize(width,height){
        this._comboBoxContainer.setSize(width,height);
    }
    set width(w){
        this._comboBoxContainer.width = w;
    }
    get width(){
        return this._comboBoxContainer.width
    }
    set height(h){
        this._comboBoxContainer.height = h;
    }
    get height(){
        return this._comboBoxContainer.height;
    }
}
class ToggleSwitch extends StackPanel{
    constructor(id){
        super(id);
        this.direction = 'horizontal';
        this.addClass('toggleSwitchFluentOff');
        this.setSize('56px','26px');
        this.style.alignItems = 'center';
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
class Slider extends StackPanel{
    maxValue=1;
    constructor(direction, id){
        super(id);
        this.style.alignItems = 'center';
        this.addClass('sliderFluent');
        switch(direction){
            case 'horizontal':
                this.direction = 'horizontal';
                this.width = 90;
                var leftOrbit = new Frame('div','leftOrbit-'+id);
                leftOrbit.addClass('leftOrbitFluent');
                var rightOrbit = new Frame('div','rightOtbit-'+id);
                rightOrbit.addClass('rightOrbitFluent');
                this.appendComponent(leftOrbit);
                this.appendComponent(rightOrbit);
                this._handle = new Frame('div', 'handle-'+id);
                this._handle.addClass('sliderHandleFluent');
                this.appendComponent(this._handle);
                var handleIndicator = new Frame('div', 'handleIndicator-'+id);
                handleIndicator.addClass('sliderHandleIndicatorFluent');
                this._handle.appendComponent(handleIndicator);
                this._handle.x = 14;
                leftOrbit.width = 25;
                this.onDrag = (a,b)=>{
                    var t = this._handle.x + a;
                    
                    if(t<=-11){
                        t = -11;
                    }
                    if(t>=this.width-11){
                        t = this.width - 11;
                    }
                    var delta = t - this._handle.x;
                    this._handle.x = t;
                    leftOrbit.width += delta;
                    rightOrbit.width -= delta;
                    this._valueChanged();
                };
                break;
            case 'vertical':
                break;
            default:
                throw 'Invalid argument';
        }
        this.onMouseDown=()=>{
            document.addEventListener('mouseup', ()=>{this.removeClass('sliderFluentActivated');});
            document.addEventListener('touchend', ()=>{this.removeClass('sliderFluentActivated');});
            this.addClass('sliderFluentActivated');
        }
    }
    get value(){
        
        return Number((this._handle.x+11)/this.width)*this.maxValue;
    }
    setSize(width,height){
        this.comboBoxContainer.setSize(width,'5px');
    }
    set height(h){
        ;
    }
    set valueChanged(func){
        this._valueChanged = func;
    }
}
class CheckBox extends Frame{
    constructor(){
        throw 'Not implemented';
    }
}