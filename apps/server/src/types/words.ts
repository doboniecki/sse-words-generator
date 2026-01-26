export type WordRequest = {
  wordsCount: string;
  milliseconds: string;
};

export type WordEvent = {
  eventType: 'data';
  data: {
    text: string;
  };
};
