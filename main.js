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
  enableResizeHorizontal(null,document.getElementById("resizableContainer"),document.getElementById("horizontalSperator"))
  makeMenuFromTemplete([{exe:null,
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
  //二级菜单
  makeMenuFromTemplete([{exe:info,
                          subMenu:null,
                          elemnt:document.getElementById("openMenu")},
                        
                        {exe:info,
                        subMenu:null,
                        elemnt:document.getElementById('closeMenu')},
                        
                        {exe:info,
                        subMenu:null,
                        elemnt:document.getElementById('exportMenu')},
                      
                        {exe:info,
                        subMenu:null,
                        elemnt:document.getElementById('saveMenu')},

                        {exe:info,
                        subMenu:null,
                        elemnt:document.getElementById('copyMenu')},

                        {exe:info,
                        subMenu:null,
                        elemnt:document.getElementById('pasteMenu')},
                        
                        {exe:null,
                        subMenu:document.getElementById("newSubMenu"),
                        elemnt:document.getElementById('newMenu')},
                      
                        {exe:()=>{    
                          resize();
                        },
                        subMenu:null,
                        elemnt:document.getElementById('resetMenu')},
                      
                        {exe:info,
                        subMenu:null,
                        elemnt:document.getElementById('moreFilterMenu')},

                        {exe:info,
                        subMenu:null,
                        elemnt:document.getElementById('helpDocumentMenu')}
                        ],1)
  //三级菜单
  makeMenuFromTemplete([{exe:info,subMenu:null,elemnt:document.getElementById('layerMenu')}],2);
  buildToolBarFromTemplete([instanceOf('selectTool'),instanceOf('tool2'),instanceOf('tool3')]);
  var gl = gl_init(document.getElementById("glcanvas"));
  gl_refresh(gl);
  let window1 = new Window('outerWindow');
  addNewComponentBeforeById('App',window1.instance());
  enableDrag(instanceOf('outerWindow'),instanceOf('t1'));
  window1.show();
}
function info(){
  alert("info")
}