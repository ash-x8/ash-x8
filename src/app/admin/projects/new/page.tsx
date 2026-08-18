import ProjectFormClient from "../ProjectFormClient";

export const revalidate = 0;

export default function NewProjectPage() {
  return <ProjectFormClient isEdit={false} />;
}
