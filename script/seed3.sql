--
-- PostgreSQL database dump
--

\restrict 9aHPGC2ydpmDScIXSZrppm5RlaDUTxrHGbPgOXI1ICP8qKihtwTfP5HyZzhxETv

-- Dumped from database version 17.7
-- Dumped by pg_dump version 17.7

-- Started on 2026-05-18 09:55:29

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4954 (class 0 OID 123818)
-- Dependencies: 224
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Category" VALUES ('a896d116-8632-47f8-875e-0e6daf7a9c50', 'Adventure', 'Mạo hiểm, leo núi, trekking.', '2026-04-03 14:51:59.09', '2026-05-12 14:51:59.09', NULL);
INSERT INTO public."Category" VALUES ('9a3426e1-ae0a-4133-a091-e431cfe3e49a', 'Relax', 'Nghỉ dưỡng, resort, spa.', '2026-04-04 14:51:59.09', '2026-05-11 14:51:59.09', NULL);
INSERT INTO public."Category" VALUES ('5a51d77e-571d-4755-b4ff-989dcee8ca83', 'Culture', 'Văn hoá, di sản, lịch sử.', '2026-04-05 14:51:59.09', '2026-05-10 14:51:59.09', NULL);
INSERT INTO public."Category" VALUES ('84520d43-83cf-41ae-b322-8ca690716873', 'Food', 'Ẩm thực, food tour.', '2026-04-06 14:51:59.09', '2026-05-09 14:51:59.09', NULL);
INSERT INTO public."Category" VALUES ('f89db568-ea65-456e-900d-675e80249fbe', 'Nature', 'Thiên nhiên, cảnh quan.', '2026-04-07 14:51:59.09', '2026-05-08 14:51:59.09', NULL);
INSERT INTO public."Category" VALUES ('725b238b-84c8-4d27-8cca-2cfa10159615', 'Photography', 'Chụp ảnh, săn mây.', '2026-04-08 14:51:59.09', '2026-05-07 14:51:59.09', NULL);
INSERT INTO public."Category" VALUES ('e329c295-3ec8-4190-afa6-2ef1c83aa516', 'Family', 'Phù hợp gia đình.', '2026-04-09 14:51:59.09', '2026-05-06 14:51:59.09', NULL);
INSERT INTO public."Category" VALUES ('fc71e164-1abf-44c9-aa13-53f37227f26f', 'Weekend', 'Đi cuối tuần.', '2026-04-10 14:51:59.09', '2026-05-05 14:51:59.09', NULL);
INSERT INTO public."Category" VALUES ('5dc1a8e2-f04d-4912-a5a5-7cb35363be85', 'Budget', 'Tiết kiệm.', '2026-04-11 14:51:59.09', '2026-05-04 14:51:59.09', NULL);
INSERT INTO public."Category" VALUES ('c59df1a6-73a5-485b-8121-7c163b4995eb', 'Luxury', 'Cao cấp.', '2026-04-12 14:51:59.09', '2026-05-03 14:51:59.09', NULL);


--
-- TOC entry 4953 (class 0 OID 123809)
-- Dependencies: 223
-- Data for Name: Place; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Place" VALUES ('732a7153-0cf7-4368-8627-bd21e1c2bd4c', 'Hồ Gươm', 'Hồ Gươm (Hồ Hoàn Kiếm) là trái tim của Hà Nội, nổi bật với mặt nước xanh yên bình và các biểu tượng như Tháp Rùa, cầu Thê Húc. Không gian quanh hồ rất thích hợp để tản bộ, tập thể dục và cảm nhận nhịp sống thủ đô. Buổi sáng thanh bình, buổi tối lung linh ánh đèn, gợi nhớ truyền thuyết vua Lê trả gươm – một dấu ấn văn hóa thiêng liêng của người Việt.', 'P. Hàng Trống', 'Hà Nội', 'Việt Nam', 'ho-guom', 'https://picsum.photos/id/1043/800/600', 4.6, '2026-03-14 14:51:59.09', '2026-05-12 14:51:59.09', NULL);
INSERT INTO public."Place" VALUES ('be93b4db-9d22-4b0a-9f3b-892709b6bca3', 'Fansipan', 'Fansipan là “Nóc nhà Đông Dương” thuộc dãy Hoàng Liên Sơn (Lào Cai), điểm đến lý tưởng cho người yêu khám phá. Bạn có thể trekking hoặc đi cáp treo để ngắm toàn cảnh núi rừng Tây Bắc và “biển mây” kỳ ảo. Khu vực đỉnh còn có quần thể tâm linh với chùa, tượng và kiến trúc đặc trưng vùng cao, đẹp quanh năm.', 'Sa Pa', 'Lào Cai', 'Việt Nam', 'fansipan', 'https://picsum.photos/id/1036/800/600', 4.5, '2026-03-17 14:51:59.09', '2026-05-09 14:51:59.09', NULL);
INSERT INTO public."Place" VALUES ('a37c322a-aee8-4e9b-9fb2-cd38d379a145', 'Bà Nà Hills', 'Bà Nà Hills (Đà Nẵng) được ví như “châu Âu thu nhỏ” với khí hậu mát mẻ, cảnh sắc mây núi và hệ thống cáp treo ấn tượng. Điểm check-in nổi bật nhất là Cầu Vàng với đôi bàn tay khổng lồ. Ngoài ra còn có làng Pháp, khu vui chơi trong nhà và nhiều lễ hội quanh năm, phù hợp cho gia đình và nhóm bạn.', 'Hòa Ninh', 'Đà Nẵng', 'Việt Nam', 'ba-na-hills', 'https://picsum.photos/id/1041/800/600', 4.4, '2026-03-18 14:51:59.09', '2026-05-08 14:51:59.09', NULL);
INSERT INTO public."Place" VALUES ('9ccbba14-73c9-47ba-b162-fe3e2bf67523', 'Phố cổ Hội An', 'Phố cổ Hội An quyến rũ bởi những con phố vàng cổ kính, mái ngói rêu phong và đèn lồng rực rỡ bên sông Hoài. Nơi đây lưu giữ dấu ấn thương cảng xưa với sự giao thoa văn hóa Việt – Nhật – Hoa – phương Tây. Buổi tối, Hội An lung linh huyền ảo, rất hợp để dạo chơi, thả đèn hoa đăng và thưởng thức đặc sản như cao lầu, mì Quảng, bánh mì.', 'Minh An', 'Hội An', 'Việt Nam', 'hoi-an-old-town', 'https://picsum.photos/id/1060/800/600', 4.7, '2026-03-15 14:51:59.09', '2026-05-11 14:51:59.09', NULL);
INSERT INTO public."Place" VALUES ('f45b0b15-1df1-4621-9fb2-63209a78f422', 'Vịnh Hạ Long', 'Vịnh Hạ Long (Quảng Ninh) là Di sản Thiên nhiên Thế giới với hàng nghìn đảo đá vôi giữa làn nước xanh ngọc. Du khách có thể đi du thuyền, chèo kayak, khám phá hang động nổi tiếng như Sửng Sốt, Thiên Cung. Mỗi thời điểm trong ngày, vịnh lại mang vẻ đẹp khác nhau, từ sương sớm huyền ảo đến hoàng hôn rực rỡ trên biển.', 'Bãi Cháy', 'Hạ Long', 'Việt Nam', 'ha-long-bay', 'https://picsum.photos/id/1019/800/600', 4.8, '2026-03-16 14:51:59.09', '2026-05-10 14:51:59.09', NULL);
INSERT INTO public."Place" VALUES ('0e131163-6b05-4d7b-b13d-d93981ae0b53', 'Chợ Bến Thành', 'Chợ Bến Thành là biểu tượng mua sắm – ẩm thực nổi tiếng của TP.HCM, dễ nhận ra với tháp đồng hồ ở cổng chính. Bên trong là nhiều gian hàng bán quà lưu niệm, thủ công mỹ nghệ và đặc sản địa phương. Khu ẩm thực hấp dẫn với các món quen thuộc như cơm tấm, bún bò, bánh xèo, chè. Về tối, khu chợ đêm càng nhộn nhịp và rực rỡ.', 'Lê Lợi', 'Hồ Chí Minh', 'Việt Nam', 'ben-thanh-market', 'https://picsum.photos/id/1050/800/600', 4.1, '2026-03-19 14:51:59.09', '2026-05-07 14:51:59.09', NULL);
INSERT INTO public."Place" VALUES ('2602080f-01d9-48e1-bd1a-84665dd4db69', 'Đảo Phú Quốc', 'Đảo Phú Quốc (Kiên Giang) là “đảo ngọc” với biển xanh, cát trắng và nhiều bãi đẹp như Bãi Sao, Bãi Dài, Bãi Khem. Ngoài tắm biển, bạn có thể lặn ngắm san hô, đi cano khám phá đảo nhỏ, trải nghiệm cáp treo vượt biển và tham quan rừng quốc gia. Phú Quốc còn nổi tiếng hải sản, nước mắm, hồ tiêu và hoàng hôn rất đẹp.', 'Dương Đông', 'Phú Quốc', 'Việt Nam', 'phu-quoc', 'https://picsum.photos/id/1056/800/600', 4.6, '2026-03-20 14:51:59.09', '2026-05-06 14:51:59.09', NULL);
INSERT INTO public."Place" VALUES ('66b3d3e1-97a7-4930-bb2e-a5503bf1c0a3', 'Đà Lạt', 'Đà Lạt (Lâm Đồng) có khí hậu mát mẻ quanh năm, đồi thông, hồ nước và hoa nở bốn mùa nên được gọi là “thành phố ngàn hoa”. Bạn có thể ghé hồ Xuân Hương, đồi chè Cầu Đất, thung lũng Tình Yêu, các vườn hoa và chợ đêm. Ẩm thực đặc trưng như bánh tráng nướng, lẩu gà lá é, sữa đậu nành nóng rất hợp tiết trời se lạnh.', 'Trung tâm', 'Đà Lạt', 'Việt Nam', 'da-lat', 'https://picsum.photos/id/1067/800/600', 4.3, '2026-03-21 14:51:59.09', '2026-05-05 14:51:59.09', NULL);
INSERT INTO public."Place" VALUES ('82345214-4419-4975-9202-551078b9d642', 'Ninh Bình', 'Ninh Bình được ví như “Vịnh Hạ Long trên cạn” với núi đá vôi, sông nước và cảnh sắc hữu tình. Nổi bật là Tràng An (UNESCO), nơi bạn đi thuyền qua hang động và thung lũng xanh mát. Ngoài ra còn có Tam Cốc – Bích Động, Hang Múa, cố đô Hoa Lư, chùa Bái Đính. Đặc sản nổi tiếng gồm dê núi và cơm cháy.', 'Gia Viễn', 'Ninh Bình', 'Việt Nam', 'ninh-binh', 'https://picsum.photos/id/1074/800/600', 4.5, '2026-03-22 14:51:59.09', '2026-05-04 14:51:59.09', NULL);
INSERT INTO public."Place" VALUES ('67adb532-033a-49e0-9319-2dea87d5bd77', 'Mũi Né', 'Mũi Né (Phan Thiết, Bình Thuận) nổi tiếng với biển đẹp, nắng ấm và các resort dọc bờ biển. Điểm đặc trưng là đồi cát trắng – đỏ rộng lớn, rất hợp trượt cát, lái xe địa hình và ngắm bình minh. Nhờ gió tốt, Mũi Né còn hấp dẫn với lướt ván diều, thể thao biển. Bạn cũng có thể ghé làng chài và thưởng thức hải sản tươi ngon.', 'Hàm Tiến', 'Phan Thiết', 'Việt Nam', 'mui-ne', 'https://picsum.photos/id/1084/800/600', 4.2, '2026-03-23 14:51:59.09', '2026-05-03 14:51:59.09', NULL);


