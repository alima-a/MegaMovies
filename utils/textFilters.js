export default {
  minifyText(value) {
      if (!value) return '';
      value = value.toString();
      if(value.length < 100) {
        return value.slice(0, 99)
      } else {
        return value.slice(0, 99) + "..."
      }
  },
  minifyDate(value) {
    if (!value) return '';
    value = value.toString();
    return value.slice(0, 4)
  },
};
