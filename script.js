let inputValue = document.querySelector('#search');
let user;

const InputValyeHandler=()=>{
    user = inputValue.value;

    LoadUserInfo();
    LoadRepoList();
};

console.log(user);

async function LoadUserInfo(){
    try{
    const res = await fetch(`https://api.github.com/users/${user}`)
    const data = await res.json();

    const userInfo=  
        `<div>
        <h1>${data.name}</h1>
        <img src=${data.avatar_url} />
        </div>`
    document.getElementById('userProfile').innerHTML = userInfo;
    
    }catch(error){
        console.error('유저 정보를 불러오는데 실패했습니다.',error)
    }
}

async function LoadRepoList(){
    try{
        const res = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&direction=desc`);
        const data = await res.json(); 
        console.log(data);
        const repo=  data.slice(0,5).map((item)=>
        `<div>
            <h1 href=${item.html_url}}>link</h1>
            <h1>${item.name}</h1>
            <h2>${item.stargazers_count}</h2>
            <h2>${item.watchers_count}</h2>
            <h2>${item.fork?item.forks_count:undefined}</h2>
        </div>`
        ).join('')
        document.getElementById('repoList').innerHTML = repo;
    
    }catch(error){console.error('저장소 정보를 불러오는데 실패했습니다.',error)}
};