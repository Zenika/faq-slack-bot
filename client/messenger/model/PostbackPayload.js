function PostbackPayload(context, action, providerUrl, providerName) {
  return JSON.stringify({
    context: context,
    action: action,
    providerUrl,
    providerName
  });
}

module.exports = PostbackPayload;
