import { useApi, useApiClient } from "nextjs-django-sdk";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";

const payrollSchema = z.object({
  id: z.number(),
  staff: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  basic_salary: z.string(),
  allowances: z.string().nullable(),
  deductions: z.string().nullable(),
  net_pay: z.string(),
  payment_date: z.string(),
  status: z.enum(["Pending", "Paid"]),
  notes: z.string().nullable(),
});

type Payroll = z.infer<typeof payrollSchema>;

interface PayrollDetailProps {
  id: number;
}

const PayrollDetail = ({ id }: PayrollDetailProps) => {
  const apiClient = useApiClient();
  const {
    data: payroll,
    error,
    isLoading,
  } = useApi<Payroll>(`/api/staff/payroll/${id}/`, apiClient);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-full" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-1/2" />
            {/* Add more skeletons for other fields */}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <div className="flex items-center text-red-500">
        <AlertCircle className="mr-2 h-5 w-5" />
        Error loading payroll details.
      </div>
    );
  }

  if (!payroll) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payroll Details (ID: {payroll.id})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Staff ID:</span> {payroll.staff}
          </div>
          <div>
            <span className="font-semibold">Start Date:</span>{" "}
            {new Date(payroll.start_date).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold">End Date:</span>{" "}
            {new Date(payroll.end_date).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold">Basic Salary:</span>{" "}
            {payroll.basic_salary}
          </div>
          <div>
            <span className="font-semibold">Allowances:</span>{" "}
            {payroll.allowances || "-"}
          </div>
          <div>
            <span className="font-semibold">Deductions:</span>{" "}
            {payroll.deductions || "-"}
          </div>
          <div>
            <span className="font-semibold">Net Pay:</span> {payroll.net_pay}
          </div>
          <div>
            <span className="font-semibold">Payment Date:</span>{" "}
            {new Date(payroll.payment_date).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold">Status:</span>
            <Badge
              variant={payroll.status === "Paid" ? "default" : "secondary"}
            >
              {payroll.status}
            </Badge>
          </div>
          {payroll.notes && (
            <div>
              <span className="font-semibold">Notes:</span> {payroll.notes}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollDetail;