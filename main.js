function main() {
    resize();
    var canvasContainer = document.getElementById('canvasContainer');
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            enableDrag(canvasContainer, canvasContainer);
            canvasContainer.style.cursor = 'move';
        }
    });
    document.addEventListener('keyup', (event) => {
        if (event.code === 'Space') {
            endisableDrag(canvasContainer);
            canvasContainer.style.cursor = 'default';
        }
    });
    var toolbar = document.getElementById('toolbar');
    enableDrag(toolbar, document.getElementById('toolbarMoveHandle'));
    enableResizeVertical(attributePanel, layerPanel, seperator);
    enableResizeHorizontal(
        null,
        instanceOf('resizableContainer'),
        document.getElementById('horizontalSperator')
    );
    buildMenu();
    buildToolBarFromTemplete([
        instanceOf('selectTool'),
        instanceOf('tool2'),
        instanceOf('tool3'),
    ]);
    var gl = gl_init(document.getElementById('glcanvas'));
    gl_refresh(gl);
    showNewProjectWindow();
}
function resize() {
    var totalHeight = document.body.clientHeight - 70;
    var attributePanel = document.getElementById('attributePanel');
    attributePanel.style.height = totalHeight * 0.49 + 'px';
    var canvasContainer = document.getElementById('canvasContainer');
    canvasContainer.style.top = '10px';
    canvasContainer.style.left = '220px';
    document.getElementById('resizableContainer').style.width = '300px';
    var toolbar = document.getElementById('toolbar');
    toolbar.style.top = '10px';
    toolbar.style.left = '10px';
}
