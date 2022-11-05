$(function () {
    let checkedAmenities = {};
    // $(document).on('change', "input[type='checkbox']", function () {
        // if ($(this).is(':checked')) {
        // console.log($(this).is(':checked'))
        // console.log(this.checked)

    $('input:checkbox').change(function(){
        // console.log(this);
        if (this.checked) {
            checkedAmenities[$(this).data('id')] = $(this).data('name');
            // console.log(checkedAmenities);
        } else {
            delete checkedAmenities[$(this).data('id')];
            // console.log(checkedAmenities);
        }

        let amens = Object.values(checkedAmenities);
        if (amens.length > 0){
            $('div.amenities > h4').text(amens.join(', '));
        } else {
            $('div.amenities > h4').html('&nbsp;');
        }
    });


    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
        if (status == 'success') {
            data.status == 'OK'
                ? $('div#api_status').addClass('available')
                : $('div#api_status').removeClass('available');
        }
    });

    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        data: '{}',
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
            for (let place of data) {
                // $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
                $('.places').append(
                    `<article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 && 's'}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 && 's'}</div>
                            <div class="number_bathrooms">${
                                place
                                .number_bathrooms
                            } Bathroom${place.number_bathrooms && 's'}
                            </div>
                        </div>
                        
                        <div class="description">
                            ${place.description || 'Description'}
                        </div>
                     </article>
                     `
                )
            }
        }

    })

});

