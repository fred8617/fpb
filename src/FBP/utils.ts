export const doWindowResize = () => {
  const event = document.createEvent("HTMLEvents");
  event.initEvent("resize", true, false);
  window.dispatchEvent(event);
};

export const getObjectKeysWhenIsArray = (
  obj,
  prev = "",
  returnValue = {},
  defaultPush = {}
) => {
  if (obj === null) {
    return returnValue;
  }
  if (obj instanceof Array) {
    returnValue[`${prev}`] = obj.map(() => defaultPush);
    obj.forEach((e,i) => {
      getObjectKeysWhenIsArray(e, `${prev}[${i}]`, returnValue, defaultPush);
    });
    return returnValue;
  }
  if (typeof obj === "object") {
    Object.entries(obj).forEach(([key, value], i) => {
      const index = `${prev}.${key}`;
      if (value instanceof Array) {
        returnValue[index] = value.map(e => defaultPush);
        getObjectKeysWhenIsArray(value, index, returnValue, defaultPush);
        return true;
      }
      getObjectKeysWhenIsArray(value, index, returnValue, defaultPush);
    });
    return returnValue;
  }
};
