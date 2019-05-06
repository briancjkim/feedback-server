const keys = require("../../config/keys");
// 저링크를 sendgrid가 지네 링크로 바꿔버림!
module.exports = survey => {
  return `
  <html>
    <body>
      <div style="text-align:center;">
        <h3>I'd like your input!</h3>
        <p>Please answer the following question</p>
        <p>${survey.body}</p>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
        </div>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
        </div>
      </div>
    </body>
  </html>`;
};
