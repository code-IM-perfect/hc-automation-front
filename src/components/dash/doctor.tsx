'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, User, Calendar } from "lucide-react"

type Patient = {
  id: string
  name: string
  description: string
  status: 'scheduled' | 'pending' | 'completed'
  schedule: string
}

const patients: Patient[] = [
  { id: '1', name: 'John Doe', description: 'Regular checkup', status: 'scheduled', schedule: '' },
  { id: '2', name: 'Jane Smith', description: 'Follow-up appointment', status: 'pending', schedule: 'xray' },
  { id: '3', name: 'Bob Johnson', description: 'Test results review', status: 'completed', schedule: '1 Oct 2024' },
  { id: '4', name: 'Alice Brown', description: 'Vaccination', status: 'scheduled', schedule: '' },
  { id: '5', name: 'Charlie Davis', description: 'Physical therapy', status: 'pending', schedule: 'pharma' },
  { id: '5', name: 'Charlie Davis', description: 'Physical therapy', status: 'pending', schedule: '' },
  { id: '6', name: 'Eva Wilson', description: 'Post-surgery checkup', status: 'completed', schedule: 'Treatment completed on 30 Sept 2024' },
]

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState<'scheduled' | 'pending' | 'completed'>('scheduled')

  const filteredPatients = patients.filter(patient => patient.status === activeTab)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <nav>
            {(['scheduled', 'pending', 'completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left py-2 px-4 rounded ${activeTab === tab ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Patients</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPatients.map((patient) => (
            <Card key={patient.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <User className="w-4 h-4 inline-block mr-2" />
                  {patient.name}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{patient.description}</p>

                {((pat: Patient) => {
                  if (pat.status == "scheduled" || pat.status == "completed") {
                    return (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{pat.schedule}</span>
                      </div>
                    )
                  } else {
                    var mess;
                    switch (pat.schedule) {
                      case "xray":
                        mess = "Sent to X-Ray"
                        break;
                      case "parma":
                        mess = "Sent to Pharmacist"
                        break;

                      default:
                        mess = "Waiting for Receptionist"
                        break;
                    }
                    return (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{mess}</span>
                      </div>
                    )
                  }
                })(patient)}

              </CardContent>
              <CardFooter>
                <Button className="w-full">Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}