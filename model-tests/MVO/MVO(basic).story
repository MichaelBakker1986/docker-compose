Then Q_FINAL_REPORT_VISIBLE should be Ja
Then Q_MAP01_VRAAG01_MEMO should be invisible
Then Q_MAP01 should be NA


Then Q_MAP01_VRAAG01_MEMO should be invisible
When Q_MAP01_VRAAG01 is set to Ja
Then Q_MAP01_VRAAG01_MEMO should be visible

When  Q_MAP02_VRAAG01 is set to Ja
Then  Q_MAP02_VRAAG01 should be Ja
And Q_RESTRICTIESTXT should be 100