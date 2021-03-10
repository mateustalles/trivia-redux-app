export default function SendEmail(name) {
  const SENDNAME = 'SEND_NAME';
  const actionToken = { type: SENDNAME, name };
  return actionToken;
}
