
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
function resize(){
    var totalHeight = document.body.clientHeight -70;
    var attributePanel = document.getElementById("attributePanel");
    attributePanel.style.height = totalHeight * .49 + 'px';
  }