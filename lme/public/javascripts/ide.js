$.getJSON("/stash/projects/FF/repos/finanfinancials/branches?limit=1000", function(data, status, xhr) {
    var all = []
    for (var key in data.values) {
        all.push(data.values[key].id)
    }
    $("#tags").autocomplete({
        source: all
    });
})
$.getJSON("/stash2/projects/FF/repos/finanfinancials/branches?limit=1000", function(data, status, xhr) {
    $("#models").autocomplete({
        source: data
    });
})