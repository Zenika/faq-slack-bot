function PostbackPayload(context, action) {
  return JSON.stringify({
    context: context,
    action: action
  });
}

module.exports = PostbackPayload;
