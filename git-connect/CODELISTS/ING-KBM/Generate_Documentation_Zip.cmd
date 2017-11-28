for /F "usebackq tokens=1,2 delims==" %%i in (`wmic os get LocalDateTime /VALUE 2^>NUL`) do if '.%%i.'=='.LocalDateTime.' set ldt=%%j
set ldt=%ldt:~0,4%-%ldt:~4,2%-%ldt:~6,2% %ldt:~8,2%:%ldt:~10,2%:%ldt:~12,6%
echo Local date is [%ldt%]

rem ----------------------------------------------------------------------
rem                         REPORTS
rem ----------------------------------------------------------------------
del .\_ZipFile\zip_ingreports\*.* /Q
rd .\_ZipFile\zip_ingreports
md .\_ZipFile\zip_ingreports

REM INGSCG3
copy .\INGSCG3\Matrices\G3_Parameters.xls .\_ZipFile\zip_ingreports\*.* /y
copy .\INGSCG3\Matrices\G3_Sector.xls .\_ZipFile\zip_ingreports\*.* /y
copy ".\INGSCG3\Documentatie\*INGSCG3.xlsx" .\_ZipFile\zip_ingreports\*.* /y

REM INGSCG3REV
copy .\INGSCG3REV\Matrices\G3_Rev_Parameters.xls .\_ZipFile\zip_ingreports\*.* /y
copy .\INGSCG3REV\Matrices\G3_Rev_Sector.xls .\_ZipFile\zip_ingreports\*.* /y
copy ".\INGSCG3REV\Documentatie\*INGSCG3REV.xlsx" .\_ZipFile\zip_ingreports\*.* /y

REM REVISIEMKB
copy ".\REVISIEMKB\Documentatie\*REVISIEMKB.xlsx" .\_ZipFile\zip_ingreports\*.* /y

REM INGVERSLAG
copy ".\INGVERSLAG\Documentatie\*VERSLAG.xlsx" .\_ZipFile\zip_ingreports\*.* /y


"C:\Program Files\7-Zip\7z.exe" a -pM0nnikkenwerk -tzip .\_ZipFile\documentatie_KAM_KRM_%ldt%.zip .\_ZipFile\zip_ingreports\*.*

del .\_ZipFile\zip_ingreports\*.* /Q
rd .\_ZipFile\zip_ingreports




