rem SET buildreport.revision=latest.integration
rem SET buildreport.branch=develop

SET buildreport.revision=latest.integration
SET buildreport.branch=release/kbm/4.2.0

SET report.name=FAM
SET report.modelNames="FAM"
SET report.rptFilename=%~dp0\questionnaire-fam.frb.rpt
SET report.xmlTemplateFilename=%~dp0\questionnaire-fam.frb.xml
SET report.fesDocumentFilename=%~dp0..\TestData\FesDocument.xml
SET report.outputFilename=%~dp0\output\fam.pdf
SET report.xmlOutputFilename=%~dp0\output\fam.xml
SET report.matricesDirName=%~dp0..\Matrices
SET report.waitForChange=false

call %MOORepo%\tools\QuickBuildReport\GeneratePDF.bat

%report.outputFilename%

pause