export {};

declare global {
  interface Window {
    electronAPI: {
      listCards: () => Promise<any[]>;
      deleteCard: (id: string) => void;
      saveCard?: (cardData: any) => void;
    };
  }
}
