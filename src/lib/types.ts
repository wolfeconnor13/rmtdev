export type JobItem = {
  id: number;
  title: string;
  daysAgo: number;
  company: string;
  badgeLetters: string;
  relevanceScore: number;
};

export type JobItemExpanded = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
};
