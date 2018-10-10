function PostbackPayload(context, action, data) {
  return JSON.stringify({
    context: context,
    action: action,
    data: data
  });
}

module.exports = PostbackPayload;
