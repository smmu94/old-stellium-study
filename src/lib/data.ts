// src/lib/data.ts
import { sql } from "@vercel/postgres";
import { SubjectListResponse } from "@/lib/definitions";

export async function getSubjects(userId: string): Promise<SubjectListResponse> {
  try {
    const result = await sql`
      SELECT 
        s.*,
        (
          SELECT json_agg(t)
          FROM (
            SELECT title, due_date
            FROM assignments
            WHERE subject_id = s.id 
              AND status IN (0, 1)
              AND due_date::date >= CURRENT_DATE 
              AND due_date::date <= CURRENT_DATE + INTERVAL '7 days' -- Miramos 7 días al futuro
            ORDER BY due_date ASC
          ) t
        ) as next_delivery_json
      FROM subjects s
      WHERE s.user_id = ${userId}
      ORDER BY s.created_at DESC
    `;

    return result.rows.map(row => ({
      ...row,
      // Ahora enviamos la lista completa de tareas encontradas
      next_delivery: row.next_delivery_json ? {
        tasks: row.next_delivery_json 
      } : null
    })) as SubjectListResponse;
  } catch (error) {
    console.error("Error al obtener materias:", error);
    return [];
  }
}

// src/lib/data.ts
export async function getRemindersData(userId: string) {
  const today = new Date().getDay();

  try {
    const classesPromise = sql`
      SELECT s.name, sch.start_time, sch.end_time, s.icon
      FROM schedules sch
      JOIN subjects s ON sch.subject_id = s.id
      WHERE s.user_id = ${userId} AND sch.day_of_week = ${today}
      ORDER BY sch.start_time ASC
    `;

    const deadlinesPromise = sql`
      SELECT a.title as name, a.due_date, s.color as "dotColor"
      FROM assignments a
      JOIN subjects s ON a.subject_id = s.id
      WHERE a.user_id = ${userId} 
        AND a.due_date >= NOW() 
        AND a.status != 2
      ORDER BY a.due_date ASC
      LIMIT 5
    `;

    const [classes, deadlines] = await Promise.all([classesPromise, deadlinesPromise]);

    return {
      events: classes.rows.map(c => ({
        name: c.name, // Mapeo explícito
        icon: c.icon,
        dateTime: `${c.start_time.slice(0, 5)} - ${c.end_time.slice(0, 5)}`
      })),
      deadlines: deadlines.rows.map(d => ({
        name: d.name, // Mapeo explícito
        dotColor: d.dotColor,
        dateTime: new Date(d.due_date).toLocaleDateString("es-ES", { month: "long", day: "numeric" })
      }))
    };
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return { events: [], deadlines: [] };
  }
}