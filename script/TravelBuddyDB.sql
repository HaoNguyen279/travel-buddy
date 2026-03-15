
BEGIN;

DROP TABLE IF EXISTS
  favorites,
  ratings,
  comments,
  posts,
  refreshtokens,
  places,
  users
CASCADE;

COMMIT;

-- Extension cho gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  avatar_url VARCHAR(255),
  bio TEXT,
  created_at timestamp(6) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE refreshtokens (
  token_id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,

  token_hash TEXT NOT NULL UNIQUE,

  session_id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_agent TEXT,
  ip INET,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,

  revoked_at TIMESTAMP NULL,

  replaced_by_token_id BIGINT NULL REFERENCES refreshtokens(token_id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_refreshtokens_user_id ON refreshtokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refreshtokens_expires_at ON refreshtokens(expires_at);

CREATE TABLE places (
  place_id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  category VARCHAR(50),
  image_url VARCHAR(255),
  average_rating DECIMAL(3, 2) DEFAULT 0,
  created_at timestamp DEFAULT current_timestamp
);

CREATE TABLE posts (
  post_id UUID PRIMARY KEY default gen_random_uuid(),
  user_id UUID,
  place_id INT,
  content TEXT NOT NULL,
  image_url VARCHAR(255),
  created_at timestamp DEFAULT current_timestamp,
  update_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (place_id) REFERENCES places(place_id) ON DELETE SET NULL
);

CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  post_id UUID,
  user_id UUID,
  comment_text TEXT NOT NULL,
  created_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE NO ACTION
);

CREATE TABLE ratings (
  rating_id SERIAL PRIMARY KEY,
  user_id UUID,
  place_id INT,
  score INT CHECK (score >= 1 AND score <= 5),
  review TEXT,
  created_at timestamp DEFAULT current_timestamp,
  UNIQUE(user_id, place_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (place_id) REFERENCES places(place_id) ON DELETE CASCADE
);

CREATE TABLE favorites (
  user_id UUID,
  place_id INT,
  saved_at timestamp DEFAULT current_timestamp,
  PRIMARY KEY (user_id, place_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (place_id) REFERENCES places(place_id) ON DELETE CASCADE
);

-- =========================
-- 2) SEED USERS (UUID tự sinh)
-- =========================
INSERT INTO users (username, email, password_hash, full_name, avatar_url, bio)
VALUES
('nguyenvana', 'leanhclone1@gmail.com', '$2a$12$kSptbPbTD1sKjKPoXoS/5epwQwohttmKV4S6cSkENoiyofpE4Om3m', 'Nguyễn Văn A', 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400', 'Đam mê du lịch và khám phá văn hóa'),
('tranthib', 'thib@gmail.com', '$2b$12$a2vgPHJouaMtLd4aDyD1lOK6DAqxkscmNMKPS93Mrh438uQnQlAx2', 'Trần Thị B', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', 'Travel blogger, yêu biển và núi'),
('levanc', 'vanc@yahoo.com', '$2b$12$a2vgPHJouaMtLd4aDyD1lOK6DAqxkscmNMKPS93Mrh438uQnQlAx2', 'Lê Văn C', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'Photographer chuyên chụp phong cảnh'),
('phamthid', 'thid@hotmail.com', '$2b$12$a2vgPHJouaMtLd4aDyD1lOK6DAqxkscmNMKPS93Mrh438uQnQlAx2', 'Phạm Thị D', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 'Foodie và travel enthusiast'),
('hoangvane', 'vane@gmail.com', '$2b$12$a2vgPHJouaMtLd4aDyD1lOK6DAqxkscmNMKPS93Mrh438uQnQlAx2', 'Hoàng Văn E', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', 'Backpacker, đã đi 20+ quốc gia');

-- =========================
-- 3) SEED PLACES (ví dụ 5 places đầu)
-- =========================
INSERT INTO Places (name, description, address, city, country, category, image_url, average_rating)
VALUES 
(N'Vịnh Hạ Long', N'Di sản thiên nhiên thế giới với hàng nghìn đảo đá vôi hùng vĩ.', N'Thành phố Hạ Long', N'Quảng Ninh', N'Việt Nam', N'Biển', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 4.90),
(N'Phố cổ Hội An', N'Phố cổ với kiến trúc độc đáo, đèn lồng rực rỡ và văn hóa lâu đời.', N'Phường Minh An', N'Hội An', N'Việt Nam', N'Di tích', 'https://images.unsplash.com/photo-1559592413-7cec430aa669?w=800', 4.80),
(N'Núi Fansipan', N'Nóc nhà Đông Dương cao 3.143m, điểm đến mơ ước của các trekker.', N'Thị xã Sa Pa', N'Lào Cai', N'Việt Nam', N'Núi', 'https://images.unsplash.com/photo-1623129330107-b3554b73574c?w=800', 4.75),
(N'Bãi biển Mỹ Khê', N'Một trong những bãi biển quyến rũ nhất hành tinh với cát trắng mịn.', N'Quận Sơn Trà', N'Đà Nẵng', N'Việt Nam', N'Biển', 'https://images.unsplash.com/photo-1590089415225-401d782ae4d0?w=800', 4.65),
(N'Chợ Bến Thành', N'Biểu tượng sầm uất của Sài Gòn, thiên đường ẩm thực và mua sắm.', N'Quận 1', N'TP. Hồ Chí Minh', N'Việt Nam', N'Mua sắm', 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800', 4.60),
(N'Hồ Gươm', N'Trái tim của thủ đô Hà Nội với Tháp Rùa cổ kính.', N'Hoàn Kiếm', N'Hà Nội', N'Việt Nam', N'Di tích', 'https://images.unsplash.com/photo-1555597463-22874bc7e256?w=800', 4.70),
(N'Kinh thành Huế', N'Di sản văn hóa thế giới với kiến trúc cung đình độc đáo.', N'Thành phố Huế', N'Thừa Thiên Huế', N'Việt Nam', N'Di tích', 'https://images.unsplash.com/photo-1577977468160-c9a1fa980f75?w=800', 4.65),
(N'Đà Lạt', N'Thành phố ngàn hoa với khí hậu mát mẻ quanh năm.', N'Đà Lạt', N'Lâm Đồng', N'Việt Nam', N'Núi', 'https://images.unsplash.com/photo-1558231900-349f2b8449c2?w=800', 4.80),
(N'Đảo Phú Quốc', N'Thiên đường đảo ngọc với những bãi biển tuyệt đẹp và san hô.', N'Phú Quốc', N'Kiên Giang', N'Việt Nam', N'Biển', 'https://images.unsplash.com/photo-1540202404-a6f74327ea56?w=800', 4.85),
(N'Chợ nổi Cái Răng', N'Nét văn hóa sông nước đặc trưng của miền Tây Nam Bộ.', N'Cái Răng', N'Cần Thơ', N'Việt Nam', N'Văn hóa', 'https://images.unsplash.com/photo-1578508544837-1422ab887c9a?w=800', 4.50),
(N'Mũi Né', N'Nổi tiếng với những đồi cát bay mênh mông và làng chài yên bình.', N'Phan Thiết', N'Bình Thuận', N'Việt Nam', N'Biển', 'https://images.unsplash.com/photo-1565538563351-40994f4df772?w=800', 4.60),
(N'Tam Cốc - Bích Động', N'Vịnh Hạ Long trên cạn với phong cảnh non nước hữu tình.', N'Hoa Lư', N'Ninh Bình', N'Việt Nam', N'Thiên nhiên', 'https://images.unsplash.com/photo-1596700021389-9e8cce263255?w=800', 4.70),
(N'Vườn quốc gia Phong Nha - Kẻ Bàng', N'Di sản thiên nhiên với hệ thống hang động kỳ vĩ.', N'Bố Trạch', N'Quảng Bình', N'Việt Nam', N'Hang động', 'https://images.unsplash.com/photo-1522855173708-592d4f20f019?w=800', 4.90),
(N'Thác Bản Giốc', N'Một trong những thác nước xuyên biên giới đẹp nhất thế giới.', N'Trùng Khánh', N'Cao Bằng', N'Việt Nam', N'Thiên nhiên', 'https://images.unsplash.com/photo-1627962295556-3c224424e83c?w=800', 4.80),
(N'Gành Đá Đĩa', N'Kiệt tác đá bazan hình tổ ong độc đáo bên bờ biển.', N'Tuy An', N'Phú Yên', N'Việt Nam', N'Biển', 'https://images.unsplash.com/photo-1619623773199-a3597d391f61?w=800', 4.65),
(N'Côn Đảo', N'Quần đảo hoang sơ với di tích lịch sử và bãi biển trong xanh.', N'Côn Đảo', N'Bà Rịa - Vũng Tàu', N'Việt Nam', N'Biển', 'https://images.unsplash.com/photo-1588661702967-33636737397e?w=800', 4.75),
(N'Y Tý', N'Vùng đất sương vờn mây núi, nổi tiếng với ruộng bậc thang.', N'Bát Xát', N'Lào Cai', N'Việt Nam', N'Núi', 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?w=800', 4.80),
(N'Hà Giang', N'Vùng cao nguyên đá hùng vĩ với đèo Mã Pí Lèng.', N'Hà Giang', N'Hà Giang', N'Việt Nam', N'Núi', 'https://images.unsplash.com/photo-1626021235455-25ef23a07409?w=800', 4.85),
(N'Lý Sơn', N'Đảo quốc tỏi với những vách đá nham thạch kỳ thú.', N'Lý Sơn', N'Quảng Ngãi', N'Việt Nam', N'Biển', 'https://images.unsplash.com/photo-1567303314286-979929851722?w=800', 4.70),
(N'Vịnh Lan Hạ', N'Thiên đường nghỉ dưỡng yên bình với bãi tắm hoang sơ.', N'Cát Hải', N'Hải Phòng', N'Việt Nam', N'Biển', 'https://images.unsplash.com/photo-1596500589311-64d1c92051db?w=800', 4.75),
(N'Eiffel Tower', N'The iron lady of Paris, a global cultural icon of France.', N'Champ de Mars', N'Paris', N'Pháp', N'Di tích', 'https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?w=800', 4.90),
(N'Statue of Liberty', N'A symbol of freedom and democracy standing in New York Harbor.', N'Liberty Island', N'New York', N'Mỹ', N'Di tích', 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=800', 4.85),
(N'Great Wall of China', N'Ancient series of walls and fortifications, a feat of engineering.', N'Beijing', N'Beijing', N'Trung Quốc', N'Di tích', 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800', 4.80),
(N'Machu Picchu', N'Incan citadel set high in the Andes Mountains.', N'Urubamba Province', N'Cusco', N'Peru', N'Di tích', 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800', 4.95),
(N'Colosseum', N'The largest amphitheatre ever built, symbol of Imperial Rome.', N'Piazza del Colosseo', N'Rome', N'Ý', N'Di tích', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800', 4.85),
(N'Taj Mahal', N'Ivory-white marble mausoleum on the right bank of the river Yamuna.', N'Agra', N'Uttar Pradesh', N'Ấn Độ', N'Di tích', 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800', 4.90),
(N'Sydney Opera House', N'Multi-venue performing arts centre with iconic sail layout.', N'Sydney', N'New South Wales', N'Úc', N'Kiến trúc', 'https://images.unsplash.com/photo-1624138784180-40c4efe204b7?w=800', 4.80),
(N'Santorini', N'Island in the southern Aegean Sea known for white buildings and blue domes.', N'Thira', N'Cyclades', N'Hy Lạp', N'Biển', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', 4.95),
(N'Mount Fuji', N'Japan''s highest mountain, an active volcano and cultural icon.', N'Honshu', N'Shizuoka', N'Nhật Bản', N'Núi', 'https://images.unsplash.com/photo-1578637387939-43c525550085?w=800', 4.90),
(N'Grand Canyon', N'Steep-sided canyon carved by the Colorado River.', N'Arizona', N'Arizona', N'Mỹ', N'Thiên nhiên', 'https://images.unsplash.com/photo-1474044159687-195d0cfd53bf?w=800', 4.85),
(N'Burj Khalifa', N'The tallest structure and building in the world.', N'Dubai', N'Dubai', N'UAE', N'Kiến trúc', 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800', 4.80),
(N'Kyoto', N'City famous for its numerous classical Buddhist temples and gardens.', N'Kyoto', N'Kyoto', N'Nhật Bản', N'Văn hóa', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800', 4.85),
(N'Petra', N'Historical and archaeological city famous for its rock-cut architecture.', N'Ma''an', N'Ma''an', N'Jordan', N'Di tích', 'https://images.unsplash.com/photo-1579606869400-4b53ce70c797?w=800', 4.90),
(N'Christ the Redeemer', N'Art Deco statue of Jesus Christ in Rio de Janeiro.', N'Rio de Janeiro', N'Rio de Janeiro', N'Brazil', N'Di tích', 'https://images.unsplash.com/photo-1596395819057-d3752e032eb9?w=800', 4.75),
(N'Niagara Falls', N'Group of three waterfalls at the southern end of Niagara Gorge.', N'Niagara Falls', N'Ontario/New York', N'Canada/Mỹ', N'Thiên nhiên', 'https://images.unsplash.com/photo-1583503923303-34e8bd502844?w=800', 4.85),
(N'Maldives', N'Tropical nation in the Indian Ocean known for its beaches and blue lagoons.', N'Malé', N'Malé', N'Maldives', N'Biển', 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', 4.95),
(N'Angkor Wat', N'The largest religious structure in the world by land area.', N'Siem Reap', N'Siem Reap', N'Campuchia', N'Di tích', 'https://images.unsplash.com/photo-1528114039845-6ac2bd966c89?w=800', 4.90),
(N'Cappadocia', N'Semi-arid region known for its distinctive "fairy chimneys".', N'Nevşehir', N'Central Anatolia', N'Thổ Nhĩ Kỳ', N'Thiên nhiên', 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=800', 4.95),
(N'Banff National Park', N'Canada''s oldest national park, located in the Rocky Mountains.', N'Banff', N'Alberta', N'Canada', N'Thiên nhiên', 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800', 4.90),
(N'Bali', N'Island known for its forested volcanic mountains and coral reefs.', N'Bali', N'Bali', N'Indonesia', N'Biển', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', 4.85),
(N'Yellowstone', N'Wilderness recreation area atop a volcanic hot spot.', N'Wyoming', N'Wyoming', N'Mỹ', N'Thiên nhiên', 'https://images.unsplash.com/photo-1559828882-72ccfa61730d?w=800', 4.80),
(N'Pyramids of Giza', N'The oldest and largest of the three pyramids in the Giza pyramid complex.', N'Giza', N'Cairo', N'Ai Cập', N'Di tích', 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800', 4.85),
(N'Bora Bora', N'Small South Pacific island northwest of Tahiti.', N'Leeward Islands', N'French Polynesia', N'Pháp', N'Biển', 'https://images.unsplash.com/photo-1580795478844-5ed694336c90?w=800', 4.95),
(N'Florence', N'Capital of Italy’s Tuscany region, home to masterpieces of Renaissance art.', N'Florence', N'Tuscany', N'Ý', N'Văn hóa', 'https://images.unsplash.com/photo-1534237191630-1b2c4e207d57?w=800', 4.85),
(N'Jeju Island', N'Volcanic island known for its beach resorts and volcanic landscape.', N'Jeju', N'Jeju', N'Hàn Quốc', N'Thiên nhiên', 'https://images.unsplash.com/photo-1549420077-4b1385418858?w=800', 4.75),
(N'Zhangjiajie', N'Scenic area with pillar-like formations, inspiration for Avatar.', N'Zhangjiajie', N'Hunan', N'Trung Quốc', N'Thiên nhiên', 'https://images.unsplash.com/photo-1520626337972-9f636152e646?w=800', 4.90);

-- Nếu bạn muốn seed đủ 46 places như file cũ, dán thêm vào đây.

-- =========================
-- 4) SEED POSTS (map username -> user_id UUID)
-- =========================
INSERT INTO posts (user_id, place_id, content, image_url)
VALUES
((SELECT user_id FROM users WHERE username='nguyenvana'), 1, 'Vịnh Hạ Long đẹp quá trời luôn! Nước biển xanh ngắt, không khí trong lành. Recommend mọi người nên đi 1 lần trong đời!', 'https://images.unsplash.com/photo-1526487198751-248981750278?w=800'),
((SELECT user_id FROM users WHERE username='tranthib'), 2, 'Đêm Hội An lung linh với hàng nghìn chiếc đèn lồng. Ăn cao lầu ngon tuyệt vời!', 'https://images.unsplash.com/photo-1509038287955-5c12745bf2ac?w=800'),
((SELECT user_id FROM users WHERE username='levanc'), 3, 'Chinh phục đỉnh Fansipan thành công! Mây mù bao phủ, cảnh đẹp như tranh vẽ.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'),
((SELECT user_id FROM users WHERE username='phamthid'), 4, 'Bãi biển Mỹ Khê buổi sáng sớm yên bình quá. Cát trắng mịn, sóng êm đềm.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'),
((SELECT user_id FROM users WHERE username='hoangvane'), 5, 'Mua sắm ở Bến Thành, đồ ăn vặt ngon và rẻ. Nhớ trả giá nhé mọi người!', 'https://images.unsplash.com/photo-1577083984687-320875e505ce?w=800');

-- =========================
-- 5) SEED COMMENTS
-- =========================
INSERT INTO comments (post_id, user_id, comment_text)
VALUES
((SELECT post_id FROM posts WHERE user_id = (SELECT user_id FROM users WHERE username='tranthib') AND place_id = 1 LIMIT 1), (SELECT user_id FROM users WHERE username='tranthib'), 'Đẹp quá bạn ơi! Cho mình xin review chi tiết được không?'),
((SELECT post_id FROM posts WHERE user_id = (SELECT user_id FROM users WHERE username='levanc') AND place_id = 1 LIMIT 1), (SELECT user_id FROM users WHERE username='levanc'), 'Mình cũng muốn đi Hạ Long quá, giá tour bao nhiêu vậy bạn?'),
((SELECT post_id FROM posts WHERE user_id = (SELECT user_id FROM users WHERE username='nguyenvana') AND place_id = 2 LIMIT 1), (SELECT user_id FROM users WHERE username='nguyenvana'), 'Hội An đêm đẹp thật sự! Mình đi rồi mà vẫn muốn quay lại.'),
((SELECT post_id FROM posts WHERE user_id = (SELECT user_id FROM users WHERE username='phamthid') AND place_id = 3 LIMIT 1), (SELECT user_id FROM users WHERE username='phamthid'), 'Bạn leo mất bao lâu vậy? Mình sợ không đủ sức.'),
((SELECT post_id FROM posts WHERE user_id = (SELECT user_id FROM users WHERE username='hoangvane') AND place_id = 4 LIMIT 1), (SELECT user_id FROM users WHERE username='hoangvane'), 'Đà Nẵng là thành phố đáng sống nhất Việt Nam luôn!');

-- =========================
-- 6) SEED RATINGS
-- =========================
INSERT INTO ratings (user_id, place_id, score, review)
VALUES
((SELECT user_id FROM users WHERE username='nguyenvana'), 1, 5, 'Tuyệt vời! Cảnh đẹp, dịch vụ tốt, đáng đồng tiền bát gạo.'),
((SELECT user_id FROM users WHERE username='tranthib'), 2, 5, 'Hội An là tình yêu! Sẽ quay lại nhiều lần nữa.'),
((SELECT user_id FROM users WHERE username='levanc'), 3, 4, 'Cảnh đẹp nhưng leo hơi mệt, nên đi cáp treo.'),
((SELECT user_id FROM users WHERE username='phamthid'), 4, 5, 'Bãi biển sạch, đẹp, an toàn. 10 điểm!'),
((SELECT user_id FROM users WHERE username='hoangvane'), 5, 4, 'Đông đúc nhưng trải nghiệm thú vị, nhiều món ngon.');

-- =========================
-- 7) SEED FAVORITES
-- =========================
INSERT INTO favorites (user_id, place_id)
VALUES
((SELECT user_id FROM users WHERE username='nguyenvana'), 2),
((SELECT user_id FROM users WHERE username='nguyenvana'), 3),
((SELECT user_id FROM users WHERE username='tranthib'), 1),
((SELECT user_id FROM users WHERE username='levanc'), 4),
((SELECT user_id FROM users WHERE username='phamthid'), 1),
((SELECT user_id FROM users WHERE username='hoangvane'), 2);

-- =========================
-- 8) KIỂM TRA DỮ LIỆU
-- =========================
SELECT 'users' AS table_name, COUNT(*) AS record_count FROM users
UNION ALL SELECT 'places', COUNT(*) FROM places
UNION ALL SELECT 'posts', COUNT(*) FROM posts
UNION ALL SELECT 'comments', COUNT(*) FROM comments
UNION ALL SELECT 'ratings', COUNT(*) FROM ratings
UNION ALL SELECT 'favorites', COUNT(*) FROM favorites
UNION ALL SELECT 'refreshtokens', COUNT(*) FROM refreshtokens;

SELECT
  inet_server_addr() AS host,
  inet_server_port() AS port,
  current_database() AS database,
  current_user AS user;

SELECT * FROM RefreshTokens;

select * from refreshtokens;

select * from places


