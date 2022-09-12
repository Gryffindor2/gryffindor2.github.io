var menu$path = new Array(3);
var menu$menuActivated = false;
var menu$totalMenuArray =[];
var menu$maxLevel;
function makeMenuFromTemplete(menuArray, level)
{
  menu$totalMenuArray = menu$totalMenuArray.concat(menuArray);
  for(i=0;i<menuArray.length;i++){
    var menuItem=menuArray[i].elemnt;
    if(menuArray[i].subMenu == null){
      menuItem.addEventListener('click', menuArray[i].exe);
      menuItem.addEventListener('click', ()=>{
        menu$menuActivated=false;
        for(k=0;k<=2;k++){
          if(menu$path[k]!=null){
            var sub = getSubmenu(menu$path[k]);
            menu$path[k].style.backgroundColor='#e8e8e8';
            if(sub!=null){
              sub.style.display='none';
            }
          }else{
            break;
          }
        }
      });
    }
    else{
      menuItem.addEventListener('click', event=>{
        var mis = getSubmenu(event.target);
        if(mis.style.display != 'block'){
          mis.style.display = 'block';
          if(level == 0){
            mis.style.left = event.target.offsetLeft+'px';
            mis.style.top = event.target.offsetTop + event.target.offsetHeight +1 +'px';
          }
          else{
            mis.style.left = event.target.parentNode.offsetLeft + event.target.offsetLeft + event.target.offsetWidth +  1 +'px';
            mis.style.top = event.target.parentNode.offsetTop + event.target.offsetTop - 7 + 'px';
          }
          menu$menuActivated = true;
          menu$path[level] =  event.target;
          menu$maxLevel=level;
        }
        else{
          mis.style.display = 'none';
          if(level == 0){
            menu$menuActivated = false;
            menu$path[level] =  null;
          }
        }
      });
    }
    menuItem.addEventListener('mouseover',event=>{
      if(menu$menuActivated == true)
      {
        
        if(menu$path[level]!=event.target && menu$path[level]!=null){
          menu$maxLevel=level;
          for(k=level;k<=2;k++){
            if(menu$path[k]!=null){
              var sub = getSubmenu(menu$path[k]);
              menu$path[k].style.backgroundColor='#e8e8e8';
              if(sub!=null){
                sub.style.display='none';
              }
            }else{
              
              break;
              
            }
          }
        }
        menu$path[level] =  event.target;
        if(getSubmenu(menu$path[level])!=null){
          var mis = getSubmenu(menu$path[level])
          menu$maxLevel=1+level;
          mis.style.display = 'block';
          if(level == 0){
            mis.style.left = event.target.offsetLeft+'px';
            mis.style.top = event.target.offsetTop + event.target.offsetHeight +1 +'px';
          }
          else{
            mis.style.left = event.target.parentNode.offsetLeft + event.target.offsetLeft + event.target.offsetWidth +  1 +'px';
            mis.style.top = event.target.parentNode.offsetTop + event.target.offsetTop - 7 + 'px';
          }
        }
      }
      event.target.style.backgroundColor='#d7d7d7';
    });
    menuItem.addEventListener('mouseout',event=>{
      if(menu$menuActivated == false || event.target == menu$path[menu$maxLevel]){
        event.target.style.backgroundColor='#e8e8e8';
      }
    });
  }
  document.getElementById("workbench").addEventListener('click',()=>{
    menu$menuActivated=false;
    for(k=level;k<=2;k++){
      if(menu$path[k]!=null){
        var sub = getSubmenu(menu$path[k]);
        menu$path[k].style.backgroundColor='#e8e8e8';
        if(sub!=null){
          sub.style.display='none';
        }
      }else{
        break;
      }
    }
  })
  document.getElementById("footer").addEventListener('click',()=>{
    menu$menuActivated=false;
    for(k=level;k<=2;k++){
      if(menu$path[k]!=null){
        var sub = getSubmenu(menu$path[k]);
        menu$path[k].style.backgroundColor='#e8e8e8';
        if(sub!=null){
          sub.style.display='none';
        }
      }else{
        break;
      }
    }
  })
  function getSubmenu(menuItem){
    for(j=0;j<menu$totalMenuArray.length;j++){
      if(menu$totalMenuArray[j].elemnt == menuItem){
        return menu$totalMenuArray[j].subMenu;
      }
    }
  }
}
