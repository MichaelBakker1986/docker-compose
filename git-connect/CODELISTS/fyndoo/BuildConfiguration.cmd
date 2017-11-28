@Echo OFf
SET ANTLocation=%MOORepo%\apps\apache-ant-1.9.4\bin
echo ----------------------------
echo Build models
echo ----------------------------

REM FES VERSIE VOOR FiFi 4.5
REM ___________________________
SET Model2JavaRevision=2.15.0.0
SET Model2JavaBranch=develop

CALL .\APPROVAL\BuildModel.cmd
CALL .\ASSESSMENT2\BuildModel.cmd
CALL .\CREDITLETTER\BuildModel.cmd
CALL .\CREDITPROPOSAL\BuildModel.cmd
CALL .\CREDITPROPOSALCA\BuildModel.cmd
CALL .\CREDITPROPOSALCM\BuildModel.cmd
CALL .\CREDITPROPOSALLE\BuildModel.cmd
CALL .\FBL\BuildModel.cmd
CALL .\IB\BuildModel.cmd
CALL .\MOTIVATION\BuildModel.cmd
CALL .\PRICING\BuildModel.cmd
CALL .\RATING\BuildModel.cmd
CALL ..\fyndoo-sns\CONTRACT\BuildModel.cmd
REM V05 als laatste uitvoeren vanwege tuple multiplier die aanstaat
CALL ..\Finan\V05_FinanOnline\BuildModel.cmd


Echo ----------------------------
Echo Make Configurations
Echo ----------------------------

Echo remove existing ZIP-files
del %~dp0\_ZipFile\*.zip /Q

Echo making ZIP-files
CALL %ANTLocation%\Ant -f %~dp0BuildConfiguration.xml