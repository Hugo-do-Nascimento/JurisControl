import { DayPicker } from 'react-day-picker';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateSelect }) => {
  return (
    <DayPicker selected={selectedDate ?? undefined} onSelect={onDateSelect} />
  );
};

export default DatePicker;
