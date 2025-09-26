"use client";

import React from "react";
import {
  Calendar,
  DollarSign,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useSelectedProject } from "@/stores";
import Pill from "../shared/pill";
import { Separator } from "../ui/separator";

export default function ProjectView() {
  const selectedProject = useSelectedProject();

  if (!selectedProject) {
    return (
      <section className="flex w-full flex-col items-center justify-center">
        <p className="text-text-secondary">Select a project to view details</p>
      </section>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="size-5 text-green-600" />;
      case "In-Progress":
        return <Clock className="size-5 text-blue-600" />;
      case "To-Do":
        return <AlertCircle className="size-5 text-orange-600" />;
      default:
        return <Clock className="size-5 text-gray-600" />;
    }
  };

  const getBudgetConsumption = () => {
    // Mock calculation for demonstration
    const budgetNum = parseInt(selectedProject.budget.replace(/[^\d]/g, ""));
    const consumed = Math.floor(budgetNum * 0.4); // 40% consumed
    return {
      consumed: `$${consumed}k`,
      percentage: 40,
    };
  };

  const budgetInfo = getBudgetConsumption();

  return (
    <section className="flex w-full flex-col">
      {/* Header */}
      <header className="border-b border-b-Bg-Dark px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon(selectedProject.status)}
            <div>
              <h1 className="text-lg font-semibold text-text-primary">
                {selectedProject.title}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Pill title={selectedProject.status} />
                <span className="text-xs text-text-secondary">
                  40% Budget Consumed
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="flex-1 overflow-y-auto">
        {/* Project Details */}
        <div className="p-4 space-y-4">
          {/* Key Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-light-bg p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="size-4 text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  Deadline
                </span>
              </div>
              <p className="text-text-primary font-semibold">
                {selectedProject.deadline}
              </p>
            </div>

            <div className="bg-light-bg p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="size-4 text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  Budget
                </span>
              </div>
              <p className="text-text-primary font-semibold">
                {selectedProject.budget}
              </p>
            </div>

            <div className="bg-light-bg p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="size-4 text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  Assigned To
                </span>
              </div>
              <p className="text-text-primary font-semibold">
                {selectedProject.contractor}
              </p>
            </div>

            <div className="bg-light-bg p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="size-4 text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  Contractor
                </span>
              </div>
              <p className="text-text-primary font-semibold">
                {selectedProject.contractor}
              </p>
            </div>
          </div>

          <Separator className="bg-Bg-Dark" />

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-text-primary">
              Description
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Project status: {selectedProject.status} | Budget:{" "}
              {selectedProject.budget} | Deadline: {selectedProject.deadline}
            </p>
          </div>

          <Separator className="bg-Bg-Dark" />

          {/* Budget Progress */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-text-primary">
              Budget Overview
            </h3>
            <div className="bg-light-bg p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-secondary">
                  Budget Consumed
                </span>
                <span className="text-sm font-semibold text-text-primary">
                  {budgetInfo.consumed} / {selectedProject.budget}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${budgetInfo.percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-text-secondary mt-2">
                {budgetInfo.percentage}% of total budget utilized
              </p>
            </div>
          </div>

          <Separator className="bg-Bg-Dark" />

          {/* Actions */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-text-primary">Actions</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition-colors">
                Update Status
              </button>
              <button className="px-4 py-2 border border-primary text-primary text-sm font-medium rounded-md hover:bg-primary/5 transition-colors">
                View Timeline
              </button>
              <button className="px-4 py-2 border border-gray-300 text-text-secondary text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                Export Report
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-text-primary">
              Recent Activity
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-light-bg rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-text-primary">
                    Status updated to {selectedProject.status}
                  </p>
                  <p className="text-xs text-text-secondary">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-light-bg rounded">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-text-primary">
                    Budget review completed
                  </p>
                  <p className="text-xs text-text-secondary">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-light-bg rounded">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-text-primary">
                    New contractor assigned
                  </p>
                  <p className="text-xs text-text-secondary">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
