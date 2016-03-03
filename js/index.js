$(document).ready(function() {

  /*
   * LOVELY INITIATIVES
   */

  // Initialize a temp array
  var tempfarray = [];

  // ID of the Google Spreadsheet
  var spreadsheetID = "13-ozrkaBha3CQIwP9J_FuEF3hnQpXYrKzVxNqS0Hzoo";

  // Make sure it is public or set to Anyone with link can view 
  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

  // Append Data
  function appendData(ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow) {
    $('.list').append('<li><a href="' + iwebsite + '"><img src="' + iimage + '" class="thumb" /></a><span class="name"><a href="' + iwebsite + '">' + ititle + '</a></span><span class="fellow"><br> ' + 'by ' + ifellow + '</span><br><h5 class="category">Categories: ' + icategory + '<br><br><p class="description">' + idescription + '</p></li>');
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
        var istatus = entry[i].gsx$status.$t;
        var iregion = entry[i].gsx$region.$t;
        var ifellow = entry[i].gsx$fellow.$t;

        appendData(ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow);

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
        var istatus = entry[i].gsx$status.$t;
        var iregion = entry[i].gsx$region.$t;
        var ifellow = entry[i].gsx$fellow.$t;

        // Filters the cateogries
        function iscorrectcategory(kategori, nombor) {
          for (var l = 0; l < tempfarray.length; l++) {
            if (kategori.indexOf(tempfarray[l]) < 0) {
              return false;
              break;
            } else if (l == tempfarray.length - 1) {
              appendData(ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow);
              break;
            }
          }
        };

        iscorrectcategory(icategory, i);

      };
    });
  }

  // Individual Filter Buttons
  function idvfilterData(filteredword, type) {
    $('input[class=filtercheckbox]').attr('checked', false);
    tempfarray = [];

    $.getJSON(url, function(data) {

      var entry = data.feed.entry;

      $(".list").empty();

      for (var i = 0; i < entry.length; i++) {
        var ititle = entry[i].gsx$title.$t;
        var icategory = entry[i].gsx$category.$t;
        var idescription = entry[i].gsx$description.$t;
        var iwebsite = entry[i].gsx$website.$t;
        var iimage = entry[i].gsx$image.$t;
        var istatus = entry[i].gsx$status.$t;
        var iregion = entry[i].gsx$region.$t;
        var ifellow = entry[i].gsx$fellow.$t;

        if (type == "region") {
          if (iregion.indexOf(filteredword) >= 0) {
            appendData(ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow);
          }
        } else if (type = "status") {
          if (filteredword == istatus) {
            appendData(ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow);
          }
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
        var ititle = entry[i].gsx$title.$t;
        var icategory = entry[i].gsx$category.$t;
        var idescription = entry[i].gsx$description.$t;
        var iwebsite = entry[i].gsx$website.$t;
        var iimage = entry[i].gsx$image.$t;
        var istatus = entry[i].gsx$status.$t;
        var iregion = entry[i].gsx$region.$t;
        var ifellow = entry[i].gsx$fellow.$t;

        // Set to lower case for m
        searchword = searchword.toLowerCase();
        var ltitle = ititle.toLowerCase();
        var lcategory = icategory.toLowerCase();
        var ldescription = idescription.toLowerCase();
        var lstatus = istatus.toLowerCase();
        var lregion = iregion.toLowerCase();
        var lfellow = ifellow.toLowerCase();

        if (ltitle.indexOf(searchword) >= 0 || ldescription.indexOf(searchword) >= 0 || lcategory.indexOf(searchword) >= 0 || lstatus.indexOf(searchword) >= 0 || lregion.indexOf(searchword) >= 0 || lfellow.indexOf(searchword) >= 0) {
          appendData(ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow);
        };
      };
    });
  }

  // Generate the Initial Data
  getData();

  // Create Modal
  function getModal(itemid) {
    $.getJSON(url, function(data) {
      
      var entry = data.feed.entry;
      var i = itemid;

      var ititle = entry[i].gsx$title.$t;
      var icategory = entry[i].gsx$category.$t;
      var idescription = entry[i].gsx$description.$t;
      var iwebsite = entry[i].gsx$website.$t;
      var iimage = entry[i].gsx$image.$t;
      var istatus = entry[i].gsx$status.$t;
      var iregion = entry[i].gsx$region.$t;
      var ifellow = entry[i].gsx$fellow.$t;

      $('#profile-modal').modal("toggle");
      
    });
  }
  
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
      var istatus = entry[rn].gsx$status.$t;
      var iregion = entry[rn].gsx$region.$t;
      var ifellow = entry[rn].gsx$fellow.$t;

      appendData(ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow);
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

  // Teaching Quality
  $('#filter-teaching-quality').click(function() {
    checkboxfilter("Teaching Quality", "filter-teaching-quality");
  });

  // Personal Development
  $('#filter-development').click(function() {
    checkboxfilter("Development", "filter-development");
  });

  // English Oral Profiency
  $('#filter-english-oral-fluency').click(function() {
    checkboxfilter("English Oral Fluency", "filter-english-oral-fluency");
  });

  // Literacy 
  $('#filter-literacy').click(function() {
    checkboxfilter("Literacy", "filter-literacy");
  });

  // Numeracy
  $("#filter-numeracy").click(function() {
    checkboxfilter("Numeracy", "filter-numeracy");
  });

  // Tertiary Education
  $("#filter-tertiary-education").click(function() {
    checkboxfilter("Tertiary Education", "filter-tertiary-education");
  });

  // Learning Environment
  $("#filter-learning-environment").click(function() {
    checkboxfilter("Learning Environment", "filter-learning-environment");
  });

  // Participation
  $("#filter-participation").click(function() {
    checkboxfilter("Participation", "filter-participation");
  });

  // North
  $("#filter-north").click(function() {
    idvfilterData("North", "region");
  });

  // South
  $("#filter-east").click(function() {
    idvfilterData("East", "region");
  });

  // West
  $("#filter-west").click(function() {
    idvfilterData("West", "region");
  });

  // South
  $("#filter-south").click(function() {
    idvfilterData("South", "region");
  });

  // Active
  $("#filter-active").click(function() {
    idvfilterData("Active", "status");
  });

  // Inactive
  $("#filter-inactive").click(function() {
    idvfilterData("Inactive", "status");
  });

  // wat
  $("filter-notwat").click(function() {
    getModal(1);
  });

  // Show all
  $('#filter-none').click(function() {
    $('input[class=filtercheckbox]').attr('checked', false);
    tempfarray = [];
    getData();
  });
});
