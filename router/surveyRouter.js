const Path = require("path-parser").default;
const { URL } = require("url");
const _ = require("lodash");
const onlyPrivate = require("../middlewares/onlyPrivate");
const requireCredit = require("../middlewares/requireCredit");
const mongoose = require("mongoose");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

// require 을 쓴다면 어떤 테스트프레임웤에서는 require model serveral times 에러가 날수있다.
// 근데 위튜브할때는 임포트를했는데..
const Survey = mongoose.model("surveys");

module.exports = async app => {
  app.get("/api/surveys/delete/:surveyId", onlyPrivate, async (req, res) => {
    const { surveyId } = req.params;
    await Survey.findOneAndDelete({ _id: surveyId });
    const surveys = await Survey.find({ user: req.user.id }).select({
      recipients: false
    });
    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    const { choice } = req.params;
    res.send(
      `Thank you for your voting ${choice}!  We appreciate your support! `
    );
  });

  app.get("/api/surveys", onlyPrivate, async (req, res) => {
    // recipients는 검색안하기
    const surveys = await Survey.find({ user: req.user.id }).select({
      recipients: false
    });
    res.send(surveys);
  });

  // sendgrid event notigication이 post방식으로 이주소로 우리한테보낸다! 30초에 한번씩
  // dev환경이라 고정 url이없는경우 localtunnel을 이용해 webhook을 받는다.
  // 같은이메일에 같은 서베이를 중복응답한건지 걸러낸다
  // event가 click인것을 걸러낸다.
  //  이런식으로 req.body안에 배열안에 객체들이 들어온다
  // { ip: '66.102.8.93',
  // sg_event_id: 'Io_P4WudTcWG_1DlBhF_hQ',
  // sg_message_id:
  //  '-g0qbWuYR0iCk0SajxsQ9A.filter0063p3las1-28819-5CCD8CBA-19.0',
  // useragent:
  //  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
  // event: 'click',
  // url_offset: { index: 1, type: 'html' },
  // email: 'briancjkim91@gmail.com',
  // timestamp: 1556974803,
  // url:
  //  'http://localhost:3000/api/surveys/5ccd8cb9ca2f78a0d4ea2f75/no' }

  app.post("/api/surveys/webhooks", (req, res) => {
    // sendgridapi dashboard에 로그인을 해야 볼수있다. 안된다면 로그인해봐라.

    const p = new Path("/api/surveys/:surveyId/:choice");
    const events = _.map(req.body, event => {
      // /api/surveys/5ccd8cb9ca2f78a0d4ea2f75/no 만골라내기
      const pathname = new URL(event.url).pathname;
      // p.test(pathname)은 { surveyId: '5cce3ea6c415438810e07b71', choice: 'yes' }를 리턴한다
      // p.test(pathname)은 null을 리턴할수도있기때문에 destrucutring 하지않는다.
      // test를 통하여, req.body안에 surveyId,choice가없는 아이들은 undefined가된다.
      const match = p.test(pathname);
      if (match) {
        return {
          email: event.email,
          surveyId: match.surveyId,
          choice: match.choice
        };
      }
    });
    // compact goes through all the element and removes undefined in the array
    const compactEvents = _.compact(events);

    // lodash goesthrough and check email '과' surveyId가 둘다 같은 오브젝트가 있는지 체크한다.
    const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");

    // updateOne은 조건에맞는거만 찾아서 update하고 exec()로 저장. 효율적인 db탐색
    // 첫번째 오브젝은 찾는아이 두번째오브젝은 어떻게할건지정하는거
    // recipients.$.$responded에서 $는 첫번째오브젝에서 찾은 그 recipient sub-document 인스턴스를 칭함
    _.each(uniqueEvents, ({ email, surveyId, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date()
        }
      ).exec();
    });

    // 위의 코드를 loadash의 chain 사용해서 줄일수있다.
    // const event = _.chain(req.body)
    //   .map(event => {
    //    ...
    //   })
    //   .compact()
    //   .uniqBy("email", "surveyId")
    //   .value();
    // console.log(event);

    // 아무것도 res하지않으면 sendgrid가 fail한줄알고 response 계속 보낸다.
    res.send({});
  });

  app.post("/api/surveys", onlyPrivate, requireCredit, async (req, res) => {
    const { title, subject, body, recipients, from } = req.body;
    // recipients 는 [a@a.com, b@b.com,c@c.com] 식의 string array 인데 recipients schme 에 맞게 변형해줘야한다.
    const survey = new Survey({
      title,
      subject,
      body,
      // email은 코마와 스페이스 로 분리되서 보내어지는데 코마를제거하고 스페이스를 제거하기위해 trim()사용!
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      user: req.user.id,
      dataSent: Date.now()
    });
    // 이메일 보내기
    // 1st 오브젝은 subject,recipients가 필요하고 2번째오브젝은 함수인데 콘텐트 를 리턴함
    const mailer = new Mailer(survey, surveyTemplate(survey), from);
    try {
      //send 는 비동기함수니까
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      // 최신 유저를 저장한결과.
      const user = await req.user.save();
      res.send(user);
    } catch (error) {
      res.status(422).send(err);
    }
  });
};
