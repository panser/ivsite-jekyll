jQuery(function() {
    // Initialize lunr with the fields to be searched, plus the boost.
    window.idx = lunr(function () {
        this.field('id');
        this.field('title', { boost: 10 });
        this.field('content');
        this.field('author');
        this.field('categories');

        this.use(lunr.ru);
    });

    // Get the generated search_data.json file so lunr.js can search it locally.
    window.data = $.getJSON('/search_data.json');

    // Wait for the data to load and add it to lunr
    window.data.then(function(loaded_data){
        $.each(loaded_data, function(index, value){
            window.idx.add(
                $.extend({ "id": index }, value)
            );
        });
    });

    // Event when the form is submitted
    $("#site_search").submit(function(event) {
        event.preventDefault();
    });
    $("#site_search").keyup(function(event){
        var query = $("#search_box").val(); // Get the value for the text field

        if(query.length) {
            var results = window.idx.search(query); // Get lunr to perform a search
            display_search_results(results); // Hand the results off to be displayed
            $('#site-content').hide();
            $('#search-content').show();
        }
        else{
            $('#site-content').show();
            $('#search-content').hide();
        }
    });

    function display_search_results(results) {
        var $search_results = $("#search_results");

        // Wait for data to load
        window.data.then(function(loaded_data) {

            // Are there any results?
            if (results.length) {
                $search_results.empty(); // Clear any old results

                // Iterate over the results
                results.forEach(function(result) {
                    var item = loaded_data[result.ref];

                    // Build a snippet of HTML for this result
                    var appendString = '<li><h4><a href="' + item.url + '">' + item.title + '</a></h4></li>';

                    // Add the snippet to the collection of results.
                    $search_results.append(appendString);
                });
            } else {
                // If there are no results, let the user know.
                $search_results.html('<div class="well well-sm">Sorry :( , we don\'t find anything </div>');
            }
        });
    }
});
