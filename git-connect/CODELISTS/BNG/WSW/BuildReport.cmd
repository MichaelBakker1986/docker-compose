SET rptFilename=..\V05\Reports\reports.reports.frb.rpt
Set xmlTemplateFilename=Reports\reports.questionnaire-wsw.frb.xml
set fesDocumentFilename=Reports\input\data.WSW.xml
set outputFilename=Reports\output\BNG_WSW.pdf 
set xmlOutputFilename=Reports\output\BNG_WSW.xml 
set matricesDir=..\..\Finan\V05\Matrices

SET MVNLocation=%MOORepo%\apps\apache-maven-3.2.5\bin
set MAVEN_OPTS="-XX:MaxPermSize=3g"

call %MVNLocation%/mvn.bat -T1C install integration-test -DskipTests -am -Pgenerate-report -DrptFilename=%rptFilename% -DxmlTemplateFilename=%xmlTemplateFilename% -DfesDocumentFilename=%fesDocumentFilename% -DoutputFilename=%outputFilename% -DxmlOutputFilename=%xmlOutputFilename% -DmatricesDir=%matricesDirName%

call %outputFilename%