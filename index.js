// let submit = document.getElementById('form-btn')

// submit.addEventListener('click', function(){
//  userInput = document.getElementById('username').value

//   //GraphQl query
//   let query = `query{
//     user(login: "${userInput}") {
//       name
//       avatarUrl
//       login
//       bio
//     },
//     repositoryOwner(login: "${userInput}") {
//       repositories(last: 20) {
//         edges {
//           node {
//             name
//             description
//             forkCount
//             stargazerCount
//             updatedAt
//             primaryLanguage {
//               name
//               color
//             }
//           }
//         }
//       }
//     }
//   }`
//   grabGitHubData(query)
// })
