import { pool } from "$lib/db/mysql.js";

export async function POST({ request }) {

    const data = await request.json();

    await pool.promise()
        .query("INSERT INTO regular_lunch_times (datetime_from, datetime_to, id_user) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE datetime_from=?, datetime_to=?;", [data.timeFrom, data.timeTo, data.userId, data.timeFrom, data.timeTo])
        .then(function ([rows, fields]) {
            // success
        });

    return new Response(JSON.stringify({ message: "succ?" }, { status: 200 }));
}