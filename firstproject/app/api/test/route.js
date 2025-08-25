export function GET(req) {
  const name = req.nextUrl.searchParams.get('name');
  const age = req.nextUrl.searchParams.get('age');
  return Response.json({
    query: {
      name,
      age
    },
  });
}