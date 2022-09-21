class Button extends Frame{
    constructor(text,id){
        super('div',id);
        this.setText(text);
        this.addClass('buttonFluent');
        this.ins.style.textAlign = 'center';
    }
    set onClick(func){
        this.ins.addEventListener('click',func);
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
        this.addClass('unselectable')
    }
}