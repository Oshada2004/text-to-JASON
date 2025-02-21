# Instructions

Add the relavent text to the constant text "input"
const input = `xxxxxxxxxxxxxxxxxxxxxxxxxxx`;

## Instructions in writing the text input

BID: `<bundleId>`
Defines the Question bundle Id for the questions. Separates the questions form previous qestion bundles

TYPE: `<type>` (MCQ OR TOF OR SA)
Defines the type of questions of the bundle (types: MCQ, Treue or False, Short Answer Questions)

ISGRP: `<isGroup>` (T/F)
Defines the boolean isGroup. Note that default value of "isGroup" is false

M: `<marks>`
Defines the marks for each question in the bundle

Q: `<question>`
Defines the MAIN question text.

NM: `<hasNegativeMarks>`
Defines the boolean hasNegativeMarks for the particular MAIN Question. Note that default value of "hasNegativeMarks" is false

L: `<wordLimit>`
Defines the word limit of a short answer MAIN Question

SQ: `<subQuestion>`
Defines the SUB Question text

- `<answer>`
Defines the list containing "answerText" and "isCorrect".

(correct)
Set "isCorrect" to true. Note that default value of "isCorrect" is false.


# example text
`
BID: 3042
TYPE: SAQ
ISGRP: T
M: 3
Q: This is a test Short Answer Question?
L: 10
NM: T
-Short Answer (correct)

Q: This is a test Short Answer Question with Sub Qs?
L: 20
SQ: Sub Question 1?
-Short Answer1 (correct)
-Short Answer2 (correct)
SQ: Sub Question 1?
-Short Answer1 (correct)

BID: 2001
TYPE: MCQ
M: 1
Q: MCQ 1?
NM: T
-A1 (correct)
-A2
-A3

Q: Read para and answer following MCQs
SQ: Question 1
-aaaaaa
-bbbbbbbbb (correct)
-cccccc
SQ: Question 2
-acaacacac
-fbgdgfggg
-llllll
-non of the above (correct)
SQ: Question 3
-ppppppp (correct)
-oooooo
-qqqqq (correct)

BID: 4501
ISGRP: F
TYPE: TOF
M: 1
Q: Read the Story and mark the True statements
-state1 (correct)
-state2
-state3
-state4 (correct)
-state5 (correct)

Q: Read the Story and answer the questions,
SQ: SUBq1
-QQQQQQQ (correct)
-Q
-QQQ

SQ: SUBq2
-AAAAAA
-BBBBBB (correct)
-GGGGGG (correct)
`

# output
