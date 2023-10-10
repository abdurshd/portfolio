export const GA_TRACKING_ID = "G-BQ5CVXMEJ1";

export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