--
-- TOC entry 4950 (class 0 OID 123790)
-- Dependencies: 220
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."User" VALUES ('e129d2a2-e1c5-4303-95dc-2a3e7e60788f', 'fb_uid_001', 'user01@example.com', 'Nguyễn Văn An', '0900000001', 'https://picsum.photos/id/1011/200/200', 'Thích du lịch và chụp ảnh.', '2026-04-13 14:51:59.09', '2026-05-12 14:51:59.09', NULL);
INSERT INTO public."User" VALUES ('f74c7bba-c5b7-484d-9f3c-6071219644ed', 'fb_uid_002', 'user02@example.com', 'Trần Thị Bình', '0900000002', 'https://picsum.photos/id/1012/200/200', 'Foodie chính hiệu.', '2026-04-14 14:51:59.09', '2026-05-11 14:51:59.09', NULL);
INSERT INTO public."User" VALUES ('cde424a7-32cc-4f1e-a7eb-b8bc5f383f38', 'fb_uid_003', 'user03@example.com', 'Lê Quốc Cường', '0900000003', 'https://picsum.photos/id/1013/200/200', 'Đam mê trekking.', '2026-04-15 14:51:59.09', '2026-05-10 14:51:59.09', NULL);
INSERT INTO public."User" VALUES ('bd181cc9-1130-44cd-864d-183e1ef30c8a', 'fb_uid_004', 'user04@example.com', 'Phạm Mỹ Duyên', '0900000004', 'https://picsum.photos/id/1014/200/200', 'Sống chậm, đi nhiều.', '2026-04-16 14:51:59.09', '2026-05-09 14:51:59.09', NULL);
INSERT INTO public."User" VALUES ('e0455af1-a32e-4f1a-9156-c5e8e7a63681', 'fb_uid_005', 'user05@example.com', 'Hoàng Gia Huy', '0900000005', 'https://picsum.photos/id/1015/200/200', 'Thích khám phá văn hoá.', '2026-04-17 14:51:59.09', '2026-05-08 14:51:59.09', NULL);
INSERT INTO public."User" VALUES ('91c3891e-cf30-48be-b618-59c41e219ec1', NULL, 'user06@example.com', 'Đỗ Minh Khang', '0900000006', 'https://picsum.photos/id/1016/200/200', 'Đi để trở về.', '2026-04-18 14:51:59.09', '2026-05-07 14:51:59.09', NULL);
INSERT INTO public."User" VALUES ('04095c17-b0db-4b48-9b09-549867b90827', NULL, 'user07@example.com', 'Vũ Hải Linh', '0900000007', 'https://picsum.photos/id/1018/200/200', 'Chụp ảnh film.', '2026-04-19 14:51:59.09', '2026-05-06 14:51:59.09', NULL);
INSERT INTO public."User" VALUES ('06367957-a638-4ac2-8aa9-330b7f395faa', 'fb_uid_008', 'user08@example.com', 'Bùi Thanh Long', '0900000008', 'https://picsum.photos/id/1020/200/200', 'Thích biển.', '2026-04-20 14:51:59.09', '2026-05-05 14:51:59.09', NULL);
INSERT INTO public."User" VALUES ('94b80d50-c6e7-418d-9f3c-60966f70ae3c', 'fb_uid_009', 'user09@example.com', 'Ngô Thu Mai', '0900000009', 'https://picsum.photos/id/1021/200/200', 'Ưu tiên trải nghiệm.', '2026-04-21 14:51:59.09', '2026-05-04 14:51:59.09', NULL);
INSERT INTO public."User" VALUES ('741ab253-d8f9-48d9-96b8-f18d256c2ff6', 'fb_uid_010', 'user10@example.com', 'Đặng Đức Nam', '0900000010', 'https://picsum.photos/id/1022/200/200', 'Yêu núi rừng.', '2026-04-22 14:51:59.09', '2026-05-03 14:51:59.09', NULL);
INSERT INTO public."User" VALUES ('949a9e7a-38fe-4faf-a1b4-3162a34ca86d', 'hRR5P87cn0XmrKR7V6as8pQsgX02', 'dragon2792311@gmail.com', '', NULL, NULL, NULL, '2026-05-17 16:56:33.486', '2026-05-17 16:56:33.486', NULL);
INSERT INTO public."User" VALUES ('4d6716ef-d233-48cd-a305-c5081dc51751', 'hOHYS1dgNiV9uRMfe35CB3x4nAm2', 'leanhclone1@gmail.com', 'Anh Le', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocLyTHGMkctqSNranF4xhUHm2sAJilq6JsJ4wuLDBHsDiMKKnQ=s96-c', NULL, '2026-05-17 18:12:06.871', '2026-05-17 18:16:56.453', NULL);


--
-- TOC entry 4957 (class 0 OID 123845)
-- Dependencies: 227
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Post" VALUES ('71c7f0b2-444c-4dae-a55b-147aa5c79706', 'e129d2a2-e1c5-4303-95dc-2a3e7e60788f', 'a37c322a-aee8-4e9b-9fb2-cd38d379a145', 'Bài viết #1: Trải nghiệm tại Bà Nà Hills rất tuyệt!', 'https://picsum.photos/seed/post1/900/600', '2026-05-12 14:51:59.09', '2026-05-13 14:21:59.09', NULL);
INSERT INTO public."Post" VALUES ('1c78e326-b6ed-4d5f-8d0b-3a7f34eb6818', 'f74c7bba-c5b7-484d-9f3c-6071219644ed', '0e131163-6b05-4d7b-b13d-d93981ae0b53', 'Bài viết #2: Trải nghiệm tại Chợ Bến Thành rất tuyệt!', 'https://picsum.photos/seed/post2/900/600', '2026-05-11 14:51:59.09', '2026-05-13 14:21:59.09', NULL);
INSERT INTO public."Post" VALUES ('cd89caf1-b9da-4c24-a5df-504b569e7a2d', 'cde424a7-32cc-4f1e-a7eb-b8bc5f383f38', '66b3d3e1-97a7-4930-bb2e-a5503bf1c0a3', 'Bài viết #3: Trải nghiệm tại Đà Lạt rất tuyệt!', 'https://picsum.photos/seed/post3/900/600', '2026-05-10 14:51:59.09', '2026-05-13 14:21:59.09', NULL);
INSERT INTO public."Post" VALUES ('5b35f3b1-48dd-4c77-bc0f-a13b37a252d7', 'bd181cc9-1130-44cd-864d-183e1ef30c8a', '2602080f-01d9-48e1-bd1a-84665dd4db69', 'Bài viết #4: Trải nghiệm tại Đảo Phú Quốc rất tuyệt!', 'https://picsum.photos/seed/post4/900/600', '2026-05-09 14:51:59.09', '2026-05-13 14:21:59.09', NULL);
INSERT INTO public."Post" VALUES ('7d8e9449-a62f-4320-a83e-2bc897729ab1', 'e0455af1-a32e-4f1a-9156-c5e8e7a63681', 'be93b4db-9d22-4b0a-9f3b-892709b6bca3', 'Bài viết #5: Trải nghiệm tại Fansipan rất tuyệt!', 'https://picsum.photos/seed/post5/900/600', '2026-05-08 14:51:59.09', '2026-05-13 14:21:59.09', NULL);
INSERT INTO public."Post" VALUES ('c852dd45-f2ec-4f1f-befd-51dff332f0ce', '91c3891e-cf30-48be-b618-59c41e219ec1', '732a7153-0cf7-4368-8627-bd21e1c2bd4c', 'Bài viết #6: Trải nghiệm tại Hồ Gươm rất tuyệt!', 'https://picsum.photos/seed/post6/900/600', '2026-05-07 14:51:59.09', '2026-05-13 14:21:59.09', NULL);
INSERT INTO public."Post" VALUES ('c37d857e-c1a3-4efe-a054-3eeeba1e17ec', '04095c17-b0db-4b48-9b09-549867b90827', '67adb532-033a-49e0-9319-2dea87d5bd77', 'Bài viết #7: Trải nghiệm tại Mũi Né rất tuyệt!', 'https://picsum.photos/seed/post7/900/600', '2026-05-06 14:51:59.09', '2026-05-13 14:21:59.09', NULL);
INSERT INTO public."Post" VALUES ('5a037967-a71d-4e64-8e7d-7b59178213c6', '06367957-a638-4ac2-8aa9-330b7f395faa', '82345214-4419-4975-9202-551078b9d642', 'Bài viết #8: Trải nghiệm tại Ninh Bình rất tuyệt!', 'https://picsum.photos/seed/post8/900/600', '2026-05-05 14:51:59.09', '2026-05-13 14:21:59.09', NULL);
INSERT INTO public."Post" VALUES ('1622a592-85e7-4f3b-aa6b-695a65e0c32b', '94b80d50-c6e7-418d-9f3c-60966f70ae3c', '9ccbba14-73c9-47ba-b162-fe3e2bf67523', 'Bài viết #9: Trải nghiệm tại Phố cổ Hội An rất tuyệt!', 'https://picsum.photos/seed/post9/900/600', '2026-05-04 14:51:59.09', '2026-05-13 14:21:59.09', NULL);
INSERT INTO public."Post" VALUES ('b37a5613-2e74-430c-b333-59eeb92408a8', '741ab253-d8f9-48d9-96b8-f18d256c2ff6', 'f45b0b15-1df1-4621-9fb2-63209a78f422', 'Bài viết #10: Trải nghiệm tại Vịnh Hạ Long rất tuyệt!', 'https://picsum.photos/seed/post10/900/600', '2026-05-03 14:51:59.09', '2026-05-13 14:21:59.09', NULL);


--
-- TOC entry 4958 (class 0 OID 123853)
-- Dependencies: 228
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Comment" VALUES ('55018aa9-6c25-4755-8cb6-6abcf758a5be', '1622a592-85e7-4f3b-aa6b-695a65e0c32b', 'e129d2a2-e1c5-4303-95dc-2a3e7e60788f', 'Comment #1: Hay quá, cảm ơn bạn đã chia sẻ!', '2026-05-13 13:51:59.09', NULL);
INSERT INTO public."Comment" VALUES ('4d02009e-c514-4a7c-bcb2-6b228388c7ad', '1c78e326-b6ed-4d5f-8d0b-3a7f34eb6818', 'f74c7bba-c5b7-484d-9f3c-6071219644ed', 'Comment #2: Hay quá, cảm ơn bạn đã chia sẻ!', '2026-05-13 12:51:59.09', NULL);
INSERT INTO public."Comment" VALUES ('c165ef19-c4ab-4223-9978-417b0a40ff51', '5a037967-a71d-4e64-8e7d-7b59178213c6', 'cde424a7-32cc-4f1e-a7eb-b8bc5f383f38', 'Comment #3: Hay quá, cảm ơn bạn đã chia sẻ!', '2026-05-13 11:51:59.09', NULL);
INSERT INTO public."Comment" VALUES ('c55843aa-e7cb-40e8-9ce1-5084601e1f85', '5b35f3b1-48dd-4c77-bc0f-a13b37a252d7', 'bd181cc9-1130-44cd-864d-183e1ef30c8a', 'Comment #4: Hay quá, cảm ơn bạn đã chia sẻ!', '2026-05-13 10:51:59.09', NULL);
INSERT INTO public."Comment" VALUES ('3456ace9-f5ca-4f57-a7ff-ec14a5ba79e5', '71c7f0b2-444c-4dae-a55b-147aa5c79706', 'e0455af1-a32e-4f1a-9156-c5e8e7a63681', 'Comment #5: Hay quá, cảm ơn bạn đã chia sẻ!', '2026-05-13 09:51:59.09', NULL);
INSERT INTO public."Comment" VALUES ('1638d65f-7d3a-4b10-a6eb-a4f11eceea29', '7d8e9449-a62f-4320-a83e-2bc897729ab1', '91c3891e-cf30-48be-b618-59c41e219ec1', 'Comment #6: Hay quá, cảm ơn bạn đã chia sẻ!', '2026-05-13 08:51:59.09', NULL);
INSERT INTO public."Comment" VALUES ('c80bc5c7-b944-481f-82d3-3dedd418c196', 'b37a5613-2e74-430c-b333-59eeb92408a8', '04095c17-b0db-4b48-9b09-549867b90827', 'Comment #7: Hay quá, cảm ơn bạn đã chia sẻ!', '2026-05-13 07:51:59.09', NULL);
INSERT INTO public."Comment" VALUES ('06adba5c-61b2-446e-bd48-5bccdf59c9b2', 'c37d857e-c1a3-4efe-a054-3eeeba1e17ec', '06367957-a638-4ac2-8aa9-330b7f395faa', 'Comment #8: Hay quá, cảm ơn bạn đã chia sẻ!', '2026-05-13 06:51:59.09', NULL);
INSERT INTO public."Comment" VALUES ('86c44ec2-105c-413f-a558-3dccd19bd4b5', 'c852dd45-f2ec-4f1f-befd-51dff332f0ce', '94b80d50-c6e7-418d-9f3c-60966f70ae3c', 'Comment #9: Hay quá, cảm ơn bạn đã chia sẻ!', '2026-05-13 05:51:59.09', NULL);
INSERT INTO public."Comment" VALUES ('67f50234-ec2f-47b1-9089-63d7952e7148', 'cd89caf1-b9da-4c24-a5df-504b569e7a2d', '741ab253-d8f9-48d9-96b8-f18d256c2ff6', 'Comment #10: Hay quá, cảm ơn bạn đã chia sẻ!', '2026-05-13 04:51:59.09', NULL);


--
-- TOC entry 4960 (class 0 OID 123870)
-- Dependencies: 230
-- Data for Name: Favorite; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Favorite" VALUES ('e129d2a2-e1c5-4303-95dc-2a3e7e60788f', 'a37c322a-aee8-4e9b-9fb2-cd38d379a145', '2026-05-12 14:51:59.09', NULL);
INSERT INTO public."Favorite" VALUES ('f74c7bba-c5b7-484d-9f3c-6071219644ed', '0e131163-6b05-4d7b-b13d-d93981ae0b53', '2026-05-11 14:51:59.09', NULL);
INSERT INTO public."Favorite" VALUES ('cde424a7-32cc-4f1e-a7eb-b8bc5f383f38', '66b3d3e1-97a7-4930-bb2e-a5503bf1c0a3', '2026-05-10 14:51:59.09', NULL);
INSERT INTO public."Favorite" VALUES ('bd181cc9-1130-44cd-864d-183e1ef30c8a', '2602080f-01d9-48e1-bd1a-84665dd4db69', '2026-05-09 14:51:59.09', NULL);
INSERT INTO public."Favorite" VALUES ('e0455af1-a32e-4f1a-9156-c5e8e7a63681', 'be93b4db-9d22-4b0a-9f3b-892709b6bca3', '2026-05-08 14:51:59.09', NULL);
INSERT INTO public."Favorite" VALUES ('91c3891e-cf30-48be-b618-59c41e219ec1', '732a7153-0cf7-4368-8627-bd21e1c2bd4c', '2026-05-07 14:51:59.09', NULL);
INSERT INTO public."Favorite" VALUES ('04095c17-b0db-4b48-9b09-549867b90827', '67adb532-033a-49e0-9319-2dea87d5bd77', '2026-05-06 14:51:59.09', NULL);
INSERT INTO public."Favorite" VALUES ('06367957-a638-4ac2-8aa9-330b7f395faa', '82345214-4419-4975-9202-551078b9d642', '2026-05-05 14:51:59.09', NULL);
INSERT INTO public."Favorite" VALUES ('94b80d50-c6e7-418d-9f3c-60966f70ae3c', '9ccbba14-73c9-47ba-b162-fe3e2bf67523', '2026-05-04 14:51:59.09', NULL);
INSERT INTO public."Favorite" VALUES ('741ab253-d8f9-48d9-96b8-f18d256c2ff6', 'f45b0b15-1df1-4621-9fb2-63209a78f422', '2026-05-03 14:51:59.09', NULL);


--
-- TOC entry 4956 (class 0 OID 123837)
-- Dependencies: 226
-- Data for Name: Promotion; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Promotion" VALUES ('97d2ffbd-aa30-499e-ade6-4a5d38bac362', 'Summer Sale 10%', 'Giảm giá mùa hè.', 10, '2026-05-08 14:51:59.09', '2026-06-07 14:51:59.09', '2026-05-07 14:51:59.09', '2026-05-13 14:51:59.09', NULL);
INSERT INTO public."Promotion" VALUES ('aa79574f-a655-4829-a3c2-46c8be0d894f', 'Flash Deal 15%', 'Ưu đãi nhanh trong tuần.', 15, '2026-05-11 14:51:59.09', '2026-05-18 14:51:59.09', '2026-05-10 14:51:59.09', '2026-05-13 14:51:59.09', NULL);
INSERT INTO public."Promotion" VALUES ('beb95fa7-6f34-4cf0-9bb8-3873f1773f41', 'Weekend 8%', 'Giảm cuối tuần.', 8, '2026-05-12 14:51:59.09', '2026-05-21 14:51:59.09', '2026-05-11 14:51:59.09', '2026-05-13 14:51:59.09', NULL);
INSERT INTO public."Promotion" VALUES ('574fbe09-edf8-4295-a0e8-d1c0dfb23648', 'Family Pack 12%', 'Ưu đãi cho gia đình.', 12, '2026-05-03 14:51:59.09', '2026-06-02 14:51:59.09', '2026-05-02 14:51:59.09', '2026-05-13 14:51:59.09', NULL);
INSERT INTO public."Promotion" VALUES ('8d2ba60f-fa82-42b7-ae73-747bb25e6480', 'Luxury 5%', 'Ưu đãi tour cao cấp.', 5, '2026-05-06 14:51:59.09', '2026-06-12 14:51:59.09', '2026-05-05 14:51:59.09', '2026-05-13 14:51:59.09', NULL);
INSERT INTO public."Promotion" VALUES ('5d9fdb92-6be4-441d-9da6-d0763f3f9d55', 'Nature Lover 9%', 'Dành cho người yêu thiên nhiên.', 9, '2026-05-09 14:51:59.09', '2026-05-27 14:51:59.09', '2026-05-08 14:51:59.09', '2026-05-13 14:51:59.09', NULL);
INSERT INTO public."Promotion" VALUES ('cf1976a6-0883-421a-8a1b-e764ec1de201', 'Culture Week 11%', 'Tuần lễ văn hoá.', 11, '2026-05-10 14:51:59.09', '2026-05-25 14:51:59.09', '2026-05-09 14:51:59.09', '2026-05-13 14:51:59.09', NULL);
INSERT INTO public."Promotion" VALUES ('d69f75ce-e739-4096-aba7-6e4961869da6', 'Budget 7%', 'Tiết kiệm hơn.', 7, '2026-05-07 14:51:59.09', '2026-05-22 14:51:59.09', '2026-05-06 14:51:59.09', '2026-05-13 14:51:59.09', NULL);
INSERT INTO public."Promotion" VALUES ('82ffe0c2-5eb6-4a86-87cd-d98cc786b0d4', 'New User 13%', 'Chào mừng người dùng mới.', 13, '2026-04-28 14:51:59.09', '2026-05-28 14:51:59.09', '2026-04-27 14:51:59.09', '2026-05-13 14:51:59.09', NULL);
INSERT INTO public."Promotion" VALUES ('151e714e-5e88-4614-9a36-b610baf18ac0', 'Last Minute 6%', 'Ưu đãi phút chót.', 6, '2026-05-12 14:51:59.09', '2026-05-15 14:51:59.09', '2026-05-11 14:51:59.09', '2026-05-13 14:51:59.09', NULL);


--
-- TOC entry 4955 (class 0 OID 123826)
-- Dependencies: 225
-- Data for Name: Tour; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Tour" VALUES ('9d762d78-f97e-4675-8680-6d1eead3746c', 'a37c322a-aee8-4e9b-9fb2-cd38d379a145', 'a896d116-8632-47f8-875e-0e6daf7a9c50', 'Khám Phá Đảo Bình Ba Hoang Sơ', '### Tour Ẩm Thực Địa Phương

Dành cho những tín đồ yêu thích khám phá ẩm thực, tour sẽ đưa du khách thưởng thức các món ăn đặc sản nổi tiếng của từng vùng miền. Từ món ăn đường phố dân dã cho đến những bữa ăn truyền thống đậm chất địa phương, mỗi trải nghiệm đều mang đến hương vị độc đáo và khó quên. Ngoài ra, du khách còn có cơ hội tìm hiểu quy trình chế biến và văn hóa ẩm thực đặc trưng.', 1100000, 3, 2, 12, 1, 0, 'https://picsum.photos/seed/bà-nà-hills-1/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('cb3807c4-73e6-42d9-8ebb-363b9115573f', 'a37c322a-aee8-4e9b-9fb2-cd38d379a145', '5dc1a8e2-f04d-4912-a5a5-7cb35363be85', 'Tour Camping Rừng Thông Đà Lạt', '### Tour Biển Nghỉ Dưỡng

Hành trình đưa du khách đến với những bãi biển xanh trong, cát trắng mịn và không khí trong lành của vùng biển nhiệt đới. Trong suốt chuyến đi, du khách có thể tận hưởng các hoạt động thú vị như tắm biển, lặn ngắm san hô, thưởng thức hải sản địa phương và ngắm hoàng hôn tuyệt đẹp bên bờ biển. Đây là lựa chọn hoàn hảo cho những ai muốn thư giãn, tái tạo năng lượng và tận hưởng kỳ nghỉ đáng nhớ cùng gia đình hoặc bạn bè.', 1180000, 4, 3, 14, 1, 0, 'https://picsum.photos/seed/bà-nà-hills-2/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('46409a17-2526-4187-abb6-e01adb0215bc', 'f45b0b15-1df1-4621-9fb2-63209a78f422', 'fc71e164-1abf-44c9-aa13-53f37227f26f', 'Khám Phá Mộc Châu Mùa Hoa Mận', '### Tour Sinh Thái Miền Tây

Hành trình đưa du khách đến với vùng sông nước miền Tây thanh bình, nơi nổi tiếng với chợ nổi, vườn trái cây và những con kênh xanh mát. Du khách có thể trải nghiệm đi xuồng, thưởng thức trái cây tại vườn và khám phá nét sống giản dị, thân thiện của người dân địa phương. Tour phù hợp cho những ai muốn tìm kiếm cảm giác yên bình và gần gũi với thiên nhiên.', 3500000, 4, 2, 20, 1, 30, 'https://picsum.photos/seed/tour10/900/600', 3.8, 'available', '2026-05-03 14:51:59.09', '2026-05-18 02:23:31.061', NULL);
INSERT INTO public."Tour" VALUES ('781f54e9-222b-41ce-81c0-0f39d5d7968b', '0e131163-6b05-4d7b-b13d-d93981ae0b53', '5dc1a8e2-f04d-4912-a5a5-7cb35363be85', 'Khám Phá Phú Quốc 4 Ngày 3 Đêm', '### Tour Phiêu Lưu Mạo Hiểm

Dành cho những người yêu thích cảm giác mạnh và khám phá, tour bao gồm nhiều hoạt động hấp dẫn như leo núi, chèo thuyền, zipline hoặc cắm trại ngoài trời. Mỗi trải nghiệm đều mang đến sự phấn khích và cơ hội vượt qua giới hạn bản thân. Đây là chuyến đi lý tưởng cho các nhóm bạn trẻ năng động và đam mê phiêu lưu.', 1220000, 3, 2, 12, 1, 0, 'https://picsum.photos/seed/chợ-bến-thành-1/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('5756528c-6910-4095-bc6a-84b2a1c0b6a3', '0e131163-6b05-4d7b-b13d-d93981ae0b53', '5a51d77e-571d-4755-b4ff-989dcee8ca83', 'Trải Nghiệm Ẩm Thực Đường Phố Hà Nội', '### Tour Biển Nghỉ Dưỡng

Hành trình đưa du khách đến với những bãi biển xanh trong, cát trắng mịn và không khí trong lành của vùng biển nhiệt đới. Trong suốt chuyến đi, du khách có thể tận hưởng các hoạt động thú vị như tắm biển, lặn ngắm san hô, thưởng thức hải sản địa phương và ngắm hoàng hôn tuyệt đẹp bên bờ biển. Đây là lựa chọn hoàn hảo cho những ai muốn thư giãn, tái tạo năng lượng và tận hưởng kỳ nghỉ đáng nhớ cùng gia đình hoặc bạn bè.', 1300000, 4, 3, 14, 1, 0, 'https://picsum.photos/seed/chợ-bến-thành-2/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('0b5cc048-56b0-4b62-ab89-d008f9839a06', '66b3d3e1-97a7-4930-bb2e-a5503bf1c0a3', 'e329c295-3ec8-4190-afa6-2ef1c83aa516', 'Tour Phiêu Lưu Tây Bắc Đại Ngàn', '### Tour Văn Hóa – Lịch Sử

Khám phá những công trình kiến trúc cổ kính, di tích lịch sử nổi tiếng và các giá trị văn hóa truyền thống đặc sắc của địa phương. Tour mang đến cơ hội tìm hiểu sâu hơn về lịch sử hình thành, phong tục tập quán và nét đẹp văn hóa lâu đời thông qua các hoạt động tham quan, trải nghiệm thực tế và thưởng thức ẩm thực truyền thống.', 1420000, 4, 3, 14, 1, 0, 'https://picsum.photos/seed/đà-lạt-2/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('21b40276-b3da-475c-8891-49442e236fde', '2602080f-01d9-48e1-bd1a-84665dd4db69', 'e329c295-3ec8-4190-afa6-2ef1c83aa516', 'Tour Du Lịch Đà Nẵng – Hội An', '### Tour Sinh Thái Miền Tây

Hành trình đưa du khách đến với vùng sông nước miền Tây thanh bình, nơi nổi tiếng với chợ nổi, vườn trái cây và những con kênh xanh mát. Du khách có thể trải nghiệm đi xuồng, thưởng thức trái cây tại vườn và khám phá nét sống giản dị, thân thiện của người dân địa phương. Tour phù hợp cho những ai muốn tìm kiếm cảm giác yên bình và gần gũi với thiên nhiên.', 1460000, 3, 2, 12, 1, 0, 'https://picsum.photos/seed/đảo-phú-quốc-1/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('29d6e9e0-3bb7-4613-bfe2-bd3a9ec9181a', '2602080f-01d9-48e1-bd1a-84665dd4db69', 'c59df1a6-73a5-485b-8121-7c163b4995eb', 'Chinh Phục Fansipan – Nóc Nhà Đông Dương', '### Tour Thành Phố Hiện Đại

Trải nghiệm nhịp sống sôi động của thành phố hiện đại với các trung tâm thương mại, khu vui chơi giải trí và những địa điểm check-in nổi tiếng. Du khách sẽ được khám phá ẩm thực đa dạng, tham gia các hoạt động về đêm và tận hưởng dịch vụ lưu trú cao cấp. Đây là lựa chọn lý tưởng cho những ai yêu thích sự náo nhiệt và tiện nghi hiện đại.', 1620000, 5, 1, 16, 1, 0, 'https://picsum.photos/seed/đảo-phú-quốc-3/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('d80ad4ad-5dee-4b41-ac41-8b71e9da5c89', 'be93b4db-9d22-4b0a-9f3b-892709b6bca3', 'c59df1a6-73a5-485b-8121-7c163b4995eb', 'Tour Trekking Tà Năng – Phan Dũng', '### Tour Phiêu Lưu Mạo Hiểm

Dành cho những người yêu thích cảm giác mạnh và khám phá, tour bao gồm nhiều hoạt động hấp dẫn như leo núi, chèo thuyền, zipline hoặc cắm trại ngoài trời. Mỗi trải nghiệm đều mang đến sự phấn khích và cơ hội vượt qua giới hạn bản thân. Đây là chuyến đi lý tưởng cho các nhóm bạn trẻ năng động và đam mê phiêu lưu.', 1660000, 4, 3, 14, 1, 0, 'https://picsum.photos/seed/fansipan-2/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('c372f425-c35f-4a30-8a30-c79eecf0296b', '732a7153-0cf7-4368-8627-bd21e1c2bd4c', 'c59df1a6-73a5-485b-8121-7c163b4995eb', 'Hành Trình Khám Phá Cần Thơ', '### Tour Khám Phá Núi Rừng

Chuyến đi dành cho những người yêu thiên nhiên và thích khám phá những cung đường núi hùng vĩ. Du khách sẽ được trekking qua các con đường rừng xanh mát, chiêm ngưỡng cảnh quan thiên nhiên tuyệt đẹp và tìm hiểu văn hóa của người dân bản địa. Không khí mát lạnh cùng những trải nghiệm gần gũi với thiên nhiên sẽ mang lại cảm giác thư thái và đầy mới mẻ.', 1700000, 3, 2, 12, 1, 0, 'https://picsum.photos/seed/hồ-gươm-1/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('82566f8a-421c-4b8b-a019-3b53f95142c1', '732a7153-0cf7-4368-8627-bd21e1c2bd4c', 'f89db568-ea65-456e-900d-675e80249fbe', 'Trải Nghiệm Miền Tây Sông Nước', '### Tour Sinh Thái Miền Tây

Hành trình đưa du khách đến với vùng sông nước miền Tây thanh bình, nơi nổi tiếng với chợ nổi, vườn trái cây và những con kênh xanh mát. Du khách có thể trải nghiệm đi xuồng, thưởng thức trái cây tại vườn và khám phá nét sống giản dị, thân thiện của người dân địa phương. Tour phù hợp cho những ai muốn tìm kiếm cảm giác yên bình và gần gũi với thiên nhiên.', 1780000, 4, 3, 14, 1, 0, 'https://picsum.photos/seed/hồ-gươm-2/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('3faa92b5-a96a-4f2b-862a-48feaf698e0e', '732a7153-0cf7-4368-8627-bd21e1c2bd4c', '725b238b-84c8-4d27-8cca-2cfa10159615', 'Tour Khám Phá Bangkok Về Đêm', '### Tour Khám Phá Núi Rừng

Chuyến đi dành cho những người yêu thiên nhiên và thích khám phá những cung đường núi hùng vĩ. Du khách sẽ được trekking qua các con đường rừng xanh mát, chiêm ngưỡng cảnh quan thiên nhiên tuyệt đẹp và tìm hiểu văn hóa của người dân bản địa. Không khí mát lạnh cùng những trải nghiệm gần gũi với thiên nhiên sẽ mang lại cảm giác thư thái và đầy mới mẻ.', 1860000, 5, 1, 16, 1, 0, 'https://picsum.photos/seed/hồ-gươm-3/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('8b48584f-9425-4467-81df-1c92eed2b58e', '67adb532-033a-49e0-9319-2dea87d5bd77', 'f89db568-ea65-456e-900d-675e80249fbe', 'Tour Đảo Lý Sơn 3 Ngày 2 Đêm', '### Tour Phiêu Lưu Mạo Hiểm

Dành cho những người yêu thích cảm giác mạnh và khám phá, tour bao gồm nhiều hoạt động hấp dẫn như leo núi, chèo thuyền, zipline hoặc cắm trại ngoài trời. Mỗi trải nghiệm đều mang đến sự phấn khích và cơ hội vượt qua giới hạn bản thân. Đây là chuyến đi lý tưởng cho các nhóm bạn trẻ năng động và đam mê phiêu lưu.', 1820000, 3, 2, 12, 1, 0, 'https://picsum.photos/seed/mũi-né-1/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('245b5040-8804-4251-be44-f11311f2c489', '0e131163-6b05-4d7b-b13d-d93981ae0b53', '5dc1a8e2-f04d-4912-a5a5-7cb35363be85', 'Kỳ Nghỉ Maldives Lãng Mạn', '### Tour Sinh Thái Miền Tây

Hành trình đưa du khách đến với vùng sông nước miền Tây thanh bình, nơi nổi tiếng với chợ nổi, vườn trái cây và những con kênh xanh mát. Du khách có thể trải nghiệm đi xuồng, thưởng thức trái cây tại vườn và khám phá nét sống giản dị, thân thiện của người dân địa phương. Tour phù hợp cho những ai muốn tìm kiếm cảm giác yên bình và gần gũi với thiên nhiên.', 1500000, 4, 3, 12, 1, 6, 'https://picsum.photos/seed/tour2/900/600', 2.5, 'available', '2026-05-11 14:51:59.09', '2026-05-17 18:26:49.422', NULL);
INSERT INTO public."Tour" VALUES ('e93bf0d7-7a90-4a6f-aece-56ef6048ba8c', 'f45b0b15-1df1-4621-9fb2-63209a78f422', 'a896d116-8632-47f8-875e-0e6daf7a9c50', 'Tour Nghỉ Dưỡng Vũng Tàu Cuối Tuần', '### Tour Nghỉ Dưỡng Cao Cấp

Một kỳ nghỉ sang trọng với hệ thống resort cao cấp, dịch vụ chuyên nghiệp và không gian yên tĩnh tuyệt đẹp. Du khách có thể thư giãn tại hồ bơi, spa hoặc tham gia các hoạt động giải trí nhẹ nhàng trong khu nghỉ dưỡng. Tour mang đến trải nghiệm nghỉ dưỡng trọn vẹn, phù hợp cho các cặp đôi hoặc gia đình muốn tận hưởng sự riêng tư và thoải mái.', 2260000, 4, 3, 14, 1, 0, 'https://picsum.photos/seed/vịnh-hạ-long-2/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('58bf8960-0f8f-43d1-96eb-0cacc1a0dce4', 'f45b0b15-1df1-4621-9fb2-63209a78f422', '5dc1a8e2-f04d-4912-a5a5-7cb35363be85', 'Hành Trình Khám Phá Cao Bằng', '### Tour Thành Phố Hiện Đại

Trải nghiệm nhịp sống sôi động của thành phố hiện đại với các trung tâm thương mại, khu vui chơi giải trí và những địa điểm check-in nổi tiếng. Du khách sẽ được khám phá ẩm thực đa dạng, tham gia các hoạt động về đêm và tận hưởng dịch vụ lưu trú cao cấp. Đây là lựa chọn lý tưởng cho những ai yêu thích sự náo nhiệt và tiện nghi hiện đại.', 2340000, 5, 1, 16, 1, 0, 'https://picsum.photos/seed/vịnh-hạ-long-3/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('bfbb3ce9-847a-4dc8-ac38-f18362396f9d', 'a37c322a-aee8-4e9b-9fb2-cd38d379a145', 'a896d116-8632-47f8-875e-0e6daf7a9c50', 'Hành Trình Nhật Bản Mùa Hoa Anh Đào', '### Tour Ẩm Thực Địa Phương

Dành cho những tín đồ yêu thích khám phá ẩm thực, tour sẽ đưa du khách thưởng thức các món ăn đặc sản nổi tiếng của từng vùng miền. Từ món ăn đường phố dân dã cho đến những bữa ăn truyền thống đậm chất địa phương, mỗi trải nghiệm đều mang đến hương vị độc đáo và khó quên. Ngoài ra, du khách còn có cơ hội tìm hiểu quy trình chế biến và văn hóa ẩm thực đặc trưng.', 1250000, 3, 2, 11, 1, 3, 'https://picsum.photos/seed/tour1/900/600', 2, 'available', '2026-05-12 14:51:59.09', '2026-05-17 18:27:31.029', NULL);
INSERT INTO public."Tour" VALUES ('e33ae377-2c97-4c6d-8d43-fa2f08b0fcf4', '66b3d3e1-97a7-4930-bb2e-a5503bf1c0a3', '5a51d77e-571d-4755-b4ff-989dcee8ca83', 'Tour Nghỉ Dưỡng Nha Trang Cao Cấp', '### Tour Sinh Thái Miền Tây

Hành trình đưa du khách đến với vùng sông nước miền Tây thanh bình, nơi nổi tiếng với chợ nổi, vườn trái cây và những con kênh xanh mát. Du khách có thể trải nghiệm đi xuồng, thưởng thức trái cây tại vườn và khám phá nét sống giản dị, thân thiện của người dân địa phương. Tour phù hợp cho những ai muốn tìm kiếm cảm giác yên bình và gần gũi với thiên nhiên.', 1750000, 5, 1, 13, 1, 9, 'https://picsum.photos/seed/tour3/900/600', 3.5, 'available', '2026-05-10 14:51:59.09', '2026-05-17 18:52:16.521', NULL);
INSERT INTO public."Tour" VALUES ('6df08caf-5e9d-4cde-a0bd-8f3a4f1e5135', 'be93b4db-9d22-4b0a-9f3b-892709b6bca3', '84520d43-83cf-41ae-b322-8ca690716873', 'Khám Phá Cố Đô Huế Mộng Mơ', '### Tour Văn Hóa – Lịch Sử

Khám phá những công trình kiến trúc cổ kính, di tích lịch sử nổi tiếng và các giá trị văn hóa truyền thống đặc sắc của địa phương. Tour mang đến cơ hội tìm hiểu sâu hơn về lịch sử hình thành, phong tục tập quán và nét đẹp văn hóa lâu đời thông qua các hoạt động tham quan, trải nghiệm thực tế và thưởng thức ẩm thực truyền thống.', 2250000, 3, 3, 15, 1, 15, 'https://picsum.photos/seed/tour5/900/600', 4.3, 'available', '2026-05-08 14:51:59.09', '2026-05-13 13:51:59.09', NULL);
INSERT INTO public."Tour" VALUES ('aa7af37a-5f71-4713-b7f6-d77d0c8cc787', '0e131163-6b05-4d7b-b13d-d93981ae0b53', 'e329c295-3ec8-4190-afa6-2ef1c83aa516', 'Tour 3 - Chợ Bến Thành', '### Tour Ẩm Thực Địa Phương

Dành cho những tín đồ yêu thích khám phá ẩm thực, tour sẽ đưa du khách thưởng thức các món ăn đặc sản nổi tiếng của từng vùng miền. Từ món ăn đường phố dân dã cho đến những bữa ăn truyền thống đậm chất địa phương, mỗi trải nghiệm đều mang đến hương vị độc đáo và khó quên. Ngoài ra, du khách còn có cơ hội tìm hiểu quy trình chế biến và văn hóa ẩm thực đặc trưng.', 1380000, 5, 1, 16, 1, 0, 'https://picsum.photos/seed/chợ-bến-thành-3/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('5fbaeaa6-5fc1-46eb-aec9-f8469cb9610c', '66b3d3e1-97a7-4930-bb2e-a5503bf1c0a3', '5a51d77e-571d-4755-b4ff-989dcee8ca83', 'Tour 1 - Đà Lạt', '### Tour Check-in & Chụp Ảnh

Hành trình dành riêng cho những ai yêu thích du lịch kết hợp sống ảo với hàng loạt địa điểm check-in nổi tiếng và phong cảnh đẹp mắt. Từ những quán cà phê độc đáo, công trình kiến trúc ấn tượng đến cảnh quan thiên nhiên thơ mộng, mỗi điểm đến đều mang lại cơ hội lưu giữ những bức ảnh đẹp và những khoảnh khắc đáng nhớ trong chuyến đi.', 1340000, 3, 2, 12, 1, 0, 'https://picsum.photos/seed/đà-lạt-1/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('9de81edf-7fb4-4c8a-80be-8e231a8fd301', '2602080f-01d9-48e1-bd1a-84665dd4db69', 'e329c295-3ec8-4190-afa6-2ef1c83aa516', 'Tour #4 - Đảo Phú Quốc', '### Tour Đảo Thiên Nhiên

Khám phá vẻ đẹp hoang sơ của những hòn đảo tuyệt đẹp với làn nước trong xanh và hệ sinh thái đa dạng. Du khách sẽ được tham gia các hoạt động như câu cá, lặn biển và tham quan các địa điểm nổi tiếng trên đảo. Không gian yên bình cùng phong cảnh thiên nhiên thơ mộng chắc chắn sẽ tạo nên những kỷ niệm khó quên.', 2000000, 2, 2, 14, 1, 12, 'https://picsum.photos/seed/tour4/900/600', 4.2, 'available', '2026-05-09 14:51:59.09', '2026-05-13 13:51:59.09', NULL);
INSERT INTO public."Tour" VALUES ('fc29eb2e-ec3e-4453-9932-dd95c087f863', '82345214-4419-4975-9202-551078b9d642', '725b238b-84c8-4d27-8cca-2cfa10159615', 'Tour 1 - Ninh Bình', '### Tour Đảo Thiên Nhiên

Khám phá vẻ đẹp hoang sơ của những hòn đảo tuyệt đẹp với làn nước trong xanh và hệ sinh thái đa dạng. Du khách sẽ được tham gia các hoạt động như câu cá, lặn biển và tham quan các địa điểm nổi tiếng trên đảo. Không gian yên bình cùng phong cảnh thiên nhiên thơ mộng chắc chắn sẽ tạo nên những kỷ niệm khó quên.', 1940000, 3, 2, 12, 1, 0, 'https://picsum.photos/seed/ninh-bình-1/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('56ccbf39-2276-428e-9fdc-02e1f878587d', '732a7153-0cf7-4368-8627-bd21e1c2bd4c', 'c59df1a6-73a5-485b-8121-7c163b4995eb', 'Tour Check-in Sapa Mùa Lúa Chín', '### Tour Đảo Thiên Nhiên

Khám phá vẻ đẹp hoang sơ của những hòn đảo tuyệt đẹp với làn nước trong xanh và hệ sinh thái đa dạng. Du khách sẽ được tham gia các hoạt động như câu cá, lặn biển và tham quan các địa điểm nổi tiếng trên đảo. Không gian yên bình cùng phong cảnh thiên nhiên thơ mộng chắc chắn sẽ tạo nên những kỷ niệm khó quên.', 2500000, 4, 1, 16, 1, 18, 'https://picsum.photos/seed/tour6/900/600', 4.4, 'available', '2026-05-07 14:51:59.09', '2026-05-13 13:51:59.09', NULL);
INSERT INTO public."Tour" VALUES ('8791b549-1bce-445d-8511-e0a67f523bfa', '67adb532-033a-49e0-9319-2dea87d5bd77', 'f89db568-ea65-456e-900d-675e80249fbe', 'Hành Trình Khám Phá Dubai Xa Hoa', '### Tour Đảo Thiên Nhiên

Khám phá vẻ đẹp hoang sơ của những hòn đảo tuyệt đẹp với làn nước trong xanh và hệ sinh thái đa dạng. Du khách sẽ được tham gia các hoạt động như câu cá, lặn biển và tham quan các địa điểm nổi tiếng trên đảo. Không gian yên bình cùng phong cảnh thiên nhiên thơ mộng chắc chắn sẽ tạo nên những kỷ niệm khó quên.', 2750000, 5, 2, 17, 1, 21, 'https://picsum.photos/seed/tour7/900/600', 4.5, 'available', '2026-05-06 14:51:59.09', '2026-05-13 13:51:59.09', NULL);
INSERT INTO public."Tour" VALUES ('ce4b099e-52f5-4d93-ad7e-ce0f5553de61', '9ccbba14-73c9-47ba-b162-fe3e2bf67523', 'fc71e164-1abf-44c9-aa13-53f37227f26f', 'Tour 2 - Phố cổ Hội An', '### Tour Văn Hóa – Lịch Sử

Khám phá những công trình kiến trúc cổ kính, di tích lịch sử nổi tiếng và các giá trị văn hóa truyền thống đặc sắc của địa phương. Tour mang đến cơ hội tìm hiểu sâu hơn về lịch sử hình thành, phong tục tập quán và nét đẹp văn hóa lâu đời thông qua các hoạt động tham quan, trải nghiệm thực tế và thưởng thức ẩm thực truyền thống.', 2140000, 4, 3, 14, 1, 0, 'https://picsum.photos/seed/phố-cổ-hội-an-2/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('789bbab7-83dc-4a80-af48-ad35687a21e9', '82345214-4419-4975-9202-551078b9d642', '725b238b-84c8-4d27-8cca-2cfa10159615', 'Hành Trình Săn Mây Đà Lạt', '### Tour Thành Phố Hiện Đại

Trải nghiệm nhịp sống sôi động của thành phố hiện đại với các trung tâm thương mại, khu vui chơi giải trí và những địa điểm check-in nổi tiếng. Du khách sẽ được khám phá ẩm thực đa dạng, tham gia các hoạt động về đêm và tận hưởng dịch vụ lưu trú cao cấp. Đây là lựa chọn lý tưởng cho những ai yêu thích sự náo nhiệt và tiện nghi hiện đại.', 3000000, 2, 3, 18, 1, 24, 'https://picsum.photos/seed/tour8/900/600', 4.6, 'available', '2026-05-05 14:51:59.09', '2026-05-13 13:51:59.09', NULL);
INSERT INTO public."Tour" VALUES ('b8806230-ea6d-4e48-9a1a-8763a9d39579', '9ccbba14-73c9-47ba-b162-fe3e2bf67523', '9a3426e1-ae0a-4133-a091-e431cfe3e49a', 'Kỳ Nghỉ Biển Quy Nhơn Tuyệt Đẹp', '### Tour Văn Hóa – Lịch Sử

Khám phá những công trình kiến trúc cổ kính, di tích lịch sử nổi tiếng và các giá trị văn hóa truyền thống đặc sắc của địa phương. Tour mang đến cơ hội tìm hiểu sâu hơn về lịch sử hình thành, phong tục tập quán và nét đẹp văn hóa lâu đời thông qua các hoạt động tham quan, trải nghiệm thực tế và thưởng thức ẩm thực truyền thống.', 3250000, 3, 1, 19, 1, 27, 'https://picsum.photos/seed/tour9/900/600', 4.7, 'available', '2026-05-04 14:51:59.09', '2026-05-13 13:51:59.09', NULL);
INSERT INTO public."Tour" VALUES ('e139b577-ceb2-45a8-a1f8-8584e1454364', '2602080f-01d9-48e1-bd1a-84665dd4db69', '84520d43-83cf-41ae-b322-8ca690716873', 'Tour Hàn Quốc Mùa Lá Đỏ', '### Tour Khám Phá Núi Rừng

Chuyến đi dành cho những người yêu thiên nhiên và thích khám phá những cung đường núi hùng vĩ. Du khách sẽ được trekking qua các con đường rừng xanh mát, chiêm ngưỡng cảnh quan thiên nhiên tuyệt đẹp và tìm hiểu văn hóa của người dân bản địa. Không khí mát lạnh cùng những trải nghiệm gần gũi với thiên nhiên sẽ mang lại cảm giác thư thái và đầy mới mẻ.', 1540000, 4, 3, 14, 1, 0, 'https://picsum.photos/seed/đảo-phú-quốc-2/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('ba6553b2-bda5-4ee6-b1fd-5f010dea819c', 'be93b4db-9d22-4b0a-9f3b-892709b6bca3', '84520d43-83cf-41ae-b322-8ca690716873', 'Tour Châu Âu 7 Quốc Gia', '### Tour Biển Nghỉ Dưỡng

Hành trình đưa du khách đến với những bãi biển xanh trong, cát trắng mịn và không khí trong lành của vùng biển nhiệt đới. Trong suốt chuyến đi, du khách có thể tận hưởng các hoạt động thú vị như tắm biển, lặn ngắm san hô, thưởng thức hải sản địa phương và ngắm hoàng hôn tuyệt đẹp bên bờ biển. Đây là lựa chọn hoàn hảo cho những ai muốn thư giãn, tái tạo năng lượng và tận hưởng kỳ nghỉ đáng nhớ cùng gia đình hoặc bạn bè.', 1580000, 3, 2, 12, 1, 0, 'https://picsum.photos/seed/fansipan-1/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('7ae994ea-99b8-46ee-8f00-b310e3074ed7', '82345214-4419-4975-9202-551078b9d642', '9a3426e1-ae0a-4133-a091-e431cfe3e49a', 'Tour Du Lịch Singapore Hiện Đại', '### Tour Khám Phá Núi Rừng

Chuyến đi dành cho những người yêu thiên nhiên và thích khám phá những cung đường núi hùng vĩ. Du khách sẽ được trekking qua các con đường rừng xanh mát, chiêm ngưỡng cảnh quan thiên nhiên tuyệt đẹp và tìm hiểu văn hóa của người dân bản địa. Không khí mát lạnh cùng những trải nghiệm gần gũi với thiên nhiên sẽ mang lại cảm giác thư thái và đầy mới mẻ.', 2020000, 4, 3, 14, 1, 0, 'https://picsum.photos/seed/ninh-bình-2/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('a6f2b164-6dbc-4319-a639-9e3002f6db87', '82345214-4419-4975-9202-551078b9d642', 'fc71e164-1abf-44c9-aa13-53f37227f26f', 'Khám Phá Bali Thiên Đường Biển Đảo', '### Tour Đảo Thiên Nhiên

Khám phá vẻ đẹp hoang sơ của những hòn đảo tuyệt đẹp với làn nước trong xanh và hệ sinh thái đa dạng. Du khách sẽ được tham gia các hoạt động như câu cá, lặn biển và tham quan các địa điểm nổi tiếng trên đảo. Không gian yên bình cùng phong cảnh thiên nhiên thơ mộng chắc chắn sẽ tạo nên những kỷ niệm khó quên.', 2100000, 5, 1, 16, 1, 0, 'https://picsum.photos/seed/ninh-bình-3/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('c3b5df91-0458-4ce9-88af-6e212962481a', '9ccbba14-73c9-47ba-b162-fe3e2bf67523', '9a3426e1-ae0a-4133-a091-e431cfe3e49a', 'Hành Trình Khám Phá Hang Sơn Đoòng', '### Tour Nghỉ Dưỡng Cao Cấp

Một kỳ nghỉ sang trọng với hệ thống resort cao cấp, dịch vụ chuyên nghiệp và không gian yên tĩnh tuyệt đẹp. Du khách có thể thư giãn tại hồ bơi, spa hoặc tham gia các hoạt động giải trí nhẹ nhàng trong khu nghỉ dưỡng. Tour mang đến trải nghiệm nghỉ dưỡng trọn vẹn, phù hợp cho các cặp đôi hoặc gia đình muốn tận hưởng sự riêng tư và thoải mái.', 2060000, 3, 2, 12, 1, 0, 'https://picsum.photos/seed/phố-cổ-hội-an-1/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('b2a9b2b9-bb03-4e25-9801-c71a336f02a6', 'f45b0b15-1df1-4621-9fb2-63209a78f422', 'fc71e164-1abf-44c9-aa13-53f37227f26f', 'Tour Nghỉ Dưỡng Resort Phan Thiết', '### Tour Ẩm Thực Địa Phương

Dành cho những tín đồ yêu thích khám phá ẩm thực, tour sẽ đưa du khách thưởng thức các món ăn đặc sản nổi tiếng của từng vùng miền. Từ món ăn đường phố dân dã cho đến những bữa ăn truyền thống đậm chất địa phương, mỗi trải nghiệm đều mang đến hương vị độc đáo và khó quên. Ngoài ra, du khách còn có cơ hội tìm hiểu quy trình chế biến và văn hóa ẩm thực đặc trưng.', 2180000, 3, 2, 12, 1, 0, 'https://picsum.photos/seed/vịnh-hạ-long-1/900/600', 0, 'available', '2026-05-06 15:07:35.252', '2026-05-13 15:07:35.252', NULL);
INSERT INTO public."Tour" VALUES ('6d1d2263-0857-4511-9fc3-6844d62e6771', '67adb532-033a-49e0-9319-2dea87d5bd77', '725b238b-84c8-4d27-8cca-2cfa10159615', 'Hành Trình Khám Phá Vịnh Hạ Long', '### Tour Văn Hóa – Lịch Sử

Khám phá những công trình kiến trúc cổ kính, di tích lịch sử nổi tiếng và các giá trị văn hóa truyền thống đặc sắc của địa phương. Tour mang đến cơ hội tìm hiểu sâu hơn về lịch sử hình thành, phong tục tập quán và nét đẹp văn hóa lâu đời thông qua các hoạt động tham quan, trải nghiệm thực tế và thưởng thức ẩm thực truyền thống.', 1900000, 4, 3, 14, 1, 0, 'https://picsum.photos/seed/mũi-né-2/900/600', 5, 'available', '2026-05-06 15:07:35.252', '2026-05-17 18:25:22.111', NULL);


--
-- TOC entry 4959 (class 0 OID 123861)
-- Dependencies: 229
-- Data for Name: Rating; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Rating" VALUES ('ec383235-e325-4ce6-9179-558728acfa90', 'e129d2a2-e1c5-4303-95dc-2a3e7e60788f', '245b5040-8804-4251-be44-f11311f2c489', 4, 'Đánh giá #1: Tour ổn, hướng dẫn viên nhiệt tình.', '2026-05-12 14:51:59.09', NULL);
INSERT INTO public."Rating" VALUES ('5ecd73a8-04d1-4d06-8ce7-c73b258b68f9', 'f74c7bba-c5b7-484d-9f3c-6071219644ed', '46409a17-2526-4187-abb6-e01adb0215bc', 5, 'Đánh giá #2: Tour ổn, hướng dẫn viên nhiệt tình.', '2026-05-11 14:51:59.09', NULL);
INSERT INTO public."Rating" VALUES ('b0ecf827-76d8-497a-8cab-3be419d44538', 'cde424a7-32cc-4f1e-a7eb-b8bc5f383f38', '56ccbf39-2276-428e-9fdc-02e1f878587d', 3, 'Đánh giá #3: Tour ổn, hướng dẫn viên nhiệt tình.', '2026-05-10 14:51:59.09', NULL);
INSERT INTO public."Rating" VALUES ('5e3cba20-8832-4894-8b0e-a9cb291a0af6', 'bd181cc9-1130-44cd-864d-183e1ef30c8a', '6df08caf-5e9d-4cde-a0bd-8f3a4f1e5135', 4, 'Đánh giá #4: Tour ổn, hướng dẫn viên nhiệt tình.', '2026-05-09 14:51:59.09', NULL);
INSERT INTO public."Rating" VALUES ('7fa0bed0-b7c3-4f83-98b4-2f41be85544a', 'e0455af1-a32e-4f1a-9156-c5e8e7a63681', '789bbab7-83dc-4a80-af48-ad35687a21e9', 5, 'Đánh giá #5: Tour ổn, hướng dẫn viên nhiệt tình.', '2026-05-08 14:51:59.09', NULL);
INSERT INTO public."Rating" VALUES ('e22f637c-6f28-4cbd-9b43-4c7ca868392e', '91c3891e-cf30-48be-b618-59c41e219ec1', '8791b549-1bce-445d-8511-e0a67f523bfa', 4, 'Đánh giá #6: Tour ổn, hướng dẫn viên nhiệt tình.', '2026-05-07 14:51:59.09', NULL);
INSERT INTO public."Rating" VALUES ('e6578166-2a20-4894-925f-8c6fa095c2b4', '04095c17-b0db-4b48-9b09-549867b90827', '9de81edf-7fb4-4c8a-80be-8e231a8fd301', 5, 'Đánh giá #7: Tour ổn, hướng dẫn viên nhiệt tình.', '2026-05-06 14:51:59.09', NULL);
INSERT INTO public."Rating" VALUES ('e71a0809-f1eb-4106-bb8b-c953fed5dd2f', '06367957-a638-4ac2-8aa9-330b7f395faa', 'b8806230-ea6d-4e48-9a1a-8763a9d39579', 3, 'Đánh giá #8: Tour ổn, hướng dẫn viên nhiệt tình.', '2026-05-05 14:51:59.09', NULL);
INSERT INTO public."Rating" VALUES ('50f5b9cd-5d1d-4909-9515-21a2e108c797', '94b80d50-c6e7-418d-9f3c-60966f70ae3c', 'bfbb3ce9-847a-4dc8-ac38-f18362396f9d', 4, 'Đánh giá #9: Tour ổn, hướng dẫn viên nhiệt tình.', '2026-05-04 14:51:59.09', NULL);
INSERT INTO public."Rating" VALUES ('cdc59217-61db-4678-a13f-07cabcd22718', '741ab253-d8f9-48d9-96b8-f18d256c2ff6', 'e33ae377-2c97-4c6d-8d43-fa2f08b0fcf4', 5, 'Đánh giá #10: Tour ổn, hướng dẫn viên nhiệt tình.', '2026-05-03 14:51:59.09', NULL);
INSERT INTO public."Rating" VALUES ('bc45057c-02d7-44b8-bac5-a919d173915f', '4d6716ef-d233-48cd-a305-c5081dc51751', '6d1d2263-0857-4511-9fc3-6844d62e6771', 5, 'alo', '2026-05-17 18:25:22.1', NULL);
INSERT INTO public."Rating" VALUES ('703db0c1-5c6d-4dae-8ba4-b53f6c792620', '4d6716ef-d233-48cd-a305-c5081dc51751', 'bfbb3ce9-847a-4dc8-ac38-f18362396f9d', 1, 'xấu vãi, ko nên đi', '2026-05-17 18:25:49.537', NULL);
INSERT INTO public."Rating" VALUES ('fad2fdd7-12a1-4de9-97c1-0dca4904b6d0', '949a9e7a-38fe-4faf-a1b4-3162a34ca86d', '245b5040-8804-4251-be44-f11311f2c489', 1, 'dddd', '2026-05-17 18:26:49.419', NULL);
INSERT INTO public."Rating" VALUES ('1e4a4896-5865-4220-8ed5-ad88c794812d', '949a9e7a-38fe-4faf-a1b4-3162a34ca86d', 'bfbb3ce9-847a-4dc8-ac38-f18362396f9d', 1, 'Ko thích đi cho lắm', '2026-05-17 18:27:31.025', NULL);
INSERT INTO public."Rating" VALUES ('fca4f429-1202-4150-a57c-4c39b3e83320', '4d6716ef-d233-48cd-a305-c5081dc51751', 'e33ae377-2c97-4c6d-8d43-fa2f08b0fcf4', 2, 'ko dep', '2026-05-17 18:52:16.512', NULL);


--
-- TOC entry 4952 (class 0 OID 123799)
-- Dependencies: 222
-- Data for Name: refreshtokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.refreshtokens VALUES (1, 'e129d2a2-e1c5-4303-95dc-2a3e7e60788f', 'ceb656edf0bc78a516c2cb745e630039531d1593c1a41f703249bc992c6dff52', '301660da-7c26-4e28-ae7f-bf9a6e6f36bc', 'Mozilla/5.0 SeedAgent', '192.168.1.11', '2026-05-12 14:51:59.089896', '2026-06-12 14:51:59.089896', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (2, 'f74c7bba-c5b7-484d-9f3c-6071219644ed', '97942ad023f43fde1509df9a6543efa9e15e65993ac6a18ae1b293b97ec15d29', 'bcd324d6-3219-4d45-a891-36ac1d814255', 'Mozilla/5.0 SeedAgent', '192.168.1.12', '2026-05-12 14:51:59.089896', '2026-06-12 14:51:59.089896', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (3, 'cde424a7-32cc-4f1e-a7eb-b8bc5f383f38', '71decef3099989faf8395a79d4e9edff498437e7b5aed401a4b0ecc25b01c7d4', '97ee35d2-87d5-422d-9676-9a04bccf7731', 'Mozilla/5.0 SeedAgent', '192.168.1.13', '2026-05-12 14:51:59.089896', '2026-06-12 14:51:59.089896', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (4, 'bd181cc9-1130-44cd-864d-183e1ef30c8a', 'bafb31b7e8fbb34c192c4e47b076908e70c28861e8cf9ce5846d285d9c6330fe', '8767e40f-4d6a-485e-a375-0add4b706424', 'Mozilla/5.0 SeedAgent', '192.168.1.14', '2026-05-12 14:51:59.089896', '2026-06-12 14:51:59.089896', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (5, 'e0455af1-a32e-4f1a-9156-c5e8e7a63681', '92ea52cb4ded78fa8adfda22695b0a2564bb8c295a6c3c1ea0b05224bcd58863', '187a7278-0868-4be8-83ea-8b571c687af7', 'Mozilla/5.0 SeedAgent', '192.168.1.15', '2026-05-12 14:51:59.089896', '2026-06-12 14:51:59.089896', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (6, '91c3891e-cf30-48be-b618-59c41e219ec1', '88e32c1476267a6feb0662fdb37118bdd237bca16b41457201ae40021f1154d8', '0fe28515-2594-4ac6-8464-ea49dc4d303a', 'Mozilla/5.0 SeedAgent', '192.168.1.16', '2026-05-12 14:51:59.089896', '2026-06-12 14:51:59.089896', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (7, '04095c17-b0db-4b48-9b09-549867b90827', '05c1adc2fae5fa68051b9037a3149aca5a76f6363fd5b3ce5fbdc4f3c5f99d6c', '3d644477-d925-4eda-9be5-c86f38c169cb', 'Mozilla/5.0 SeedAgent', '192.168.1.17', '2026-05-12 14:51:59.089896', '2026-06-12 14:51:59.089896', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (8, '06367957-a638-4ac2-8aa9-330b7f395faa', '2573431950d163c06e75bf60a30ef8449b923d35b3b7ba9b288f9dcf1d08973d', '1bf0e487-ddec-4c45-8aab-97209d8802fe', 'Mozilla/5.0 SeedAgent', '192.168.1.18', '2026-05-12 14:51:59.089896', '2026-06-12 14:51:59.089896', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (9, '94b80d50-c6e7-418d-9f3c-60966f70ae3c', '32e6150d8a0c8829cf75a5d65d40ef275ee469f67501a36c4526c04cae33c31e', 'ce10726e-76f2-4e7c-b5bf-76d421ef9d01', 'Mozilla/5.0 SeedAgent', '192.168.1.19', '2026-05-12 14:51:59.089896', '2026-06-12 14:51:59.089896', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (10, '741ab253-d8f9-48d9-96b8-f18d256c2ff6', 'c7bd01f100765ef98f7154e8539e056c0dea5d0463b15712261c93499391a5e8', '2406b798-eb21-4e45-ba02-3efdf2d6b312', 'Mozilla/5.0 SeedAgent', '192.168.1.20', '2026-05-12 14:51:59.089896', '2026-06-12 14:51:59.089896', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (12, '949a9e7a-38fe-4faf-a1b4-3162a34ca86d', '35f4aee9b6257424655f667dd10d0ffa65567645f7dd6529ac47eafa446610df', '2cb330b3-411f-482c-abfc-6f0d1df44ba2', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0', '::1', '2026-05-17 23:56:33.519925', '2026-06-16 23:56:33.491', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (13, '949a9e7a-38fe-4faf-a1b4-3162a34ca86d', '65ed4f7dfb1413115ea62610698eca6e95b753ce5a7eea67801f0fc95defa80d', 'f4230e8e-4639-4312-8819-efa78e6013db', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0', '::1', '2026-05-17 23:57:45.323405', '2026-06-16 23:57:45.269', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (14, '949a9e7a-38fe-4faf-a1b4-3162a34ca86d', 'b0032fe945db923c511d581e50146d91a01fafb453fbb9163eecfd03041310b3', '2de749df-ad7e-4aba-abb9-e35db7820f13', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0', '::1', '2026-05-17 23:58:20.906709', '2026-06-16 23:58:20.845', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (16, '4d6716ef-d233-48cd-a305-c5081dc51751', '28036387f4953c948bc3d1e5c2d73cfbfa2e36ec25ca4fd5c6283b6ab110de04', 'cb530562-55f8-4b70-ad2f-501ec31ec758', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0', '::1', '2026-05-18 01:16:56.483355', '2026-06-17 01:16:56.457', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (17, '949a9e7a-38fe-4faf-a1b4-3162a34ca86d', '32e7081ca3c9f6439c5578f23894d576a3f21b041cee800f53eb31eac28e760a', '58db4bfc-f630-4841-8ead-f58ebbd0c07a', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0', '::1', '2026-05-18 01:26:02.238354', '2026-06-17 01:26:02.207', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (18, '4d6716ef-d233-48cd-a305-c5081dc51751', '98eaaac0677f5ad2a32e99f40b4db9340c21ccddd4ce660f5a7b51a8413e3d5f', '5bc4b1c9-351b-4e85-a01b-145f58445dcc', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0', '::1', '2026-05-18 01:27:45.722687', '2026-06-17 01:27:45.694', NULL, NULL);
INSERT INTO public.refreshtokens VALUES (19, '4d6716ef-d233-48cd-a305-c5081dc51751', 'aedc8dbd5f3dfded3a56fdf470c6c4c1cf76ea5a55e64b19aed493d9c40a0ee0', '960e9782-4d60-4b54-b4ea-67da2dde956b', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0', '::1', '2026-05-18 01:52:03.156556', '2026-06-17 01:52:03.127', NULL, NULL);


--
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 221
-- Name: refreshtokens_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refreshtokens_token_id_seq', 19, true);


-- Completed on 2026-05-18 09:55:30

--
-- PostgreSQL database dump complete
--

\unrestrict 9aHPGC2ydpmDScIXSZrppm5RlaDUTxrHGbPgOXI1ICP8qKihtwTfP5HyZzhxETv

