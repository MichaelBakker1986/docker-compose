SET rptFilename=..\V05\Reports\reports.reports.frb.rpt
Set xmlTemplateFilename=Reports\reports.questionnaire-vhv.frb.xml
set fesDocumentFilename=Reports\input\data.VHV.xml
set outputFilename=Reports\output\BNG_VHV.pdf 
set xmlOutputFilename=Reports\output\BNG_VHV.xml 
set matricesDirName=..\..\Finan\V05\Matrices

SET MVNLocation=%MOORepo%\apps\apache-maven-3.2.5\bin
set MAVEN_OPTS="-XX:MaxPermSize=3g"

call %MVNLocation%/mvn.bat -T1C integration-test -DskipTests -Pgenerate-report -DrptFilename=%rptFilename% -DxmlTemplateFilename=%xmlTemplateFilename% -DfesDocumentFilename=%fesDocumentFilename% -DoutputFilename=%outputFilename% -DxmlOutputFilename=%xmlOutputFilename% -DmatricesDirName=%matricesDirName%

call %outputFilename%