:: Evert Jan Stokking, september 2017

set "URL_Folder=%~dp0\EntrypointUrls"
set "FIN_Folder=%~dp0\FIN"
set "MappingModels_Folder=%~dp0\MappingModels"
set "CSV_Folder=%~dp0\CSV"
set "FFL_Folder=%~dp0\FFL"

call %MOORepo%\Cmds\Generic_Build_models_from_EntrypointUrls
call %MOORepo%\Cmds\Generic_Build_FFL_from_FIN

@echo.
@echo Ready!
pause
