export type ChatHistoryState = {
  chatHistory: ChatMessage[];
};

export type ChatHistoryAction = {
  chatHistoryActions: {
    initialize: (data: ChatHistoryState["chatHistory"]) => void;
    // TODO: progressive update of the state instead of replacing the whole state
    // add: (data: ChatHistoryState["chatHistory"]) => void;
    // update: (data: ChatHistoryState["chatHistory"]) => void;
    // remove: (data: ChatHistoryState["chatHistory"]) => void;
  };
};
