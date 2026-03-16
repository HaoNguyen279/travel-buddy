-- =========================================================
-- SEED DATA - match Prisma schema (PostgreSQL)
-- Date: 2026-03-15
-- =========================================================

BEGIN;

-- Optional: clear data (đúng thứ tự để tránh FK nếu sau này bạn thêm FK)
-- Hiện schema Prisma bạn gửi chưa khai báo @relation, nhưng mình vẫn để thứ tự hợp lý.
TRUNCATE TABLE "Favorite" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Rating" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Comment" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Post" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Place" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;

-- =========================
-- 1) SEED USERS
-- =========================
INSERT INTO "User" (user_id, username, email, password_hash, full_name, avatar_url, bio, "createdAt", "updatedAt")
VALUES
(gen_random_uuid(), 'nguyenvana', 'leanhclone1@gmail.com', '$2a$12$kSptbPbTD1sKjKPoXoS/5epwQwohttmKV4S6cSkENoiyofpE4Om3m', 'Nguyễn Văn A', 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400', 'Đam mê du lịch và khám phá văn hóa', now(), now()),
(gen_random_uuid(), 'tranthib',   'thib@gmail.com',         '$2b$12$a2vgPHJouaMtLd4aDyD1lOK6DAqxkscmNMKPS93Mrh438uQnQlAx2', 'Trần Thị B',    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', 'Travel blogger, yêu biển và núi', now(), now()),
(gen_random_uuid(), 'levanc',     'vanc@yahoo.com',        '$2b$12$a2vgPHJouaMtLd4aDyD1lOK6DAqxkscmNMKPS93Mrh438uQnQlAx2', 'Lê Văn C',      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'Photographer chuyên chụp phong cảnh', now(), now()),
(gen_random_uuid(), 'phamthid',   'thid@hotmail.com',      '$2b$12$a2vgPHJouaMtLd4aDyD1lOK6DAqxkscmNMKPS93Mrh438uQnQlAx2', 'Phạm Thị D',    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 'Foodie và travel enthusiast', now(), now()),
(gen_random_uuid(), 'hoangvane',  'vane@gmail.com',        '$2b$12$a2vgPHJouaMtLd4aDyD1lOK6DAqxkscmNMKPS93Mrh438uQnQlAx2', 'Hoàng Văn E',   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', 'Backpacker, đã đi 20+ quốc gia', now(), now());

-- =========================
-- 2) SEED PLACES
-- =========================
INSERT INTO "Place" (name, description, address, city, country, category, image_url, average_rating, "createdAt", "updatedAt")
VALUES
('Vịnh Hạ Long', 'Di sản thiên nhiên thế giới với hàng nghìn đảo đá vôi hùng vĩ.', 'Thành phố Hạ Long', 'Quảng Ninh', 'Việt Nam', 'Biển', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 4.90, now(), now()),
('Phố cổ Hội An', 'Phố cổ với kiến trúc độc đáo, đèn lồng rực rỡ và văn hóa lâu đời.', 'Phường Minh An', 'Hội An', 'Việt Nam', 'Di tích', 'https://images.unsplash.com/photo-1559592413-7cec430aa669?w=800', 4.80, now(), now()),
('Núi Fansipan', 'Nóc nhà Đông Dương cao 3.143m, điểm đến mơ ước của các trekker.', 'Thị xã Sa Pa', 'Lào Cai', 'Việt Nam', 'Núi', 'https://images.unsplash.com/photo-1623129330107-b3554b73574c?w=800', 4.75, now(), now()),
('Bãi biển Mỹ Khê', 'Một trong những bãi biển quyến rũ nhất hành tinh với cát trắng mịn.', 'Quận Sơn Trà', 'Đà Nẵng', 'Việt Nam', 'Biển', 'https://images.unsplash.com/photo-1590089415225-401d782ae4d0?w=800', 4.65, now(), now()),
('Chợ Bến Thành', 'Biểu tượng sầm uất của Sài Gòn, thiên đường ẩm thực và mua sắm.', 'Quận 1', 'TP. Hồ Chí Minh', 'Việt Nam', 'Mua sắm', 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800', 4.60, now(), now());

-- =========================
-- 3) SEED POSTS
-- Post.post_id là UUID, user_id là UUID, place_id là Int
-- =========================
INSERT INTO "Post" (post_id, user_id, place_id, content, image_url, "createdAt", "updatedAt")
VALUES
(
  gen_random_uuid(),
  (SELECT user_id FROM "User" WHERE username='nguyenvana'),
  (SELECT place_id FROM "Place" WHERE name='Vịnh Hạ Long'),
  'Vịnh Hạ Long đẹp quá trời luôn! Nước biển xanh ngắt, không khí trong lành. Recommend mọi người nên đi 1 lần trong đời!',
  'https://images.unsplash.com/photo-1526487198751-248981750278?w=800',
  now(), now()
),
(
  gen_random_uuid(),
  (SELECT user_id FROM "User" WHERE username='tranthib'),
  (SELECT place_id FROM "Place" WHERE name='Phố cổ Hội An'),
  'Đêm Hội An lung linh với hàng nghìn chiếc đèn lồng. Ăn cao lầu ngon tuyệt vời!',
  'https://images.unsplash.com/photo-1509038287955-5c12745bf2ac?w=800',
  now(), now()
),
(
  gen_random_uuid(),
  (SELECT user_id FROM "User" WHERE username='levanc'),
  (SELECT place_id FROM "Place" WHERE name='Núi Fansipan'),
  'Chinh phục đỉnh Fansipan thành công! Mây mù bao phủ, cảnh đẹp như tranh vẽ.',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
  now(), now()
),
(
  gen_random_uuid(),
  (SELECT user_id FROM "User" WHERE username='phamthid'),
  (SELECT place_id FROM "Place" WHERE name='Bãi biển Mỹ Khê'),
  'Bãi biển Mỹ Khê buổi sáng sớm yên bình quá. Cát trắng mịn, sóng êm đềm.',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  now(), now()
),
(
  gen_random_uuid(),
  (SELECT user_id FROM "User" WHERE username='hoangvane'),
  (SELECT place_id FROM "Place" WHERE name='Chợ Bến Thành'),
  'Mua sắm ở Bến Thành, đồ ăn vặt ngon và rẻ. Nhớ trả giá nhé mọi người!',
  'https://images.unsplash.com/photo-1577083984687-320875e505ce?w=800',
  now(), now()
);

-- =========================
-- 4) SEED COMMENTS
-- Comment: post_id UUID, user_id UUID, comment_id autoincrement, created_at default(now())
-- =========================
INSERT INTO "Comment" (post_id, user_id, comment_text)
VALUES
(
  (SELECT p.post_id FROM "Post" p
   JOIN "User" u ON u.user_id = p.user_id
   JOIN "Place" pl ON pl.place_id = p.place_id
   WHERE u.username='nguyenvana' AND pl.name='Vịnh Hạ Long'
   LIMIT 1),
  (SELECT user_id FROM "User" WHERE username='tranthib'),
  'Đẹp quá bạn ơi! Cho mình xin review chi tiết được không?'
),
(
  (SELECT p.post_id FROM "Post" p
   JOIN "User" u ON u.user_id = p.user_id
   JOIN "Place" pl ON pl.place_id = p.place_id
   WHERE u.username='nguyenvana' AND pl.name='Vịnh Hạ Long'
   LIMIT 1),
  (SELECT user_id FROM "User" WHERE username='levanc'),
  'Mình cũng muốn đi Hạ Long quá, giá tour bao nhiêu vậy bạn?'
),
(
  (SELECT p.post_id FROM "Post" p
   JOIN "User" u ON u.user_id = p.user_id
   JOIN "Place" pl ON pl.place_id = p.place_id
   WHERE u.username='tranthib' AND pl.name='Phố cổ Hội An'
   LIMIT 1),
  (SELECT user_id FROM "User" WHERE username='nguyenvana'),
  'Hội An đêm đẹp thật sự! Mình đi rồi mà vẫn muốn quay lại.'
),
(
  (SELECT p.post_id FROM "Post" p
   JOIN "User" u ON u.user_id = p.user_id
   JOIN "Place" pl ON pl.place_id = p.place_id
   WHERE u.username='levanc' AND pl.name='Núi Fansipan'
   LIMIT 1),
  (SELECT user_id FROM "User" WHERE username='phamthid'),
  'Bạn leo mất bao lâu vậy? Mình sợ không đủ sức.'
),
(
  (SELECT p.post_id FROM "Post" p
   JOIN "User" u ON u.user_id = p.user_id
   JOIN "Place" pl ON pl.place_id = p.place_id
   WHERE u.username='phamthid' AND pl.name='Bãi biển Mỹ Khê'
   LIMIT 1),
  (SELECT user_id FROM "User" WHERE username='hoangvane'),
  'Đà Nẵng là thành phố đáng sống nhất Việt Nam luôn!'
);

-- =========================
-- 5) SEED RATINGS
-- Rating.review là bắt buộc theo schema (String), score default 0
-- =========================
INSERT INTO "Rating" (user_id, place_id, score, review)
VALUES
((SELECT user_id FROM "User" WHERE username='nguyenvana'), (SELECT place_id FROM "Place" WHERE name='Vịnh Hạ Long'), 5, 'Tuyệt vời! Cảnh đẹp, dịch vụ tốt, đáng đồng tiền bát gạo.'),
((SELECT user_id FROM "User" WHERE username='tranthib'),   (SELECT place_id FROM "Place" WHERE name='Phố cổ Hội An'), 5, 'Hội An là tình yêu! Sẽ quay lại nhiều lần nữa.'),
((SELECT user_id FROM "User" WHERE username='levanc'),     (SELECT place_id FROM "Place" WHERE name='Núi Fansipan'), 4, 'Cảnh đẹp nhưng leo hơi mệt, nên đi cáp treo.'),
((SELECT user_id FROM "User" WHERE username='phamthid'),   (SELECT place_id FROM "Place" WHERE name='Bãi biển Mỹ Khê'), 5, 'Bãi biển sạch, đẹp, an toàn. 10 điểm!'),
((SELECT user_id FROM "User" WHERE username='hoangvane'),  (SELECT place_id FROM "Place" WHERE name='Chợ Bến Thành'), 4, 'Đông đúc nhưng trải nghiệm thú vị, nhiều món ngon.');

