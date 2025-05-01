'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Sparkles } from "lucide-react";
import { AddEventModal } from "@/app/components/events/add-event-modal";
import type { EventFormValues } from "@/app/components/events/add-event-form";

export default function DashboardPage() {
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

  const handleAddEvent = (values: EventFormValues) => {
    // Here you would typically save the event to your backend
    console.log('New event:', values);
    // For now, we'll just close the modal
    setIsAddEventModalOpen(false);
  };

  return (
    <>
      <div className="grid gap-6 p-6">
        {/* Left Column */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Add Event Card */}
          <Card className="bg-[#1a1a1a]/50 border-white/10 p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Add Event</h2>
            <div className="space-y-2">
              <Button 
                className="w-full py-6 text-left flex items-center justify-start space-x-3 bg-[#222222] hover:bg-[#2271e6]/10 border-0 text-white"
                variant="outline"
                onClick={() => setIsAddEventModalOpen(true)}
              >
                <Plus className="h-5 w-5" />
                <span>Add Event</span>
              </Button>
              <Button
                className="w-full py-6 text-left flex items-center justify-start space-x-3 bg-[#222222] hover:bg-[#2271e6]/10 border-0 text-white"
                variant="outline"
                // onClick will be implemented later
              >
                <Sparkles className="h-5 w-5" />
                <span>Create Event with AI</span>
              </Button>
            </div>
          </Card>

          {/* Event Dashboard Card */}
          <Card className="bg-[#1a1a1a]/50 border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-white">Event Dashboard</h2>
                <p className="text-sm text-gray-400">Overview and analytics</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-[#222222] hover:bg-[#2271e6]/10 border-0 text-white text-sm"
              >
                Last 30 days
              </Button>
            </div>
            
            <div className="grid gap-4 grid-cols-3">
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Total Events</p>
                <p className="text-2xl font-semibold text-white">2</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Total Guests</p>
                <p className="text-2xl font-semibold text-white">48</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Response Rate</p>
                <p className="text-2xl font-semibold text-white">78%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Your Events Card */}
          <Card className="bg-[#1a1a1a]/50 border-white/10 p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Your Events</h2>
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="bg-[#222222] border-0 p-1">
                <TabsTrigger 
                  value="upcoming"
                  className="data-[state=active]:bg-[#2271e6] data-[state=active]:text-white"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger 
                  value="past"
                  className="data-[state=active]:bg-[#2271e6] data-[state=active]:text-white"
                >
                  Past
                </TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="bg-[#222222] rounded-lg p-4 space-y-2">
                    <h3 className="text-base font-medium text-white">Summer Beach Party</h3>
                    <p className="text-sm text-gray-400">Saturday, July 15, 2025</p>
                    <p className="text-sm text-gray-300">Join us for a fantastic beach party with music, games, and amazing food!</p>
                  </div>
                  <div className="bg-[#222222] rounded-lg p-4 space-y-2">
                    <h3 className="text-base font-medium text-white">Tech Conference 2025</h3>
                    <p className="text-sm text-gray-400">August 10-12, 2025</p>
                    <p className="text-sm text-gray-300">Annual technology conference with workshops, networking, and keynote speakers.</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="past">
                <div className="text-center py-8 text-gray-400">
                  No past events
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Analytics Card */}
          <Card className="bg-[#1a1a1a]/50 border-white/10 p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Analytics visualization</h2>
            <div className="bg-[#222222] rounded-lg h-[300px] flex items-center justify-center">
              <p className="text-gray-400">Event performance metrics will appear here</p>
            </div>
          </Card>
        </div>
      </div>

      <AddEventModal 
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onSubmit={handleAddEvent}
      />
    </>
  );
} 