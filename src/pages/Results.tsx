import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Subject {
  name: string;
  marks: number;
  maxMarks?: number;
}

interface Result {
  studentId: string;
  semester: string;
  subjects: Subject[];
  totalMarks: number;
  percentage: number;
}

const Results = () => {
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [results, setResults] = useState<Result | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [adminData, setAdminData] = useState({
    studentId: "",
    email: "",
    password: "",
    semester: "",
    subjects: Array(6).fill({ name: "", marks: 0, maxMarks: 100 }),
  });

  // Safe JSON parser
  const parseSafeJson = async (res: Response) => {
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      return null;
    }
  };

 const handleSearchResults = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:8080/api/results/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, email, password }),
    });
    const data = await parseSafeJson(res);
    if (res.ok && data?.success) {
      setResults(data.result);
      setIsAdmin(data.role === "admin");
    } else {
      setResults(null);
      alert(data?.message || "Invalid credentials or no results found.");
    }
  } catch (error) {
    alert("Error fetching results.");
    console.error(error);
  }
};


  const handleAdminInput = (index: number, field: keyof Subject, value: string | number) => {
    const updatedSubjects = adminData.subjects.map((subject, i) =>
      i === index ? { ...subject, [field]: value } : subject
    );
    setAdminData({ ...adminData, subjects: updatedSubjects });
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/results/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
      });

      const data = await parseSafeJson(res);
      alert(data?.message || "Result submitted.");
    } catch (error) {
      alert("Error submitting results.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Student Results Portal</h1>

        {/* Login Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to view results</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearchResults} className="grid gap-4">
              <Input placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Button type="submit">View Result</Button>
            </form>
          </CardContent>
        </Card>

        {/* Result Section */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle>Academic Results</CardTitle>
              <CardDescription>
                Student ID: {results.studentId} | Semester: {results.semester}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Max Marks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.subjects.map((subject, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>{subject.marks}</TableCell>
                      <TableCell>{subject.maxMarks ?? "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6 grid grid-cols-2 gap-4 text-center bg-muted p-4 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Total Marks</p>
                  <p className="text-2xl font-bold">{results.totalMarks}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Percentage</p>
                  <p className="text-2xl font-bold">{results.percentage.toFixed(2)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Admin Panel Section */}
        {isAdmin && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Admin Panel</CardTitle>
              <CardDescription>Add or edit student results</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminSubmit} className="grid gap-4">
                <Input placeholder="Student ID" value={adminData.studentId} onChange={(e) => setAdminData({ ...adminData, studentId: e.target.value })} required />
                <Input type="email" placeholder="Email" value={adminData.email} onChange={(e) => setAdminData({ ...adminData, email: e.target.value })} required />
                <Input type="password" placeholder="Password" value={adminData.password} onChange={(e) => setAdminData({ ...adminData, password: e.target.value })} required />
                <Input placeholder="Semester" value={adminData.semester} onChange={(e) => setAdminData({ ...adminData, semester: e.target.value })} required />

                {adminData.subjects.map((subject, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2">
                    <Input placeholder={`Subject ${index + 1} Name`} value={subject.name} onChange={(e) => handleAdminInput(index, "name", e.target.value)} required />
                    <Input placeholder="Marks" type="number" value={subject.marks} onChange={(e) => handleAdminInput(index, "marks", Number(e.target.value))} required />
                    <Input placeholder="Max Marks" type="number" value={subject.maxMarks ?? ""} onChange={(e) => handleAdminInput(index, "maxMarks", Number(e.target.value))} />
                  </div>
                ))}
                <Button type="submit">Submit Result</Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Results;