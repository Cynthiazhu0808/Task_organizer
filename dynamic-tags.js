// Author: Cynthia Zhu
// Date: 12/15/2024
// Description: implements the dynamic tags

'use strict';

const TAG_KEY = 'Cynthia_TAGS';

/** 
* update the tags
*
*/
function updateTags() {
    $('#currentTags').empty();
    $("#tags").empty();

    Object.keys(tagColors).forEach(tagName => {
        const tagItem = $('<li>');
        const deleteButton = $('<button>').addClass("delete").text('✖');
        const tagLabel = $('<span>').addClass("tagName").text(tagName);
      
        tagItem.append(deleteButton);
        tagItem.append(tagLabel);
        $('#currentTags').append(tagItem);

        const section = $(`<label><input type="radio" name="tag" value="${tagName}">${tagName}</label>`);
        $("#tags").append(section);
    });
}


$('#currentTags').on('click', '.delete', function(event) {
    // Find the tag name to delete
    const tagItem = $(event.target).closest('li');
    const tagName = tagItem.find('.tagName').text();
    
    delete tagColors[tagName];
    
    updateTags();
});

$('#addTagButton').on('click', function(event) {
    const tagName = $('[name=tagName]').val();
    const tagColor = $('[name=tagColor]').val();

    tagColors[tagName] = tagColor;

    updateTags();
    
    $('#addTagForm')[0].reset(); //reset the form
});

/** 
* save the tags to local storage
*
*/
function saveTags() {
    localStorage.setItem(TAG_KEY, JSON.stringify(tagColors));
}

/** 
* load the tags from local storage
*
*/
function loadTags() {
    const storedTags = localStorage.getItem(TAG_KEY);
    if (storedTags){
    tagColors = JSON.parse(storedTags);
    }
    updateTags();
}


// Event listeners for tag-related buttons
$('#loadLocalButton').one().on('click', loadTags);
$('#saveLocalButton').one().on('click', saveTags);

// Load tags on page load
updateTags();
