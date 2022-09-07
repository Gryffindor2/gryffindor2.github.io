var path = new Array(3);
var menuActivated = false;
function makeMenuFromTemplete(menuArray, level)
{
  for(i=0;i<menuArray.length;i++){
    var menuItem=menuArray[i].elemnt;
    if(menuArray[i].subMenu == null){
      menuItem.addEventListener('click', menuArray[i].exe);
    }
    else{
      menuItem.addEventListener('click', event=>{
        var mis = getSubmenu(event.target);
        if(mis.style.display != 'block'){
          mis.style.display = 'block';
          mis.style.left = event.target.offsetLeft+'px';
          menuActivated = true;
          path[level] =  event.target;
        }
        else{
          mis.style.display = 'none';
          menuActivated = false;
          path[level] =  null;
        }
      });
    }
    menuItem.addEventListener('mouseover',event=>{
      if(menuActivated == true)
      {
        if(path[level]!=event.target && path[level]!=null){
          for(k=level;k<=2;k++){
            if(path[k]!=null){
              var sub = getSubmenu(path[k]);
              path[k].style.backgroundColor='#e8e8e8';
              if(sub!=null){
                sub.style.display='none';
              }
            }else{
              break;
            }
          }
        }
        path[level] =  event.target;
        if(getSubmenu(path[level])!=null){
          var mis = getSubmenu(path[level])
          mis.style.display = 'block';
          mis.style.left = event.target.offsetLeft+'px';
        }
      }
      event.target.style.backgroundColor='#d7d7d7';
    });
    menuItem.addEventListener('mouseout',event=>{
      if(menuActivated == false)
      {
        event.target.style.backgroundColor='#e8e8e8';
      }
    });
  }
  document.getElementById("workbench").addEventListener('click',()=>{
    menuActivated=false;
    for(k=level;k<=2;k++){
      if(path[k]!=null){
        var sub = getSubmenu(path[k]);
        path[k].style.backgroundColor='#e8e8e8';
        if(sub!=null){
          sub.style.display='none';
        }
      }else{
        break;
      }
    }
  })
  document.getElementById("footer").addEventListener('click',()=>{
    menuActivated=false;
    for(k=level;k<=2;k++){
      if(path[k]!=null){
        var sub = getSubmenu(path[k]);
        path[k].style.backgroundColor='#e8e8e8';
        if(sub!=null){
          sub.style.display='none';
        }
      }else{
        break;
      }
    }
  })
  function getSubmenu(menuItem){
    for(j=0;j<menuArray.length;j++){
      if(menuArray[j].elemnt == menuItem){
        return menuArray[j].subMenu;
      }
    }
  }
}
