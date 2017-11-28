SET BuildFFL=Y
SET BuildJAR=N
SET JBehave=Y
SET ModelFinanFolderName=%~dp0
SET ModelName=FAM
SET Model2JavaRevision=2.15.0.0
SET Model2JavaBranch=develop

CALL %MOORepo%\Generic_Make_Model.bat
pause
