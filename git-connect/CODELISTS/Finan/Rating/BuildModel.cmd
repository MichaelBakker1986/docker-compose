SET BuildJAR=N
SET BuildFFL=Y
SET ModelFinanFolderName=%~dp0
SET ModelName=RATING
SET Model2JavaRevision=2.15.0.0
SET Model2JavaBranch=develop

CALL %MOORepo%\Generic_Make_Model.bat
pause
