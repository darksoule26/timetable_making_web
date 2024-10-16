import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Link } from "react-router-dom"
import { Trash2, UserPlus, Calendar, BookOpen, GraduationCap, Home, Users, Bell, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

interface Teacher {
  _id: string
  name: string
  subject: string
  class: string
}

export default function TYBPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [newTeacher, setNewTeacher] = useState({ name: "", subject: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/teachers/TYB')
      const data = await response.json()
      setTeachers(data)
    } catch (error) {
      console.error('Error fetching teachers:', error)
    }
  }

  const handleAddTeacher = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newTeacher, class: "TYB" }),
      })
      const data = await response.json()
      setTeachers([...teachers, data])
      setNewTeacher({ name: "", subject: "" })
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error adding teacher:', error)
    }
  }

  const handleDeleteTeacher = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/teachers/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setTeachers(teachers.filter((teacher) => teacher._id !== id))
      } else {
        console.error('Failed to delete teacher')
      }
    } catch (error) {
      console.error('Error deleting teacher:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100">
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <GraduationCap className="mr-2" />
            Plan Perfect
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-green-200 transition-colors">
              <Home className="h-5 w-5" />
            </Link>
            <Link to="/users" className="hover:text-green-200 transition-colors">
              <Users className="h-5 w-5" />
            </Link>
            <button className="hover:text-green-200 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="hover:text-green-200 transition-colors">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-green-800 text-center">
          Third Year B (TYB)
        </h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader>
              <CardTitle>Total Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{teachers.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardHeader>
              <CardTitle>Subjects Covered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{new Set(teachers.map(t => t.subject)).size}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
            <CardHeader>
              <CardTitle>Class Strength</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">75</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600 text-white transition-colors">
                <UserPlus className="mr-2 h-4 w-4" /> Add Teacher
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={newTeacher.subject}
                    onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={handleAddTeacher} className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors">Add Teacher</Button>
            </DialogContent>
          </Dialog>

          <Link to="/tyb/create-timetable">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white transition-colors">
              <Calendar className="mr-2 h-4 w-4" /> Create Timetable
            </Button>
          </Link>
        </div>

        <Card className="bg-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-green-800 flex items-center">
              <GraduationCap className="mr-2 h-6 w-6" />
              Current Teachers
            </CardTitle>
          </CardHeader>
          <CardContent>
            {teachers.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teachers.map((teacher) => (
                  <Card key={teacher._id} className="bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16 bg-green-300 text-green-800">
                          <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold text-green-800">{teacher.name}</h3>
                          <p className="text-sm text-green-600 flex items-center">
                            <BookOpen className="mr-1 h-4 w-4" /> {teacher.subject}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button
                          onClick={() => handleDeleteTeacher(teacher._id)}
                          variant="destructive"
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-green-500 text-center py-4">No teachers added yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">PlanPerfect</h2>
              <p className="mt-2 text-sm">Empowering education through efficient management</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-green-300 hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="text-green-300 hover:text-white transition-colors">
                Contact
              </a>
              <a href="#" className="text-green-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-green-700 pt-8 text-sm text-green-400">
            © 2024 PlanPerfect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}