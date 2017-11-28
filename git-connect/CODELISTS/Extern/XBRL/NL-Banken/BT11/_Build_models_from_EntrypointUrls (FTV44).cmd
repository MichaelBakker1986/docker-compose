:: Evert Jan Stokking, september 2017

set "URL_Folder=%~dp0\EntrypointUrls"
set "FIN_Folder=%~dp0\FIN (FTV44)"
set "MappingModels_Folder=%~dp0\MappingModels (FTV44)"
set "CSV_Folder=%~dp0\CSV (FTV44)"

call %MOORepo%\Cmds\Generic_Build_models_from_EntrypointUrls

@echo.
@echo Ready!
pause
