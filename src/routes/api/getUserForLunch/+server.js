import { pool } from "$lib/db/mysql.js";

export async function POST({ request }) {

    const data = await request.json();

    let toRet;

    // BUG podle map nesprávný výsledek, ověřit s expertem
    let qq = "SELECT id_user, ST_X(position) AS x, ST_Y(position) AS y, (ST_distance_sphere(position, ST_SRID(POINT(-73.109857, 7.107069), 4326))) AS distanceInMeters FROM active_users ORDER BY distanceInMeters ASC;";

    // TODO ensure that user wont get matched with same user too often
    // NOTE lat and lon wont be needed in production
    // TODO ask user and change db value
    // TODO send notification to user

    // find closest user
    await pool.promise()
        .query("SELECT id_user, ST_Y(position) AS lat, ST_X(position) AS lon, (ST_distance_sphere(position, ST_GeomFromText('POINT(? ?)', 4326), 4326)) AS distanceInMeters FROM active_users WHERE id_user<>? AND date_to_go=CURDATE() AND b_asked=0 ORDER BY distanceInMeters ASC LIMIT 1;", [data.userId, data.lat, data.lon])
        .then(function ([rows, fields]) {
            toRet = rows;
        });

    return new Response(JSON.stringify({ message: "succ?", data: toRet }, { status: 200 }));
}