SET EntryPointsFolder=_Documentatie\taxonomie\www.sbrbanken.nl\bt11\frc\20161209\entrypoints
SET DestinationFolder=%~dp0

call %MooRepo%\tools\QuickBuildFinModels\GenericBuildFinModelsFromXbrl.cmd
                                                        
for %%i in (*.fin) do (mkdir "%%~ni\Fin" & move /Y "%%i" "%%~ni\Fin")

pause