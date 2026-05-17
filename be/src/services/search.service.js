const { prisma } = require("../../lib/prisma");

async function searchAll(rawQuery, limit = 6) {
  const query = String(rawQuery || "").trim();
  if (!query) {
    return { query: "", items: [] };
  }

  const take = Number.isFinite(Number(limit)) ? Number(limit) : 6;

  const [tours, places] = await Promise.all([
    prisma.tour.findMany({
      where: {
        deletedAt: null,
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      take,
      orderBy: { average_rating: "desc" },
      include: {
        place: {
          select: {
            name: true,
            slug: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        _count: {
          select: { ratings: true },
        },
      },
    }),
    prisma.place.findMany({
      where: {
        deletedAt: null,
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      take,
      orderBy: { average_rating: "desc" },
      select: {
        place_id: true,
        name: true,
        slug: true,
        image_url: true,
        average_rating: true,
      },
    }),
  ]);

  const items = [
    ...tours.map((tour) => ({
      type: "tour",
      tour_id: tour.tour_id,
      name: tour.name,
      image_url: tour.image_url,
      average_rating: tour.average_rating,
      base_price: tour.base_price,
      days: tour.days,
      nights: tour.nights,
      booking_count: tour.booking_count,
      ratings_count: tour._count?.ratings ?? 0,
      place: tour.place,
      category: tour.category,
    })),
    ...places.map((place) => ({
      type: "place",
      place_id: place.place_id,
      name: place.name,
      slug: place.slug,
      image_url: place.image_url,
      average_rating: place.average_rating,
    })),
  ];

  return { query, items };
}

module.exports = {
  searchAll,
};
