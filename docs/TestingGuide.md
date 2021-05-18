---
layout: default
title: Testing Guide
nav-text: Testing Guide
---

## **Useful links**
- [Timeline](Timeline)
- [Testing guide](TestingGuide)
- [Developer guide](DeveloperGuide)
- [User guide](UserGuide)
- [Configuration guide](ConfigurationGuide)
- [DevOps guide](DevOpsGuide)
- [Workflow guide](WorkflowGuide)

* Table of Contents 
{:toc}

## **Setup Guide**

After running `yarn install`, you should be ready to start testing as all the required dependencies are installed.

## **Unit Test**
We use Jest and React testing library to perform unit tests. We aimed to include unit tests at the early stage to ensure low
level logics are well tested. To run tests, type in `yarn test`.

## **End to End Test**
We use Cypress to perform end user testing and validation of user interface. Understand that UI changes can be more frequent
and therefore hard to main, we have decided to include E2E tests in the later stage. To use Cypress for test development, start
with `npx cypress open` to open up the desktop client of Cypress. Click on one of the written test to run it in the test browser.
Any changes saved on the currently running test file will trigger a rerun of the test. You can also run `npx cypress run` to run 
all tests headlessly.

