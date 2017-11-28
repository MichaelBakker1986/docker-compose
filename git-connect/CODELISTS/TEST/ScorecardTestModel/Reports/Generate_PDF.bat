rem SET buildreport.revision=latest.integration
rem SET buildreport.branch=develop

SET buildreport.revision=latest.integration
SET buildreport.branch=release/kbm/4.2.0

SET report.name=SCORECARDTESTMODEL
SET report.modelNames="SCORECARDTESTMODEL"
SET report.rptFilename=%~dp0\questionnaire-ScorecardTestModel.frb.rpt
SET report.xmlTemplateFilename=%~dp0\questionnaire-ScorecardTestModel.frb.xml
SET report.fesDocumentFilename=%~dp0\input\scorecardtestmodel_fesdoc.xml
SET report.outputFilename=%~dp0\output\scorecardtestmodel.pdf
SET report.xmlOutputFilename=%~dp0\output\scorecardtestmodel.xml
SET report.matricesDirName=%~dp0..\Matrices
SET report.waitForChange=false

call %MOORepo%\tools\QuickBuildReport\GeneratePDF.bat

%report.outputFilename%

pause