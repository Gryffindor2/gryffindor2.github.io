var menuTemplete = {
    get firstLevel(){
        return [{exe:null,
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
        ];
    },
    get secondLevel(){
        return [{exe:info,
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
        ];
    },
    get thirdLevel(){
        return [{exe:()=>{  
            let window1 = new Window('windowContainer','x');
                window1.setSize('600px','400px');
                window1.setTitle('hhh');
            },
            subMenu:null,
            elemnt:document.getElementById('layerMenu')}
        ];
    }
}