import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  let wakatime_seconds = 0;
  try {
    const wakatime_response = await fetch(
      "https://hackatime.hackclub.com/api/hackatime/v1/users/U05MKEZUY67/statusbar/today",
      {
        headers: {
          Authorization: "Bearer " + import.meta.env.HACKATIME_KEY,
        },
      },
    );

    if (!wakatime_response.ok) {
      throw new Error(`Fetch failed with status ${wakatime_response.status}`);
    }

    let wakatime_data = await wakatime_response.json();
    wakatime_seconds = wakatime_data.data.grand_total.total_seconds;

    return new Response(JSON.stringify({ wakatime_seconds }), { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
};
