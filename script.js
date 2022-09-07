function main() {
    const canvas = document.querySelector("#glcanvas");
    const gl = canvas.getContext("webgl");
    if (!gl) {
        alert("无法初始化 WebGL,你的浏览器、操作系统或硬件等可能不支持 WebGL。");
        return;
    }
    resize()
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const vsSource = document.getElementById('vertexShader').innerText;
    // 片元着色器
    const fsSource = document.getElementById('fragmentShader').innerText;
    // 初始化着色器
    initShaders(gl, vsSource, fsSource);
    // 指定将要用来清理绘图区的颜色
    gl.clearColor(0., 0.0, 0.0, 1.0);
    // 清理绘图区
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 绘制顶点
    gl.drawArrays(gl.POINTS, 0, 1);

    var canvasContainer = document.getElementById("canvasContainer");
    canvasContainer.style.top = '10px';
    canvasContainer.style.left = '220px';
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
  document.getElementById("resizableContainer").style.width = '300px';
  var toolbar = document.getElementById("toolbar");
  toolbar.style.top = '10px';
  toolbar.style.left = '10px';
    enableDrag(toolbar, document.getElementById("toolbarMoveHandle"))
    enableResizeVertical(attributePanel, layerPanel, seperator);
    enableResizeHorizontal(null,document.getElementById("resizableContainer"),document.getElementById("horizontalSperator"))
  makeMenuFromTemplete(
                    [
                      {exe:event=>{alert(event.target)},
                      subMenu:document.getElementById("fileSubmenu"),
                      elemnt:document.getElementById("fileMenu")},
                      
                      {exe:event=>{alert(event.target)},
                      subMenu:null,
                      elemnt:document.getElementById("editMenu")},

                      {exe:event=>{alert(event.target)},
                      subMenu:null,
                      elemnt:document.getElementById("viewMenu")},

                      {exe:event=>{alert(event.target)},
                      subMenu:null,
                      elemnt:document.getElementById("filterMenu")},

                      {exe:event=>{alert(event.target)},
                      subMenu:null,
                      elemnt:document.getElementById("helpMenu")}
                    ])
}
function initShaders(gl,vsSource,fsSource){
  //创建程序对象
  const program = gl.createProgram();
  //建立着色对象
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  //把顶点着色对象装进程序对象中
  gl.attachShader(program, vertexShader);
  //把片元着色对象装进程序对象中
  gl.attachShader(program, fragmentShader);
  //连接webgl上下文对象和程序对象
  gl.linkProgram(program);
  //启动程序对象
  gl.useProgram(program);
  //将程序对象挂到上下文对象上
  gl.program = program;
  return true;
}
function resize(){
  var totalHeight = document.body.clientHeight -70;
  var attributePanel = document.getElementById("attributePanel");
  attributePanel.style.height = totalHeight * .49 + 'px';

}
function loadShader(gl, type, source) {
  //根据着色类型，建立着色器对象
  const shader = gl.createShader(type);
  //将着色器源文件传入着色器对象中
  gl.shaderSource(shader, source);
  //编译着色器对象
  gl.compileShader(shader);
  //返回着色器对象
  return shader;
}
function makeMenuFromTemplete(menuArray)
{
  for(i=0;i<menuArray.length;i++){
    var menuItem=menuArray[i].elemnt;
    if(menuArray[i].subMenu == null){
      menuItem.addEventListener('click', menuArray[i].exe);
    }
    else{
      menuItem.addEventListener('click', ()=>{
        alert("子菜单");
        
      });
    }
    menuItem.addEventListener('mouseover',event=>{
      event.target.style.backgroundColor='#d7d7d7';
    });
    menuItem.addEventListener('mouseout',event=>{
      event.target.style.backgroundColor='#e8e8e8';
    });
  }
}
function endisableDrag(handle)
{
	handle.onmousedown = null;
}
function enableResizeVertical(top,bottom,handle){
  var originY = 0, deltaY = 0;
  handle.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // 在启动时获取鼠标光标位置:
    originY = e.clientY;
    document.onmouseup = closeDragElement;
    // 每当光标移动时调用一个函数:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // 计算新的光标位置:
    deltaY = originY - e.clientY;
    originY = e.clientY;
    // 设置元素的新位置:
    if(top!=null)
      top.style.height = (Number(top.style.height.slice(0, -2)) - deltaY) + 'px';
    if(bottom!=null)
      bottom.style.height = (Number(bottom.style.height.slice(0, -2)) + deltaY) + 'px';
  }

  function closeDragElement() {
    // 释放鼠标按钮时停止移动:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function enableResizeHorizontal(left,right,handle)
{
  var originX = 0, deltaX = 0;
  handle.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // 在启动时获取鼠标光标位置:
    originX = e.clientX;
    document.onmouseup = closeDragElement;
    // 每当光标移动时调用一个函数:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // 计算新的光标位置:
    deltaX = originX - e.clientX;
    originX = e.clientX;
    // 设置元素的新位置:
    if(left!=null)
      left.style.width = (Number(left.style.width.slice(0, -2)) - deltaX) + 'px';
    if(right!=null)
      right.style.width = (Number(right.style.width.slice(0, -2)) + deltaX) + 'px';
  }

  function closeDragElement() {
    // 释放鼠标按钮时停止移动:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function enableDrag(elmnt,handle) {
  //elemnt is the object to move
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    handle.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // 在启动时获取鼠标光标位置:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // 每当光标移动时调用一个函数:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // 计算新的光标位置:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // 设置元素的新位置:
      elmnt.style.top = (Number(elmnt.style.top.slice(0, -2)) - pos2) + "px";
      elmnt.style.left = (Number(elmnt.style.left.slice(0, -2)) - pos1) + "px";
    }
  
    function closeDragElement() {
      // 释放鼠标按钮时停止移动:
      document.onmouseup = null;
      document.onmousemove = null;
    }
}