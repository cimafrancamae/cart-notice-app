import { json } from "@remix-run/node";

export async function loader() {
  return json({
      ok: true,
      message: 'Welcome'
  })
}

export async function action({ request }) {
  const method = request.method

  switch(method) {
    case "POST":
      //handle post requests
      return json({ message: "Success", method: "POST" })
    case "PATCH":
      //handle patch requests
      return json({ message: "Success", method: "PATCH"})
    default:
      return new Response("Method not allowed", { status: 405 })
  }
}