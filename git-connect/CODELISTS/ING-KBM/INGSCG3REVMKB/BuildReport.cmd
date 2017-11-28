SET rptFilename=..\_Project\ReportTemplate\reports.questionnaire-ING.frb.rpt
Set xmlTemplateFilename=Reports\reports.ingscg3revmkb.frb.xml
set fesDocumentFilename=Reports\input\data_fps.xml
set outputFilename=Reports\output\ingscg3revmkb.pdf
set xmlOutputFilename=Reports\output\ingscg3revmkb.xml
set matricesDirName=..\INGSCG3REV\Matrices

SET MVNLocation=%MOORepo%\apps\apache-maven-3.2.5\bin
set MAVEN_OPTS="-XX:MaxPermSize=3g"

call %MVNLocation%/mvn.bat -T1C integration-test -DskipTests -Pgenerate-report -DrptFilename=%rptFilename% -DxmlTemplateFilename=%xmlTemplateFilename% -DfesDocumentFilename=%fesDocumentFilename% -DoutputFilename=%outputFilename% -DxmlOutputFilename=%xmlOutputFilename% -DmatricesDirName=%matricesDirName%

call %outputFilename%
