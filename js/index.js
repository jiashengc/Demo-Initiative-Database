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

  // Append all data unto the screen
  function getData() {
    $.getJSON(url, function(data) {

      var entry = data.feed.entry;

      $(".list").empty();

      for (var i = 0; i < entry.length; i++) {
        var ititle = entry[i].title.$t;
        var icategory = entry[i].gsx$category.$t;
        var idescription = entry[i].gsx$description.$t;
        var iwebsite = entry[i].gsx$website.$t;
        var iimage = entry[i].gsx$image.$t;

        $('.list').append('<li><h4><a href="' + iwebsite + '"><img src="' + iimage + '" class="thumb" /></a><span class="name"><a href="' + iwebsite + '">' + ititle + '</a></span><span class="category"> ' + '- ' + icategory + '</span></h4><p class="description">' + idescription + '</p></li>');

      };
    });
  }

  // Filters data
  function filterData(filteredword) {
    $.getJSON(url, function(data) {

      var entry = data.feed.entry;

      $(".list").empty();

      for (var i = 0; i < entry.length; i++) {
        var ititle = entry[i].title.$t;
        var icategory = entry[i].gsx$category.$t;
        var idescription = entry[i].gsx$description.$t;
        var iwebsite = entry[i].gsx$website.$t;
        var iimage = entry[i].gsx$image.$t;

        if (filteredword == icategory) {
          $('.list').append('<li><h4><a href="' + iwebsite + '"><img src="' + iimage + '" class="thumb" /></a><span class="name"><a href="' + iwebsite + '">' + ititle + '</a></span><span class="category"> ' + '- ' + icategory + '</span></h4><p class="description">' + idescription + '</p></li>');
        };
      };
    });
  }

  // Search Query
  function searchedData(searchword) {
    $.getJSON(url, function(data) {

      var entry = data.feed.entry;

      $(".list").empty();

      for (var i = 0; i < entry.length; i++) {
        var ititle = entry[i].title.$t;
        var icategory = entry[i].gsx$category.$t;
        var idescription = entry[i].gsx$description.$t;
        var iwebsite = entry[i].gsx$website.$t;
        var iimage = entry[i].gsx$image.$t;

        if (ititle.indexOf(searchword) >= 0 || idescription.indexOf(searchword) >= 0 || icategory.indexOf(searchword) >= 0) {
          $('.list').append('<li><h4><img src="' + iimage + '" class="thumb" /><span class="name"><a href="' + iwebsite + '">' + ititle + '</a></span><span class="category"> ' + '- ' + icategory + '</span></h4><p class="description">' + idescription + '</p></li>');
        };
      };
    });
  }

  // Generate the Initial Data
  getData();

  // These are the filter buttons function
  // Search Button
  $("#search_button").click(function() {
    var user_input = $(".searched").val();
    searchedData(user_input);
  });

  // Search Keypress
  $(".searched").keypress(function(event) {
    if (event.which == 13) {
      var user_input = $(".searched").val();
      searchedData(user_input);
    }
  });

  // Subject Specific
  $('#filter-subject-specific').click(function() {
    filterData("Subject Specific");
  });

  // Literacy 
  $('#filter-literacy').click(function() {
    filterData("Literacy");
  });

  // Teaching Quality
  $('#filter-teaching-quality').click(function() {
    filterData("Teaching Quality");
  });

  // Career Development
  $('#filter-career-development').click(function() {
    filterData("Career Development");
  });

  // Show all
  $('#filter-none').click(function() {
    getData();
  });
});
