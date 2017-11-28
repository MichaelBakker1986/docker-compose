SET Model2JavaRevision=2.12.58.1
SET Model2JavaBranch=feature/aabp/sprint12
SET ModelFinanFolderName=AABFINIS
SET ModelName=AABPRICING
SET TargetProjectFolder=%~dp0..\finan-integration-tests\fes-model-%ModelName%

call QuickBuildModel\Generic_Build_FFLModel.bat
pause
