const formValueObj = (value) => ({ value });
const getRealVal = (obj) => obj && obj.value;

const cache = {
  localGet(key) {
    try {
      return getRealVal(JSON.parse(window.localStorage.getItem(key)))
    } catch (error) {
      window.localStorage.clear();
      throw new Error(error)
    }
  },
  localSet(key, value) {
    window.localStorage.setItem(key, JSON.stringify(formValueObj(value)))
  },
  localClear() {
    window.localStorage.clear()
  }
}

export default cache;