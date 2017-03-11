SET BuildJAR=Y
SET BuildFFL=N
SET ModelFinanFolderName=%~dp0
SET ModelName=REVISIE
SET Model2JavaRevision=2.12.78.1 
SET Model2JavaBranch=release/hf/4.2.0

CALL %MOORepo%\Generic_Make_Model.bat
