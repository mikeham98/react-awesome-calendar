export const getElementHeight = element => {
  let height = element.offsetHeight;
  height += parseInt(
    window.getComputedStyle(element).getPropertyValue('margin-top')
  );
  height += parseInt(
    window.getComputedStyle(element).getPropertyValue('margin-bottom')
  );

  return height;
};

export const getElementWidth = element => {
  let width = element.offsetWidth;
  width += parseInt(
    window.getComputedStyle(element).getPropertyValue('margin-left')
  );
  width += parseInt(
    window.getComputedStyle(element).getPropertyValue('margin-right')
  );

  return width;
};
