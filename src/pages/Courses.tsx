import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Courses = () => {
  const courses = [
    {
      id: 1,
      name: "Science",
      duration: "2 years",
      description:
        "Comprehensive program covering Physics,Chemistry,Mathamatics,Biology,English,Assamese",
      subjects: [
        "Physics",
        "Chemistry",
        "Mathamatics",
        "Biology",
        "English",
        "Assamese",
        "Statistics",
        "Physical Education",
        "Computer Science",
      ],
      eligibility: "10th pass with Mathematics",
    },
    {
      id: 2,
      name: "Arts",
      duration: "2 years",
      description:
        "Complete education covering English,Assamese,History,Geography,Sociology,Education,Economics",
      subjects: [
        "Economics",
        "Education",
        "Poltical Science",
        "Geography",
        "History",
        "Sociology",
        "Anthropology",
        "Logic",
        "Philosophy",
      ],
      eligibility: "10th Pass",
    },
    {
      id: 3,
      name: "Commerce",
      duration: "2 years",
      description:
        "Complete program with specializations in various fields including Bussiness and Marketing Field.",
      subjects: ["Accounts ", "Applied Maths", "Bussiness", "Banking", "English"],
      eligibility: "High School Diploma with Mathematics and Physics",
    },
  ];

  return (
    <div className="min-h-screen bg-grey-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center   mb-12">
            <h1 className="text-4xl font-bold mb-4 text-black-700">Our Courses</h1>
            <p className="text-xl text-black-500">
              Discover our comprehensive academic programs designed to prepare you for success
            </p>
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="h-full border border-blue-200 shadow-lg hover:shadow-xl transition duration-300"
              >
                <CardHeader>
                  <div className="flex items-start  justify-between">
                    <div>
                      <CardTitle className="text-xl text-blue-700">{course.name}</CardTitle>
                      <CardDescription className="mt-2 text-blue-500">
                        {course.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-600">Duration:</span>
                      <span className="ml-2">{course.duration}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-blue-600">Key Subjects:</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.subjects.map((subject, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 border border-blue-300 text-xs"
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-blue-600">Eligibility:</h4>
                    <p className="text-sm text-blue-500">{course.eligibility}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto border border-blue-300 shadow-md">
              <CardHeader>
                <CardTitle className="text-blue-700">Ready to Apply?</CardTitle>
                <CardDescription className="text-blue-500">
                  Start your journey with us today. Our admission team is here to help you choose
                  the right program.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-500">
                  For more information about admission requirements and application procedures,
                  please visit our admission page or contact our academic counselors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
