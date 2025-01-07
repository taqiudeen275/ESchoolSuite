 example data for `GradingScale`, `GradeComponent`, and `Score` that demonstrates how these models work together to represent the grading system.

Here are some examples:

**1. `GradingScale` Examples:**

**a) BECE (JHS):**

```json
{
    "id": 1,
    "name": "BECE",
    "level": "JHS",
    "grades": {
        "1": "Excellent",
        "2": "Very Good",
        "3": "Good",
        "4": "Credit",
        "5": "Credit",
        "6": "Credit",
        "7": "Pass",
        "8": "Pass",
        "9": "Fail"
    },
    "is_active": true
}
```

**b) WASSCE (SHS):**

```json
{
    "id": 2,
    "name": "WASSCE",
    "level": "SHS",
    "grades": {
        "A1": "Excellent",
        "B2": "Very Good",
        "B3": "Good",
        "C4": "Credit",
        "C5": "Credit",
        "C6": "Credit",
        "D7": "Pass",
        "E8": "Pass",
        "F9": "Fail"
    },
    "is_active": true
}
```

**c) University of Ghana - 4.0 Scale:**

```json
{
    "id": 3,
    "name": "University of Ghana - 4.0 Scale",
    "level": "UNIVERSITY",
    "grades": {
        "4.0": "A",
        "3.7": "A-",
        "3.3": "B+",
        "3.0": "B",
        "2.7": "B-",
        "2.3": "C+",
        "2.0": "C",
        "1.7": "C-",
        "1.3": "D+",
        "1.0": "D",
        "0.0": "F"
    },
    "is_active": true
}
```

**d) Sample Primary School Grading:**

```json
{
    "id": 4,
    "name": "Primary School Grading",
    "level": "PRIMARY",
    "grades": {
        "A": "Excellent (80-100)",
        "B": "Very Good (70-79)",
        "C": "Good (60-69)",
        "D": "Pass (50-59)",
        "E": "Fair (40-49)",
        "F": "Fail (Below 40)"
    },
    "is_active": true
}
```

**2. `GradeComponent` Examples (for a University Course):**

**a) Quiz 1 (Course: Introduction to Programming, Level: UNIVERSITY):**

```json
{
    "id": 1,
    "name": "Quiz 1",
    "course": 1,  // Assuming Course ID 1 is "Introduction to Programming"
    "component_type": "QUIZ",
    "max_score": 20,
    "weight": 5,
    "grading_scale": 3  // University of Ghana - 4.0 Scale
}
```

**b) Mid-Semester Exam (Course: Introduction to Programming, Level: UNIVERSITY):**

```json
{
    "id": 2,
    "name": "Mid-Semester Exam",
    "course": 1,
    "component_type": "MIDSEM",
    "max_score": 40,
    "weight": 15,
    "grading_scale": 3
}
```

**c) Final Exam (Course: Introduction to Programming, Level: UNIVERSITY):**

```json
{
    "id": 3,
    "name": "Final Exam",
    "course": 1,
    "component_type": "EXAM",
    "max_score": 100,
    "weight": 70,
    "grading_scale": 3
}
```

**3. `Score` Examples (for the above `GradeComponent` instances):**

**a) Student John Doe (Student ID: 10) - Quiz 1:**

```json
{
    "id": 1,
    "student": 10,
    "component": 1,  // Quiz 1
    "score": 18.0,
    "date": "2024-03-15"
}
```

**b) Student John Doe (Student ID: 10) - Mid-Semester Exam:**

```json
{
    "id": 2,
    "student": 10,
    "component": 2,  // Mid-Semester Exam
    "score": 35.0,
    "date": "2024-04-20"
}
```

**c) Student John Doe (Student ID: 10) - Final Exam:**

```json
{
    "id": 3,
    "student": 10,
    "component": 3,  // Final Exam
    "score": 80.0,
    "date": "2024-06-28"
}
```

**4. Calculated `Grade` Example (for John Doe in Introduction to Programming):**

*   **CA:** (18.0 \* 0.05) + (35.0 \* 0.15) = 6.15 (assuming no assignment is given for now)
*   **Exam:** 80.0 \* 0.70 = 56
*   **Final Grade:** 6.15 + 56 = 62.15
*   **Letter Grade:** C (based on the "University of Ghana - 4.0 Scale")

```json
{
    "id": 1,
    "student": 10,
    "course": 1,
    "grading_scale": 3,
    "final_grade": 62.15,
    "letter_grade": "C",
    "date": "2024-06-28"
}
```

**Explanation:**

*   The `GradingScale` examples show how different grading systems can be defined, including their associated letter grades or numerical ranges.
*   The `GradeComponent` examples illustrate how different assessment components are defined for a specific course, including their type, maximum score, and weight.
*   The `Score` examples demonstrate how individual student scores are recorded for specific components.
*   The `Grade` example shows the calculated final grade and the corresponding letter grade based on the defined grading scale.

