import JobListItem from "./JobListItem";

type JobListProps = {
  jobItems: JobItem[];
};

type JobItem = {
  id: number;
  title: string;
  daysAgo: number;
  company: string;
  badgeLetters: string;
  relevanceScore: number;
};

export function JobList({ jobItems }: JobListProps) {
  return (
    <ul className="job-list">
      {jobItems.map((jobItem: JobItem) => (
        <JobListItem jobItem={jobItem} />
      ))}
    </ul>
  );
}

export default JobList;
