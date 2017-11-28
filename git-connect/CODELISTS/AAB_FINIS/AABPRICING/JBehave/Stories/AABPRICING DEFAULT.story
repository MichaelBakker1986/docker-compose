AAB Pricing story
@Author Ruben
@themes Risk Adjusted Return - RAR 

!-- Structuur

!-- ==== RARORAC ===============================
!-- ==== Economic Profit =======================
!-- ==== Return on Equity ======================
!-- ==== Regulatory Profit =====================


!-- ==== Risk Adjusted Return - RAR ============
!-- ==== RAR - Income ==========================
!-- ==== RAR - Other expenses ==================
!-- ==== RAR - Interest expenses ===============

!-- ==== Economic Capital  =====================
!-- ==== EC - CR  ==============================
!-- ==== EC - BR  ==============================
!-- ==== EC - OR  ==============================


!-- ==== Risk Weighted Assets  =================
!-- ==== RWA - CR  =============================
!-- ==== RWA - OR  =============================



Scenario: RoE
!-- ==== Return on Equity ======================
Given a document of the model type AABPRICING
And a tuple instance Facility1 of definition Facility

Then tuple variable Facility_tpBalloon in tuple Facility1 should have value 0 for document
And tuple variable Facility_tpOfferPeriod in tuple Facility1 should have value 2W for document


