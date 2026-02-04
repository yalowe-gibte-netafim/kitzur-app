export interface Section {
  number: number;
  title: string;
  content: string;
  sephardicNote?: string;
}

export interface Chapter {
  number: number;
  title: string;
  sections: Section[];
}
