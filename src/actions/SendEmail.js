export default function sendMail(email) {
  const SENDEMAIL = 'SEND_EMAIL';
  const actionToken = { type: SENDEMAIL, email };
  return actionToken;
}
