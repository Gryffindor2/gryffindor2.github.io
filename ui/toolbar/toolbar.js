var toolbar$selected;
function buildToolBarFromTemplete(templete) {
    for (var i = 0; i < templete.length; i++) {
        templete[i].addEventListener("mouseover", (event) => {
            if (event.target != toolbar$selected) {
                event.target.style.backgroundColor = "#d0d0d0";
            }
        });
        templete[i].addEventListener("mouseout", (event) => {
            if (event.target != toolbar$selected) {
                event.target.style.backgroundColor = "azure";
            }
        });
        templete[i].addEventListener("click", (event) => {
            if (toolbar$selected != null) {
                toolbar$selected.style.backgroundColor = "azure";
            }
            toolbar$selected = event.target;
            event.target.style.backgroundColor = "#c0c0c0";
        });
    }
}
