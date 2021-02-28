
let arrow = document.querySelectorAll('.hidden-list-item__toggle');

    for(i=0;i<arrow.length;i++){
        let subMenu = arrow[i].nextElementSibling;
        let thisArrow = arrow[i];
        arrow[i].addEventListener('click', function() {
            subMenu.classList.toggle('active');
            thisArrow.classList.toggle('arrow-active');
        });
    }