export type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  firebaseUid: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
