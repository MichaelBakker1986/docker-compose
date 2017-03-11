alter table EXPORT_REVISIEMKB add EWS_Suggesties varchar2(256 char) default null; 
alter table EXPORT_REVISIEMKB add AansluitingDekkingsperc number default null; 
alter table EXPORT_REVISIEMKB add Indiener varchar2(256 char) default null; 

COMMIT;