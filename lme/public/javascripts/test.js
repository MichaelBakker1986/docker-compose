$.getJSON("/stash/projects/FF/repos/finanfinancials/branches?limit=1000", function(data, status, xhr) {
    console.info(data.values)
    var all = []
    for (var key in data.values) {
        all.push(data.values[key].id)
    }
    $("#tags").autocomplete({
        source: all
    });
})