const hb = require('handlebars');

hb.registerHelper('format_date', function(date) {
  return date.toLocaleDateString();
});