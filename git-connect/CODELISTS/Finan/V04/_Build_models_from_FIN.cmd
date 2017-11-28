:: Evert Jan Stokking, september 2017

Set "FIN_Folder=%~dp0\FIN"
Set "FFL_Folder=%~dp0\FFL"
Set "CSV_Folder=%~dp0\Documentatie"
Set "MappingModels_Folder=%~dp0\MappingModels"
Set "WebModel_Folder=%~dp0\WebModel"

call %MOORepo%\Cmds\Generic_Build_models_from_FIN
