export type UUID = string;

export type withId<T> = T & { _id: UUID };
