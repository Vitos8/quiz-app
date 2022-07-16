export const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export type Question = {
     category: string;
     correctAnswer: string;
     difficulty: string;
     incorrectAnswers: string[];
     question: string;
     type: string;
};

export type QuestionsState = Question & { answers: string[] };
