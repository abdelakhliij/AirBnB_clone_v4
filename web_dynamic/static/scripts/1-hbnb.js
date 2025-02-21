$(document).ready(function() {
  // Initialize an empty array to store selected amenity IDs
  let selectedAmenities = [];

  // Listen for changes on checkbox inputs within the amenities section
  $('input[type="checkbox"]').on('change', function() {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    
    if ($(this).is(':checked')) {
      // Add the amenity ID to the list if it's checked
      selectedAmenities.push(amenityId);
    } else {
      // Remove the amenity ID from the list if it's unchecked
      const index = selectedAmenities.indexOf(amenityId);
      if (index > -1) {
        selectedAmenities.splice(index, 1);
      }
    }

    // Update the h4 tag with the list of selected amenities
    if (selectedAmenities.length > 0) {
      const selectedNames = selectedAmenities.map(id => {
        // Find the amenity name based on the checked IDs
        const amenity = $('input[data-id="' + id + '"]').data('name');
        return amenity;
      }).join(', ');
      $('.amenities h4').text(selectedNames);
    } else {
      $('.amenities h4').text('&nbsp;');
    }
  });
});
