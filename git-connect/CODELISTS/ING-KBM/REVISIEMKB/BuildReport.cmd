SET rptFilename=..\_Project\ReportTemplate\reports_new.ing.frb.rpt
set xmlTemplateFilename=Reports\reports.revisiemkb.frb.xml
set fesDocumentFilename=Reports\input\REVISIEMKB.xml
set outputFilename=Reports\output\REVISIEMKB.pdf
set xmlOutputFilename=Reports\output\REVISIEMKB.xml
set matricesDirName=Reports

SET MVNLocation=%MOORepo%\apps\apache-maven-3.2.5\bin
set MAVEN_OPTS="-XX:MaxPermSize=3g"

call %MVNLocation%/mvn.bat -T1C integration-test -DskipTests -Pgenerate-report -DrptFilename=%rptFilename% -DxmlTemplateFilename=%xmlTemplateFilename% -DfesDocumentFilename=%fesDocumentFilename% -DoutputFilename=%outputFilename% -DxmlOutputFilename=%xmlOutputFilename% -DmatricesDirName=%matricesDirName%

call %outputFilename%
