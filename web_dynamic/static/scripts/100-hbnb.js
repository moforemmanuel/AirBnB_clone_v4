$(function () {
    let checkedValues = {
        states: [],
        cities: [],
        amenities: []
    };
    // $(document).on('change', "input[type='checkbox']", function () {
    // if ($(this).is(':checked')) {
    // console.log($(this).is(':checked'))
    // console.log(this.checked)

    $('input:checkbox').change(function () {
        // console.log(this);
        if (this.checked) {
            // checkedAmenities[$(this).data('id')] = $(this).data('name');
            checkedValues[$(this).attr('name')].push($(this).data('id'))
            // console.log(checkedValues);
        } else {
            // delete checkedAmenities[$(this).data('id')];
            checkedValues[$(this).attr('name')] = checkedValues[$(this).attr('name')].filter(item => item !== $(this).data('id'))
            // console.log(checkedValues);
        }

        for (let prop in checkedValues) {
            // console.log(prop)
            // let field = Object.values(checkedValues[prop]);
            let field = checkedValues[prop];
            if (field.length > 0) {
                if (prop == 'amenities') {
                    $('div.amenities > h4')
                        .text(field.map(value => $(`[data-id=${value}]`)
                            .data('name')).join(', '));
                } else {
                    // console.log(field)
                    let locationList = []
                    for (let entry in checkedValues) {
                        // console.log('ent: ', entry)
                        // console.log('entvals: ', checkedValues[entry])
                        if (entry != 'amenities') {
                            locationList = locationList.concat(checkedValues[entry]
                                .map(value => $(`[data-id=${value}]`)
                                .data('name')
                            ))
                        }
                    }
                    // console.log('loc: ', locationList)
                    $('div.locations > h4').text(locationList.join(', '));
                }
            } else {
                if (prop == 'amenities') {
                    $('div.amenities > h4').html('&nbsp;');
                } else {
                    $('div.locations > h4').html('&nbsp;');
                }
            }
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
        success: function (data) {
            // console.log(data);
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
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 && 's'}</div>
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

    $('button:button').click(function () {
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            data: JSON.stringify(checkedValues),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                // console.log('data: ', data);
                if (!data) {
                    $('.places').html('<h2>No Match</h2>')
                } else {
                    $('.places').html('')
                    data.forEach((place) => {
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
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms && 's'}</div>
                        </div>
                        
                        <div class="description">
                            ${place.description || 'Description'}
                        </div>
                     </article>
                     `
                        )
                    })
                }
            }
        })

    })
})

