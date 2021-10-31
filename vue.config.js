module.exports = {
    css: {
      loaderOptions: {
        sass: {
          prependData: `
            @import "@/assets/styles/_base.scss";
            @import "~@/assets/styles/_fonts.scss";
          `
        }
      }
    }
  };