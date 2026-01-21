import {
    BG_CLASSES,
    colorMap,
    ICON_MAP,
} from '@/components/ui/cards/subjectCard/constants';
import { ReminderCardProps } from './types';

export default function ReminderCard({ title, events }: ReminderCardProps) {
    return (
        <div className="flex flex-col w-full gap-4 rounded-sm p-5 shadow-md border border-oxford/50 bg-white">
            <h4 className="text-preset-3-bolder mb-2 text-oxford">{title}</h4>
            <ul className="flex flex-col gap-4 p-0 m-0 max-h-48 overflow-y-auto custom-scrollbar">
                {events.map((event, index) => {
                    const IconComponent =
                        event.icon !== undefined ? ICON_MAP[event.icon] : null;

                    // --- LÓGICA DE CÁLCULO SEGURA ---
                    let displayDate = '';
                    let isToday = false;

                    // 1. Convertimos a string para poder validar si es un rango horario
                    const dateTimeStr = String(event.dateTime);

                    // 2. Si es un rango (tiene " - "), es una clase. No procesamos como fecha.
                    const isTimeRange = dateTimeStr.includes(' - ');

                    if (!isTimeRange) {
                        // Intentamos crear la fecha (funciona si es objeto Date, string ISO o número)
                        const eventDate = new Date(event.dateTime);
                        const now = new Date();

                        // Verificamos que la fecha sea válida
                        if (!isNaN(eventDate.getTime())) {
                            isToday =
                                eventDate.getDate() === now.getDate() &&
                                eventDate.getMonth() === now.getMonth() &&
                                eventDate.getFullYear() === now.getFullYear();

                            displayDate = isToday
                                ? 'TODAY'
                                : eventDate.toLocaleDateString('en-EN', {
                                      month: 'long',
                                      day: 'numeric',
                                  });
                        }
                    } else {
                        // Es una clase, usamos el rango horario tal cual
                        displayDate = dateTimeStr;
                    }

                    return (
                        <li
                            key={index}
                            className="flex items-start gap-3 list-none"
                        >
                            {IconComponent && (
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-oxford text-white mt-1 shrink-0">
                                    <IconComponent className="text-sm" />
                                </span>
                            )}
                            {event.dotColor !== undefined && (
                                <span
                                    className={`w-4 h-4 rounded-sm shrink-0 mt-1 ${BG_CLASSES[colorMap[event.dotColor]]}`}
                                ></span>
                            )}
                            <div className="flex flex-col">
                                <span className="text-oxford text-preset-4-bolder">
                                    {event.name}
                                </span>
                                <span
                                    className={`text-xs font-bold ${isToday ? 'text-vermilion uppercase' : 'text-oxford/60'}`}
                                >
                                    {displayDate}
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
