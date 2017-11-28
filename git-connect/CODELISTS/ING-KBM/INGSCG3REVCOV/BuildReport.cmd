SET rptFilename=..\_Project\ReportTemplate\reports.questionnaire-ING.frb.rpt
Set xmlTemplateFilename=Reports\reports.ingscg3revcov.frb.xml
set fesDocumentFilename=Reports\input\data_fps.xml
set outputIdentifier=ingscg3revcov
set matricesDirName=..\INGSCG3REVMKB\Matrices

SET MVNLocation=%MOORepo%\apps\apache-maven-3.2.5\bin
set MAVEN_OPTS="-XX:MaxPermSize=3g"

call %MVNLocation%/mvn.bat -T1C integration-test -DskipTests -Pgenerate-report -DrptFilename=%rptFilename% -DxmlTemplateFilename=%xmlTemplateFilename% -DfesDocumentFilename=%fesDocumentFilename% -DmatricesDir=%matricesDirName% -DoutputIdentifier=%outputIdentifier%

echo Reports\output\%outputIdentifier%.pdf
call Reports\output\%outputIdentifier%.pdf
