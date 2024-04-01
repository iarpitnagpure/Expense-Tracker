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

export { loginMutation, signUpMutation, logoutMutation };