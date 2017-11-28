SET ApplyTupleMultiplier=Y
SET BuildJAR=Y
SET BuildFFL=N
SET ModelFinanFolderName=%~dp0
SET ModelName=V05
SET TargetModelName=V05

IF "%Model2JavaRevision%"=="" (
SET Model2JavaRevision=2.15.0.0
SET Model2JavaBranch=release/aabf/sprint34
)

CALL %MOORepo%\Generic_Make_Model.bat
