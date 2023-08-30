let inputValue = document.querySelector('#search');
let user;

const InputValyeHandler=()=>{
    user = inputValue.value;

    LoadUserInfo();
    LoadRepoList();

    user = ''
};


async function LoadUserInfo(){
    try{
    const res = await fetch(`https://api.github.com/users/${user}`)
    const data = await res.json();
    let Loading = document.querySelector('#Loading');
    Loading.style.display='inline';
        console.log(data);
    const userInfo=  
        `<div>
        <h1>${data.name}</h1>
        <img src="${data.avatar_url}" />
        <img src="https://ghchart.rshah.org/${data.name}"/>
        </div>`
    document.getElementById('userProfile').innerHTML = userInfo;

    }catch(error){
        console.error('유저 정보를 불러오는데 실패했습니다.',error)
    }finally{
         Loading.style.display='none';

    }
}
async function LoadGitLog(){
    try{
        const res = await fetch(`https://ghchart.rshah.org/${user}`);
        const data = res.json()
        console.log(data);
        const commitLog=  
        `<div>
        <img src=${data}/>
        </div>`
    document.getElementById('commitLog').innerHTML = commitLog;

    }catch(error){
        console.log('커밋 로그 정보를 불러오는데 실패했습니다.',error);
    }
}

async function LoadRepoList(){
    try{
        const res = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&direction=desc`);
        const data = await res.json(); 
        const repo=  data.slice(0,5).map((item)=>
        `<div>
            <h1><a href=${item.html_url} target="_blank">${item.name}</a></h1>
            <h2>${item.stargazers_count}</h2>
            <h2>${item.watchers_count}</h2>
            <h2>${item.fork?item.forks_count:undefined}</h2>
        </div>`
        ).join('')
        document.getElementById('repoList').innerHTML = repo;
    
    }catch(error){console.error('저장소 정보를 불러오는데 실패했습니다.',error)}
};