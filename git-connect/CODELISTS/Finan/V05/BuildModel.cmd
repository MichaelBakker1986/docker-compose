SET ApplyTupleMultiplier=Y
SET BuildJAR=Y
SET BuildFFL=N
SET ModelFinanFolderName=%~dp0
SET ModelName=V05
SET TargetModelName=V05
REM SET Model2JavaRevision=2.12.78.1 
REM SET Model2JavaBranch=release/hf/4.2.0

CALL %MOORepo%\Generic_Make_Model.bat

