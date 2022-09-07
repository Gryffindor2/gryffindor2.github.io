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
  makeMenuFromTemplete([
                        {exe:null,
                        subMenu:document.getElementById("fileSubMenu"),
                        elemnt:document.getElementById("fileMenu"),},

                        {exe:null,
                        subMenu:document.getElementById("editSubMenu"),
                        elemnt:document.getElementById("editMenu")},

                        {exe:null,
                        subMenu:document.getElementById("viewSubMenu"),
                        elemnt:document.getElementById("viewMenu")},

                        {exe:null,
                        subMenu:document.getElementById("filterSubMenu"),
                        elemnt:document.getElementById("filterMenu")},

                        {exe:null,
                        subMenu:document.getElementById("helpSubMenu"),
                        elemnt:document.getElementById("helpMenu")}
                      ],0)
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
