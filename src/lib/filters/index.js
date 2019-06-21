import date from "./date";
import thumb from "./thumb";

export default {
  install (Vue) {
    Vue.filter('date', date)
    Vue.filter('thumb', thumb)
  }
}
