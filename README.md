## Github Finder
---
다음 rest api를 사용했다.

- 깃허브 유저 정보 가져오기 https://api.github.com/users/user_id

- 깃허브 커밋 로그 가져오기 https://ghchart.rshah.org/user_id

- 깃허브 레포 정보 가져오기 https://api.github.com/users/user_id/repos?sort=updated&direction=desc

외부 라이브러리를 안쓰고 바닐라 js로 결과물을 만드는 것을 목표로 하였고,

처음에는 레포정보를 최근 5개만 가져왔는데, 뭔가 허전한거 같아서 스크롤을 넣어서 저장된 레포를 다 사용자가 볼 수 있게 만들었다.

외부 api를 가져오기 때문에 비동기 통신을 하기위해서 async/await 을 사용했다.