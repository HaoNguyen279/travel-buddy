"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "@/components/footer/Footer";
import { Navbar } from "@/components/nav/Navbar";
import { SectionHeading } from "@/components/section/SectionHeading";
import { getPlacesWithTours, type PlaceWithTours } from "@/services/placeService";

const navProps = {
	webName: "TravelBuddy",
	subtitle: "",
	itemOnNav: [
		{ itemName: "Bài viết", linkTo: "/post" },
		{ itemName: "Địa điểm", linkTo: "/place" },
		{ itemName: "Chat", linkTo: "/chat" },
	],
};

const dataFooter = [
	{
		footerTitle: "Hỗ trợ",
		footerItems: [
			{ itemName: "Quản lý chuyến đi", linkTo: "#" },
			{ itemName: "Liên hệ hỗ trợ", linkTo: "#" },
			{ itemName: "Trung tâm an toàn", linkTo: "#" },
		],
	},
	{
		footerTitle: "Khám phá",
		footerItems: [
			{ itemName: "Chương trình ưu đãi", linkTo: "#" },
			{ itemName: "Deals theo mùa", linkTo: "#" },
			{ itemName: "Bài viết du lịch", linkTo: "#" },
			{ itemName: "Thuê xe", linkTo: "#" },
			{ itemName: "Tìm chuyến bay", linkTo: "#" },
		],
	},
	{
		footerTitle: "Điều khoản",
		footerItems: [
			{ itemName: "Chính sách bảo mật", linkTo: "#" },
			{ itemName: "Điều khoản dịch vụ", linkTo: "#" },
			{ itemName: "Quy định sử dụng", linkTo: "#" },
		],
	},
	{
		footerTitle: "Đối tác",
		footerItems: [
			{ itemName: "Đăng ký đối tác", linkTo: "#" },
			{ itemName: "Hỗ trợ đối tác", linkTo: "#" },
			{ itemName: "Đăng ký chỗ nghỉ", linkTo: "#" },
		],
	},
	{
		footerTitle: "Về chúng tôi",
		footerItems: [
			{ itemName: "Giới thiệu", linkTo: "#" },
			{ itemName: "Cách hoạt động", linkTo: "#" },
			{ itemName: "Tin tức", linkTo: "#" },
			{ itemName: "Tuyển dụng", linkTo: "#" },
		],
	},
];

const formatCurrency = (value: number) => new Intl.NumberFormat("vi-VN").format(value);

export default function PlacePage() {
	const [places, setPlaces] = useState<PlaceWithTours[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const fetchPlaces = async () => {
			try {
				const data = await getPlacesWithTours(3);
				if (isMounted) {
					setPlaces(Array.isArray(data) ? data : []);
					setError(null);
				}
			} catch (err) {
				if (isMounted) {
					setError("Không thể tải danh sách địa điểm. Vui lòng thử lại.");
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		fetchPlaces();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<main className="min-h-screen bg-white">
			<Navbar
				webName={navProps.webName}
				subtitle={navProps.subtitle}
				itemOnNav={navProps.itemOnNav}
			/>

			<div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-12 pt-6 sm:px-6 lg:px-8">
				<section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-amber-50 p-6 sm:p-8">
					<div className="max-w-2xl space-y-3">
						<p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
							Places
						</p>
						<h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
							Điểm đến nổi bật
						</h1>
						<p className="text-sm text-slate-600 sm:text-base">
							Khám phá các địa điểm phổ biến cùng mô tả ngắn gọn và một vài tour gợi ý cho từng nơi.
						</p>
					</div>
				</section>

				<section className="space-y-6">
					<SectionHeading
						title="Danh sách địa điểm"
						description="Chọn điểm đến và xem nhanh các tour nổi bật đang có."
					/>

					{isLoading && (
						<div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
							Đang tải dữ liệu địa điểm...
						</div>
					)}

					{!isLoading && error && (
						<div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
							{error}
						</div>
					)}

					{!isLoading && !error && places.length === 0 && (
						<div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
							Chưa có địa điểm nào.
						</div>
					)}

					{!isLoading && !error && places.length > 0 && (
						<div className="grid grid-cols-1 gap-6">
							{places.map((place) => {
								const slugOrId = place.slug ?? place.place_id;
								const tours = place.tours ?? [];
								return (
									<article
										key={place.place_id}
										className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
									>
										<div className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
											<div className="relative min-h-[220px] bg-slate-100">
												{place.image_url ? (
													<img
														src={place.image_url}
														alt={place.name}
														className="h-full w-full object-cover"
													/>
												) : (
													<div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-400">
														TravelBuddy
													</div>
												)}
											</div>
											<div className="space-y-4 p-6">
												<div>
													<h3 className="text-2xl font-semibold text-slate-900">
														{place.name}
													</h3>
													<p className="mt-1 text-sm text-slate-500">
														{[place.city, place.country].filter(Boolean).join(", ")}
													</p>
												</div>
												<p className="text-sm leading-6 text-slate-600">
													{place.description ??
														"Khám phá điểm đến với các trải nghiệm đặc sắc và hành trình được tuyển chọn."}
												</p>

												<div className="space-y-3">
													<div className="flex items-center justify-between">
														<p className="text-sm font-semibold text-slate-800">
															Tour gợi ý
														</p>
														<Link
															href={`/place/${slugOrId}`}
															className="text-xs font-semibold text-blue-600 hover:text-blue-700"
														>
															Xem chi tiết
														</Link>
													</div>

													{tours.length === 0 ? (
														<div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
															Chưa có tour nào cho địa điểm này.
														</div>
													) : (
														<div className="grid gap-3 sm:grid-cols-2">
															{tours.map((tour) => (
																<Link
																	key={tour.tour_id}
																	href={`/tour/${tour.tour_id}`}
																	className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-blue-200 hover:bg-blue-50/30"
																>
																	<div className="h-12 w-12 overflow-hidden rounded-lg bg-slate-100">
																		{tour.image_url ? (
																			<img
																				src={tour.image_url}
																				alt={tour.name}
																				className="h-full w-full object-cover"
																			/>
																		) : (
																			<div className="flex h-full w-full items-center justify-center text-[10px] font-semibold text-slate-400">
																				TB
																			</div>
																		)}
																	</div>
																	<div className="min-w-0 flex-1">
																		<p className="truncate text-sm font-semibold text-slate-900">
																			{tour.name}
																		</p>
																		<p className="text-xs text-slate-500">
																			{tour.days} ngày / {tour.nights} đêm • {formatCurrency(tour.base_price)} VND
																		</p>
																	</div>
																</Link>
															))}
														</div>
													)}
												</div>
											</div>
										</div>
									</article>
								);
							})}
						</div>
					)}
				</section>
			</div>

			<Footer props={dataFooter} />
		</main>
	);
}
