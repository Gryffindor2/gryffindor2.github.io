function main() {
    initLayout();
    var canvasMovable = false;
    var toolbar = Frame.bind('toolbar')
    Frame.bind('toolbarMoveHandle').onDrag=(dx,dy)=>{
        toolbar.x+=dx;
        toolbar.y+=dy;
    }
    //enableResizeVertical(attributePanel, layerPanel, seperator);
    //enableResizeHorizontal(
    //    null,
    //    instanceOf('resizableContainer'),
    //    document.getElementById('horizontalSperator')
    //);
    buildMenu();
    buildToolBarFromTemplete([
        instanceOf('selectTool'),
        instanceOf('tool2'),
        instanceOf('tool3'),
    ]);
    
    var canvas = new CanvasFluent('glcanvas');
    canvas.setSize('400px', '400px');
    canvas.setPos('220px','10px');
    canvas.style.position='absolute';
    canvas.backgroundColor = '#fff';
    canvas.onDrag=(dx,dy)=>{
        if(canvasMovable == true){
            canvas.x+=dx;
            canvas.y+=dy;
        }
    }
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            canvasMovable=true;
            canvas.style.cursor = 'move';
        }
    });
    document.addEventListener('keyup', (event) => {
        if (event.code === 'Space') {
            canvasMovable=false;
            canvas.style.cursor = 'default';
        }
    });
    addNewComponentById('left', canvas.instance());
    gl_refresh(canvas.glContext);
    showNewProjectWindow();
}
function initLayout() {
    var totalHeight = document.body.clientHeight - 70;
    var attributePanel = document.getElementById('attributePanel');
    attributePanel.style.height = totalHeight * 0.49 + 'px';
    document.getElementById('resizableContainer').style.width = '300px';
    var toolbar = document.getElementById('toolbar');
    toolbar.style.top = '10px';
    toolbar.style.left = '10px';
}
