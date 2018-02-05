// Delay loading any function until the html dom has loaded. All functions are
// defined in this top level function to ensure private scope.
jQuery(document).ready(function() {

    // Installs error handling.
    jQuery.ajaxSetup({
        error: function(resp, e) {
            if (resp.status == 0) {
                alert('You are offline!!\n Please Check Your Network.');
            } else if (resp.status == 404) {
                alert('Requested URL not found.');
            } else if (resp.status == 500) {
                alert('Internel Server Error:\n\t' + resp.responseText);
            } else if (e == 'parsererror') {
                alert('Error.\nParsing JSON Request failed.');
            } else if (e == 'timeout') {
                alert('Request timeout.');
            } else {
                alert('Unknown Error.\n' + resp.responseText);
            }
        }
    });  // error:function()


    var generate_btn = jQuery('#generate_btn');
    var sample_1_btn = jQuery('#sample_1_btn');

    var svg_div = jQuery('#graphviz_svg_div');
    var graphviz_data_textarea = jQuery('#graphviz_data');

    function InsertGraphvizText(text) {
        graphviz_data_textarea.val(text);
    }


    function UpdateGraphviz() {
        svg_div.html("");
        var data = graphviz_data_textarea.val();
        // Generate the Visualization of the Graph into "svg".
        var svg = Viz(data, "svg");
        svg_div.html("<hr>" + svg);
    }

    // Startup function: call UpdateGraphviz
    jQuery(function() {
        // The buttons are disabled, enable them now that this script
        // has loaded.
        generate_btn.removeAttr("disabled")
            .text("Generate Graph!");

        sample_1_btn.removeAttr("disabled");
    });

    // Bind actions to form buttons.
    generate_btn.click(UpdateGraphviz);

    sample_1_btn.click(function() {
        InsertGraphvizText(jQuery("#sample1_text").html().trim());
    });
    jQuery('#graphviz_data').on("change keyup paste", function() {
        jQuery('#generate_btn').click()
    })
});