SET BuildJAR=Y
SET BuildFFL=Y
SET ModelFinanFolderName=%~dp0
SET ModelName=WSW
SET Model2JavaRevision=2.15.0.0
SET Model2JavaBranch=develop

CALL %MOORepo%\Generic_Make_Model.bat
