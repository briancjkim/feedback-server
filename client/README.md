## client server api server 같은 폴더안에 넣은 이유는

deploy했을때 같은 url속에 넣어짐 문제는 dev 단계인데
proxy를 사용하여 localhost:3000에서 요청을 target:"localhost:5000"으로 맞춰서 보내줄수있음

## client server api server 분리해놓은 구조와 다른점은

deploy 했을때 서버따로 클라이언트 따로 deploy를 해야하고
클라이언트에서 쿠키가 url이 다른 localhost5000으로 갈때 쿠키가 지워지는 웹브라우저보호현상이 일어나고
두 url이 이다른데 한쪽에서 요청이들어오면 cors 가 발생하기때문에
헤더에 쿠키를 넣어 요청할때마다 보내는 설정과 cors 를 없애는 미들웨어가 필요하다.

어떤 구조를 따르는지는 문제가없음

## backend 에서는 commonJS moudle 쓰고 frontend 에서는 es2015모듈을 쓴다

## Reducer의 구조

store가필요하다 react-redux 에서 createStore,applyMiddleware을 불러오고
const store = creteStore(()=>[],{},applyMiddleware()) 형식인데
1번째 인자는 reducers,
2번째 인자는 serverside rendering할때씀으로 생략가능
3번째 인자는 middleware를 thunk같은거 사용하기떄문에 호출. 이거말고도 다른 미들웨어를 써야하면 compose 쓰면돔
index.js 파일에서 Provider의 store어트리뷰트에 설정한 store을 넣어준다

## React Router 에서 Switch를 쓰는이유

Route 에다가 exact만 잘쓰면 여러컴포넌트가 동시에 나올 일은 없다 하지만
Redirect 를 쓰는경우에는 Switch를 쓰지않으면 에러가 난다

## Create-React-app 안에는 webpack 이 들어있다

이번 프로젝트에서는 materializecss를 npm으로 설치한방식으로 진행.
webpack 이 설치되어있어서 자동으로 실행해주고
index.js에서 css파일을 불러들어오면 자동으로 읽어줌.
