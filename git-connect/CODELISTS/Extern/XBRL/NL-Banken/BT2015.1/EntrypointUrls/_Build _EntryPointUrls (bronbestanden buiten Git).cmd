:: Evert Jan Stokking, oktober 2017

:: LET OP: XSD's buiten Git!!
set "XSD_Folder=P:\Dev\XBRL\Nederland\BT\BT2015.1\report\bank\entrypoints"
set "URL_Folder=%~dp0"

call %MOORepo%\Cmds\Generic_Build_EntrypointUrls_from_XSDs

@echo.
@echo Ready!
pause