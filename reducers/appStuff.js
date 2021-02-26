const init = {
  categories: [],
  isInMaintainance: false,
};

const appStuff = (state = init, action) => {
  switch (action.type) {
    case "setCategories":
      return { ...state, categories: action.array };
    case "setMaintainance":
      return { ...state, isInMaintainance: action.data };
    default:
      return state;
  }
};

export default appStuff;
