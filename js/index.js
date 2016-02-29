$(document).ready(function() {
  /*
   * LOVELY INITIATIVES
   */

  // These shows what kind of items can be filtered
  var options = {
    valueNames: ['name', 'description', 'category']
  };

  var featureList = new List('lovely-things-list', options);

  // ID of the Google Spreadsheet
  var spreadsheetID = "13-ozrkaBha3CQIwP9J_FuEF3hnQpXYrKzVxNqS0Hzoo";

  // Make sure it is public or set to Anyone with link can view 
  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

  // Create empty arrays for Data
  function getData() {
    $.getJSON(url, function(data) {

      var entry = data.feed.entry;

      for (var i = 0; i < entry.length; i++) {
        var ititle = entry[i].title.$t;
        var icategory = entry[i].gsx$category.$t;
        var idescription = entry[i].gsx$description.$t;
        var iwebsite = entry[i].gsx$website.$t;
        var iimage = entry[i].gsx$image.$t;

        $('.list').append('<li><h4><img src="' + iimage + '" class="thumb" /><span class="name"><a href="' + iwebsite + '">' + ititle + '</a></span><span class="category"> ' + '- ' + icategory + '</span></h4><p class="description">' + idescription + '</p></li>');
        
        
      };
    });
  }

  // Automatic generate Data
  getData();

  // These are the filter buttons function
  // Subject Specific
  $('#filter-subject-specific').click(function() {
    featureList.filter(function(item) {
      if (item.values().category == "(Subject Specific)") {
        return true;
      } else {
        return false;
      }
    });
    return false;
  });

  // Literacy 
  $('#filter-literacy').click(function() {
    featureList.filter(function(item) {
      if (item.values().category == "(Literacy)") {
        return true;
      } else {
        return false;
      }
    });
    return false;
  });

  // Teaching Quality
  $('#filter-teaching-quality').click(function() {
    featureList.filter(function(item) {
      if (item.values().category == "(Teaching Quality)") {
        return true;
      } else {
        return false;
      }
    });
    return false;
  });

  // Career Development
  $('#filter-career-development').click(function() {
    featureList.filter(function(item) {
      if (item.values().category == "(Career Development)") {
        return true;
      } else {
        return false;
      }
    });
    return false;
  });

  // Show all
  $('#filter-none').click(function() {
    featureList.filter();
    return false;
  });
});