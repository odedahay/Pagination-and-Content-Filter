$(function() {

  // identify all attributes
  var $parentDiv = $(".page");
  var $parentHeader = $(".page-header");

  var studentListItems = $(".student-list li");
  var studentDetails = $(".student-details");

  // Search Form
  var $studentSearch = $("<div class='student-search'></div>");

  // Page requirement
  var studentPerPage = 10;
  // First Page
  var currentPage = 1;

  // Pagination Div
  var $parentPagination = $("<div class='pagination'></div>");
  var $paginationUL = $("<ul></ul>");

  // Append Search Bar
  $parentHeader.append($studentSearch);
  $studentSearch.append("<input placeholder='Search for students...' id='inputSearch' type='text'><button id='searchButton'>Search</button>");

  // initilize the function
  paginationFunction(studentListItems);

  // bind search function to typing in search bar
  $("#searchButton, #inputSearch").on("click keyup" ,function(){

      // stored search value from input field
      var searchStudent = $("#inputSearch").val().toLowerCase();

      $paginationUL.empty();
      $(".no-results").remove();

      // hide all student list
      studentListItems.hide();
      // looping through each the student list
      studentDetails.each(function() {

          // get the student name and email
          var studentName = ($(this).children("h3").html()).toLowerCase();
          var studentEmail = ($(this).children("span.email").html()).toLowerCase();

          // use regular expression to compare the student name & email from search field input
          var regularExpression = new RegExp(searchStudent);
          var searchName = regularExpression.exec(studentName);
          var searchEmail = regularExpression.exec(studentEmail);

          // if there is a match, show student, if null show the message of no found stundent
          if (searchName !== null || searchEmail !== null) {
              $(this).parent().show();
          }
      });

      studentListItems = $(".student-list li:visible");
      // count the total number of visible student in the list
      if (studentListItems.length > 0) {
          //console.log(studentListItems.length);
          paginationFunction(studentListItems);

      }else {
          // If no matches are found, show the message there is no student in the list.
          var noName = $("#inputSearch").val();
          var $studentDetails = $("<div class='student-details'></div>");
          $(".student-list").append($studentDetails);
          $studentDetails.append("<li class='student-item notFound'><h3>Sorry, there is no \""+noName+"\" in the student list. <button class='reset'>Reset </button></h3></li>");

          $(".reset").click(function() {location.reload();});
      }
  });

  // add page number links for each page and start off going to page 1
  function paginationFunction(studentListItems) {
    // count the total number of result student that required for pagination
    var studentCount = studentListItems.length;
    var numLink = Math.ceil(studentCount / studentPerPage);

    // Create pagination if there is more than one page
    if (numLink > 1) {
      // Append Pagination Div elements
      $parentDiv.append($parentPagination);
      $parentPagination.append($paginationUL);

      // add one pagelink per ten students
      for (var i = 1; i <= numLink; i++) {

        // append each pagination button
        $paginationUL.append("<li><a href='#'>" + i + "</a></li>");
        // Assigning the class 'active' to the first button
        $(".pagination li a:first").addClass("active");

      }

      // initilize pagination link function
      paginationLink(currentPage, studentListItems);

      // Enable pagination Button when it click
      $(".pagination li").on("click", "a", function(event) {
         // Prevent to on top while clicking
         event.preventDefault();
         var currentActive = $(this).text();
         paginationLink(currentActive, studentListItems);

      });
    }
  }

  // show only students on that page
  function paginationLink(currentPage, studentListItems) {

    var indexPage = studentPerPage * (currentPage - 1);
    var nextPage = studentPerPage * currentPage;

    var studentsToShow = studentListItems.slice(indexPage, nextPage);

    studentListItems.hide();
    studentsToShow.fadeIn();

    $(".pagination li").on("click", "a", function() {
        $(".pagination a.active").removeClass("active");
        $(this).addClass("active");
    });
  }

}); // end of wrapper
