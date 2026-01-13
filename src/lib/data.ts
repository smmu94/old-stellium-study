// src/lib/data.ts
import { sql } from "@vercel/postgres";
import { SubjectListResponse } from "@/lib/definitions";

export async function getSubjects(userId: string): Promise<SubjectListResponse> {
  try {
    // Esta consulta trae la materia y la entrega más cercana en un solo viaje
    const result = await sql`
      SELECT 
        s.*,
        (
          SELECT json_build_object(
            'due_date', a.due_date,
            'title', array_agg(a.title)
          )
          FROM assignments a
          WHERE a.subject_id = s.id 
            AND a.due_date >= NOW()
            AND a.status != 2
          GROUP BY a.due_date
          ORDER BY a.due_date ASC
          LIMIT 1
        ) as next_delivery_json
      FROM subjects s
      WHERE s.user_id = ${userId}
      ORDER BY s.created_at DESC
    `;

    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      icon: row.icon,
      color: row.color,
      progress: row.progress,
      next_delivery: row.next_delivery_json ? {
        due_date: row.next_delivery_json.due_date,
        title: row.next_delivery_json.title
      } : null
    })) as SubjectListResponse;

  } catch (error) {
    console.error("Error al obtener materias:", error);
    return []; // En el Dashboard, el Suspense manejará esto o SubjectsList mostrará vacío
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