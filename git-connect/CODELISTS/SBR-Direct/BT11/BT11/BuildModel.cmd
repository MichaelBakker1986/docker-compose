for %%a in ("%~dp0\.") do set "parent=%%~nxa"
mkdir FFL
SET ModelFinanFolderName=%~dp0
SET ModelName=%parent%
SET Model2JavaRevision=2.16.0.0
SET Model2JavaBranch=develop
SET BuildFFL=Yes                
SET BuildJAR=No
SET JBehave=No

CALL %MOORepo%\Generic_Make_Model.bat
