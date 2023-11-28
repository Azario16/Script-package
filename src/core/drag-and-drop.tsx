const createDargAndDrop = (mainElemnt: any, dragDropElement: any, prefName: string) => {
    // Указываем главное окно
    const generalElm = mainElemnt
    // Теперь элементы нажатием на которые оно будет перемещаться
    const dragAndDrop = dragDropElement

    //Сохранение позиции окна
    if (localStorage.getItem(`${prefName}Top`) === null) {
        localStorage.setItem(`${prefName}Top`, '120');
        localStorage.setItem(`${prefName}Left`, '295');
    }

    generalElm.style.top = localStorage.getItem(`${prefName}Top`)
    generalElm.style.left = localStorage.getItem(`${prefName}Left`)

    let shiftX: any
    let shiftY: any
    dragAndDrop.onmousedown = function (event: any) {
        const coords = getCoords(generalElm);

        shiftX = event.clientX - coords.left;
        shiftY = event.clientY - coords.top;

        moveAt(event.clientX, event.clientY);
        document.addEventListener('mousemove', onMouseMove);
        generalElm.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            generalElm.onmouseup = null;
        };

    };

    function onMouseMove(event: any) {
        moveAt(event.clientX, event.clientY);
    }

    function moveAt(clientX: any, clientY: any) {
        generalElm.style.left = clientX - shiftX + 'px';
        generalElm.style.top = clientY - shiftY + 'px';
        localStorage.setItem(`${prefName}Left`, generalElm.style.left);
        localStorage.setItem(`${prefName}Top`, generalElm.style.top);
    }

    generalElm.ondragstart = function () {
        return false;
    };

    function getCoords(elem: any) {   // кроме IE8-
        const box = elem.getBoundingClientRect();
        return {
            top: box.top,
            left: box.left
        };
    }

}

export { createDargAndDrop }