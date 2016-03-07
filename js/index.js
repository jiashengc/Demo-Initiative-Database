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

  // Create Modal
  function getModal(itemid) {
    $.getJSON(url, function(data) {

      var entry = data.feed.entry;

      var n = itemid;
      var ititle = entry[n].gsx$title.$t;
      var icategory = entry[n].gsx$category.$t;
      var isubcategory = entry[n].gsx$subcategory.$t;
      var idescription = entry[n].gsx$description.$t;
      var iwebsite = entry[n].gsx$website.$t;
      var iimage = entry[n].gsx$image.$t;
      var istatus = entry[n].gsx$status.$t;
      var iregion = entry[n].gsx$region.$t;
      var ifellow = entry[n].gsx$fellow.$t;
      var ischool = entry[n].gsx$school.$t;
      var istate = entry[n].gsx$state.$t;
      var istakeholders = entry[n].gsx$stakeholders.$t;
      var iresources = entry[n].gsx$resources.$t;
      var iactivity = entry[n].gsx$activity.$t;
      var idesiredoutcome = entry[n].gsx$desiredoutcome.$t;
      var iimpactachieved = entry[n].gsx$impactachieved.$t;
      var icohorts = entry[n].gsx$cohorts.$t;

      // Refreshes the Modal
      $('#myModalLabel').empty();
      $('#modal-body-1').empty();
      $('#modal-body-2').empty();
      $('.modal-footer').empty();

      $('#myModalLabel').append(ititle + '<br><img src="' + iimage + '" class="thumb" /><br><h4><a class="modal-website" href="' + iwebsite + '">' + iwebsite + '</a></h4>');
      $('#modal-body-1').append('<br><h4>Cohorts:</h4>' + icohorts + '<br><br><h4>Main Category:</h4>' + icategory + '<br><br><h4>Related Categories:</h4>' + isubcategory +'<br><br><h4>Fellow(s):</h4>' + ifellow + '<br><br><h4>Status:</h4>' + istatus + '<br><br><h4>School and State:</h4>' + ischool + ', ' + istate + '<br><br><h4>Region:</h4>' + iregion + '<br><br><h4>Stakeholders:</h4>' + istakeholders + '<br><br><h4>Resources:</h4>' + iresources);
      $('#modal-body-2').append('<br><h4>Description:</h4>' + idescription + '<br><br><h4>Activity:</h4>' + iactivity + '<br><br><h4>Desired Outcome:</h4>' + idesiredoutcome + '<br><br><h4>Impact Achieved:</h4>' + iimpactachieved + '<br><br><h4>Challenges faced and Plans to overcome:');

      $('#myModal').modal("show");

    });
  }

  // Append Data
  function appendData(inum, ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow, icohorts) {
    $('.list').append('<li><img src="' + iimage + '" class="thumb" /><span class="name" id="' + inum + '">' + ititle + '</span><span class="fellow"><br> ' + 'by ' + ifellow + '</span><h5 class="category">Main Category: ' + icategory + '<br><br><br><p class="description">' + idescription + '</p></li>');
  }

  // Get the Data from the spreadsheet using JSON
  function getData() {
    $.getJSON(url, function(data) {

      var entry = data.feed.entry;

      $(".list").empty();

      for (var i = 0; i < entry.length; i++) {
        var inum = i;
        var ititle = entry[i].gsx$title.$t;
        var icategory = entry[i].gsx$category.$t;
        var idescription = entry[i].gsx$description.$t;
        var iwebsite = entry[i].gsx$website.$t;
        var iimage = entry[i].gsx$image.$t;
        var istatus = entry[i].gsx$status.$t;
        var iregion = entry[i].gsx$region.$t;
        var ifellow = entry[i].gsx$fellow.$t;
        var icohorts = entry[i].gsx$cohorts.$t;

        appendData(inum, ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow, icohorts);

      };
    });
  }

  // Filters data
  function filterData() {
    $.getJSON(url, function(data) {

      var entry = data.feed.entry;

      $(".list").empty();

      for (var i = 0; i < entry.length; i++) {
        var inum = i;
        var ititle = entry[i].gsx$title.$t;
        var icategory = entry[i].gsx$category.$t;
        var isubcategory = entry[i].gsx$subcategory.$t;
        var idescription = entry[i].gsx$description.$t;
        var iwebsite = entry[i].gsx$website.$t;
        var iimage = entry[i].gsx$image.$t;
        var istatus = entry[i].gsx$status.$t;
        var iregion = entry[i].gsx$region.$t;
        var ifellow = entry[i].gsx$fellow.$t;
        var icohorts = entry[i].gsx$cohorts.$t;

        // Filters the cateogries
        function iscorrectcategory(kategori, subkategori, nombor) {
          for (var l = 0; l < tempfarray.length; l++) {
            if (kategori.indexOf(tempfarray[l]) < 0  && subkategori.indexOf(tempfarray[l]) < 0) {
              return false;
              break;
            } else if (l == tempfarray.length - 1) {
              appendData(inum, ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow, icohorts);
              break;
            }
          }
        };

        iscorrectcategory(icategory, isubcategory, i);

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
        var inum = i;
        var ititle = entry[i].gsx$title.$t;
        var icategory = entry[i].gsx$category.$t;
        var idescription = entry[i].gsx$description.$t;
        var iwebsite = entry[i].gsx$website.$t;
        var iimage = entry[i].gsx$image.$t;
        var istatus = entry[i].gsx$status.$t;
        var iregion = entry[i].gsx$region.$t;
        var ifellow = entry[i].gsx$fellow.$t;
        var icohorts = entry[i].gsx$cohorts.$t;

        if (type == "region") {
          if (iregion.indexOf(filteredword) >= 0) {
            appendData(inum, ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow, icohorts);
          }
        } else if (type = "status") {
          if (filteredword == istatus) {
            appendData(inum, ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow, icohorts);
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
        var inum = i;
        var ititle = entry[i].gsx$title.$t;
        var icategory = entry[i].gsx$category.$t;
        var idescription = entry[i].gsx$description.$t;
        var iwebsite = entry[i].gsx$website.$t;
        var iimage = entry[i].gsx$image.$t;
        var istatus = entry[i].gsx$status.$t;
        var iregion = entry[i].gsx$region.$t;
        var ifellow = entry[i].gsx$fellow.$t;
        var ischool = entry[i].gsx$school.$t;
        var istate = entry[i].gsx$state.$t;
        var istakeholders = entry[i].gsx$stakeholders.$t;
        var iresources = entry[i].gsx$resources.$t;
        var iactivity = entry[i].gsx$activity.$t;
        var idesiredoutcome = entry[i].gsx$desiredoutcome.$t;
        var iimpactachieved = entry[i].gsx$impactachieved.$t;
        var icohorts = entry[i].gsx$cohorts.$t;

        // Set to lower case
        searchword = searchword.toLowerCase();
        var ltitle = ititle.toLowerCase();
        var lcategory = icategory.toLowerCase();
        var ldescription = idescription.toLowerCase();
        var lstatus = istatus.toLowerCase();
        var lregion = iregion.toLowerCase();
        var lfellow = ifellow.toLowerCase();
        var lschool = ischool.toLowerCase();
        var lstate = istate.toLowerCase();
        var lstakeholders = istakeholders.toLowerCase();
        var lresources = iresources.toLowerCase();
        var lactivity = iactivity.toLowerCase();
        var ldesiredoutcome = idesiredoutcome.toLowerCase();
        var limpactachieved = iimpactachieved.toLowerCase();

        if (ltitle.indexOf(searchword) >= 0 || ldescription.indexOf(searchword) >= 0 || lcategory.indexOf(searchword) >= 0 || lstatus.indexOf(searchword) >= 0 || lregion.indexOf(searchword) >= 0 || lfellow.indexOf(searchword) >= 0 || lschool.indexOf(searchword) >= 0 || lstate.indexOf(searchword) >= 0 || lstakeholders.indexOf(searchword) >= 0 || lresources.indexOf(searchword) >= 0 || lactivity.indexOf(searchword) >= 0 || ldesiredoutcome.indexOf(searchword) >= 0 || limpactachieved.indexOf(searchword) >= 0 || icohorts.indexOf(searchword) >= 0) {
          appendData(inum, ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow, icohorts);
        };
      };
    });
  }

  // Create categories button function
  /* function getCategories() {
    $.getJSON(url, function(data) {
      var cattemp = [];
      var entry = data.feed.entry;
      
      function appendCategory(category) {
        $("#testkategori").append('<li class="button"><input type="checkbox" class="filtercheckbox" id="filter-' + category + '" />' + category + '</li>')
        
        var script = document.createElement("script");
        
        script.innerHTML = '$("#filter-' + category + ').click(function(){checkboxfilter("' + category + ',"filter-' + category + '");});'
        
        document.footer.appendChild(script);
      }
      
      for (var i = 0; i < entry.length; i++) {
        var icategory = entry[i].gsx$category.$t;
        
        if (cattemp.indexOf(icategory) < 0) {
          cattemp.push(icategory);
          appendCategory(icategory);
        }
      }
    });
  } */
  
  // Generate the Initial Data
  // getCategories();
  getData();

  // Links the title of the Iniative to its profile page
  $(".list").delegate(".name", "click", function() {
    var id = $(this).attr("id");
    getModal(id);
  });
  
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
      var inum = rn;
      var ititle = entry[rn].gsx$title.$t;
      var icategory = entry[rn].gsx$category.$t;
      var idescription = entry[rn].gsx$description.$t;
      var iwebsite = entry[rn].gsx$website.$t;
      var iimage = entry[rn].gsx$image.$t;
      var istatus = entry[rn].gsx$status.$t;
      var iregion = entry[rn].gsx$region.$t;
      var ifellow = entry[rn].gsx$fellow.$t;
      var icohorts = entry[rn].gsx$cohorts.$t;

      appendData(inum, ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow, icohorts);
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
  $("#filter-notwat").click(function() {
    getModal(1);
  });

  // Show all
  $('#filter-none').click(function() {
    $('input[class=filtercheckbox]').attr('checked', false);
    tempfarray = [];
    getData();
  });
});
