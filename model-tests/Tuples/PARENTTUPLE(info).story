@Summary: Test tuple parent
@Because they are not sharing the same context, they don't work without FormulaBootstrap.js manupulation while processing.
@tupleA = tupleB +100; converts into tupleA(y) = tupleB(y.parent) + 100

@We gonna try set a value on t(A) and reference it from y(A,B) Which should allow t(A) context
@ParentFigure is a 1-tuple
When ParentFigure(A) is set to 100
When ParentFigure(B) is set to 200

@So calling ParentFigure from 2-tuple can become a problem
Then ParentTupleReference(A,D) should be 100
Then ParentTupleReference(B,C) should be 200

@Test the default value
Then ParentTupleReference(G,E) should be 123