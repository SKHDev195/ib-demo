import { ApplyThisWeek, LessonArticle, LessonHeader, LessonList } from "@/components/lesson/sections";

export const metadata = { title: "How sub-IB commission tiers work" };

/** Screen 06 — lesson view. Display-only. */
export default function LessonPage() {
  return (
    <>
      <LessonHeader />
      <div className="flex items-start gap-5">
        <LessonList />
        <LessonArticle />
        <ApplyThisWeek />
      </div>
    </>
  );
}
