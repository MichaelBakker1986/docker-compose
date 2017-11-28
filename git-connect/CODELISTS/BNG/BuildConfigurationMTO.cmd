@Echo OFf
SET ANTLocation=%MOORepo%\apps\apache-ant-1.9.4\bin
echo ----------------------------
echo Build models
echo ----------------------------

CALL .\V05\BuildModel.cmd

Echo ----------------------------
Echo Make Configurations
Echo ----------------------------

Echo remove existing ZIP-files
del %~dp0\_ZipFile\*.zip /Q

Echo making ZIP-files
CALL %ANTLocation%\Ant -f %~dp0BuildConfigurationMTO.xml make-zipfile-bng


Echo ----------------------------

set ZipFileName=configurations_bng.zip
set SERVER=http://mto1.finan.local:8080
Echo Upload configuraties
Echo .
Echo ZipFile: .\_ZipFile\%ZipFileName%
Echo Server: .\%SERVER%
Echo ----------------------------

REM JBOSS
java -jar %MOORepo%\apps\uploadconfig\ff-config-cli-1.2.jar webservice_url=%SERVER%/ff-config-ws/ConfigServicePortImpl wsdl_url=%SERVER%/ff-config-ws/ConfigServicePortImpl?wsdl user_name=ConfigService file_url=.\_ZipFile\%ZipFileName%
REM WAS
REM java -jar %MOORepo%\apps\uploadconfig\ff-config-cli-1.2.jar webservice_url=%SERVER%/ff-config-ws/ConfigServicePortImplService wsdl_url=%SERVER%/ff-config-ws/ConfigServicePortImplService/ConfigServicePortImplService.wsdl user_name=ConfigService file_url=.\_ZipFile\%ZipFileName%








