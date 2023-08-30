let inputValue = document.querySelector('#search');
let user;
let repo;
let userInfo;
const InputValyeHandler=()=>{
    user = inputValue.value;
    console.log(user)
    if(user!==""){
        LoadUserInfo();
        LoadRepoList();
    }
    
};


async function LoadUserInfo(){
    try{
    const res = await fetch(`https://api.github.com/users/${user}`)
    const data = await res.json();
    let Loading = document.querySelector('#Loading');
    Loading.style.display='inline';
    userProfile.style.display='flex';
    repoList.style.display='flex';
    console.log(data);
    userInfo=  
        `
        <div>
        <h1>${data.name}</h1>
        <a href=${data.html_url} target="_blank">
        <img  id="userAvatar"src="${data.avatar_url}" />
        </a>
        </div>
        <div>
        <h2>repos: ${data.public_repos}</h2>
        <h2>company:${data.company}</h2>
        <h2>following: ${data.following}</h2>
        <h2>followers: ${data.followers}</h2>
        </div>
        <img id="userGitLog" src="https://ghchart.rshah.org/${data.name}/"/>
        `
    document.getElementById('userProfile').innerHTML = userInfo;

    }catch(error){
        user = '';
        console.error('유저 정보를 불러오는데 실패했습니다.',error)
    }finally{
         Loading.style.display='none';

    }
}


async function LoadRepoList(){
    if(user!==''){
    try{
        const res = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&direction=desc`);
        const data = await res.json(); 
        repo=  data.map((item)=>
        `<div id="repoCard">
            <h1 id='cardTitle'><a id='cardTitle' href=${item.html_url} target="_blank">${item.name}</a></h1>
            <div id="repoInfo">
            <h2>${item.language}</h2>
            <h2>${item.updated_at}</h2>
            <h2>stars: ${item.stargazers_count}</h2>
            <h2>watchers: ${item.watchers_count}</h2>
            <h2>forks: ${item.fork?item.forks_count:undefined}</h2>
            </div>
        </div>`
        ).join('')
        document.getElementById('repoList').innerHTML = repo;
    
    }catch(error){
        user='';
        repo = '';
        console.error('저장소 정보를 불러오는데 실패했습니다.',error)}}
};