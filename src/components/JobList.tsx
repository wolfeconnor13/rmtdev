import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

type JobItem = {
  id: number;
  title: string;
  daysAgo: number;
  company: string;
  badgeLetters: string;
  relevanceScore: number;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}

      {!isLoading &&
        jobItems.map((jobItem: JobItem) => <JobListItem jobItem={jobItem} />)}
    </ul>
  );
}

export default JobList;
