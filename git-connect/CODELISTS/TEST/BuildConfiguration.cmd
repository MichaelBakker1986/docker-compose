@Echo OFf
SET ANTLocation=%MOORepo%\apps\apache-ant-1.9.4\bin
Echo ----------------------------
Echo Make Configurations
Echo ----------------------------

Echo remove existing ZIP-files
del %~dp0\zip\*.zip /Q

Echo making ZIP-files
CALL %ANTLocation%\Ant -f %~dp0BuildConfiguration.xml