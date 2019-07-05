window.onload = function() {

    // If sessionStorage is storing default values (ex. name), exit the function and do not restore data
    if (sessionStorage.getItem('postcode') == "Postcode") {
        return;
    }

    // If values are not blank, restore them to the fields
    var postcode = sessionStorage.getItem('postcode');
    //if (postcode !== null) $('#inputPostcode').val(postcode);
    document.forms.postcodeForm[0].value = postcode;

}

// Before refreshing the page, save the form data to sessionStorage
window.onbeforeunload = function() {
    sessionStorage.setItem("postcode", document.forms.postcodeForm[0].value);
}