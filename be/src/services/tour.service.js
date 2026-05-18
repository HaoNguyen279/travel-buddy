const {sql, poolPromise} = require('../config/db');
const db = require('../config/postgre');
const { prisma } =  require("../../lib/prisma");


async function getAllTours() {
  const data = await prisma.tour.findMany({
    where: {
      deletedAt: null,
      place: { deletedAt: null },
      category: { deletedAt: null }
    },
    include: {
      place: true,
      category: true
    }
  });
    return data;
}

async function getToursLimit(limit) {
    const data = await prisma.tour.findMany({
        take: limit,
    where: {
      deletedAt: null,
      place: { deletedAt: null },
      category: { deletedAt: null }
    },
        include: {
            place: true,
            category: true
        }
    });
    return data;
}

async function getToursByPlace(place_id) {
    const data = await prisma.tour.findMany({
        where: {
      place_id: place_id,
      deletedAt: null,
      place: { deletedAt: null },
      category: { deletedAt: null }
        },
        include: {
            place: true,
            category: true
        }
    });
    return data;
}

async function getToursByPlaceSlug(slug) {
    // Tìm place theo slug, rồi lấy toàn bộ tours của place đó
    const place = await prisma.place.findFirst({
        where: {
      slug: slug,
      deletedAt: null
        }
    });

    if (!place) return [];

    const data = await prisma.tour.findMany({
      where: {
        place_id: place.place_id,
        deletedAt: null,
        place: { deletedAt: null },
        category: { deletedAt: null }
      },
      include: {
        place: true,
        category: true,
        ratings: {
          where: { deletedAt: null },
          select: {
            rating_id: true,
            score: true,
            review: true,
            created_at: true,
            user_id: true
          }
        }
      }
    });
    return data;
}

async function getToursByCategory(category_id) {
    const data = await prisma.tour.findMany({
        where: {
      category_id: category_id,
      deletedAt: null,
      place: { deletedAt: null },
      category: { deletedAt: null }
        },
        include: {
            place: true,
            category: true
        }
    });
    return data;
}

async function getTourById(tour_id) {
  if (!tour_id) throw new Error("tour_id is required");

  const tour = await prisma.tour.findFirst({
    where: {
      tour_id,
      deletedAt: null,
    },
    include: {
      // to-one: KHÔNG được where
      place: {
        include: {
          posts: {
            where: { deletedAt: null },
            include: {
              author: {
                select: {
                  user_id: true,
                  email: true,
                  full_name: true,
                  phone: true,
                  avatar_url: true,
                  bio: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
                },
              },
              comments: {
                where: { deletedAt: null },
                include: {
                  author: {
                    select: {
                      user_id: true,
                      email: true,
                      full_name: true,
                      avatar_url: true,
                      createdAt: true,
                      updatedAt: true,
                      deletedAt: true,
                    },
                  },
                },
              },
            },
          },

          favorites: {
            where: { deletedAt: null },
            include: {
              user: {
                select: {
                  user_id: true,
                  email: true,
                  full_name: true,
                  avatar_url: true,
                  createdAt: true,
                  updatedAt: true,
                  deletedAt: true,
                },
              },
            },
          },

          tours: {
            where: { deletedAt: null },
            include: {
              category: true,
              ratings: {
                where: { deletedAt: null },
                select: {
                  rating_id: true,
                  score: true,
                  review: true,
                  created_at: true,
                  user_id: true,
                },
              },
            },
          },
        },
      },

      // to-one: KHÔNG được where
      category: {
        include: {
          tours: {
            where: { deletedAt: null },
            include: {
              place: true,
              ratings: {
                where: { deletedAt: null },
                select: {
                  rating_id: true,
                  score: true,
                  review: true,
                  created_at: true,
                  user_id: true,
                },
              },
            },
          },
        },
      },

      // to-many: dùng where/orderBy OK
      ratings: {
        where: { deletedAt: null },
        orderBy: { created_at: "desc" },
        include: {
          reviewer: {
            select: {
              user_id: true,
              firebase_uid: true,
              email: true,
              full_name: true,
              phone: true,
              avatar_url: true,
              bio: true,
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
            },
          },
        },
      },
    },
  });

  // Nếu bạn muốn loại bỏ tour có place/category đã soft delete:
  // (vì to-one không filter được bằng include)
  if (!tour) return null;
  if (tour.place?.deletedAt) return null;
  if (tour.category?.deletedAt) return null;

  return tour;
}

