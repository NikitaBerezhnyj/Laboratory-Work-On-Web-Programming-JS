function arrayMethods() {
  function forEach(array, func) {
    for (let i = 0; i < array.length; i++) {
      func(array[i], i, array);
    }
  }

  function map(array, func) {
    const result = [];
    forEach(array, (el, i, arr) => {
      result.push(func(el, i, arr));
    });
    return result;
  }

  function filter(array, func) {
    const result = [];
    forEach(array, (el, i, arr) => {
      if (func(el, i, arr)) {
        result.push(el);
      }
    });
    return result;
  }

  return { forEach, map, filter };
}
