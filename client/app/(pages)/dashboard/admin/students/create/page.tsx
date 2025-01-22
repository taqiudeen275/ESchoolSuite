import CreateStudentForm from "@/components/create-student-form";

export default function CreateStudentPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Student</h2>
      <CreateStudentForm />
    </div>
  );
}