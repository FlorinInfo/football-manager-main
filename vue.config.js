module.exports = {
    css: {
      loaderOptions: {
        sass: {
          data: `
            @import "@/assets/styles/_base.scss";
            @import "~@/assets/styles/_fonts.scss";
          `
        }
      }
    }
  };