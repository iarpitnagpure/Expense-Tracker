const { gql } = require("graphql-request");

const loginMutation = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            _id,
            name
        }
}`;


export { loginMutation };