async function createNewTour({place_id, category_id, name, description, base_price, days, nights, max_guests, min_guests, image_url, status}) {
    const data = await prisma.tour.create({
        data: {
            place_id,
            category_id,
            name,
            description,
            base_price,
            days,
            nights,
            max_guests,
            min_guests,
      image_url,
      status
        }
    });
    return data;
}

async function updateTour(tour_id, {place_id, category_id, name, description, base_price, days, nights, max_guests, min_guests, image_url, status}) {
  const existing = await prisma.tour.findFirst({
    where: {
      tour_id: tour_id,
      deletedAt: null
    },
    select: { tour_id: true }
  });

  if (!existing) {
    throw new Error("Tour not found");
  }

    const data = await prisma.tour.update({
        where: {
            tour_id: tour_id
        },
        data: {
            place_id,
            category_id,
            name,
            description,
            base_price,
            days,
            nights,
            max_guests,
            min_guests,
      image_url,
      status
        }
    });
    return data;
}

async function deleteTour(tour_id) {
  const data = await prisma.tour.update({
    where: {
      tour_id: tour_id
    },
    data: {
      deletedAt: new Date()
    }
  });
  return data;
}

async function getTourFormData() {
  const [places, categories] = await Promise.all([
    prisma.place.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" }
    }),
    prisma.category.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" }
    })
  ]);

  return {
    places,
    categories
  };
}

async function createOrUpdateTourRating({ tour_id, user_id, score, review }) {
  if (!tour_id || !user_id) {
    throw new Error("tour_id and user_id are required");
  }

  const numericScore = Number(score);
  if (!Number.isInteger(numericScore) || numericScore < 1 || numericScore > 5) {
    throw new Error("score must be an integer between 1 and 5");
  }

  const normalizedReview = typeof review === "string" ? review.trim() : "";

  const tour = await prisma.tour.findFirst({
    where: {
      tour_id,
      deletedAt: null
    },
    select: { tour_id: true }
  });

  if (!tour) {
    throw new Error("tour not found");
  }

  const existing = await prisma.rating.findFirst({
    where: {
      tour_id,
      user_id,
      deletedAt: null
    }
  });

  let rating;
  if (existing) {
    rating = await prisma.rating.update({
      where: { rating_id: existing.rating_id },
      data: {
        score: numericScore,
        review: normalizedReview
      }
    });
  } else {
    rating = await prisma.rating.create({
      data: {
        tour_id,
        user_id,
        score: numericScore,
        review: normalizedReview
      }
    });
  }

  const ratingAggregate = await prisma.rating.aggregate({
    where: { tour_id, deletedAt: null },
    _avg: { score: true },
    _count: { _all: true }
  });

  const averageRating = Number(ratingAggregate._avg?.score ?? 0);

  await prisma.tour.update({
    where: { tour_id },
    data: { average_rating: averageRating }
  });

  const ratingWithReviewer = await prisma.rating.findUnique({
    where: { rating_id: rating.rating_id },
    include: {
      reviewer: {
        select: {
          user_id: true,
          full_name: true,
          avatar_url: true
        }
      }
    }
  });

  return {
    rating: ratingWithReviewer,
    average_rating: averageRating,
    ratings_count: ratingAggregate._count?._all ?? 0
  };
}

module.exports = {
    getAllTours,
    getToursLimit,
    getToursByPlace,
    getToursByPlaceSlug,
    getToursByCategory,
    getTourById,
    createNewTour,
    updateTour,
  deleteTour,
    createOrUpdateTourRating,
    getTourFormData
}