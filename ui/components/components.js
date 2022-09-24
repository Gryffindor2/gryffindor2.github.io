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
class ComboBox extends Frame{
    constructor(id){
        super('div',id);
        this.addClass('comboBox');

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