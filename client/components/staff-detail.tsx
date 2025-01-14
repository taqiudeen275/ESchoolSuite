import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StaffDetailsProps {
  staffData: {
    user: number;
    first_name: string;
    last_name: string;
    middle_name?: string | null;
    email: string;
    staff_id: string;
    date_of_birth: string;
    gender: string;
    address: string;
    city: string;
    region: string;
    phone_number: string;
    qualification: string;
    experience?: string | null;
    date_joined: string;
    nationality: string;
    social_security_number?: string | null;
    bank_name?: string | null;
    bank_account_number?: string | null;
    bank_branch?: string | null;
    salary?: string | null;
  };
}

const StaffDetails = ({ staffData }: StaffDetailsProps) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src="" />
            <AvatarFallback>
              {getInitials(staffData.first_name, staffData.last_name)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <CardTitle className="text-2xl flex items-center">
              {staffData.first_name} {staffData.middle_name}{" "}
              {staffData.last_name}{" "}
              <Badge variant="secondary" className="ml-2">
                {/* You can customize the badge based on staff role or status */}
                {staffData.staff_id}
              </Badge>
            </CardTitle>
            <CardDescription>
              {staffData.qualification}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="font-semibold">Date of Birth:</dt>
              <dd>{staffData.date_of_birth}</dd>
            </div>
            <div>
              <dt className="font-semibold">Gender:</dt>
              <dd>{staffData.gender}</dd>
            </div>
            <div>
              <dt className="font-semibold">Address:</dt>
              <dd>{staffData.address}</dd>
            </div>
            <div>
              <dt className="font-semibold">City:</dt>
              <dd>{staffData.city}</dd>
            </div>
            <div>
              <dt className="font-semibold">Region:</dt>
              <dd>{staffData.region}</dd>
            </div>
            <div>
              <dt className="font-semibold">Phone Number:</dt>
              <dd>{staffData.phone_number}</dd>
            </div>
            <div>
              <dt className="font-semibold">Email:</dt>
              <dd>{staffData.email}</dd>
            </div>
            <div>
              <dt className="font-semibold">Nationality:</dt>
              <dd>{staffData.nationality}</dd>
            </div>

            {/* Conditional fields */}
            {staffData.experience && (
              <div>
                <dt className="font-semibold">Experience:</dt>
                <dd>{staffData.experience}</dd>
              </div>
            )}
            {staffData.social_security_number && (
              <div>
                <dt className="font-semibold">Social Security Number:</dt>
                <dd>{staffData.social_security_number}</dd>
              </div>
            )}

            {staffData.bank_name && (
              <div>
                <dt className="font-semibold">Bank Name:</dt>
                <dd>{staffData.bank_name}</dd>
              </div>
            )}

            {staffData.bank_account_number && (
              <div>
                <dt className="font-semibold">Bank Account Number:</dt>
                <dd>{staffData.bank_account_number}</dd>
              </div>
            )}

            {staffData.bank_branch && (
              <div>
                <dt className="font-semibold">Bank Branch:</dt>
                <dd>{staffData.bank_branch}</dd>
              </div>
            )}

            {staffData.salary && (
              <div>
                <dt className="font-semibold">Salary:</dt>
                <dd>{staffData.salary}</dd>
              </div>
            )}

            <div>
              <dt className="font-semibold">Date Joined:</dt>
              <dd>{staffData.date_joined}</dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffDetails;