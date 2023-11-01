import { pool } from "$lib/db/mysql.js";

export async function POST({ request }) {

    const data = await request.json();

    await pool.promise()
        .query("INSERT INTO users (user_id) VALUES (?);",
            [data.userId])
        .then(function ([rows, fields]) {
            // success
        });

    return new Response(JSON.stringify({ message: "succ?" }, { status: 200 }));
}