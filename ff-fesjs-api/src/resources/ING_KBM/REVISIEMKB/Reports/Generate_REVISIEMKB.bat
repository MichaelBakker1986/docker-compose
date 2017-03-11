rem SET buildreport.revision=latest.integration
rem SET buildreport.branch=develop

SET buildreport.revision=latest.integration
SET buildreport.branch=release/kbm/4.2.0

SET report.name=REVISIEMKB
SET report.modelNames="REVISIEMKB"
SET report.rptFilename=%FinanFinancialsRepo%\CODELISTS\ING-KBM\_Project\ReportTemplate\reports.questionnaire-ING.frb.rpt
SET report.xmlTemplateFilename=%~dp0\reports.revisiemkb.frb.xml
SET report.fesDocumentFilename=%~dp0\input\REVISIEMKB.xml
SET report.outputFilename=%~dp0\output\REVISIEMKB.pdf
SET report.xmlOutputFilename=%~dp0\output\REVISIEMKB.xml
SET report.matricesDirName=%~dp0..\Matrices
SET report.waitForChange=false

call %MOORepo%\tools\QuickBuildReport\GeneratePDF.bat

%report.outputFilename%

pause