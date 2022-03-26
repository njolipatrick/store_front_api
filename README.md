[![Maintainability](https://api.codeclimate.com/v1/badges/b688742eac0ce874e8cb/maintainability)](https://codeclimate.com/github/ludralph/PostIt-Raphael-Etim/maintainability)
[![Build Status](https://travis-ci.org/ludralph/PostIt-Raphael-Etim.svg?branch=develop)](https://travis-ci.org/ludralph/PostIt-Raphael-Etim)
[![Coverage Status](https://coveralls.io/repos/github/ludralph/PostIt-Raphael-Etim/badge.svg)](https://coveralls.io/github/ludralph/PostIt-Raphael-Etim)

# Store Front API

## Introduction

Store Front is a simple API that autheticate store users to be able to shop varities of products and make an order

## API Documentation

The documentation for the Postit API can be found here [Store Front API Docs](https://ogmaro.github.io/slate/)

## Features

Based on API Endpoints requirement, the features covered for the endpoints are:

Products

- Index
- Show
- Create [token required]
- Top 5 most popular products
- Products by category (args: product category)

Users

- Index [token required]
- Show [token required]
- Create

Orders

- Current Order by user (args: user id)[token required]
- Completed Orders by user (args: user id)[token required]

## Dependencies

To install Postit, you will need the following:

- Node
- PostgreSQL
- db-migrate
- Other dependencies required are listed in the package.json file. Use `npm install` on the command line
- Environment variables are defined in a .env file. You can find a .example.env file in the repository root to guide you on setting up your .env file.

## Installation

The steps outline will provide a walkthrough on how to install the app on your local machine

- Clone this repository
- From the terminal, change directory to store_front_api app folder
- Ensure that you are on the **develop** branch. If on any other branch, run `git checkout develop` on the terminal.
- Run `npm install` from your terminal in your project directory to install all dependencies
- Then run the app with the command `npm start`

## Usage

To test out the endpoints, follow the following steps

- Once all dependencies have beeen installed, run `npm start` on your terminal to test the endpoints
  The app link for the hosted app on heroku is "https://storefront_api.herokuapp.com/#/".

## Limitations

- Currently, authenticated users can only create a product but cannot delete but cannot delete a product created.
- Users make order and can stop order.
- Owner can create, view, edit and delete products messages by users are not being archived.
- Real-time in-app notification for message posted to a group was not handled.

## Frequently Asked Questions

- What is postIt app all about?
  postIt app is a simple application that allows friends and colleagues create groups for notifications purpose. With this app, members in a group can interact with each other by posting their messages in the group.
- What are the steps on how to use the app?
  First, Sign up by creating a new account
  Once account is created, proceed to create a group and add your prefered users to the group you created
  Then you can post message to the group you created for all members of the group.

## How to contribute

Contributions are welcome and appreciated

- Fork this repository
- Open a terminal and execute the following command to make a local copy $ `git clone git@github.com:ogmaro/store_front_api.git`
- Run `cd store_front_api` to navigate into the folder
- Make your contributions to your local repo
- Add a connection to the original repo using $ `git remote add repo_nickname git@github.com:ogmaro/store_front_api.git`. Note: repo_nickname is a nickname you choose
- Run git $ `remote -v` to verify that the connection is established
- Make your contributions to your local copy of the project
- Run $ `git add filename`, `git commit -m "commit message"` to add and commit your contributions
- Run $ `git push origin proposed-feature-name` to push your changes to your copy of the repository
- If you feel you've made a contribution that will improve the project, raise a Pull Request against develop branch.
- Be descriptive enough about your contributions so other contributors will understand what you've done

Pull Requests should:

- Contain code written in ES6 for Javascript files.
- Lint and adhere to the [Airbnb javascript style guide](https://github.com/airbnb/javascript).
- Ensure test cases are written for the feature being developed

## License

This project is available for use and modification under the ISC License. See the LICENSE file for more details.

## Contributor

- Njoli Patrick
