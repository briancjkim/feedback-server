const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

// Mail class를 상속하면서 많은 함수들을쓸수있따.
module.exports = class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content, from) {
    super();
    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email(from);
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    // 이메일안에 링크를 찾아서 주소를unique하게만들고
    // 링크에 response를 추적해서 다른api로 알려준다결과를.
    this.addClickTracking();
    this.addRecipients();
  }
  // [{email1,responded:false},{email2:responded:false},{email3:responded:false}...]
  // 를 [eamil1,eamil2,...]형식으로 대신 new helper.email 포맷을 맞춰서.
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }
};
