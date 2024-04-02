const { gql } = require("graphql-request");

const loginMutation = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            _id,
            name
        }
}`;

const signUpMutation = gql`
    mutation Mutation($username: String!, $name: String!, $password: String!, $gender: String!) {
        signup(username: $username, name: $name, password: $password, gender: $gender) {
            _id,
            name,
        }
}`;

const logoutMutation = gql`
   mutation Mutation {
        logout {
            isUserLoggedOut
        }  
}`;

const getAllTransactionMutation = gql`
    query Query {
      transactions {
        _id,
        amount,
        category,
        date,
        description
      }
}`;

const addTransactionMutation = gql`
    mutation Mutation($description: String!, $paymentType: String!, $category: String!, $amount: Float!, $date: String!) {
        addTransaction(description: $description, paymentType: $paymentType, category: $category, amount: $amount, date: $date) {
            _id,
            amount,
            category,
            date,
            description
      }
}`

export { loginMutation, signUpMutation, logoutMutation, getAllTransactionMutation, addTransactionMutation };