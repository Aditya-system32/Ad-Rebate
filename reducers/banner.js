const init = {
  banners: [],
};

const banner = (state = init, action) => {
  switch (action.type) {
    case "updateBanner":
      return { ...state, banners: action.array };
    default:
      return state;
  }
};

export default banner;
