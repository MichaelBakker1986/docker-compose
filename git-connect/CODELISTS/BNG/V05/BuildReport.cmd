SET rptFilename=Reports\reports.reports.frb.rpt
Set xmlTemplateFilename=Reports\reports.financialfactsheet.frb.xml
set fesDocumentFilename=..\V05\Reports\input\data.v05.xml
set outputFilename=Reports\output\BNG.pdf 
set xmlOutputFilename=Reports\output\BNG.xml 
set matricesDirName=..\..\Finan\V05\Matrices

SET MVNLocation=%MOORepo%\apps\apache-maven-3.2.5\bin
set MAVEN_OPTS="-XX:MaxPermSize=3g"

call %MVNLocation%/mvn.bat -T1C integration-test -DskipTests -Pgenerate-report -DrptFilename=%rptFilename% -DxmlTemplateFilename=%xmlTemplateFilename% -DfesDocumentFilename=%fesDocumentFilename% -DoutputFilename=%outputFilename% -DxmlOutputFilename=%xmlOutputFilename% -DmatricesDirName=%matricesDirName%

call %outputFilename%