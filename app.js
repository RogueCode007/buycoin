//Grab the query string in the search bar and save in an empty object
let queryDict = {}
location.search.substr(1).split("&").forEach(function(item) {
    queryDict[item.split("=")[0]] = item.split("=")[1]
})

// Build the GraphQL query and insert the entered username
let query = `query{
  user(login: "${queryDict.username}") {
    name
    avatarUrl
    login
    bio
  },
  repositoryOwner(login: "${queryDict.username}") {
    repositories(last: 20) {
      edges {
        node {
          name
          description
          forkCount
          stargazerCount
          updatedAt
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
}`

//Call this function 
grabGitHubData(query)

//Set loading state to be true
let loading = true


//Grab data and asssign it to an empty object called githubdata
let githubData = {user:{}, repositoryOwner:{}}
async function grabGitHubData(query){
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer   ${atob('OWY4ZGU0ZjU0ZGIyOWY5NjZjY2QwODhmZjY5YWM3MzhmZWNkNDNiOQ==')}`},
      body: JSON.stringify({ query: query }),
    })
    const body = await response.json()
    let data =   body.data;
    
    //Handle error if user doesn't exist
    if (data.user.name == null){
      alert('User does not exist');
      location.href="index.html"
    }

    //Fill data in where necessary
    document.getElementsByClassName('owner')[0].innerText = data.user.name
    let username = document.getElementsByClassName('username')
    for(let i =0; i < username.length; i++){
      username[i].innerText = data.user.login
    }
    document.getElementById('dropdownImg').src = data.user.avatarUrl;
    document.getElementById('navImg').src = data.user.avatarUrl;
    document.getElementById('userAvatar').src = data.user.avatarUrl;
    document.getElementById('role').innerText = data.user.bio;
    document.getElementById('repototal').innerText = data.repositoryOwner.repositories.edges.length;
    let edges = data.repositoryOwner.repositories.edges;

    // Iterate through edges array to grab individual repository information
    for(let i = edges.length-1; i >= 0; i--){

      // Create the following elements for each repository and set class attributes for styling 
      let div1 = document.createElement('div');
      div1.setAttribute('class', 'repo');

      let div2 = document.createElement('div');
      div2.setAttribute('class', 'wrapper')

      let link = document.createElement('a')
      link.setAttribute('class', 'repo-name');

      let p1 = document.createElement('p')
      p1.setAttribute('class', 'description');

      let div3 = document.createElement('div');
      div3.setAttribute('class', 'repofooter');

      let div4 = document.createElement('div');
      div4.setAttribute('class', 'langcolor');

      let span1 = document.createElement('span');
      span1.setAttribute('class', 'color')

      let span2 = document.createElement('span');
      span2.setAttribute('class', 'lang');
      
      let span4 = document.createElement('span');
      span4.setAttribute('class', 'star');
      let icon1 = document.createElement('i')
      icon1.setAttribute('class', 'fa');
      icon1.classList.add('fa-star-o');
      span4.appendChild(icon1);
      let text1 = document.createTextNode(edges[i].node.stargazerCount)
      span4.appendChild(text1)

      let span5 = document.createElement('span');
      span5.setAttribute('class', 'fork');
      let icon2 = document.createElement('i')
      icon2.setAttribute('class', 'fa');
      icon2.classList.add('fa-code-fork');
      span5.appendChild(icon2);
      let text2 = document.createTextNode(edges[i].node.forkCount)
      span5.appendChild(text2)

      let p2 = document.createElement('p');
      p2.setAttribute('class', 'updated');

      let button = document.createElement('button');
      let span3 = document.createElement('span');
      let icon3 = document.createElement('i')
      icon3.setAttribute('class', 'fa');
      icon3.classList.add('fa-star-o');
      span3.appendChild(icon3);
      button.appendChild(span3);
      let text = document.createTextNode('Star')
      button.appendChild(text);

      let time = new Date(Date.parse(data.repositoryOwner.repositories.edges[i].node.updatedAt));
      let month = time.toLocaleString("en-US", {month: 'short'});
      let day = time.toLocaleString('en-US', {day: "numeric"});
      p2.innerText = "Updated on " + month +" "+ day;
      if(edges[i].node.primaryLanguage){
        span1.style.backgroundColor = edges[i].node.primaryLanguage.color;
        span2.innerText = edges[i].node.primaryLanguage.name;
        div4.appendChild(span1);
        div4.appendChild(span2);
      }else{
        span2.innerText = '';
      } 

      // Append the created elements
      div4.appendChild(span4);
      div4.appendChild(span5);
      div3.appendChild(div4);

      div3.appendChild(p2);
      p1.innerText = edges[i].node.description;
      link.innerText = edges[i].node.name;
      div2.appendChild(link);
      div2.appendChild(p1);
      div2.appendChild(div3);
      div1.appendChild(div2);
      div1.appendChild(button);
      document.getElementsByClassName('repositories')[0].appendChild(div1)

      // End Loading
      loading = false 
      document.getElementById('load').style.display = 'none'
    }
  }
  catch(err){
    alert('User does not exist');
    location.href="index.html"
  }
}



//NavBar and Dropdown menus toggle scripts
let mobileNav = document.getElementById('mobile-nav')
let bar = document.getElementById("bar");
let icons1 = document.getElementById('icons1');
let dropdown1 = document.getElementById('content-1')
let icons2 = document.getElementById('icons2');
let dropdown2 = document.getElementById('content-2')


function toggleMenu (param){
  if(param.classList.contains('hide')){
    param.classList.remove('hide');
    param.classList.add('visible');
  }else{
    param.classList.remove('visible') ;
    param.classList.add('hide');
  }
}; 

bar.addEventListener('click', function(){
  toggleMenu(mobileNav)
});
icons1.addEventListener('click', function(){
  toggleMenu(dropdown1)
});
icons2.addEventListener('click', function(){
  toggleMenu(dropdown2)
})

