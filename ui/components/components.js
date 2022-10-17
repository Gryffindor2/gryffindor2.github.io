var window$onlyWindow;
class Window extends Frame {
    constructor(id, mono) {
        super('div', id);
        this._mono = mono;
        this.addClass('window', 'verticalFlexContainer', 'unselectable');
        this._titleBar = new Frame('div', 'titleBar-' + id);
        this._titleBar.addClass('horizontalFlexContainer', 'titleBar');
        this._title = new Frame('div', 'title-' + id);
        this._title.addClass('title');
        this._title.text = 'title';
        this._titleBar.appendComponent(this._title);
        this._closeBG = new Frame('id', 'closeBG-' + id);
        this._closeBG.addClass('closeBG');
        this._close = new ImageFluent('close-' + id);
        this._close.addClass('close');
        this._close.source = './assets/icon/close.png';
        this._closeBG.appendComponent(this._close);
        this._titleBar.appendComponent(this._closeBG);
        this.appendComponent(this._titleBar);
        this._mainWindow = new Frame('div', 'mainWindow-' + id);
        this._mainWindow.addClass('mainWindow');
        this.appendComponent(this._mainWindow);
        addNewComponentById('windowContainer', this._ins);
        this._title.onDrag = (a, b) => {
            this.x += a;
            this.y += b;
        };
        this._title.onMouseDown = (event) => {
            if (
                instanceOf('windowContainer').children[
                    instanceOf('windowContainer').children.length - 1
                ] != this._ins
            ) {
                instanceOf('windowContainer').removeChild(this._ins);
                addNewComponentById('windowContainer', this._ins);
            }
        };
        if (this._mono == true) {
            this.style.zIndex = '7';
            instanceOf('placeHolder').style.display = 'block';
            if (window$onlyWindow != null) {
                throw 'multiple monoplied window is not allowed';
            }
            window$onlyWindow = this;
        }
        this._close.instance().addEventListener('click', (event) => {
            this.hide();
        });
    }
    show() {
        this.ins.style.display = 'block';
    }
    hide() {
        if (this._mono == true) {
            instanceOf('placeHolder').style.display = 'none';
            window$onlyWindow = null;
        }
        instanceOf('windowContainer').removeChild(this._ins);
    }
    set title(t) {
        this._title.text = t;
    }
    getMainWindow() {
        return this._mainWindow;
    }
}
class Button extends Frame {
    constructor(text, id) {
        super('div', id);
        this.text = text;
        this.addClass('buttonFluent');
        this.style.textAlign = 'center';
        this.style.lineHeight = this.style.height;
    }
    setSize(width, height) {
        super.setSize(width, height);
        this.style.lineHeight = this.style.height;
    }
    set height(height) {
        this.height = height;
        this.style.lineHeight = this.style.height;
    }
}
class TextBlock extends Frame {
    constructor(text, id) {
        super('div', id);
        this.text = text;
        this.addClass('unselectable', 'textBlockFluent');
    }
    //need to be set after setting size
    setTextVerticallyCenterAligned() {
        this._b = true;
        this.style.lineHeight = this.style.height;
    }
    set height(height) {
        this.height = height;
        if (this._b) {
            this.style.lineHeight = this.style.height;
        }
    }
    setSize(width, height) {
        super.setSize(width, height);
        if (this._b) {
            this.style.lineHeight = this.style.height;
        }
    }
}
//in order to avoid the conflict between the naive Image class, this class is named ImageFluent
class ImageFluent extends Frame {
    constructor(id) {
        super('img', id);
    }
    set source(path) {
        this._ins.src = path;
    }
}
class TextBox extends Frame {
    constructor(id) {
        super('input', id);
        this._ins.type = 'text';
        this.addClass('textBox', 'unactivatedTextBox');
        this._ins.addEventListener('mousedown', (event) => {
            this.removeClass('unactivatedTextBox');
        });
        this._ins.addEventListener('blur', (event) => {
            this.addClass('unactivatedTextBox');
        });
    }
    set placeHolder(text) {
        this._ins.setAttribute('placeholder', text);
    }
    set text(t) {
        this._ins.value = t;
    }
    get text() {
        return this._ins.value;
    }
    set onTextChanged(func) {
        this._ins.addEventListener('input', func);
    }
}
class StackPanel extends Frame {
    constructor(id) {
        super('div', id);
        this.addClass('verticalFlexContainer');
    }
    set direction(direct) {
        switch (direct) {
            case 'horizontal':
                this.removeClass('verticalFlexContainer');
                this.addClass('horizontalFlexContainer');
                break;
            case 'vertical':
                this.removeClass('horizontalFlexContainer');
                this.addClass('verticalFlexContainer');
                break;
            default:
                throw 'Invalid argument';
        }
    }
}
class ComboBox extends Frame {
    items = new Array();
    _flyoutShowed = false;
    constructor(id) {
        super('div', id);
        this._comboBoxContainer = new StackPanel('comboBoxContainer-' + id);
        this._comboBoxContainer.height = 30;
        this._comboBoxContainer.addClass(
            'comboBoxFluent',
            'fluentClickable',
            'fluentBorder'
        );
        this._contentTextBlock = new TextBlock('', 'textBlock-' + id);
        this._contentTextBlock.margin = ['3px', '0', '0', '0'];
        this._comboBoxContainer.direction = 'horizontal';
        var dropDownImage = new ImageFluent('dropDownImage-' + id);
        dropDownImage.addClass('dropDownImage');
        this._comboBoxContainer.appendComponent(
            this._contentTextBlock,
            new PlaceHolder('placeHolder' + id),
            dropDownImage
        );
        dropDownImage.source = './assets/icon/dropdown.png';
        dropDownImage.width = 20;
        dropDownImage.height = 20;
        this._comboBoxContainer.style.alignItems = 'center';
        this.appendComponent(this._comboBoxContainer);
        this._comboBoxContainer.onClick = () => {
            this._comboBoxFlyout = new StackPanel('comboBoxFlyout-' + id);
            if (this.items.length == 0) {
                return;
            } else {
                this._comboBoxFlyout.setSize(this.width + 'px', 'auto');
                this._comboBoxFlyout.maxHeight = 150;
                this._comboBoxFlyout.addClass('flyoutFluent', 'fluentBorder');
                this._comboBoxFlyout.y = this.offsetY;
                this._comboBoxFlyout.x = this.offsetX;
                this._comboBoxFlyout.addClass('verticalScrollable');
                for (var i = 0; i < this.items.length; i++) {
                    var s = new StackPanel();
                    s.height = 30;
                    s.style.alignItems = 'center';
                    s.direction = 'horizontal';
                    s.addClass('fluentClickableNoBorder', 'comboBoxItem');
                    if (i == this.selected) {
                        s.addClass('comboBoxItemActivated');
                    }
                    s.margin = ['3px', '1px', '1px', '1px'];
                    var indicator = new Frame(
                        'div',
                        'indicator-' + i + '-' + id
                    );
                    indicator.addClass('comboBoxIndicator');
                    s.appendComponent(indicator);
                    var candidateTextBlock = new TextBlock(
                        this.items[i],
                        'item-' + i + '-' + id
                    );
                    candidateTextBlock.margin = ['2px', '', '', ''];
                    s.appendComponent(candidateTextBlock);
                    this._comboBoxFlyout.appendComponent(s);
                    s.onClick = (event) => {
                        this._selected =
                            event.instance().childNodes[1].innerHTML;
                        this._contentTextBlock.text = this._selected;
                        this._ins.removeChild(this._comboBoxFlyout.instance());
                        this.destructure();
                    };
                }
            }
            this.appendComponent(this._comboBoxFlyout);
            this.onBlur = () => {
                this._ins.removeChild(this._comboBoxFlyout.instance());
                this.destructure();
            };
        };
    }
    set placeHolder(text) {
        if (this.selected == -1) {
            this.content = text;
        }
    }
    set selected(index) {
        this._selected = this.items[index];
        this.contentTextBlock.text = this._selected;
    }
    get selected() {
        if (this._selected == null) {
            return -1;
        } else {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i] == this._selected) {
                    return i;
                }
            }
            throw 'Unknown Error';
        }
    }
    get content() {
        return this._contentTextBlock.text;
    }
    set content(text) {
        this._contentTextBlock.text = text;
    }
    addItem(itemName) {
        this.items.push(itemName);
    }
    setSize(width, height) {
        this._comboBoxContainer.setSize(width, height);
    }
    set width(w) {
        this._comboBoxContainer.width = w;
    }
    get width() {
        return this._comboBoxContainer.width;
    }
    set height(h) {
        this._comboBoxContainer.height = h;
    }
    get height() {
        return this._comboBoxContainer.height;
    }
}
class ToggleSwitch extends StackPanel {
    constructor(id) {
        super(id);
        this.direction = 'horizontal';
        this.addClass('toggleSwitchFluentOff');
        this.setSize('56px', '26px');
        this.style.alignItems = 'center';
        var button = new Frame('div', 'switch' + id);
        button.addClass('switchFluent');
        this.appendComponent(button);
        this.onClick = () => {
            this.selected = !this.selected;
        };
    }
    get selected() {
        return this._selected;
    }
    set selected(s) {
        this._selected = s;
        switch (s) {
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
class Slider extends StackPanel {
    maxValue = 1;
    constructor(direction, id) {
        super(id);
        this.style.alignItems = 'center';
        this.addClass('sliderFluent');
        switch (direction) {
            case 'horizontal':
                this.direction = 'horizontal';
                this.width = 90;
                var leftOrbit = new Frame('div', 'leftOrbit-' + id);
                leftOrbit.addClass('leftOrbitFluent');
                var rightOrbit = new Frame('div', 'rightOtbit-' + id);
                rightOrbit.addClass('rightOrbitFluent');
                this.appendComponent(leftOrbit);
                this.appendComponent(rightOrbit);
                this._handle = new Frame('div', 'handle-' + id);
                this._handle.addClass('sliderHandleFluent');
                this.appendComponent(this._handle);
                var handleIndicator = new Frame('div', 'handleIndicator-' + id);
                handleIndicator.addClass('sliderHandleIndicatorFluent');
                this._handle.appendComponent(handleIndicator);
                this._handle.x = 14;
                leftOrbit.width = 25;
                this.onDrag = (a, b) => {
                    var t = this._handle.x + a;

                    if (t <= -11) {
                        t = -11;
                    }
                    if (t >= this.width - 11) {
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
        this.onMouseDown = () => {
            document.addEventListener('mouseup', () => {
                this.removeClass('sliderFluentActivated');
            });
            document.addEventListener('touchend', () => {
                this.removeClass('sliderFluentActivated');
            });
            this.addClass('sliderFluentActivated');
        };
    }
    get value() {
        return Number((this._handle.x + 11) / this.width) * this.maxValue;
    }
    setSize(width, height) {
        this.comboBoxContainer.setSize(width, '5px');
    }
    set height(h) {}
    set valueChanged(func) {
        this._valueChanged = func;
    }
}
class CheckBox extends Frame {
    constructor(id) {
        super('div', id);
        this.setSize('20px', '20px');
        this.addClass('checkBoxFluent');
        var checkedImage = new ImageFluent('iamge-' + id);
        checkedImage.addClass('checkBoxCheckedImageFluent');
        checkedImage.source = './assets/icon/checked.png';
        this.appendComponent(checkedImage);
        this.checked = false;
        this.onClick = () => {
            this.checked = !this.checked;
        };
    }
    set checked(state) {
        if (state == this._checked) {
            return;
        }
        this._checked = state;
        if (this._checked) {
            this.removeClass('checkBoxFluentUnchecked');
            this.addClass('checkBoxFluentChecked');
        } else {
            this.removeClass('checkBoxFluentChecked');
            this.addClass('checkBoxFluentUnchecked');
        }
    }
    get checked() {
        return this._checked;
    }
}
class ScrollViewer extends Frame {
    constructor(id) {
        super(id);
        this.style.overFlowY = 'auto';
        this.style.overFlowX = 'auto';
    }
}
class CardView extends ScrollViewer {
    _innerIndex = 0;
    constructor(id, bind) {
        super(id);
        this.style.alignItems = 'center';
        this._cardStackPanel = new StackPanel('cardStackPanel');
        this._cardStackPanel.direction = 'horizontal';
        this._cardStackPanel.style.flexWrap = 'wrap';
        this._bindfunc = bind;
        this.addClass('cardViewFluent');
        this.appendComponent(this._cardStackPanel);
    }
    add(para) {
        var card = new Card('card' + this._innerIndex + this.id);
        card.appendComponent(this._bindfunc(para, card));
        this._cardStackPanel.appendComponent(card);
        this._innerIndex++;
        card.margin = ['8px', '5px', '8px', '5px'];
        card.onClick = () => {
            if (this._activated != card) {
                if (this._activated != null) {
                    this._activated.removeClass('cardFluentFocused');
                }
                card.addClass('cardFluentFocused');
                this._activated = card;
            }
        };
    }
    //abandoned
    set colomns(n) {
        this._cardStackPanel.style.colmnCount = n;
    }
}
class Card extends Frame {
    constructor(id) {
        super('div', id);
        this.addClass('cardFluent');
    }
}
class PlaceHolder extends StackPanel {
    constructor(id) {
        super(id);
        this.addClass('fluentFilled');
    }
}
class Menu extends StackPanel {
    _path = new Array(3);
    _menuActivated = false;
    constructor(id, menuTemplete) {
        super('div', id);
        this.direction = 'horizontal';
        this.style.flexWrap = 'wrap';
        this._buildMenuFromTemplete(menuTemplete, 0);
        this.onBlur = () => {
            this._menuActivated = false;
            this._hideBelow(0);
        };
    }
    _buildMenuFromTemplete(menuTemplete, level, subMenu) {
        if (level >= 1) {
            subMenu.addClass('subMenu', 'unselectable');
        }
        for (var i = 0; i < menuTemplete.length; i++) {
            var t = menuTemplete[i];
            var menuItem = new MenuItem(t.id);
            menuItem.appendComponent(new TextBlock(t.content, 'text-' + t.id));
            menuItem.onClick = t.exe;
            menuItem.level = level;
            menuItem.onMouseOut = (target) => {
                if (this._maxLevel == target.level) {
                    target.backgroundColor = '#e8e8e8';
                }
            };
            switch (level) {
                case 0:
                    this.appendComponent(menuItem);
                    menuItem.addClass('menuItem', 'unselectable');
                    if (t.subMenu != null) {
                        var newSubMenu = new Frame('div', 'subMenu-' + this.id);
                        newSubMenu.addClass('subMenu', 'unselectable');
                        this._buildMenuFromTemplete(
                            t.subMenu,
                            level + 1,
                            newSubMenu
                        );
                        menuItem.subMenu = newSubMenu;
                        menuItem.onTapped = (target) => {
                            this._menuActivated = true;
                            console.log(target);
                            this._maxLevel = this._menuActivated ? 1 : 0;
                            target.backgroundColor = '#d7d7d7';
                            if (this._menuActivated == true) {
                                if (this._path[target.level] != target) {
                                    if (this._path[target.level] != null) {
                                        this._hideBelow(target.level);
                                    }
                                }
                                target.showSubMenu(
                                    target.offsetX,
                                    target.offsetY + target.height + 1
                                );
                                this._path[target.level] = target;
                            }
                        };
                        menuItem.onMouseClick = (target) => {
                            this._maxLevel = 1;
                            this._menuActivated = true;
                            target.backgroundColor = '#d7d7d7';
                            if (this._menuActivated == true) {
                                if (this._path[target.level] != target) {
                                    if (this._path[target.level] != null) {
                                        this._path[
                                            target.level
                                        ].subMenu.visiable = false;
                                        this._path[
                                            target.level
                                        ].backgroundColor = '#e8e8e8';
                                    }
                                }
                                target.showSubMenu(
                                    target.offsetX,
                                    target.offsetY + target.height + 1
                                );
                                this._path[target.level] = target;
                            }
                        };
                        menuItem.onHover = (target) => {
                            this._maxLevel = this._menuActivated ? 1 : 0;
                            target.backgroundColor = '#d7d7d7';
                            if (this._menuActivated == true) {
                                if (this._path[target.level] != target) {
                                    if (this._path[target.level] != null) {
                                        this._hideBelow(target.level);
                                    }
                                }
                                target.showSubMenu(
                                    target.offsetX,
                                    target.offsetY + target.height + 1
                                );
                                this._path[target.level] = target;
                            }
                        };
                        menuItem.onMouseOut = (target) => {
                            if (this._menuActivated == false) {
                                target.backgroundColor = '#e8e8e8';
                            }
                        };
                    } else {
                        throw 'the sub menu of the first level menu should noţbe empty';
                    }
                    break;
                case 1:
                    subMenu.appendComponent(menuItem);
                    this.appendComponent(subMenu);
                    menuItem.addClass('subMenuItem');
                    if (t.subMenu != null) {
                        menuItem.appendComponent(
                            new PlaceHolder('blank-' + t.id)
                        );
                        var rightArrow = new ImageFluent('rightArrow');
                        rightArrow.source = './assets/icon/rightarrow.png';
                        menuItem.appendComponent(rightArrow);
                        var newSubMenu = new Frame('div', 'subMenu-' + this.id);
                        newSubMenu.addClass('subMenu', 'unselectable');
                        this._buildMenuFromTemplete(
                            t.subMenu,
                            level + 1,
                            newSubMenu
                        );
                        menuItem.subMenu = newSubMenu;
                        menuItem.onTapped = (target) => {
                            this._maxLevel = 2;
                            if (target != this._path[target.level]) {
                                this._hideBelow(target.level);
                                this._path[target.level] = target;
                                target.showSubMenu(
                                    target.parentNode.offsetX +
                                        target.offsetX +
                                        target.width +
                                        1,
                                    target.parentNode.offsetY +
                                        target.offsetY -
                                        7
                                );
                                target.backgroundColor = '#d7d7d7';
                            }
                        };
                        menuItem.onHover = (target) => {
                            this._maxLevel = 2;
                            if (target != this._path[target.level]) {
                                this._hideBelow(target.level);
                                this._path[target.level] = target;
                                target.showSubMenu(
                                    target.parentNode.offsetX +
                                        target.offsetX +
                                        target.width +
                                        1,
                                    target.parentNode.offsetY +
                                        target.offsetY -
                                        7
                                );
                                target.backgroundColor = '#d7d7d7';
                            }
                        };
                    } else {
                        menuItem.onClick = () => {
                            this._menuActivated = false;
                            this._hideBelow(0);
                        };
                        menuItem.onHover = (target) => {
                            if (target != this._path[target.level]) {
                                this._maxLevel = 1;
                                this._hideBelow(target.level);
                                this._path[target.level] = target;
                                target.backgroundColor = '#d7d7d7';
                            }
                        };
                    }
                    break;
                case 2:
                    subMenu.appendComponent(menuItem);
                    this.appendComponent(subMenu);
                    menuItem.addClass('subMenuItem');
                    subMenu.onClick = () => {
                        this._menuActivated = false;
                        this._hideBelow(0);
                    };
                    menuItem.onHover = (target) => {
                        target.backgroundColor = '#d7d7d7';
                        this._maxLevel = 2;
                    };
                    if (t.subMenu != null) {
                        throw 'over the max count of menu layer';
                    }
                    break;
            }
        }
    }
    _hideBelow(index) {
        for (var i = index; i < 3; i++) {
            if (this._path[i] != null) {
                this._path[i].backgroundColor = '#e8e8e8';
                if (this._path[i].subMenu != null) {
                    this._path[i].subMenu.visiable = false;
                    this._path[i] = null;
                }
            }
        }
    }
}
class MenuItem extends StackPanel {
    constructor(id) {
        super(id);
        this.direction = 'horizontal';
    }
    get subMenu() {
        return this._subMenu;
    }
    set subMenu(elemnt) {
        this._subMenu = elemnt;
    }
    get level() {
        return this._level;
    }
    set level(level) {
        this._level = level;
    }
    showSubMenu(x, y) {
        this._subMenu.visiable = true;
        this._subMenu.x = x;
        this._subMenu.y = y;
    }
}
class CanvasFluent extends Frame{
    constructor(id){
        super('canvas',id);
        this.text = '你的浏览器似乎不支持或者禁用了 HTML5 canvas 元素。';
        this._glContext =  gl_init(this._ins);
    }
    get glContext(){
        return this._glContext;
    }
}