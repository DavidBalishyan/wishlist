export type Priority = "low" | "medium" | "high";

export interface Wish {
  id: string;
  title: string;
  price: string;
  imageUri: string;
  link: string;
  notes: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type WishInput = Omit<Wish, "id" | "completed" | "createdAt" | "updatedAt">;
