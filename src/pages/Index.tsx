import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { GraduationCap, Users, MapPin, BookOpen, Award, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-primary shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
              <span className="text-xl font-bold text-primary-foreground">Darrang University</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/admission" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
                Admission
              </Link>
              <Link to="/notifications" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
                Notifications
              </Link>
              <Link to="/courses" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
                Courses
              </Link>
              <Link to="/results" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
                Results
              </Link>
            </div>

             <div className="flex items-center space-x-4">
              console.log(isLoggedIn)
            {isLoggedIn ? (
         <Button
          variant="destructive"
          onClick={handleLogout}
          className="text-white"
        >
          Logout
        </Button>
      ) : (
        <>
          console.log(isLoggedIn)
          <Link to="/login">
            <Button
              variant="outline"
              className="border-primary-foreground/20 text-black hover:bg-primary-foreground hover:text-primary"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="secondary">Sign Up</Button>
          </Link>
        </>
      )}
    </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Excellence College
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Empowering students with quality education and innovative learning experiences for over 50 years.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admission">
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">40+</div>
              <div className="text-muted-foreground">Faculty Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Highest Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* College Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">About Our College</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Excellence in Education</h3>
              <p className="text-muted-foreground mb-6">
                Founded in 2000, Excellence College has been at the forefront of higher education, 
                providing world-class facilities and innovative teaching methodologies. Our commitment 
                to academic excellence and student development has made us one of the premier institutions 
                in the region.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>NAAC 'A+' Grade Accredited</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Experienced Faculty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Modern Learning Facilities</span>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Principal's Message</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "Welcome to Excellence College, where we believe in nurturing not just academic excellence 
                  but also character and leadership qualities in our students."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Dr. Kaustav Mani Deka</div>
                    <div className="text-sm text-muted-foreground">Principal</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visit Our Campus</h2>
            <p className="text-muted-foreground">Located in Namkhala,Darrang,Assam</p>
          </div>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Campus Address</h3>
                  <p className="text-muted-foreground">
                    Namkhala Road<br />
                    NamKhala Bajar<br />
                    Phone: 8822182088<br />
                    Email: info@excellencecollege.edu
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Science", duration: "2 years", students: "100" },
              { name: "Arts", duration: "2 years", students: "100+" },
              { name: "Commerce", duration: "2 years", students: "100" },
            ].map((course, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>Duration: {course.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{course.students} Students</Badge>
                    <Link to="/courses">
                      <Button variant="outline" size="sm">Learn More</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6" />
                <span className="font-bold">Excellence College</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Committed to providing quality education and shaping future leaders.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link to="/admission" className="block text-muted-foreground hover:text-foreground">Admission</Link>
                <Link to="/courses" className="block text-muted-foreground hover:text-foreground">Courses</Link>
                <Link to="/results" className="block text-muted-foreground hover:text-foreground">Results</Link>
                <Link to="/notifications" className="block text-muted-foreground hover:text-foreground">Notifications</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Phone: 8822182088</p>
                <p>Email: info@excellencecollege.edu</p>
                <p>Address: Namkhala</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <p className="text-sm text-muted-foreground">
                Stay connected with our latest updates and announcements.
              </p>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Excellence College. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;