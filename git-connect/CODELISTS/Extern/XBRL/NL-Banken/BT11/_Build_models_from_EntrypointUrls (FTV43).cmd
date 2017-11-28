:: Evert Jan Stokking, september 2017

set "URL_Folder=%~dp0\EntrypointUrls"
set "FIN_Folder=%~dp0\FIN (FTV43)"
set "MappingModels_Folder=%~dp0\MappingModels (FTV43)"
set "CSV_Folder=%~dp0\CSV (FTV43)"

call %MOORepo%\Cmds\Generic_Build_models_from_EntrypointUrls 43

@echo.
@echo Ready!
pause
