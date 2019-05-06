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

## backend 에서 User/ Survey model 이잇는데 User에는 survey를 어트리뷰트로 두지않을거다

survey각각 mongoDB에서는 도큐먼트(인스턴스)하나당 4mb라는 제한이있는데
'rlackswhd91@hotmail.com' 가 20bytes 가넘는다. 즉 2000,000 개의 이메일을 서베이인스턴스가 저장할수있는데
유저하나가 이러한 서베이 여러개를 가지게된다면 4mb는 금방초과하고 survey에 더이상 recipient내용을 추가할수없는 버그가발생한다.
그래서 User에는 survey를 어트리뷰트로 두지않을거다.

## 유저가 이메일에서 온 피드백에 true/false클릭을하면 sengrid가 그것을 30초마다 모아서 우리 server로보내는데 dev환경에서는 문제다

webhook을 우리서버에 연결을할건데
dev환경에서는 url이 localhost인데 이것은 기기마다 있는 주소이므로 의미가없다 그래서, localtunnel이라는것을 사용해서 특정주소로 오면
우리서버로 연결되도록 한다.
