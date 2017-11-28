@Echo OFf
SET ANTLocation=%MOORepo%\apps\apache-ant-1.9.4\bin
echo ----------------------------
echo Build models
echo ----------------------------

REM FES VERSIE VOOR FiFi 4.5
REM ___________________________
REM SET Model2JavaRevision=2.15.0.0
REM SET Model2JavaBranch=release/aabf/sprint34

CALL .\AABPRICING\BuildModel.cmd
CALL .\BTAGROSC\BuildModel.cmd
CALL .\NONFINANCIALANALYSIS\BuildModel.cmd
CALL .\STEP5SC\BuildModel.cmd
CALL .\V05\BuildModel.cmd

REM CALL .\AABPRICING\BuildModel.cmd
REM CALL .\BTAGROSC\BuildModel.cmd
REM CALL .\NONFINANCIALANALYSIS\BuildModel.cmd
REM CALL .\STEP5SC\BuildModel.cmd
REM CALL .\V05\BuildModel.cmd


Echo ----------------------------
Echo Make Configurations
Echo ----------------------------

Echo remove existing ZIP-files
del %~dp0\_ZipFile\*.zip /Q 

Echo making ZIP-files

CALL %ANTLocation%\Ant -f %~dp0BuildConfiguration.xml make-zipfile-aab-all -Dbuild.publishshared=false
 




