# Apdex Board - Code challenge

It's just another test...

We want to build a new page view that shows the list of applications running on every host. You are asked to build a new feature to display the most satisfying applications deployed on each host.

### Key restrictions

- Do not use frameworks / libraries such as React, Angular, etc.
- Browser support: IE11+, latest 2 versions of Chrome, Firefox, Safari, Opera.

### Demo

![](apex-board.gif)

Click on the following link (Github page project):

https://christianjtr.github.io/apdex-board-code-challenge

### Installation and running the project

The project requires [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/) to run.

Clone the repository:

```shell
git clone https://github.com/christianjtr/apdex-board-code-challenge.git
```

Install the dependencies and devDependencies, next start the server:

```sh
$ npm install
$ npm run start
```

Then, access to this address:

```sh
http://localhost:8080
```

[Link to the project at your local environment](http://localhost:8080/).

### Build

To build the project run this command (Development or Production):

```sh
$ npm run build:dev
$ npm run build:prod
```

### Comments

First off, It is just a test, so I tried to implement a kind of pseudo-solution by using web components.

### Technologies

Vanilla JS + TypeScript v3.9, Webpack v4, Styling (BEM like by using Flexbox, CSS Grid, mediaQueries).
