import { Appointment } from './appointment';
import { Control } from './control';
import { Goal } from './goal';
import { Service } from './service';

export type goalDataProps = {
  services: Service[];
  appointments: Appointment[];
  goals: Goal[];
  controls: Control[];
  todayGoal: Number;
  todayBilled: Number;
  monthlyTotalGoal: Number;
  monthlyGoal: Number;
  monthlyBilled: Number;
  lastMonthBilled: Number;
  lastMonthGoal: Number;
  eventBilledServices: [];
  eventBilledAppointments: [];
};
