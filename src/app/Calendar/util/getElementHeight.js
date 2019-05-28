export const getElementHeight = element => {
  let height = element.offsetHeight;
  height += parseInt(
    window.getComputedStyle(element).getPropertyValue('margin-top')
  );
  height += parseInt(
    window.getComputedStyle(element).getPropertyValue('margin-bottom')
  );
  height += parseInt(
    window.getComputedStyle(element).getPropertyValue('padding-top')
  );
  height += parseInt(
    window.getComputedStyle(element).getPropertyValue('padding-bottom')
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
  width += parseInt(
    window.getComputedStyle(element).getPropertyValue('padding-left')
  );
  width += parseInt(
    window.getComputedStyle(element).getPropertyValue('padding-right')
  );

  return width;
};
