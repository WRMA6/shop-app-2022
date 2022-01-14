function isAlphanumeric(value) {
    return /^[0-9a-zA-Z]+$/.test(value);
}

function removeSpaces(str) {
    return str.replace(/\s+/g, '');
}

function isListStringAlphanumeric(str) {
    str = removeSpaces(str);
    if (!str) return true;
    for (const tag of str.split(",")) {
        if (!isAlphanumeric(tag)) return false;
    }
    return true;
}

function validateCreateParams() {
    if (!$("#createName").val()) alert("Name should not be empty.");
    else if (!$("#createCount").val()) alert("Count should not be empty.");
    else if (!isListStringAlphanumeric($("#createTags").val()))
        alert("Tags must be alphanumeric.");
    else return true;
    return false;
}

function validateUpdateParams() {
    if (!$("#updateOldName").val()) alert("Name to update should not be empty.");
    else if (!isListStringAlphanumeric($("#updateAddTags").val()))
        alert("Tags must be alphanumeric");
    else return true;
    return false;
}

function validateDeleteParams() {
    if (!$("#deleteName").val()) alert("Name cannot be empty.");
    else return true;
    return false;
}

function addToForm(form, name, value) {
    if (value == "") return;
    $("<input />").attr("type", "hidden")
        .attr("name", name)
        .attr("value", value)
        .addClass("injected-field")
        .appendTo(form);
}

function init() {
    $("form").on("submit", function (event) {
        // Parameter validation
        if (this.id == "createForm" && !validateCreateParams()) return false;
        else if (this.id == "updateForm" && !validateUpdateParams()) return false;
        else if (this.id == "deleteForm" && !validateDeleteParams()) return false;

        // Remove previous fields if submitted before
        $(this).find(".injected-field").remove();
        // Add filters to form
        addToForm(this, "filterName", $("#filterName").val());
        addToForm(this, "filterCount", $("#filterCount").val());
        addToForm(this, "filterTags", $("#filterTags").val());
        return true;
    });
}

window.addEventListener('load', () => {
    init();
});