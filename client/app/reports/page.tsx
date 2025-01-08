import Link from 'next/link';

const ReportsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <ul className="space-y-4">
        <li>
          <Link href="/reports/student-performance" className="text-blue-600 hover:underline">
            Student Performance Report
          </Link>
        </li>
        <li>
          <Link href="/reports/attendance" className="text-blue-600 hover:underline">
            Attendance Report
          </Link>
        </li>
        <li>
          <Link href="/reports/enrollment" className="text-blue-600 hover:underline">
            Enrollment Report
          </Link>
        </li>
        <li>
          <Link href="/reports/financial" className="text-blue-600 hover:underline">
            Financial Report
          </Link>
        </li>
        <li>
          <Link href="/reports/fees" className="text-blue-600 hover:underline">
            Fees Report
          </Link>
        </li>
        <li>
          <Link href="/reports/payments" className="text-blue-600 hover:underline">
            Payments Report
          </Link>
        </li>
        <li>
          <Link href="/reports/students" className="text-blue-600 hover:underline">
            Students Report
          </Link>
        </li>
        <li>
          <Link href="/reports/staff" className="text-blue-600 hover:underline">
            Staff Report
          </Link>
        </li>
        <li>
          <Link href="/reports/courses" className="text-blue-600 hover:underline">
            Courses Report
          </Link>
        </li>
        <li>
          <Link href="/reports/classes" className="text-blue-600 hover:underline">
            Classes Report
          </Link>
        </li>
        <li>
          <Link href="/reports/custom" className="text-blue-600 hover:underline">
            Custom Report
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ReportsPage;