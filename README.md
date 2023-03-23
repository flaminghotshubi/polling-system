# polling-system
API based polling system

An API based application where anyone can create questions with options and also add votes to it.

## Installation

Use npm to install express and mongoose. Configure the host and port in the index.js file. The folder structure is scalable (separate models, controllers and routes).

## Usage
Following are the functionalities:
- Create a question 
- Add options to a question
- Add a vote to an option of question
- Delete a question → (A question can’t be deleted if one of it’s options has votes)
- Delete an option → (An option can’t be deleted if it has even one vote given to it)
- View a question with its options and all the votes given to it

## API Details
- /questions/create (To create a question)
- /questions/:id/options/create (To add options to a specific question)
- /questions/:id/delete (To delete a question)
- /options/:id/delete (To delete an option)
- /options/:id/add_vote (To increment the count of votes)
- /questions/:id (To view a question and it’s options)
