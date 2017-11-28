@Echo OFf
SET ANTLocation=%MOORepo%\apps\apache-ant-1.9.4\bin

Echo ----------------------------
Echo Make Configurations
Echo ----------------------------

Echo remove existing ZIP-files
del %~dp0\_ZipFile\*.zip /Q

Echo making ZIP-files
CALL %ANTLocation%\Ant -f %~dp0BuildConfiguration.xml make-zipfile-kbm-test

Echo remove existing ZIP-files
del %~dp0\_ZipFile\KBM_deploy*.zip /Q

