SET BuildFFL=Y
SET BuildJAR=N
SET JBehave=Y
SET ModelFinanFolderName=%~dp0
SET ModelName=FormuleTester
SET Model2JavaRevision=2.16.0.0
SET Model2JavaBranch=develop

CALL %MOORepo%\Generic_Make_Model.bat
pause
