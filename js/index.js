$(document).ready(function() {

  /*
   * LOVELY INITIATIVES
   */

  // Initialize some variables
  var tempfarray = [];
  var pagenom = 1;

  // ID of the Google Spreadsheet
  var spreadsheetID = "13-ozrkaBha3CQIwP9J_FuEF3hnQpXYrKzVxNqS0Hzoo";

  // Make sure it is public or set to Anyone with link can view 
  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

  // Check for 0 Initiatives
  function noInitiatives() {
    var i = $('.fixed-list-container ul li').length;
    
    if (i <= 0) {
      $('.defective-toptop').empty();
      $('.defective-toptop').append('<h5 class="current-list-number">There is </h5><h5 class="current-list-number list-nombor">' + 0 + '</h5><h5 class="current-list-number"> Initiative</h5><h5 class="current-list-number"> in this list</h5>');
    }
    
    $('.list-nombor').addClass("animated bounceIn");
  }

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
      var ichallenges = entry[n].gsx$challengesfaced.$t;
    

      // Change to the TFM logo if there is no logo
      if (!iimage) {
        iimage = "http://i.imgur.com/JpsPCfQ.jpg";
      }

      // Refreshes the Modal
      $('#myModalLabel').empty();
      $('#modal-body-1').empty();
      $('#modal-body-2').empty();
      $('.modal-footer').empty();

      $('#myModalLabel').append(ititle + '<br><img src="' + iimage + '" class="thumb modal-thumb" /><br><h4><a class="modal-website" href="' + iwebsite + '">Official Website</a></h4>');
      $('#modal-body-1').append('<div class="row"><h4>Cohorts:</h4><span class="modal-filter" id="modal-category-' + icohorts + '">' + icohorts + '</span></div><div class="row"><h4>Main Category:</h4><span class="modal-filter" id="modal-category-' + icategory + '">' + icategory + '</span></div><div class="row"><h4>Related Categories:</h4>' + isubcategory + '</div><div class="row"><h4>Fellow(s):</h4>' + ifellow + '</div><div class="row"><h4>Status:</h4><span class="modal-filter" id="modal-status-' + istatus + '">' + istatus + '</div></span><div class="row"><h4>School and State:</h4>' + ischool + ', ' + istate + '</div><div class="row"><h4>Region:</h4><span class="modal-filter" id="modal-region-' + iregion + '">' + iregion + '</div><div class="row"></span><h4>Stakeholders:</h4>' + istakeholders + '</div><div class="row"><h4>Resources:</h4>' + iresources + '</div>');
      $('#modal-body-2').append('<div class="row"><h4>Description:</h4>' + idescription + '</div><div class="row"><h4>Activity:</h4>' + iactivity + '</div><div class="row"><h4>Desired Outcome:</h4>' + idesiredoutcome + '</div><div class="row"><h4>Impact Achieved:</h4>' + iimpactachieved + '</div><div class="row"><h4>Challenges faced and Plans to overcome:</h4>' + ichallenges + '</div>');

      $('#myModal').modal("show");

    });
  }

  // Append Data
  function appendData(inum, ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow, icohorts) {
    // Check if there's an image
    if (!iimage) {
      iimage = "http://i.imgur.com/JpsPCfQ.jpg";
    }

    // Append the top bar for "Initiative" & "Category"
    if ($('.fixed-list-container ul li').length == 0) {
      $('.list').append('<li><div class="row initiative-bar"><div class="col-ms-2 col-xs-2"></div><div class="col-ms-5 col-xs-5"><span class="initiative-title">Initiative</span></div><div class="col-ms-2 col-xs-2"><span>Category</span></div><div class="col-ms-2 col-xs-2"><span>Fellow(s)</span></div><div class="col-ms-1 col-xs-1"><span>Cohort</span></div></div>')
    }

    var lLength = $('.fixed-list-container ul li').length;

    // Append the initiative that was filtered
    $('.list').append('<li class="animated fadeIn"><div class="row"><div class="col-ms-1 col-xs-1"><img src="' + iimage + '" class="thumb" /></div><div class="col-ms-1 col-xs-1"><span id="lLength">' + lLength + '.</span></div><div class="col-ms-5 col-xs-5"><span class="name" id="' + inum + '">' + ititle + '</span><br><div class="breaker"></div><p class="description">' + idescription + '</p></div><div class="col-ms-2 col-xs-2"><h5 class="category">' + icategory + '</h5></div><div class="cold-ms-2 col-xs-2"><h5 class="category">' + ifellow + '</h5></div><div class="col-ms-1 col-xs-1"><h5 class="category">' + icohorts + '</h5></div></li>');

    // Change the current list number
    $('.list-nombor').addClass("animated fadeOut");
    $('.defective-toptop').empty();

    // Check how many entries there are
    switch (lLength) {
      case 0:
        $('.defective-toptop').append('<h5 class="current-list-number">There is </h5><h5 class="current-list-number list-nombor">' + 0 + '</h5><h5 class="current-list-number"> Initiative</h5><h5 class="current-list-number"> in this list</h5>');
        break;

      case 1:
        $('.defective-toptop').append('<h5 class="current-list-number">There is </h5><h5 class="current-list-number list-nombor">' + 1 + '</h5><h5 class="current-list-number"> Initiative</h5><h5 class="current-list-number"> in this list</h5>');
        break;

      default:
        $('.defective-toptop').append('<h5 class="current-list-number">There are </h5><h5 class="current-list-number list-nombor">' + lLength + '</h5><h5 class="current-list-number"> Initiatives</h5><h5 class="current-list-number"> in this list</h5>');

    }
    
    // Really check if there's initiatives.
    noInitiatives();
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

      }
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
        var iresources = entry[i].gsx$resources.$t;

        // Filters the cateogries
        function iscorrectcategory(kategori, subkategori, region, status, nombor, resources) {
          // Checks if Main Category Only is checked
          if (document.getElementById("maincategoryonly").checked) {
            for (var l = 0; l < tempfarray.length; l++) {
              if (kategori.indexOf(tempfarray[l]) < 0 && region.indexOf(tempfarray[l]) < 0 && status.indexOf(tempfarray[l]) < 0 && resources.indexOf(tempfarray[l]) < 0) {
                return false;
                break;
              } else if (l == tempfarray.length - 1) {
                appendData(inum, ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow, icohorts);
                break;
              }
            }
          } else {
            for (var l = 0; l < tempfarray.length; l++) {
              if (kategori.indexOf(tempfarray[l]) < 0 && subkategori.indexOf(tempfarray[l]) < 0 && region.indexOf(tempfarray[l]) < 0 && status.indexOf(tempfarray[l]) < 0 && resources.indexOf(tempfarray[l]) < 0) {
                return false;
                break;
              } else if (l == tempfarray.length - 1) {
                appendData(inum, ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow, icohorts);
                break;
              }
            }
          }
        };

        iscorrectcategory(icategory, isubcategory, iregion, istatus, i, iresources);

      }

      noInitiatives();
    });
  }

  // Individual Filter Buttons
  function idvfilterData(filteredword, type) {
    $('input[class=filtercheckbox]').attr('checked', false);
    $('input[id=maincategoryonly]').attr('checked', false);
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
        var iresources = entry[i].gsx$resources.$t;

        if (type == "region") {
          if (iregion.indexOf(filteredword) >= 0) {
            appendData(inum, ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow, icohorts);
          }
        } else if (type == "status") {
          if (filteredword == istatus) {
            appendData(inum, ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow, icohorts);
          }
        } else if (type == "cohort") {
          if (icohorts.indexOf(filteredword) >= 0) {
            appendData(inum, ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow, icohorts);
          }
        } else if (type == "resources") {
          if (iresources.indexOf(filteredword) >= 0) {
            appendData(inum, ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow, icohorts);
          }
        }

      }

      noInitiatives();
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
        var isubcategory = entry[i].gsx$subcategory.$t;
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
        var ichallenges = entry[i].gsx$challengesfaced.$t;


        // Set to lower case
        searchword = searchword.toLowerCase();
        var ltitle = ititle.toLowerCase();
        var lcategory = icategory.toLowerCase();
        var lsubcategory = isubcategory.toLowerCase();
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
        var lchallenges = ichallenges.toLowerCase();

        if (ltitle.indexOf(searchword) >= 0 || ldescription.indexOf(searchword) >= 0 || lcategory.indexOf(searchword) >= 0 || lstatus.indexOf(searchword) >= 0 || lregion.indexOf(searchword) >= 0 || lfellow.indexOf(searchword) >= 0 || lschool.indexOf(searchword) >= 0 || lstate.indexOf(searchword) >= 0 || lstakeholders.indexOf(searchword) >= 0 || lresources.indexOf(searchword) >= 0 || lactivity.indexOf(searchword) >= 0 || ldesiredoutcome.indexOf(searchword) >= 0 || limpactachieved.indexOf(searchword) >= 0 || icohorts.indexOf(searchword) >= 0 || lsubcategory.indexOf(searchword) >= 0 || lchallenges.indexOf(searchword) >= 0) {
          appendData(inum, ititle, icategory, idescription, iwebsite, iimage, iregion, ifellow, icohorts);
        };
      }

      noInitiatives();
    });
  }

  // Create categories button function
  function getCategories() {
    $.getJSON(url, function(data) {
      var cattemp = [];
      var entry = data.feed.entry;

      function appendCategory(category) {
        $("#mainkategories").append('<li class="button animated fadeIn"><input type="checkbox" class="filtercheckbox" id="filter-' + category + '" />' + category + '</li>')
      }

      for (var i = 0; i < entry.length; i++) {
        var icategory = entry[i].gsx$category.$t;

        if (cattemp.indexOf(icategory) < 0 && icategory != "") {
          cattemp.push(icategory);
          appendCategory(icategory);
        }
      }
    });
  }

  // Create the status button function
  function getStatus() {
    $.getJSON(url, function(data) {
      var statustemp = [];
      var entry = data.feed.entry;

      function appendStatus(status) {
        $("#filter-status").append('<li class="button animated fadeIn"><input type="checkbox" class="filtercheckbox" id="filter-' + status + '" />' + status + '</li>');
      }

      // Go through all the statuses
      for (var i = 0; i < entry.length; i++) {
        var istatus = entry[i].gsx$status.$t;

        if (statustemp.indexOf(istatus) < 0 && istatus != "") {
          statustemp.push(istatus);
        }
      }

      // Apend the Statuses
      for (var i = 0; i < statustemp.length; i++) {
        appendStatus(statustemp[i]);
      }

    });
  }

  // Create the cohort button function
  function getCohort() {
    $.getJSON(url, function(data) {
      var cohortemp = [];
      var entry = data.feed.entry;

      function appendCohort(cohort) {
        $("#filter-cohort").append('<li class="button animated fadeIn" id="filter-' + cohort + '">' + cohort + '</li>');
      }

      // Go through all the cohorts
      for (var i = 0; i < entry.length; i++) {
        var icohorts = entry[i].gsx$cohorts.$t;
        var icohortemp = [];

        // Check if there's extra cohort dates
        if (icohorts.length >= 4) {
          icohorts = icohorts.replace(",", "");
          icohortemp = icohorts.split(" ");
        }

        for (var l = 0; l < icohortemp.length; l++) {
          if (cohortemp.indexOf(icohortemp[l]) < 0) {
            cohortemp.push(icohortemp[l]);
          }
        }
      }

      // Sort by alphabetical order
      cohortemp.sort();

      // Sort by Ascending order
      cohortemp.sort(function(a, b) {
        return b - a
      })

      // Append the Cohorts
      for (var i = 0; i < cohortemp.length; i++) {
        appendCohort(cohortemp[i]);
      }
    });
  }

  // Generate the Initial Data
  getCategories();
  getStatus();
  getCohort();
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
      $('input[id=maincategoryonly]').attr('checked', false);
      tempfarray = [];

      // Just for fun random
      $('#filter-random').empty();
      var randomlucky = ["Always Lucky!", "Sometimes Lucky!", "Never Lucky!"];
      var rl = Math.floor(Math.random() * (randomlucky.length + 0)) + 0;
      $('#filter-random').append(randomlucky[rl]);

      // The real random number
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

  // Takes the id of the main categories buttons and send them to filter
  $('#mainkategories').delegate(".filtercheckbox", "click", function() {
    var id = $(this).attr("id");
    var categoryp = $(this).attr("id").replace('filter-', '');

    checkboxfilter(categoryp, id);
  });

  // Main Category Only button
  $('#maincategoryonly').click(function() {
    if (tempfarray.length > 0) {
      filterData();
    }
  });

  // Cohorts filter
  $('#filter-cohort').delegate(".button", "click", function() {
    var filteredword = $(this).attr("id").replace('filter-', '');
    idvfilterData(filteredword, "cohort");
  });

  // Status filter
  $("#filter-status").delegate(".filtercheckbox", "click", function() {
    var id = $(this).attr("id");
    var categoryp = $(this).attr("id").replace('filter-', '');

    checkboxfilter(categoryp, id);
  });

  // North
  $("#filter-north").click(function() {
    var id = $(this).attr("id");
    var categoryp = "North";

    checkboxfilter(categoryp, id);
  });

  // South
  $("#filter-east").click(function() {
    var id = $(this).attr("id");
    var categoryp = "East";

    checkboxfilter(categoryp, id);
  });

  // West
  $("#filter-central").click(function() {
    var id = $(this).attr("id");
    var categoryp = "Central";

    checkboxfilter(categoryp, id);
  });

  // South
  $("#filter-south").click(function() {
    var id = $(this).attr("id");
    var categoryp = "South";

    checkboxfilter(categoryp, id);
  });

  $("#filter-training").click(function() {
    var id = $(this).attr("id");
    var categoryp = "Training & Upskilling";

    checkboxfilter(categoryp, id);
  });

  $("#filter-manpower").click(function() {
    var id = $(this).attr("id");
    var categoryp = "Manpower";

    checkboxfilter(categoryp, id);
  });

  $("#filter-funding").click(function() {
    var id = $(this).attr("id");
    var categoryp = "Funding";

    checkboxfilter(categoryp, id);
  });

  $("#filter-thought-partner").click(function() {
    var id = $(this).attr("id");
    var categoryp = "Thought Partner";

    checkboxfilter(categoryp, id);
  });

  $("#filter-partnership").click(function() {
    var id = $(this).attr("id");
    var categoryp = "Partnership";

    checkboxfilter(categoryp, id);
  });

  // Show all
  $('#filter-none').click(function() {
    $('input[class=filtercheckbox]').attr('checked', false);
    $('input[id=maincategoryonly]').attr('checked', false);
    tempfarray = [];
    getData();
  });
});

