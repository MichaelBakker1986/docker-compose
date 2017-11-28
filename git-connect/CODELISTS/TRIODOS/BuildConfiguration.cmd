@Echo OFf
Echo ----------------------------
Echo Build models
Echo ----------------------------

CALL .\FBL\BuildModel.cmd
CALL .\TDSCAPPROVAL\BuildModel.cmd
CALL .\TDSCAPPROVALCAHQ\BuildModel.cmd
CALL .\TDSCAPPROVALHQ\BuildModel.cmd
CALL .\TDSCASSESSMENT\BuildModel.cmd
CALL .\TDSCASSESSMENT2\BuildModel.cmd
CALL .\TDSCCREDITLETTER\BuildModel.cmd
CALL .\TDSCCREDITPROPOSAL\BuildModel.cmd
CALL .\TDSCCREDITPROPOSALCA\BuildModel.cmd
CALL .\TDSCCREDITPROPOSALCM\BuildModel.cmd
CALL .\TDSCCREDITPROPOSALLE\BuildModel.cmd
CALL .\TDSCPRICING\BuildModel.cmd
CALL .\TDSCRATING\BuildModel.cmd
CALL .\TDSCREVIEWPROPOSAL\BuildModel.cmd
CALL .\TERMSHEET\BuildModel.cmd
CALL .\V05\BuildModel.cmd 

Echo ----------------------------
Echo Make Configurations
Echo ----------------------------

Echo remove existing ZIP-files
del %~dp0\zip\*.zip /Q

Echo making ZIP-files
CALL Ant -f %~dp0BuildConfiguration.xml