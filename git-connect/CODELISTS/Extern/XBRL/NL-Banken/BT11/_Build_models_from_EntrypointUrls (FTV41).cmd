:: Evert Jan Stokking, september 2017

set "URL_Folder=%~dp0\EntrypointUrls"
set "FIN_Folder=%~dp0\FIN (FTV41)"
set "MappingModels_Folder=%~dp0\MappingModels (FTV41)"
set "CSV_Folder=%~dp0\CSV (FTV41)"

call %MOORepo%\Cmds\Generic_Build_models_from_EntrypointUrls 41

@echo.
@echo Ready!
pause
