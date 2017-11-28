REM @echo off
SET QuickModelBuilderPath=%WORKSPACE%\TOOLS\QuickBuildModel
SET MODEL_ROOT=%WORKSPACE%\CODELISTS
SET TARGET_ROOT=%FINAN_ROOT%\Develop
                                                              
SET LicenseFile=%FINAN_ROOT%\developer.dat
SET SysIniFolder=%FINAN_ROOT%\sysfinan.ini\%ModelSubFolder%
SET UserFolder=%FINAN_ROOT%\userfolder\%ModelSubFolder%

SET ModelsFolder=%MODEL_ROOT%
SET ModelFolder=%ModelsFolder%\%ModelSubFolder%
SET FinFolder=%ModelFolder%\Fin
SET FinClassicModelFilename=%FinFolder%\%ModelName%.fin
SET TupleMultiplier=5                                       
SET DataFolder=%ModelFolder%\Testdata
SET OriginalDocument=leeg.%ModelName%_ORG
SET NewDocument=leeg.%ModelName%

SET WebFolder=%TARGET_ROOT%\fes-model-%ModelName%\src\resources\WebModel
SET CalculationModelFilename=%ModelName%-CalculationModel.xml
SET PresentationModelFilename=%ModelName%-PresentationModel.xml
SET LayoutsFileName=%ModelName%-Layouts.xml
SET FormulaSetSet=[NoTrend,Trend]
SET TargetProjectFolder=%TARGET_ROOT%\fes-model-%ModelName%
SET TargetProjectBranch=development
SET Prognose=y

set StartTIME=%TIME%

REM Generate New Model with tuple multiplier
%FinanExeLocation%\FINAN.exe /DataFolder=%DataFolder% /LicenseFile=%LicenseFile% /SysIniFolder=%SysIniFolder% /UserFolder=%UserFolder% /ModelFolder=%FinFolder% /OpenDocument Key=%OriginalDocument%   /Export Type=FinClassicModel,FileName="%FinClassicModelFilename%",TupleMultiplier=%TupleMultiplier% /CloseDocument /CloseFinan

REM Generate Web XML files from model
%FinanExeLocation%\FINAN.exe /DataFolder=%DataFolder% /LicenseFile=%LicenseFile% /SysIniFolder=%SysIniFolder% /UserFolder=%UserFolder% /ModelFolder=%FinFolder% /ExportFolder=%WebFolder% /OpenDocument Key=%NewDocument% /Export Type=CalculationModelAsXml,FileName="%CalculationModelFilename%" /Export Type=PresentationModelAsXml,FileName="%PresentationModelFilename%",LayoutsFileName="%LayoutsFileName%",FormulaSetSet=%FormulaSetSet% /CloseDocument /CloseFinan

type nul >%WebFolder%\%modelname%-IgnoreList.txt

CALL ant -lib="%QuickModelBuilderPath%\org.apache.ivy_2.4.0.cr1_20140315220245.jar" -buildfile="%QuickModelBuilderPath%\build.xml" -Dmodel2java.revision=%Model2JavaRevision% -Dmodel2java.branch=%Model2JavaBranch% -Dmodel.name=%ModelName% -Dmodel.path="%WebFolder%" -DtargetProjectFolder="%TargetProjectFolder%" -DtargetProjectBranch=%TargetProjectBranch% -Dprognose.enabled=%Prognose% -Dmodels.path="%ModelsFolder%"

copy "%TARGET_ROOT%\fes-model-%ModelName%\bin\*.jar" "%MODEL_ROOT%\%ModelSubFolder%\QuickBuildModel\"

set StopTIME=%TIME%

for /f "usebackq tokens=1-4 delims=:., " %%f in (`echo %StartTIME: =0%`) do set /a Start100S=1%%f*360000+1%%g*6000+1%%h*100+1%%i-36610100
for /f "usebackq tokens=1-4 delims=:., " %%f in (`echo %StopTIME: =0%`) do set /a Stop100S=1%%f*360000+1%%g*6000+1%%h*100+1%%i-36610100
if %Stop100S% LSS %Start100S% set /a Stop100S+=8640000
set /a TookTime=%Stop100S%-%Start100S%
set TookTimePadded=0%TookTime%
echo Started: %StartTime%
echo Stopped: %StopTime%
echo Elapsed: %TookTime:~0,-2%.%TookTimePadded:~-2% seconds

pause