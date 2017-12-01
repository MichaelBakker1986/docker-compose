$(function() {
    'use strict'

    $('[data-toggle="control-sidebar"]').controlSidebar()
    $('[data-toggle="push-menu"]').pushMenu()

    var $tabPane = $('<div />', {
        'id': 'control-sidebar-theme-demo-options-tab',
        'class': 'tab-pane active'
    })

    var $tabButton = $('<li />', {'class': 'active'})
        .html('<a href=\'#control-sidebar-theme-demo-options-tab\' data-toggle=\'tab\'>'
            + '<i class="fa fa-wrench"></i>'
            + '</a>')

    $('[href="#control-sidebar-home-tab"]')
        .parent()
        .before($tabButton)

   /* var $demoSettings = $('<div />')

    $demoSettings.append('<h4 class="control-sidebar-heading">Skins</h4>')

    $tabPane.append($demoSettings)*/
    $('#control-sidebar-home-tab').after($tabPane)


    $('[data-toggle="tooltip"]').tooltip()
})
