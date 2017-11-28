@Echo OFf
SET ANTLocation=%MOORepo%\apps\apache-ant-1.9.4\bin
echo ----------------------------
echo Build models
echo ----------------------------

REM FES VERSIE VOOR FiFi 4.5
REM ___________________________

CALL .\INGSCG3\BuildModel.cmd
CALL .\INGSCG3REVMKB\BuildModel.cmd
CALL .\INGSCG3REVCOV\BuildModel.cmd
CALL .\INGVERSLAG\BuildModel.cmd
CALL .\REVISIEMKB\BuildModel.cmd

Echo ----------------------------
Echo Make Configurations
Echo ----------------------------

Echo remove existing ZIP-files
del %~dp0\_ZipFile\*.zip /Q

Echo making ZIP-files
CALL %ANTLocation%\Ant -f %~dp0BuildConfiguration_RELEASE.xml

Echo remove existing ZIP-files
del %~dp0\_ZipFile\KBM_deploy*.zip /Q

