const createDargAndDrop = (mainElemnt: any, dragDropElement: any) => {
    // Указываем главное окно
    let generalElm = mainElemnt
    // Теперь элементы нажатием на которые оно будет перемещаться
    let dragAndDrop = dragDropElement
    let shiftX: any
    let shiftY: any
    dragAndDrop.onmousedown = function (event: any) {
        // console.log('Нажатие на эелемент')
        const coords = getCoords(generalElm);

        shiftX = event.clientX - coords.left;
        shiftY = event.clientY - coords.top;

        generalElm.style.position = 'absolute';
        generalElm.style.zIndex = 1000;

        moveAt(event.pageX, event.pageY);
        document.addEventListener('mousemove', onMouseMove);
        generalElm.onmouseup = function () {
            // console.log('Элемент отпущен')
            document.removeEventListener('mousemove', onMouseMove);
            generalElm.onmouseup = null;
        };

    };

    function onMouseMove(event: any) {
        // console.log('Перемещение')
        moveAt(event.pageX, event.pageY);
    }

    function moveAt(pageX: any, pageY: any) {
        generalElm.style.left = pageX - shiftX + 'px';
        generalElm.style.top = pageY - shiftY + 'px';
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