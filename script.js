const URL_GET_ACCOUNTS = "{{url_get_accounts}}";

var accountTypes;
var accountTypesDropDown;
var accountsDropDown;

function initAccounts() {
    accountTypesDropDown = $("#accountTypes");
    accountsDropDown = $("#accounts");

    accountTypesDropDown.change(function () {
        intiDropDown(accountsDropDown);
        let value = this.value;
        if (value) {
            let accountType = accountTypes.find(function (e) { return e.Id === Number(value); });
            if (accountType) {
                fillDropDown(accountsDropDown, accountType.Accounts);
            }
        }
    });

    $.ajax({
        url: URL_GET_ACCOUNTS,
        type: "GET",
        success: function (data) {
            accountTypes = data;
            fillAccountTypes();
        },
        error: function (jqXhr) {
            onError(jqXhr.responseText);
        }
    });
}

function intiDropDown(dropdown) {
    dropdown.empty();
    dropdown.append('<option selected="true" disabled></option>').text(dropdown.name);
    dropdown.prop('selectedIndex', 0);
}

function fillDropDown(dropdown, list) {
    $.each(list, function (key, entry) {
        dropdown.append($('<option></option>').attr('value', entry.Id).text(entry.Name));
    });
}

function fillAccountTypes() {
    intiDropDown(accountTypesDropDown);
    fillDropDown(accountTypesDropDown, accountTypes);
}

initAccounts();