-- =========================
-- 6) SEED FAVORITES
-- Favorite: composite key (user_id, place_id)
-- =========================
INSERT INTO "Favorite" (user_id, place_id)
VALUES
((SELECT user_id FROM "User" WHERE username='nguyenvana'), (SELECT place_id FROM "Place" WHERE name='Phố cổ Hội An')),
((SELECT user_id FROM "User" WHERE username='nguyenvana'), (SELECT place_id FROM "Place" WHERE name='Núi Fansipan')),
((SELECT user_id FROM "User" WHERE username='tranthib'),   (SELECT place_id FROM "Place" WHERE name='Vịnh Hạ Long')),
((SELECT user_id FROM "User" WHERE username='levanc'),     (SELECT place_id FROM "Place" WHERE name='Bãi biển Mỹ Khê')),
((SELECT user_id FROM "User" WHERE username='phamthid'),   (SELECT place_id FROM "Place" WHERE name='Vịnh Hạ Long')),
((SELECT user_id FROM "User" WHERE username='hoangvane'),  (SELECT place_id FROM "Place" WHERE name='Phố cổ Hội An'));

-- =========================
-- 7) KIỂM TRA DỮ LIỆU
-- =========================
SELECT 'User' AS table_name, COUNT(*) AS record_count FROM "User"
UNION ALL SELECT 'Place', COUNT(*) FROM "Place"
UNION ALL SELECT 'Post', COUNT(*) FROM "Post"
UNION ALL SELECT 'Comment', COUNT(*) FROM "Comment"
UNION ALL SELECT 'Rating', COUNT(*) FROM "Rating"
UNION ALL SELECT 'Favorite', COUNT(*) FROM "Favorite";

COMMIT;