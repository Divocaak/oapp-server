import { pool } from "$lib/db/mysql.js";

export async function POST({ request }) {

    const data = await request.json();

    await pool.promise()
        .query("INSERT INTO active_users (id_user, position) VALUES (?, ST_SRID(POINT(?, ?), 4326)) ON DUPLICATE KEY UPDATE date_to_go=CURDATE(), b_asked=0;",
            [data.userId, data.lat, data.lon])
        .then(function ([rows, fields]) {
            // success
        });

    return new Response(JSON.stringify({ message: "succ?" }, { status: 200 }));
}