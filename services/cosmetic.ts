import { addMinutes, format } from "date-fns";
import { cosmeticServices } from '@/dataset/services';

export function getServiceById(
  serviceId: string
): CosmeticService | undefined {
  return cosmeticServices.find(
    (service) => service.id === serviceId
  );
}

interface DateTimeRange {
  startDatetime: string;
  endDatetime: string;
}

export function getBookingDateTimes(
  startDateTime: Date,
  serviceDurationMinutes: number
): DateTimeRange {
  const endDateTime = addMinutes(startDateTime, serviceDurationMinutes);

  return {
    startDatetime: format(startDateTime, "yyyy-MM-dd'T'HH:mm"),
    endDatetime: format(endDateTime, "yyyy-MM-dd'T'HH:mm"),
  };
}