
$(function() {

    //CODE TO DISPLAY POKEMON'S LIST
    var responseData;                // To store response data from the sever
    var resource_uriArr = [];        // To store resource_uri for the pokemon's list
    var offset = 0;                  // To store offset variable for GET request
    var limit = 12;                  // To store pokemon's quantity at the page for GET request
    var isLastPkmn = false;          // To store information if pokemon's list ends
    var typesColors = {              // Object to store colors
        "normal" : '#9F9F6E',
        "fire" : '#f08030',
        "water" : '#6890f0',
        "electric" : '#f8d030',
        "grass" : '#78c850',
        "ice" : '#98d8d8',
        "fighting" : '#c03028',
        "poison" : '#a040a0',
        "ground" : '#e0c068',
        "flying" : '#a890f0',
        "psychic" : '#f85888',
        "bug" : '#a8b820',
        "rock" : '#b8a038',
        "ghost" : '#705898',
        "dragon" : '#7038f8',
        "dark" : '#705848',
        "steel" : '#b8b8d0',
        "fairy" : '#e898e8'
    };

    function main () {           // Main function for getting data from server and calling other functions
        var url = 'http://pokeapi.co/api/v1/pokemon/?limit='+limit+'&offset='+offset;
        var $btn = $('.btn');
        $.ajax ({
            type:     "GET",
            url:      url,
            dataType: "jsonp",
            async:    true,
            cache: true,
            beforeSend: function () {
                $('#pkmn_list').html('<div class="preloader" ><img src="images/squares-preloader.gif"></div><div class="preloader">Please wait... Pokemons are very close now</div>');
                $btn.hide();                           // Hide button, when loading
            },
            complete: function () {
                $('.preloader').remove();              // Remove preloader after data were loaded
                $btn.show();                           // Show button after data was loaded
                if (isLastPkmn) {                      // Hide button if there is no pokemon's in database
                    $btn.hide();
                }
                //$('#pkmn_list').find('.mix').css('display', 'inline-block'); //Show pokemons because plugin MixIt hide them

            },
            success:  function (data) {
                responseData = data;
                if (responseData.objects.length < limit) {     //Check if we got last pokemon from the server set TRUE
                    isLastPkmn = true;
                }
                getResource_uri ();                          // Push resource_uri of images into array
                for (var i = 0; i < limit; i++) {
                    if (resource_uriArr[i] !== undefined) {  // If the sprite array has undefined sprite we have error
                        generateImage(resource_uriArr[i],i);
                    }
                }
                generatePkmnList();                                      // Make markup with some data

                $('div.tagsort-tags-container').tagSort({    // Include plugin TagSort for filter
                    items:'.mix',
                    sortType: 'exclusive',
                    fadeTime: 400
                });
                colorFilters();                              // Fill filter buttons by different colors
                addTextTypes();                              // Add the text "Types:" before filter buttons
            },
            fail:     function () {
                alert ("Sorry! We could not load data at the moment")
            }
        })
    }

    main ();                                                 // Call main function after page loading


    function generatePkmnList () {
        var contentHtml;
        for ( var i = 0; i < responseData.objects.length; i++ ) {    // Loop through the response data object
            if ( responseData.objects[i].types.length === 1)  {      // For pokemons that have 1 type
                contentHtml +='<div class="mix pkmn hvr-hang" data-item-tags="' + responseData.objects[i].types[0].name + '">' +
                    '<a href="http://pokeapi.co' + responseData.objects[i].resource_uri + '">' +  // Display images
                    '<div class="image-container">' +
                    '</div>' +

                    '<div class="name">' + responseData.objects[i].name + '</div>' + // Display names

                    '<div class="types">' +                                          // Display types
                    '<div class="' + responseData.objects[i].types[0].name + '">' + responseData.objects[i].types[0].name  + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</a></div>'
            }
            else {                                                                  // For pokemons that have 2 types
                contentHtml +='<div class="mix pkmn hvr-hang" data-item-tags="' + responseData.objects[i].types[0].name + ', ' + responseData.objects[i].types[1].name + '">' +
                    '<a href="http://pokeapi.co' + responseData.objects[i].resource_uri + '">' + // Display images
                    '<div class="image-container">' +
                    '</div>' +

                    '<div class="name">' + responseData.objects[i].name + '</div>' +  // Display names

                    '<div class="types">' +                                           // Display types
                    '<div class="' + responseData.objects[i].types[0].name + '">' + responseData.objects[i].types[0].name  + '</div>' +
                    '<div class="' + responseData.objects[i].types[1].name + '">' + responseData.objects[i].types[1].name  + '</div>' +

                    '</div>' +
                    '</a></div>'
            }
        }

        var $list =  $('#pkmn_list');
        $list.append(contentHtml);                                 // To append content into generatePkmnList

        var $types =  $ ('.types');
        $types.find('div.normal').css('background-color', typesColors.normal);  //Code to fill types with different colors
        $types.find('div.fire').css('background-color', typesColors.fire);
        $types.find('div.water').css('background-color', typesColors.water);
        $types.find('div.electric').css('background-color', typesColors.electric);
        $types.find('div.grass').css('background-color', typesColors.grass);
        $types.find('div.ice').css('background-color', typesColors.ice);
        $types.find('div.fighting').css('background-color', typesColors.fighting);
        $types.find('div.poison').css('background-color', typesColors.poison);
        $types.find('div.ground').css('background-color', typesColors.ground);
        $types.find('div.flying').css('background-color', typesColors.flying);
        $types.find('div.psychic').css('background-color', typesColors.psychic);
        $types.find('div.bug').css('background-color', typesColors.bug);
        $types.find('div.rock').css('background-color', typesColors.rock);
        $types.find('div.ghost').css('background-color', typesColors.ghost);
        $types.find('div.dragon').css('background-color', typesColors.dragon);
        $types.find('div.dark').css('background-color', typesColors.dark);
        $types.find('div.steel').css('background-color', typesColors.steel);
        $types.find('div.fairy').css('background-color', typesColors.fairy);

        $list.html($list.html().replace(/undefined/ig, ""));   //It was a bug with pokemon's list when 'undefined' text displayed
    }

    function getResource_uri () {                                                      //Get sprites into array
        if(resource_uriArr.length == 0) {                                              //Check if sprites array contains values
            for (var i = 0; i < responseData.objects.length; i++) {
                if (responseData.objects[i].sprites[0] !== undefined) {                 // Check if the pokemon has img sprite
                    resource_uriArr.push(responseData.objects[i].sprites[0].resource_uri); //Push values into array
                } else {
                    console.log('There is no sprite for pokemon')
                }
            }
        } else {
            resource_uriArr.length = 0;                                               //Delete values fom array
            for (var i = 0; i < responseData.objects.length; i++) {
                if (responseData.objects[i].sprites[0] !== undefined) {
                    resource_uriArr.push(responseData.objects[i].sprites[0].resource_uri); //Push values into array
                } else {
                    console.log('There is no sprite for pokemon')
                }
            }
        }
    }

    function generateImage (resource_uri, index) {                                    //Generate image function
        var urlForList = 'http://pokeapi.co/' + resource_uri;                         // Url for getting image
        $.ajax({
            type:     "GET",
            url:      urlForList,
            dataType: "jsonp",
            async:    true,
            cache:    true,
            success:  function (data) {
                var href = "http://pokeapi.co" + data.image;
                var $container = $ (".image-container");
                $container.eq(index).append('<img>');                                               //Add img tag to container
                $container.eq(index).find('img').attr('src', href).attr('alt', data.pokemon.name);  //Add src and alt to img
            }
        });
    }

    //CODE TO DISPLAY SINGLE POKEMON
    var $table = $('table');                  // To store generatePkmnList table;
    $table.remove();                          // Delete generatePkmnList table before first loading of the page
    var img;                                  // To store current image
    var href;                                 // To store current image link
    var jsonResponse;                         // To store response for single pokemon
    $('#pkmn_list').on('click', '.pkmn a' , function(e) {           // Add listener to the pokemon's list.
        e.preventDefault();                    // Prevent loading url

        var $tableValue = $('.table-value');
        $tableValue.html($table);              // Insert generatePkmnList table after clicking

        clearData();                           // To delete all previous data from the table
        href = $(this)                         //Get current pkmn link after clicking for getAndFill(href)
            .find('a')
            .prevObject[0]
            .href;

        getAndFill(href);                      //Get data from resource and fill table

        img = $(this).find('img');             // Get current image after clicking
        displayPkmnImage(img);                 // Call the function
        $tableValue.show();                    // Show tables with pokemons (because it has display:none in css file)
        //console.log(href);
    });

    function getAndFill(href) {                 // Get data about single pokemon and fill table
        $.ajax ({
            type:     "GET",
            url:      href,
            dataType: "json",
            async:    true,
            cache:    true,
            success:  function (data) {
                jsonResponse = data;            // Get data from the server
                fillTable();                    // Call function  to fill table by data
            },
            fail:     function () {
                alert ("Sorry! We could not load data at the moment")
            }
        })
    }

    function fillTable() {                                  // Output pokemon's data into table
        $('.table-value').css('border', '2px solid black'); //Draw solid border for tables
        var name = jsonResponse.name;                       // Get pokemon's name
        var $el = $('#name-and-id');
        var pkmnId = jsonResponse.pkdx_id + '';             //  Get pokemon id and convert into string

        var id;
        if(pkmnId.length == 1) {                            //Add #00 for pokemon's id
            id = '#00'+jsonResponse.pkdx_id;
        } else if (pkmnId.length == 2) {
            id = '#0'+jsonResponse.pkdx_id;
        } else {
            id = '#'+jsonResponse.pkdx_id;
        }
        var nameAndId = name + ' ' + id;                    // Concat name and id
        $el.text(nameAndId);                                // Display name and id

        var $type = $('#type');
        $type.empty();
        for (var i = 0; i < jsonResponse.types.length; i++) {       // Display types
            var el = $type.text($type.text() + jsonResponse.types[i].name + " ");
        }

        $('#attack').text(jsonResponse.attack);             // Display other data
        $('#defense').text(jsonResponse.defense);
        $("#hp").text(jsonResponse.hp);
        $("#sp-attack").text(jsonResponse.sp_atk);
        $("#sp-defence").text(jsonResponse.sp_def);
        $("#speed").text(jsonResponse.speed);
        $("#weight").text(jsonResponse.weight);
        $("#total-moves").text(jsonResponse.moves.length);
    }

    function displayPkmnImage (img) {
        img.clone().appendTo('#image_pkmn');                //Copy image and insert into container
    }

    function clearData () {                                  //Remove all current data for single pokemon before  new pokemon will be displayed
        $('#image_pkmn').empty();
        $('#type').empty();
        $('#attack').empty();
        $('#defense').empty();
        $("#hp").empty();
        $("#sp-attack").empty();
        $("#sp-defence").empty();
        $("#speed").empty();
        $("#weight").empty();
        $("#total-moves").empty();
    }


    //CODE TO UPLOAD ANOTHER QUANTITY OF POKEMONS BY CLICKING THE BUTTON


    $ (".btn").on("click", function () {            // If the "Load more" button is clicked, clear list and call the main() function

        $('.btn').hide();                               // Hide button untill data uploaded into markup
        clearList();                                    // Delete previous pokemon's list

        offset += limit;                                // Add next quantity to offset for GET request
        main();                                         // Display next pokemon's list by calling main function

        //if (isLastPkmn) {
        //    $ (".btn").attr('disabled', true).text('Nothing to load...'); // It was old feature
        //}

        $('.tagsort-tags-container').children().remove();     // Remove previous filter buttons
        var el = $('#filter');
        el.html(el.html().replace(/Types:/ig, ""));           // Remove previous text "Types"

    });

    function clearList () {                             // Delete previous pokemon's list
        $('.pkmn').remove();
    }


    // CODE TO FILL SELECT -> old feature
    // var $select = $('select');
    // for (var key in typesColors) {
    //     $select.append('<option class="filter" data-filter=".'+key+'">'+key.charAt(0).toUpperCase() + key.substr(1).toLowerCase()+'</option>')  // Append items to select list and make it uppercase
    // }
//     function hideSelectOptions () {
//         for (var key in typesColors ) {
//     if($('#pkmn_list').find('div.mix.'+key+'').length == 0) {
//             $('option[data-filter=".'+key+'"]').hide();
//     } else {
//         $('option[data-filter=".'+key+'"]').show();
//     }
// }

//     }


    function addTextTypes() {                                                           // Add text "Types:" to filter
        $('.tagsort-tags-container').prepend('Types:')
    }

    function colorFilters() {                                                           // Fill filter by colors
        var $itemSort = $('.tagsort-tags-container');
        $itemSort.find('span:contains("normal")').css('background-color', typesColors.normal);
        $itemSort.find('span:contains("fire")').css('background-color', typesColors.fire);
        $itemSort.find('span:contains("water")').css('background-color', typesColors.water);
        $itemSort.find('span:contains("electric")').css('background-color', typesColors.electric);
        $itemSort.find('span:contains("grass")').css('background-color', typesColors.grass);
        $itemSort.find('span:contains("ice")').css('background-color', typesColors.ice);
        $itemSort.find('span:contains("fighting")').css('background-color', typesColors.fighting);
        $itemSort.find('span:contains("poison")').css('background-color', typesColors.poison);
        $itemSort.find('span:contains("ground")').css('background-color', typesColors.ground);
        $itemSort.find('span:contains("flying")').css('background-color', typesColors.flying);
        $itemSort.find('span:contains("psychic")').css('background-color', typesColors.psychic);
        $itemSort.find('span:contains("bug")').css('background-color', typesColors.bug);
        $itemSort.find('span:contains("rock")').css('background-color', typesColors.rock);
        $itemSort.find('span:contains("ghost")').css('background-color', typesColors.ghost);
        $itemSort.find('span:contains("dragon")').css('background-color', typesColors.dragon);
        $itemSort.find('span:contains("dark")').css('background-color', typesColors.dark);
        $itemSort.find('span:contains("steel")').css('background-color', typesColors.steel);
        $itemSort.find('span:contains("fairy")').css('background-color', typesColors.fairy);
    }

});

