$(document).ready(function() {
  /*
   * LOVELY INITIATIVES
   */

  /* In case the this list goes crazy, remove the comments for these variables
  var options = {
    valueNames: ['name', 'description', 'category']
  };
  var featureList = new List('lovely-things-list', options);
  */
  
  // Initialize a temp array
  var tempfarray = [];

  // ID of the Google Spreadsheet
  var spreadsheetID = "13-ozrkaBha3CQIwP9J_FuEF3hnQpXYrKzVxNqS0Hzoo";

  // Make sure it is public or set to Anyone with link can view 
  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

  // Append Data
  function appendData(ititle, icategory, idescription, iwebsite, iimage) {
    $('.list').append('<li><h4><a href="' + iwebsite + '"><img src="' + iimage + '" class="thumb" /></a><span class="name"><a href="' + iwebsite + '">' + ititle + '</a></span><span class="category"> ' + '- ' + icategory + '</span></h4><p class="description">' + idescription + '</p></li>');
  }

  // Get the Data from the spreadsheet using JSON
  function getData() {
    $.getJSON(url, function(data) {

      var entry = data.feed.entry;

      $(".list").empty();

      for (var i = 0; i < entry.length; i++) {
        var ititle = entry[i].gsx$title.$t;
        var icategory = entry[i].gsx$category.$t;
        var idescription = entry[i].gsx$description.$t;
        var iwebsite = entry[i].gsx$website.$t;
        var iimage = entry[i].gsx$image.$t;

        appendData(ititle, icategory, idescription, iwebsite, iimage);

      };
    });
  }

  // Filters data
  function filterData() {
    $.getJSON(url, function(data) {

      var entry = data.feed.entry;

      $(".list").empty();

      for (var i = 0; i < entry.length; i++) {
        var ititle = entry[i].gsx$title.$t;
        var icategory = entry[i].gsx$category.$t;
        var idescription = entry[i].gsx$description.$t;
        var iwebsite = entry[i].gsx$website.$t;
        var iimage = entry[i].gsx$image.$t;

        // Filters the cateogries
        function iscorrectcategory(kategori, nombor) {
          for (var l = 0; l < tempfarray.length; l++) {
            if (kategori.indexOf(tempfarray[l]) < 0) {
              return false;
              break;
            } else if (l == tempfarray.length - 1) {
              appendData(ititle, icategory, idescription, iwebsite, iimage);
              break;
            }
          }
        };

        iscorrectcategory(icategory, i);

      };
    });
  }

  // Search Query
  function searchedData(searchword) {
    $.getJSON(url, function(data) {

      var entry = data.feed.entry;

      $(".list").empty();

      for (var i = 0; i < entry.length; i++) {
        var ititle = entry[i].gsx$title.$t;
        var icategory = entry[i].gsx$category.$t;
        var idescription = entry[i].gsx$description.$t;
        var iwebsite = entry[i].gsx$website.$t;
        var iimage = entry[i].gsx$image.$t;
        
        // Set to lower case for more flexibility
        searchword = searchword.toLowerCase();
        var ltitle = ititle.toLowerCase();
        var lcategory = icategory.toLowerCase();
        var ldescription = idescription.toLowerCase();

        if (ltitle.indexOf(searchword) >= 0 || ldescription.indexOf(searchword) >= 0 || lcategory.indexOf(searchword) >= 0) {
          appendData(ititle, icategory, idescription, iwebsite, iimage);
        };
      };
    });
  }

  // Generate the Initial Data
  getData();

  // These are the buttons function
  // Always Lucky - Random list generator
  $('#filter-random').click(function() {
    $.getJSON(url, function(data) {
      $('input[class=filtercheckbox]').attr('checked', false);
      tempfarray = [];

      var entry = data.feed.entry;
      var max = entry.length;
      var min = 0;

      $(".list").empty();

      // Generate random item
      var rn = Math.floor(Math.random() * (max + min)) + min;

      // Append the random item unto the database
      var ititle = entry[rn].gsx$title.$t;
      var icategory = entry[rn].gsx$category.$t;
      var idescription = entry[rn].gsx$description.$t;
      var iwebsite = entry[rn].gsx$website.$t;
      var iimage = entry[rn].gsx$image.$t;

      appendData(ititle, icategory, idescription, iwebsite, iimage);
    });
  });

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

  // Pushes or removes an element from the array that needs to be filtered
  function checkboxfilter(categoryp, id) {
    if (document.getElementById(id).checked) {
      tempfarray.push(categoryp);
      filterData();
    } else {
      var ssindex = tempfarray.indexOf(categoryp);
      if (ssindex > -1) {
        tempfarray.splice(ssindex, 1);
      }
      if (tempfarray.length <= 0) {
        getData();
      } else {
        filterData();
      }
    }
  }

  // Subject Specific
  $('#filter-subject-specific').click(function() {
    checkboxfilter("Subject Specific", "filter-subject-specific");
  });

  // Literacy 
  $('#filter-literacy').click(function() {
    checkboxfilter("Literacy", "filter-literacy");
  });

  // Teaching Quality
  $('#filter-teaching-quality').click(function() {
    checkboxfilter("Teaching Quality", "filter-teaching-quality");
  });

  // Career Development
  $('#filter-career-development').click(function() {
    checkboxfilter("Career Development", "filter-career-development");
  });

  // Show all
  $('#filter-none').click(function() {
    $('input[class=filtercheckbox]').attr('checked', false);
    tempfarray = [];
    getData();
  });
});
