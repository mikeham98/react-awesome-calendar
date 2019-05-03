export const getElementHeight = (element) => {
    let height = element.offsetHeight;
    height += parseInt(window.getComputedStyle(element).getPropertyValue('margin-top'));
    height += parseInt(window.getComputedStyle(element).getPropertyValue('margin-bottom'));

    return height;
};