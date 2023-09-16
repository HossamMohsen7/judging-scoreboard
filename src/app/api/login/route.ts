export async function POST(request: Request) {
  const password = (await request.json()).password;
  if (password === "password") {
    return new Response("ok", { status: 200 });
  } else {
    return new Response("ko", { status: 401 });
  }
}
