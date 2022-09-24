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
  let newProjectWindow = new Window('newProjectWindow');
  newProjectWindow.setSize('800px','600px');
  newProjectWindow.setTitle('新建工程');
  var spm = new StackPanel('mainStackpanel');
  var sp1 = new StackPanel('s1');
  sp1.direction = 'horizontal';
  var sp2 = new StackPanel('s2');
  sp2.direction = 'horizontal';
  var sp3 = new StackPanel('s3');
  sp3.direction = 'horizontal';
  spm.appendComponent(sp1);
  spm.appendComponent(sp2);
  spm.appendComponent(sp3);
  newProjectWindow.getMainWindow().appendComponent(spm);
  var t1 = new TextBlock('width:','t1');
  t1.setSize('60px','30px');
  var textBlock1 = new TextBox('text1');
  textBlock1.setSize('80px','30px');
  textBlock1.placeHolder = 'Width';
  sp1.appendComponent(t1);
  sp1.appendComponent(textBlock1);
  var t2 = new TextBlock('height:','t2');
  t2.setSize('60px','30px');
  var textBlock = new TextBox('text');
  textBlock.setSize('80px','30px');
  textBlock.placeHolder = 'Height';
  sp2.appendComponent(t2);
  sp2.appendComponent(textBlock);
  var button = new Button('确认','btn1');
  button.setSize('70px','30px');
  button.margin = ['5px','5px','5px','5px'];
  button.onClick = ()=>{
    info('height is '+textBlock.text+' and width is '+textBlock1.text);
  }
  sp3.appendComponent(button);
}
function info(info){
  let msg = new MessageBox('消息框',info==null?'info':info);
}