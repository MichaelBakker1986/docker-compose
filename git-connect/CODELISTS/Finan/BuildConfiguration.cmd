@Echo OFf
SET ANTLocation=%MOORepo%\apps\apache-ant-1.9.4\bin

Echo ----------------------------
Echo Make Configurations
Echo ----------------------------

Echo remove existing ZIP-files
del %~dp0\_ZipFile\*.zip /Q

Echo making ZIP-files
CALL %ANTLocation%\Ant -f %~dp0BuildConfiguration.xml make-zipfile-finan
CALL %ANTLocation%\Ant -f %~dp0BuildConfiguration.xml make-zipfile-unit4
CALL %ANTLocation%\Ant -f %~dp0BuildConfiguration.xml make-zipfile-bdo
CALL %ANTLocation%\Ant -f %~dp0BuildConfiguration.xml make-zipfile-mth
CALL %ANTLocation%\Ant -f %~dp0BuildConfiguration.xml make-zipfile-test
CALL %ANTLocation%\Ant -f %~dp0BuildConfiguration.xml make-zipfile-bright
CALL %ANTLocation%\Ant -f %~dp0BuildConfiguration.xml make-zipfile-bob
CALL %ANTLocation%\Ant -f %~dp0BuildConfiguration.xml make-zipfile-fam






