@Echo OFf
SET ANTLocation=%MOORepo%\apps\apache-ant-1.9.4\bin
echo ----------------------------
echo Build models
echo ----------------------------

REM FES VERSIE VOOR FiFi 4.5
REM ___________________________
SET Model2JavaRevision=2.15.0.0
SET Model2JavaBranch=develop

CALL .\PRICING\BuildModel.cmd
CALL ..\fyndoo\APPROVAL\BuildModel.cmd
CALL ..\fyndoo\ASSESSMENT2\BuildModel.cmd
CALL ..\fyndoo\CREDITLETTER\BuildModel.cmd
CALL ..\fyndoo\CREDITPROPOSAL\BuildModel.cmd
CALL ..\fyndoo\CREDITPROPOSALCA\BuildModel.cmd
CALL ..\fyndoo\CREDITPROPOSALCM\BuildModel.cmd
CALL ..\fyndoo\CREDITPROPOSALLE\BuildModel.cmd
CALL ..\fyndoo\FBL\BuildModel.cmd
CALL ..\fyndoo\IB\BuildModel.cmd
CALL ..\fyndoo\MOTIVATION\BuildModel.cmd
CALL ..\fyndoo\RATING\BuildModel.cmd
CALL .\CONTRACT\BuildModel.cmd
REM V05 als laatste uitvoeren vanwege tuple multiplier die aanstaat
CALL ..\Finan\V05_FinanOnline\BuildModel.cmd


Echo ----------------------------
Echo Make Configurations
Echo ----------------------------

Echo remove existing ZIP-files
del %~dp0\_ZipFile\*.zip /Q

Echo making ZIP-files
CALL %ANTLocation%\Ant -f %~dp0BuildConfiguration.xml