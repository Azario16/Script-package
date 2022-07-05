import styleText from '../../dark-style-to-af.css';

const styleValue: any = styleText
const styleDart = document.createElement('style');
styleDart.type = 'text/css';
styleDart.appendChild(document.createTextNode(styleValue));

if (window.location.hostname === 'skyeng.autofaq.ai') {
    document.body.appendChild(styleDart);
}

export { }