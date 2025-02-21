function convertToJSON(input) {
    const lines = input.split('\n');
    const jsonArray = [];  // This will store all the JSON objects
    let currentJson = {
        bundleId: null,
        type: null,
        isGroup: false,
        marks: 0,
        questions: []
    };
    let currentQuestion = null;
    let currentSubQuestion = null;
    let isSubQuestion = false;

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('BID:')) {
            // If there is an existing JSON object, push it to the array
            if (currentJson.bundleId !== null) {
                jsonArray.push(currentJson);
            }
            // Start a new JSON object
            currentJson = {
                bundleId: parseInt(line.split(':')[1].trim()),
                type: null,
                isGroup: false,
                marks: 0,
                questions: []
            };
        } else if (line.startsWith('TYPE:')) currentJson.type = line.split(':')[1].trim();
        else if (line.startsWith('ISGRP:')) currentJson.isGroup = line.split(':')[1].trim() === 'T';
        else if (line.startsWith('M:')) currentJson.marks = parseFloat(line.split(':')[1].trim());
        else if (line.startsWith('Q:')) {
            // Before starting a new question, ensure the last sub-question is added
            if (currentSubQuestion) {
                currentQuestion.subQuestions.push(currentSubQuestion);
                currentSubQuestion = null;
            }
            isSubQuestion = false;
            currentQuestion = {
                question: line.substring(2).trim(),
                wordLimit: 0,
                answers: [],
                isNegativeMarks: false,
                subQuestions: []
            };
            currentJson.questions.push(currentQuestion);
        } else if (line.startsWith('NM:')) currentQuestion.isNegativeMarks = line.split(':')[1].trim() === 'T';
        else if (line.startsWith('L:')) currentQuestion.wordLimit = parseInt(line.split(':')[1].trim());
        else if (line.startsWith('SQ:') && currentQuestion) {
            // Before starting a new sub-question, add the previous one
            if (currentSubQuestion) {
                currentQuestion.subQuestions.push(currentSubQuestion);
            }
            currentSubQuestion = {
                subQuestion: line.substring(3).trim(),
                answers: []
            };
            isSubQuestion = true;
        } else if (line.startsWith('-')) {
            const answerText = line.substring(1).trim();
            const isCorrect = answerText.includes('(correct)');
            const answer = {
                answer: isCorrect ? answerText.replace('(correct)', '').trim() : answerText,
                isCorrect: isCorrect
            };
            if (isSubQuestion && currentSubQuestion) {
                currentSubQuestion.answers.push(answer);
            } else if (currentQuestion) {
                currentQuestion.answers.push(answer);
            }
        }
    });

    // Ensure the last sub-question of the last question is added
    if (currentSubQuestion && currentQuestion) {
        currentQuestion.subQuestions.push(currentSubQuestion);
    }

    // Ensure the last JSON object is added
    if (currentJson.bundleId !== null) {
        jsonArray.push(currentJson);
    }

    return JSON.stringify(jsonArray, null, 2);
}

const input = `
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
`;

const result = convertToJSON(input);
console.log(result);
