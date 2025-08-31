"use client";

import React, { useState } from "react";
import { cn } from "../lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface IssueDateProps {
  onDateChange?: (date: Date | undefined) => void;
}

export const IssueDate: React.FC<IssueDateProps> = ({ onDateChange }) => {
  const [incidentDate, setIncidentDate] = useState<Date>();
  
  const handleDateChange = (date: Date | undefined) => {
    setIncidentDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  return (
    <>
      <Label>Fecha del Incidente</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !incidentDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {incidentDate ? (
              format(incidentDate, "PPP")
            ) : (
              <span>Seleccione una fecha</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={incidentDate}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
