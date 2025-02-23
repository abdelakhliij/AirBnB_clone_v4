$(document).ready(function() {
  // Listen for changes on each input checkbox
  const amenities = {};

  $('input[type="checkbox"]').change(function() {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }
    
    // Update the h4 tag inside the div Amenities
    const names = Object.values(amenities);
    $('.amenities h4').text(names.join(', '));
  });

  // Check API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});

