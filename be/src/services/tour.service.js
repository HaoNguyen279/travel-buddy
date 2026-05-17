const {sql, poolPromise} = require('../config/db');
const db = require('../config/postgre');
const { prisma } =  require("../../lib/prisma");


async function getAllTours() {
    const data = await prisma.tour.findMany({
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
            place_id: place_id
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
            slug: slug
        }
    });

    if (!place) return [];

    const data = await prisma.tour.findMany({
        where: {
            place_id: place.place_id
        },
        include: {
            place: true,
            category: true
        }
    });
    return data;
}

async function getToursByCategory(category_id) {
    const data = await prisma.tour.findMany({
        where: {
            category_id: category_id
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

async function createNewTour({place_id, category_id, name, description, base_price, days, nights, max_guests, min_guests, image_url}) {
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
            image_url
        }
    });
    return data;
}

async function updateTour(tour_id, {place_id, category_id, name, description, base_price, days, nights, max_guests, min_guests, image_url}) {
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
            image_url
        }
    });
    return data;
}

async function deleteTour(tour_id) {
    const data = await prisma.tour.delete({
        where: {
            tour_id: tour_id
        }
    });
    return data;
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
    deleteTour
}