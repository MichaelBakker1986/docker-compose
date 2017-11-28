@Echo OFf
SET ANTLocation=%MOORepo%\apps\apache-ant-1.9.4\bin
echo ----------------------------
echo Build models
echo ----------------------------

CALL .\WSW\BuildModel.cmd
CALL .\VHV\BuildModel.cmd
CALL .\V05\BuildModel.cmd

Echo ----------------------------
Echo Make Configurations
Echo ----------------------------

Echo remove existing ZIP-files
del %~dp0\_ZipFile\*.zip /Q

Echo making ZIP-files
CALL %ANTLocation%\Ant -f %~dp0BuildConfiguration.xml make-zipfile-bng-all
