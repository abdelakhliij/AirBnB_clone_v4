$(document).ready(function () {
  // Store checked amenities
  let checkedAmenities = [];

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).prop('checked')) {
      // Add the amenity ID to the checked amenities list
      checkedAmenities.push(amenityId);
    } else {
      // Remove the amenity ID from the checked amenities list
      checkedAmenities = checkedAmenities.filter(id => id !== amenityId);
    }
  });

  // Listen for the button click
  $('button[type="button"]').click(function () {
    // Send POST request to places_search with checked amenities
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: checkedAmenities // Send the checked amenities
      }),
      success: function (data) {
        // Clear current places
        $('section.places').empty();

        // Loop through the response and display the places
        data.forEach(place => {
          const article = $('<article></article>');
          article.append(`
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">${place.description}</div>
          `);

          // Append the article to the places section
          $('section.places').append(article);
        });
      },
      error: function (err) {
        console.log('Error fetching places:', err);
      }
    });
  });
});

