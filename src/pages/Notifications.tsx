import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Notifications = () => {
  const [isAdmin] = useState(false); // This will be determined by user role from Supabase
  const [newNotification, setNewNotification] = useState({
    title: "",
    content: "",
  });

  // Mock notifications data - will be replaced with Supabase data
  const notifications = [
    {
      id: 1,
      title: "New Semester Registration Open",
      content: "Registration for the Spring 2024 semester is now open. Please complete your course selection by March 15th.",
      date: "2024-01-15",
      type: "important",
    },
    {
      id: 2,
      title: "Library Hours Update",
      content: "The library will have extended hours during exam week. Open 24/7 from May 1st to May 15th.",
      date: "2024-01-10",
      type: "info",
    },
    {
      id: 3,
      title: "Campus Event: Tech Fair 2024",
      content: "Join us for the annual Tech Fair featuring industry leaders and career opportunities.",
      date: "2024-01-08",
      type: "event",
    },
  ];

  const handleSubmitNotification = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin notification creation logic will be implemented with Supabase
    console.log("New notification:", newNotification);
    setNewNotification({ title: "", content: "" });
  };

  const getNotificationBadgeVariant = (type: string) => {
    switch (type) {
      case "important":
        return "destructive";
      case "event":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Notifications</h1>

          {isAdmin && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create New Notification</CardTitle>
                <CardDescription>Post a new notification for all students</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitNotification} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newNotification.title}
                      onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newNotification.content}
                      onChange={(e) => setNewNotification(prev => ({ ...prev, content: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit">Post Notification</Button>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {notification.title}
                        <Badge variant={getNotificationBadgeVariant(notification.type)}>
                          {notification.type}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{notification.date}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{notification.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;