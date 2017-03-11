alter table EXPORT_REVISIEMKB add IMPORT_periode_ultimo_start date default null; 
alter table EXPORT_REVISIEMKB add IMPORT_pdscore number default null; 
alter table EXPORT_REVISIEMKB add IMPORT_net_exposure number default null; 
alter table EXPORT_REVISIEMKB add IMPORT_trendinrevenue number default null; 
alter table EXPORT_REVISIEMKB add IMPORT_disp number default null; 
alter table EXPORT_REVISIEMKB add IMPORT_trendinoverdue number default null; 
alter table EXPORT_REVISIEMKB add IMPORT_ratinggetal_mm_num number default null; 
alter table EXPORT_REVISIEMKB add Actie18Keuze number default null; 
alter table EXPORT_REVISIEMKB add Actie18 varchar2(256 char) default null; 
alter table EXPORT_REVISIEMKB add Actie17B varchar2(256 char) default null; 
alter table EXPORT_REVISIEMKB add MedewerkingKlantAanRevisie number default null; 

COMMIT;