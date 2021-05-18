---
layout: default
title: DevOps Guide
description: Find out how to deploy the project
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

## **CI**

We use Github Actions to run tests for each PR.

## **CD**

We host our front end on Vercel, which has excellent support for Next.js applications.
Due to resources constraints, following is the steps to deploy our application:
- Merge PR to branch `main` on notawakestudio/NUSConnect Organization Github
- Fetch remote in the fork `main` on tlylt/NUSConnect to sync the changes
- Trigger redeployment on Vercel
- Website should be live in a few minutes at [NUS Connect](https://nus-connect.vercel.app/)