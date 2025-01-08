// app/reports/components/StudentPerformanceReport.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  student_id: string;
}

interface Grade {
  id: number;
  student: Student;
  course: string;
  final_grade: number;
  letter_grade: string;
}

const StudentPerformanceReport: React.FC = () => {
  const [reportData, setReportData] = useState<Grade[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Grade[]>('/api/reports/student-performance/');
        setReportData(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Student Performance Report</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Grade</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Letter Grade</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reportData.map((grade) => (
            <tr key={grade.id}>
              <td className="px-6 py-4 whitespace-nowrap">{grade.student.student_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{grade.student.first_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{grade.student.last_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{grade.course}</td>
              <td className="px-6 py-4 whitespace-nowrap">{grade.final_grade}</td>
              <td className="px-6 py-4 whitespace-nowrap">{grade.letter_grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentPerformanceReport;