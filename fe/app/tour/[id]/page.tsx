"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import { Navbar } from "@/components/nav/Navbar";

type Props = {
  params: Promise<{ id: string }>;
};

const navProps = {
  webName: "TravelBuddy",
  subtitle: "Dat cho, kham pha va len ke hoach cho chuyen di cua ban",
  itemOnNav: [
    {
      itemName: "Post",
      linkTo: "/post",
    },
    {
      itemName: "Place",
      linkTo: "/place/da-nang",
    },
    {
      itemName: "Chat",
      linkTo: "/chat",
    },
  ],
};

const dataFooter = [
  {
    footerTitle: "Support",
    footerItems: [
      { itemName: "Manage your trips", linkTo: "#" },
      { itemName: "Contact Customer Service", linkTo: "#" },
      { itemName: "Safety Resource Center", linkTo: "#" },
    ],
  },
  {
    footerTitle: "Discover",
    footerItems: [
      { itemName: "Seasonal and holiday deals", linkTo: "#" },
      { itemName: "Travel articles", linkTo: "#" },
      { itemName: "Booking.com for Business", linkTo: "#" },
      { itemName: "Traveller Review Awards", linkTo: "#" },
    ],
  },
  {
    footerTitle: "Terms and settings",
    footerItems: [
      { itemName: "Privacy Notice", linkTo: "#" },
      { itemName: "Terms of Service", linkTo: "#" },
      { itemName: "Accessibility Statement", linkTo: "#" },
      { itemName: "Content guidelines and reporting", linkTo: "#" },
    ],
  },
  {
    footerTitle: "Partners",
    footerItems: [
      { itemName: "Extranet login", linkTo: "#" },
      { itemName: "List your property", linkTo: "#" },
      { itemName: "Become an affiliate", linkTo: "#" },
    ],
  },
  {
    footerTitle: "About",
    footerItems: [
      { itemName: "About TravelBuddy", linkTo: "#" },
      { itemName: "How We Work", linkTo: "#" },
      { itemName: "Sustainability", linkTo: "#" },
      { itemName: "Careers", linkTo: "#" },
    ],
  },
];

const itineraryTabs = [
  {
    dayLabel: "Ngay 1",
    shortTitle: "Di chuyen va check-in",
    slots: [
      {
        period: "Sang",
        time: "07:30 - 11:30",
        content:
          "Don tai diem hen trung tam, khoi hanh bang limousine, nghi giua chang va den Sa Pa vao cuoi buoi sang.",
      },
      {
        period: "Trua",
        time: "11:30 - 14:00",
        content:
          "An trua mon dia phuong, nhan phong homestay va nghi ngoi ngan truoc khi bat dau tham quan.",
      },
      {
        period: "Chieu",
        time: "14:00 - 18:00",
        content:
          "Tham quan ban Cat Cat, check-in cac diem view nui, dung ca phe va quay ve homestay.",
      },
    ],
  },
  {
    dayLabel: "Ngay 2",
    shortTitle: "Trekking va trai nghiem dia phuong",
    slots: [
      {
        period: "Sang",
        time: "06:30 - 11:00",
        content:
          "An sang, bat dau trekking Muong Hoa, di qua ruong bac thang va cac diem nhin toan canh.",
      },
      {
        period: "Trua",
        time: "11:30 - 13:30",
        content:
          "Dung bua trua tai ban Lao Chai, nghi chan va giao luu van hoa cung nguoi ban dia.",
      },
      {
        period: "Chieu",
        time: "13:30 - 17:30",
        content:
          "Di tiep den Ta Van, workshop nho ve det tho cam va quay lai homestay thu gian.",
      },
    ],
  },
  {
    dayLabel: "Ngay 3",
    shortTitle: "San may va ket thuc tour",
    slots: [
      {
        period: "Sang",
        time: "05:30 - 09:00",
        content:
          "Don binh minh tai diem san may, chup anh, ve homestay an sang va thu xep hanh ly.",
      },
      {
        period: "Trua",
        time: "09:00 - 12:30",
        content:
          "Tu do mua sam dac san, tra phong va tap trung tai diem hen de khoi hanh ve lai Ha Noi.",
      },
      {
        period: "Chieu",
        time: "12:30 - 17:30",
        content:
          "Di chuyen ve Ha Noi, tra khach tai diem hen ban dau va ket thuc chuong trinh.",
      },
    ],
  },
];

const benefits = [
  "Xe dua don 2 chieu tu trung tam",
  "2 dem luu tru + an sang",
  "Huong dan vien tieng Viet",
  "Bao hiem du lich co ban",
  "Anh chup check-in theo nhom",
  "Ho tro hotline 24/7",
];

const reviewTags = [
  "Tat ca",
  "Amazing sights",
  "Informative experience",
  "Great guides",
  "Points of interest",
];

const reviewsData = [
  {
    id: "rv1",
    name: "nicola_c",
    month: "Feb 2026",
    rating: 4.9,
    tags: ["Amazing sights", "Great guides"],
    content:
      "Enjoyed every part of this trip. The guide was very knowledgeable, the weather was clear, and every stop had enough time to explore.",
  },
  {
    id: "rv2",
    name: "candace_c",
    month: "Apr 2026",
    rating: 5,
    tags: ["Informative experience", "Great guides"],
    content:
      "Absolutely incredible day. Views were magical and our guide shared local stories that made the route feel much more meaningful.",
  },
  {
    id: "rv3",
    name: "minh_anh",
    month: "Mar 2026",
    rating: 4.8,
    tags: ["Points of interest", "Amazing sights"],
    content:
      "Lich trinh hop ly, khong bi gap. Dac biet thich phan check-in ruong bac thang va cac diem dung ngắm canh.",
  },
  {
    id: "rv4",
    name: "thanh_truc",
    month: "Jan 2026",
    rating: 4.6,
    tags: ["Informative experience"],
    content:
      "Huong dan vien nhiet tinh, support tot cho nguoi di lan dau. Co mot vai diem dung co the o lau hon nhung tong the rat on.",
  },
  {
    id: "rv5",
    name: "quang_huy",
    month: "May 2026",
    rating: 4.7,
    tags: ["Great guides", "Points of interest"],
    content:
      "Nhom minh 5 nguoi di rat thoai mai. Xe don dung gio, bua trua ngon, va timeline tung buoi duoc thong bao ro rang.",
  },
];

const relatedTours = [
  {
    id: "ha-giang-loop-3n2d",
    title: "Ha Giang Loop 3N2D - Pass & River View",
    location: "Ha Giang, Viet Nam",
    rating: 4.8,
    reviews: 1186,
    oldPrice: "3.190.000",
    newPrice: "2.490.000",
    imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200",
  },
  {
    id: "ninh-binh-day-tour",
    title: "Ninh Binh Day Tour - Trang An & Mua Cave",
    location: "Ninh Binh, Viet Nam",
    rating: 4.7,
    reviews: 764,
    oldPrice: "1.850.000",
    newPrice: "1.390.000",
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200",
  },
  {
    id: "da-lat-cloud-hunting",
    title: "Da Lat Cloud Hunting - Sunrise Combo",
    location: "Da Lat, Viet Nam",
    rating: 4.9,
    reviews: 923,
    oldPrice: "2.250.000",
    newPrice: "1.740.000",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1200",
  },
];

