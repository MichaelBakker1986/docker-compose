Tests for reference tuples for modelbouw demonstration

Meta:
@author Kevin van der Lei


Scenario: Test Case 1: Instantiation of reference tuples when new tuples are created
Given a document with timeunit MONTH for the historic year 2005
And the tuple TRTC1_TupleDefinition1
And the tuple TRTC1_TupleProperty1
And the tuple refTRTC1_TupleProperty1

When the tuple TRTC1_TupleDefinition1 is 3 times added
Then the tuple TRTC1_TupleDefinition1 should have title Tuple Definition 1 for index 0
And the tuple TRTC1_TupleDefinition1 should have title Tuple Definition 1 for index 1
And the tuple TRTC1_TupleDefinition1 should have title Tuple Definition 1 for index 2

And the tuple refTRTC1_TupleProperty1 should have title Tuple Property 1 for index 0
And the tuple refTRTC1_TupleProperty1 should have title Tuple Property 1 for index 1
And the tuple refTRTC1_TupleProperty1 should have title Tuple Property 1 for index 2

When the tuple TRTC1_TupleDefinition1 on index 1 is removed
Then the tuple TRTC1_TupleDefinition1 should have title Tuple Definition 1 for index 0
And the tuple TRTC1_TupleDefinition1 should have title Tuple Definition 1 for index 1

And the tuple refTRTC1_TupleProperty1 should have title Tuple Property 1 for index 0
And the tuple refTRTC1_TupleProperty1 should have title Tuple Property 1 for index 1


Scenario: Test Case 2: nested reference to external tuple
Given a document with timeunit MONTH for the historic year 2005
And the tuple TRTC2_TupleDefinition1
And the tuple TRTC2_TupleProperty1
And the tuple TRTC2_TupleDefinition2
And the tuple TRTC2_TupleProperty2
And the tuple refTRTC2_TupleDefinition1
And the tuple refTRTC2_TupleProperty1

When the tuple TRTC2_TupleDefinition2 is 2 times added
Then the tuple TRTC2_TupleDefinition2 should have title Tuple Definition 2 for index 0
And the tuple TRTC2_TupleDefinition2 should have title Tuple Definition 2 for index 1

When the tuple refTRTC2_TupleDefinition1 is added on index 0,0
And the tuple refTRTC2_TupleDefinition1 is added on index 0,1
And the tuple refTRTC2_TupleDefinition1 is added on index 1,0

Then the tuple TRTC2_TupleDefinition1 should have title Tuple Definition 1 for index 0
And the tuple TRTC2_TupleDefinition1 should have title Tuple Definition 1 for index 1
And the tuple TRTC2_TupleDefinition1 should have title Tuple Definition 1 for index 2


Scenario: Test Case 3: external references to top and nested tuples
Given a document with timeunit MONTH for the historic year 2005
And the tuple TRTC3_TupleDefinition1
And the tuple TRTC3_TupleProperty1
And the tuple TRTC3_TupleDefinition2
And the tuple TRTC3_TupleProperty2
And the tuple refTRTC3_TupleDefinition1
And the tuple refTRTC3_TupleProperty1

When the tuple TRTC3_TupleDefinition1 is 2 times added
And the tuple TRTC3_TupleDefinition2 is added on index 0,0
And the tuple TRTC3_TupleDefinition2 is added on index 0,1
And the tuple TRTC3_TupleDefinition2 is added on index 0,2

Then the tuple TRTC3_TupleDefinition1 should have title Tuple Definition 1 for index 0
And the tuple TRTC3_TupleDefinition1 should have title Tuple Definition 1 for index 1

And the tuple TRTC3_TupleDefinition2 should have title (Nested) Tuple Definition 2 for index 0,0
And the tuple TRTC3_TupleDefinition2 should have title (Nested) Tuple Definition 2 for index 0,1
And the tuple TRTC3_TupleDefinition2 should have title (Nested) Tuple Definition 2 for index 0,2

And the tuple refTRTC3_TupleDefinition1 should have title Tuple Definition 1 for index 0
And the tuple refTRTC3_TupleDefinition1 should have title Tuple Definition 1 for index 1

!-- And the tuple refTRTC3_TupleDefinition2 should have title (Nested) Tuple Definition 2 for index 0,0
!-- And the tuple refTRTC3_TupleDefinition2 should have title (Nested) Tuple Definition 2 for index 0,1
!-- And the tuple refTRTC3_TupleDefinition2 should have title (Nested) Tuple Definition 2 for index 0,1