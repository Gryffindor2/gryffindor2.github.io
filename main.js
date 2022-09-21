function main() {
    resize()
    var canvasContainer = document.getElementById("canvasContainer");
    document.addEventListener('keydown',event => {
      if (event.code === 'Space') {
			  enableDrag(canvasContainer, canvasContainer);
			  canvasContainer.style.cursor='move';
      }
    })
	document.addEventListener('keyup',event=>{
		if (event.code === 'Space') {
			endisableDrag(canvasContainer);
			canvasContainer.style.cursor='default';
    }
	})
  var toolbar = document.getElementById("toolbar");
  enableDrag(toolbar, document.getElementById("toolbarMoveHandle"))
  //enableDrag(instanceOf('outerWindow'),instanceOf('t1'));
  enableResizeVertical(attributePanel, layerPanel, seperator);
  enableResizeHorizontal(null,instanceOf("resizableContainer"),document.getElementById("horizontalSperator"))
  makeMenuFromTemplete(menuTemplete.firstLevel, 0);
  //二级菜单
  makeMenuFromTemplete(menuTemplete.secondLevel, 1);
  //三级菜单
  makeMenuFromTemplete(menuTemplete.thirdLevel,2);
  buildToolBarFromTemplete([instanceOf('selectTool'),instanceOf('tool2'),instanceOf('tool3')]);
  var gl = gl_init(document.getElementById("glcanvas"));
  gl_refresh(gl);
  let msg = new MessageBox('消息框','哈哈哈哈哈哈');

}
function info(){
  let msg = new MessageBox('消息框','info');
}