export default function TourDetailPage({ params }: Props) {
  const { id } = React.use(params);
  const prettyTitle = decodeURIComponent(id)
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [startDate, setStartDate] = useState("2026-05-20");
  const [packageType, setPackageType] = useState<"standard" | "premium">("standard");
  const [note, setNote] = useState("");
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [activeReviewTag, setActiveReviewTag] = useState("Tat ca");
  const [reviewPageIndex, setReviewPageIndex] = useState(0);

  const activeDaySchedule = itineraryTabs[activeDayIndex];

  const price = useMemo(() => {
    const adultPrice = packageType === "premium" ? 3290000 : 2790000;
    const childPrice = packageType === "premium" ? 1990000 : 1590000;
    const serviceFee = 120000;

    const subtotal = adults * adultPrice + children * childPrice;
    const total = subtotal + serviceFee;

    return {
      adultPrice,
      childPrice,
      serviceFee,
      subtotal,
      total,
    };
  }, [adults, children, packageType]);

  const sortedReviews = useMemo(() => {
    const filtered =
      activeReviewTag === "Tat ca"
        ? reviewsData
        : reviewsData.filter((review) => review.tags.includes(activeReviewTag));

    return [...filtered].sort((a, b) => b.rating - a.rating);
  }, [activeReviewTag]);

  const reviewPages = useMemo(() => {
    const chunkSize = 2;
    const pages: Array<typeof sortedReviews> = [];

    for (let i = 0; i < sortedReviews.length; i += chunkSize) {
      pages.push(sortedReviews.slice(i, i + chunkSize));
    }

    return pages.length > 0 ? pages : [[]];
  }, [sortedReviews]);

  const canGoPrevReview = reviewPageIndex > 0;
  const canGoNextReview = reviewPageIndex < reviewPages.length - 1;

  const handleChangeReviewTag = (tag: string) => {
    setActiveReviewTag(tag);
    setReviewPageIndex(0);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar webName={navProps.webName} subtitle={navProps.subtitle} itemOnNav={navProps.itemOnNav} />

      <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <div className="mb-5 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-700">
            Trang chu
          </Link>
          <span className="px-2">/</span>
          <span className="text-slate-700">Tour chi tiet</span>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <img
                src="https://oldquartertravel.com/wp-content/uploads/2018/08/sapa-trekking-3d2n.jpg"
                alt="Tour cover"
                className="h-full min-h-[320px] w-full object-cover"
              />
            </div>
            <div className="space-y-5 p-6 lg:p-8">
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                Tour 3 ngay 2 dem
              </span>
              <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                {prettyTitle || "Sapa Trekking Homestay"}
              </h1>
              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                Tour chi tiet danh cho nhom nho va cap doi, ket hop trekking nhe, luu tru homestay va trai nghiem van hoa ban dia.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <article className="rounded-2xl border border-slate-200 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Danh gia</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">9.4/10 (215 review)</p>
                </article>
                <article className="rounded-2xl border border-slate-200 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Khoi hanh</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">Hang ngay</p>
                </article>
                <article className="rounded-2xl border border-slate-200 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Diem den</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">Sa Pa, Lao Cai</p>
                </article>
                <article className="rounded-2xl border border-slate-200 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Do kho</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">De - Trung binh</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.45fr_0.55fr]">
          <div className="space-y-8">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-xl font-semibold text-slate-900">Tong quan tour</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Lich trinh toi uu cho 3 ngay 2 dem, vua du thoi gian de kham pha canh dep Sa Pa, vua dam bao nghi ngoi hop ly.
                Tour phu hop cho nguoi lan dau den Tay Bac va mong muon di theo nhom nho co huong dan vien.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-xl font-semibold text-slate-900">Lich trinh chi tiet</h2>
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <div className="grid grid-cols-3 gap-2">
                  {itineraryTabs.map((day, index) => (
                    <button
                      key={day.dayLabel}
                      type="button"
                      onClick={() => setActiveDayIndex(index)}
                      className={`rounded-xl px-3 py-3 text-left transition ${
                        activeDayIndex === index
                          ? "bg-blue-700 text-white shadow-sm"
                          : "bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide">{day.dayLabel}</p>
                      <p className="mt-1 text-sm font-medium">{day.shortTitle}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {activeDaySchedule.slots.map((slot) => (
                  <article key={`${activeDaySchedule.dayLabel}-${slot.period}`} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">{slot.period}</p>
                      <p className="text-sm font-medium text-slate-500">{slot.time}</p>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{slot.content}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-xl font-semibold text-slate-900">Dich vu bao gom</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {benefits.map((item) => (
                  <li key={item} className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-xl font-semibold text-slate-900">Chinh sach tour</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <p>- Huy truoc 7 ngay: hoan 100% gia tri don.</p>
                <p>- Huy truoc 3-6 ngay: hoan 50% gia tri don.</p>
                <p>- Huy trong 48h truoc khoi hanh: khong hoan phi.</p>
                <p>- Tre em duoi 5 tuoi: mien phi (ngu chung voi bo me).</p>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-slate-900">Why travelers loved this</h2>
                <p className="text-sm font-semibold text-slate-700">4.5 · 5,305 reviews</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {reviewTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleChangeReviewTag(tag)}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                      activeReviewTag === tag
                        ? "border-emerald-200 bg-emerald-100 text-emerald-900"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="mt-5 overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${reviewPageIndex * 100}%)` }}
                >
                  {reviewPages.map((page, pageIndex) => (
                    <div key={`review-page-${pageIndex}`} className="grid w-full shrink-0 grid-cols-1 gap-4 md:grid-cols-2">
                      {page.map((review) => (
                        <article
                          key={review.id}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                        >
                          <div className="flex items-center gap-2 text-emerald-600">
                            <span className="text-sm">★★★★★</span>
                          </div>
                          <p className="mt-2 text-sm text-slate-500">
                            {review.name} · {review.month}
                          </p>
                          <p className="mt-3 text-sm leading-7 text-slate-700">{review.content}</p>
                        </article>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => canGoPrevReview && setReviewPageIndex((prev) => prev - 1)}
                  disabled={!canGoPrevReview}
                  className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Truoc
                </button>
                <button
                  type="button"
                  onClick={() => canGoNextReview && setReviewPageIndex((prev) => prev + 1)}
                  disabled={!canGoNextReview}
                  className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Tiep
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-xl font-semibold text-slate-900">Explore our promoted experiences</h2>
              <p className="mt-1 text-sm text-slate-500">Nhung tour lien quan duoc khach du lich quan tam cung hanh trinh nay.</p>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                {relatedTours.map((tour) => (
                  <article
                    key={tour.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative">
                      <img src={tour.imageUrl} alt={tour.title} className="h-44 w-full object-cover" />
                      <button
                        type="button"
                        className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700"
                      >
                        ♡
                      </button>
                    </div>

                    <div className="space-y-2 p-4">
                      <p className="text-xs text-slate-500">{tour.location}</p>
                      <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{tour.title}</h3>
                      <p className="text-sm text-emerald-700">★ {tour.rating} ({tour.reviews})</p>

                      <div className="pt-1">
                        <p className="text-sm text-slate-400 line-through">from {tour.oldPrice} VND</p>
                        <p className="text-xl font-bold text-slate-900">from {tour.newPrice} VND</p>
                      </div>

                      <Link
                        href={`/tour/${tour.id}`}
                        className="mt-1 inline-flex rounded-full bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-800"
                      >
                        Xem tour
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-xl font-semibold text-slate-900">Dat tour</h2>
            <p className="mt-1 text-sm text-slate-500">Xac nhan nhanh trong 30 phut</p>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">Ngay khoi hanh</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">Goi tour</span>
                <select
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value as "standard" | "premium")}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="standard">Standard - lich trinh co ban</option>
                  <option value="premium">Premium - them bua toi dac san + xe rieng</option>
                </select>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Nguoi lon</p>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                      className="h-8 w-8 rounded-lg border border-slate-300 text-slate-700"
                    >
                      -
                    </button>
                    <span className="font-semibold text-slate-900">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.min(10, prev + 1))}
                      className="h-8 w-8 rounded-lg border border-slate-300 text-slate-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Tre em</p>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                      className="h-8 w-8 rounded-lg border border-slate-300 text-slate-700"
                    >
                      -
                    </button>
                    <span className="font-semibold text-slate-900">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => Math.min(6, prev + 1))}
                      className="h-8 w-8 rounded-lg border border-slate-300 text-slate-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">Yeu cau them</span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Vi du: an chay, ghe em be, phong rieng..."
                  className="min-h-24 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>{adults} nguoi lon</span>
                <span>{price.adultPrice.toLocaleString("vi-VN")} VND</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-slate-600">
                <span>{children} tre em</span>
                <span>{price.childPrice.toLocaleString("vi-VN")} VND</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-slate-600">
                <span>Phi dich vu</span>
                <span>{price.serviceFee.toLocaleString("vi-VN")} VND</span>
              </div>
              <div className="my-3 border-t border-slate-200" />
              <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                <span>Tong tam tinh</span>
                <span>{price.total.toLocaleString("vi-VN")} VND</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-5 w-full rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Dat tour ngay
            </button>

            <p className="mt-3 text-center text-xs text-slate-500">Khong tru tien ngay. Ban co the huy mien phi theo chinh sach.</p>
          </aside>
        </div>
      </div>

      <Footer props={dataFooter} />
    </main>
  );
}
