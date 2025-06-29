export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Attachment {
  name: string;
  url: string;
  type: string;
  uploadedAt: string;
}

export interface Message {
  _id: string;
  sender: User;
  recipient: User;
  subject: string;
  content: string;
  read: boolean;
  attachments?: Attachment[];
  parentMessage?: string | Message;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewMessage {
  recipient: string;
  subject: string;
  content: string;
  parentMessage?: string;
  attachments?: Attachment[];
}