const createDargAndDrop = (mainElemnt: any, dragDropElement: any) => {
    // Указываем главное окно
    let generalElm = mainElemnt
    // Теперь элементы нажатием на которые оно будет перемещаться
    let dragAndDrop = dragDropElement

    //Сохранение позиции окна
    if (localStorage.getItem('winTop') === null) {
        localStorage.setItem('winTop', '120');
        localStorage.setItem('winLeft', '295');
    }

    generalElm.style.top = localStorage.getItem('winTop')
    generalElm.style.left = localStorage.getItem('winLeft')
    // generalElm.style.position = "absolute"
    let shiftX: any
    let shiftY: any 
    dragAndDrop.onmousedown = function (event: any) {
        // console.log('Нажатие на эелемент')
        const coords = getCoords(generalElm);

        shiftX = event.clientX - coords.left;
        shiftY = event.clientY - coords.top;

        // generalElm.style.position = 'absolute';
        generalElm.style.zIndex = 1000;

        moveAt(event.clientX, event.clientY);
        document.addEventListener('mousemove', onMouseMove);
        generalElm.onmouseup = function () {
            // console.log('Элемент отпущен')
            document.removeEventListener('mousemove', onMouseMove);
            generalElm.onmouseup = null;
        };

    };

    function onMouseMove(event: any) {
        // console.log('Перемещение')
        moveAt(event.clientX, event.clientY);
    }

    function moveAt(clientX: any, clientY: any) {
        generalElm.style.left = clientX - shiftX + 'px';
        generalElm.style.top = clientY - shiftY + 'px';
        localStorage.setItem('winLeft', generalElm.style.left);
        localStorage.setItem('winTop', generalElm.style.top);
    }

    generalElm.ondragstart = function () {
        return false;
    };

    function getCoords(elem: any) {   // кроме IE8-
        var box = elem.getBoundingClientRect();
        return {
            top: box.top,
            left: box.left
        };
    }

}

export { createDargAndDrop }