SET ApplyTupleMultiplier=Y
SET BuildJAR=Y
SET BuildFFL=N
SET ModelFinanFolderName=%~dp0
SET ModelName=V05
SET TargetModelName=V05
SET Model2JavaRevision=2.7.1
SET Model2JavaBranch=develop

CALL %MOORepo%\Generic_Make_Model.bat

