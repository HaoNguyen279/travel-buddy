
"use client"

import Footer from "@/components/footer/Footer";
import { Navbar } from "@/components/nav/Navbar";
import { SectionHeading } from "@/components/section/SectionHeading";
import axios from "axios";
import React, { useEffect, useState } from "react";


type Props = {
  params: Promise<{ id: string }>;
};
type PlaceProps = {
  tour_id: string
  place_id: string
  category_id: string
  name: string
  description: string
  base_price: number
  days: number
  nights: number
  max_guests: number
  min_guests: number
  booking_count: number
  image_url: string
  average_rating: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

const PlaceComponent = ({ place }: { place: PlaceProps }) => {
  const hasImage = Boolean(place.image_url);

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative h-52 w-full overflow-hidden bg-slate-100 sm:h-60">
        {hasImage ? (
          <img
            src={place.image_url}
            alt={place.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-sm font-medium text-slate-500">
            Chua co hinh anh
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 backdrop-blur">
            {place.category_id}
          </span>
          <span className="rounded-full bg-amber-100/95 px-3 py-1 text-xs font-semibold text-amber-700">
            ★ {Number(place.average_rating) || 0}
          </span>
        </div>
      </div>

      <div className="space-y-3 p-5 sm:p-6">
        <div className="space-y-1">
          <h2 className="line-clamp-1 text-lg font-semibold text-slate-900 sm:text-xl">{place.name}</h2>
          <p className="text-sm font-medium text-slate-500">
            {/* {place.}, {place.country} */}
          </p>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-slate-700">
          {place.description}
        </p>

        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
          {/* {place.address} */}
        </div>
      </div>
    </div>
  );
}



export default function Place({ params }: Props) {
  const [places, setPlaces] = useState<PlaceProps[]>([]);
  const { id } = React.use(params);
  const fetchTours = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/tour/destination/:slug=${id}`)
      const data = res.data;
      setPlaces(data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data)
      } else {
        console.error("Unexpected error:", err)
      }
    }
  }
  useEffect(() => {
    fetchTours();
  }, []);
  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-amber-50">
      <div className="mx-auto flex w-[80%] max-w-6xl flex-col gap-10 pb-10 px-4 sm:px-6 lg:px-8">

        <section className="space-y-5">
          <h1 className="text-red-900">Destination id: {id}</h1>
          <SectionHeading
            title="Trải nghiệm nổi bật tại"
            description="Các hành trình ngắn ngày được cộng đồng lưu nhiều nhất tuần này."
          />
        </section>

        <div className="flex">

          <section className="w-[24%] space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Bộ lọc</h2>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase text-slate-500">Country</h3>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                />
                <span>Vietnam</span>
              </label>
            </div>
          </section>

          <section className="grid w-[76%] grid-cols-1 gap-6 pl-6">
            {places.map((item) => {
              return <PlaceComponent key={item.tour_id.toString()} place={item} />
            })}
          </section>
        </div>
      </div>
    </main>
  );
}
