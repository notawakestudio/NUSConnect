---
layout: default
title: Developer Guide
description: Find out the technical details behind the project
---

## **Useful links**
- [Timeline](Timeline)
- [Testing guide](TestingGuide)
- [Developer guide](DeveloperGuide)
- [User guide](UserGuide)
- [Configuration guide](ConfigurationGuide)
- [DevOps guide](DevOpsGuide)
- [Workflow guide](WorkflowGuide)

## **Table Of Content**

* Table of Contents 
{:toc}

## **Introduction**

Frustrated with the lack of material and information available from previous semesters and the lack of functionality in the official learning management system LumiNUS, we set out to design a system where students can learn their module content in a more engaging way.

With our background as teaching assistants for the module CS2030(Programming methodology II), we have a burning desire to help our students strive for perfection. We know that learning takes time and continuous effort, but making the process of learning fun and enjoyable will greatly improve students’ performance. 

We hope that our project becomes a source of external motivating factors that nudge students to learn the materials by heart. We want students to feel good doing assignments, and be rewarded with virtual points and record their attempts for further analysis. We also want students to try alternative ways of learning, via questions and answers in a forum, via quizzes that are self generated or created by the TAs, and via consolidating their learning into articles to be shared with other module students in the wiki.

---
## **Tech Stack**
### Front end
- Nextjs
- TypeScript
- Tailwind CSS

### Back end
- firebase
- Deta base
- fastAPI

### Test 
- Jest
- React testing library

---
## **Timeline, testing, configuration, dev-ops, workflow**

- [Timeline](Timeline)
- [Testing guide](TestingGuide)
- [Configuration guide](ConfigurationGuide)
- [DevOps guide](DevOpsGuide)
- [Workflow guide](WorkflowGuide)

---

## **Product Scope**

### **Target user profile**
- perfers viewing the website on both mobile and laptop environment
- taking or planning to take a supported module
- requires help with learning activities
- looking for ways to interact and learn from peers from the same module
- wants to have a all-in-one place to check out all related materials
- is keen to help others learning the same module

### **Value proposition**
- provide powerful features to enhance learning experience and effectiveness
- user centric and tailored to learners of respective modules
- intuitive UI and smooth navigation between pages
- easy to get started with comprehensive supporting documentations
- mobile first and responsive

---

## **User Stories**

Priorities: 
- High (must have): `* * *`
- Medium (nice to have): `* *`
- Low (unlikely to have):`*`

| Priority | As a …​  | I want to …​                                       | So that I can…​                                  |
|----------|---------|---------------------------------------------------|-------------------------------------------------|
| `* * *`  | student | track my progress throughout the semester         | meet my module requirements                     |
| `* * *`  | student | visualize my progress | be motivated to work towards completing required tasks        |
| `* * *`  | student | have a clear view of weekly tasks to be completed | tell what is to be done and what is left        |
| `* * *`  | student | have a level bar to judge my progress | feel like I’m improving as the weeks go by        |
| `* * *`  | student | post my opinions on the forum anonymously | stop feeling embarrassed to ask “dumb” questions        |
| `* * *`  | student | upvote or like forum posts that are interesting | help make them receive more attention             |
| `* * *`  | student | view my upvoted forum posts | easily find and refer to them later      |
| `* * *`  | student | tag my posts | have an easier time finding and classifying them        |
| `* * *`  | student | chat with my fellow module mates via forum Q&A | learn from others who are also taking the module          |
| `* * *`  | student | do past year quizzes | get a better understanding of the module        |
| `* * *`  | student | be able to make my own quizzes | share my knowledge with other students and help them learn                |
| `* * *`  | student | upvote and like quizzes | receive more attention                     |
| `* * *`  | student | view my upvoted quizzes | easily find and refer to them later        |
| `* * *`  | student | join telegram groups that are related to the mod         | view discussions and ask questions              |
| `* * *`  | student | have all relevant information about a module within a single webpage         | immediately navigate to it  |
| `* * *`  | student | contribute online resources that I found to related to module topics         | let others benefit from them|
| `* * *`  | student | write guides and articles         | let them serve as references to myself and my fellow module students   |
| `* * *`  | student | gamify the process of learning         | make doing module related work more fun                           |
| `* * *`  | student | contribute to the success of the module         | future students taking this module can learn better      |
| `* *`    | teaching staff | be able to monitor the progress of my students         | meet my module requirements                |
| `* *`    | teaching staff | create quizzes for students to attempt         | test easily misunderstood concepts                 |
| `* *`    | teaching staff | provide feedback to students for their attempted exercises         | clarify any doubts on the spot |


## **Quiz**

```javaScript
//question
{
    "id": 
    "modules": ["CS2030", "CS2030S"], // for cases of variants
    "type": "MRQ", // MCQ, MRQ
    "difficulty": "easy", // easy, medium, hard
    "question": "What are valid format specifiers for the String.format() method?",
    "correct_answers": ["%f", "%d","%s"], // consider cases of MRQ
    "incorrect_answers": ["%w","%z","%q"],
    "author":"",
    "isDraft":boolean,
    // consider adding more properties such as tags, isSeries etc
}
```
- User starts a quiz
- User sees a question
- User clicks on options, which will be saved
- When user click on submit at the end
- Show score and update XP
- User to redo quizzes
```javaScript
//quiz
{
    "name": "quiz1",
    "questions":[],
    "description":"",
    "tags":[],
    "author":""
}
```


## **Forum**

```javascript

{
    "id": 
    "modules": ["CS2030", "CS2030S"], // for cases of variants
    "type": "MRQ", // MCQ, MRQ
    "difficulty": "easy", // easy, medium, hard
    "question": "What are valid format specifiers for the String.format() method?",
    "correct_answers": ["%f", "%d","%s"], // consider cases of MRQ
    "incorrect_answers": ["%w","%z","%q"],
    "author":"",
    "isDraft":boolean,
    // consider adding more properties such as tags, isSeries etc
}
```

```javascript

{
    "id": 1,
    "title": "There's a new DEV theme in town for all you 10x hackers out there (plus one actually useful new feature)",
    "description": "There's a new DEV theme in town for all you 10x hackers out there (plus one actually useful new feature)",
    "tags": "meta, changelog, css, ux",
    "slug": "there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk",
    "path": "/devteam/there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk",
    "url": "https://dev.to/devteam/there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk",
    "canonical_url": "https://dev.to/devteam/there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk",
    "comments_count": 37,
    "positive_reactions_count": 12,
    "created_at": "2019-10-24T13:41:29Z",
    "edited_at": "2019-10-24T13:56:35Z",
    "published_at": "2019-10-24T13:52:17Z",
    "last_comment_at": "2019-10-25T08:12:43Z",
    "user": {
        "name": "Ben Halpern",
        "username": "ben",
        "twitter_username": "bendhalpern",
        "github_username": "benhalpern",
        "website_url": "http://benhalpern.com",
        "profile_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--Y1sq1tFG--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/1/f451a206-11c8-4e3d-8936-143d0a7e65bb.png",
        "profile_image_90": "https://res.cloudinary.com/practicaldev/image/fetch/s--DcW51A6v--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/1/f451a206-11c8-4e3d-8936-143d0a7e65bb.png"
    }
}

```