export type WordRequest =
  | {
      wordsCount: string;
      milliseconds: string;
    }
  | undefined;

export type WordEvent = {
  eventType: 'data';
  data: {
    text: string;
  };
};
