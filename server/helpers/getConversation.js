const { ConversationModel } = require("../model/ConversationModel");

const getConversation = async (currentUserId) => {
  if (currentUserId) {
    const currentUserConversation = await ConversationModel.find({
      $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    })
      .sort({ updateAt: -1 })
      .populate("messages")
      .populate("sender")
      .populate("receiver");

    const conversation = currentUserConversation.map((conv) => {
      const countUnseenMsg = conv.messages.reduce((prev, curr) => {
        // Chuyển đổi các giá trị ID sang string để so sánh chính xác
        const msgByUserId = curr.msgByUserId?.toString();
        const userIdStr = currentUserId.toString();

        if (msgByUserId !== userIdStr && !curr?.seen) {
          return prev + 1;
        }
        return prev;
      }, 0); // Khởi tạo giá trị `prev` là 0

      return {
        _id: conv?._id,
        sender: conv?.sender,
        receiver: conv?.receiver,
        unseenMessage: countUnseenMsg,
        lastMsg: conv.messages[conv?.messages?.length - 1],
      };
    });

    return conversation;
  } else {
    return [];
  }
};

module.exports = getConversation;
