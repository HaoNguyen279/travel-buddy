"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Navbar } from "@/components/nav/Navbar";
import {
  createTour,
  deleteTour,
  getTourFormData,
  getTours,
  updateTour,
  type TourPayload,
} from "@/services/tourService";
import { me } from "@/services/userService";

type Place = {
  place_id: string;
  name: string;
  city?: string | null;
  country?: string | null;
};

type Category = {
  category_id: string;
  name: string;
};

type Tour = {
  tour_id: string;
  name: string;
  description?: string | null;
  base_price: number;
  days: number;
  nights: number;
  max_guests: number;
  min_guests: number;
  image_url?: string | null;
  status?: string | null;
  place?: Place | null;
  category?: Category | null;
  place_id: string;
  category_id: string;
};

type TourFormState = {
  tour_id?: string;
  name: string;
  description: string;
  place_id: string;
  category_id: string;
  base_price: string;
  days: string;
  nights: string;
  max_guests: string;
  min_guests: string;
  image_url: string;
  status: string;
};

const emptyForm: TourFormState = {
  name: "",
  description: "",
  place_id: "",
  category_id: "",
  base_price: "",
  days: "",
  nights: "",
  max_guests: "",
  min_guests: "",
  image_url: "",
  status: "available",
};

function formatCurrencyVND(value: number) {
  try {
    return new Intl.NumberFormat("vi-VN").format(value);
  } catch {
    return String(value);
  }
}

function StatusBadge({ status }: { status?: string | null }) {
  const s = status ?? "available";
  const map: Record<
    string,
    { label: string; className: string }
  > = {
    available: {
      label: "Đang mở",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    unavailable: {
      label: "Tạm dừng",
      className: "bg-rose-50 text-rose-700 border-rose-200",
    },
    draft: {
      label: "Bản nháp",
      className: "bg-slate-50 text-slate-700 border-slate-200",
    },
  };

  const info = map[s] ?? {
    label: s,
    className: "bg-slate-50 text-slate-700 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${info.className}`}
    >
      {info.label}
    </span>
  );
}

export default function TourDashboardPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<TourFormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [adminLoading, setAdminLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const isEditing = Boolean(form.tour_id);

  const placeOptions = useMemo(
    () =>
      places.map((place) => ({
        value: place.place_id,
        label: `${place.name}${place.city ? ` — ${place.city}` : ""}`,
      })),
    [places]
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.category_id,
        label: category.name,
      })),
    [categories]
  );

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [tourData, formData] = await Promise.all([getTours(), getTourFormData()]);
      setTours(Array.isArray(tourData) ? tourData : []);
      setPlaces(Array.isArray(formData?.places) ? formData.places : []);
      setCategories(Array.isArray(formData?.categories) ? formData.categories : []);
    } catch {
      setError("Không thể tải danh sách tour. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      setAdminLoading(true);
      try {
        const data = await me();
        setIsAdmin(Boolean(data?.is_admin));
      } catch {
        setIsAdmin(false);
      } finally {
        setAdminLoading(false);
      }
    };

    checkAdmin();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const resetForm = () => {
    setForm(emptyForm);
    setFormError(null);
  };

  const startEdit = (tour: Tour) => {
    setForm({
      tour_id: tour.tour_id,
      name: tour.name ?? "",
      description: tour.description ?? "",
      place_id: tour.place_id,
      category_id: tour.category_id,
      base_price: String(tour.base_price ?? ""),
      days: String(tour.days ?? ""),
      nights: String(tour.nights ?? ""),
      max_guests: String(tour.max_guests ?? ""),
      min_guests: String(tour.min_guests ?? ""),
      image_url: tour.image_url ?? "",
      status: tour.status ?? "available",
    });
    setFormError(null);

    // cuộn lên form cho dễ thao tác
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const buildPayload = (): TourPayload | null => {
    const base_price = Number(form.base_price);
    const days = Number(form.days);
    const nights = Number(form.nights);
    const max_guests = Number(form.max_guests);
    const min_guests = Number(form.min_guests);

    if (!form.name.trim()) return null;
    if (!form.place_id || !form.category_id) return null;
    if ([base_price, days, nights, max_guests, min_guests].some(Number.isNaN)) return null;

    return {
      name: form.name.trim(),
      description: form.description.trim() || undefined,
      place_id: form.place_id,
      category_id: form.category_id,
      base_price,
      days,
      nights,
      max_guests,
      min_guests,
      image_url: form.image_url.trim() || undefined,
      status: form.status || undefined,
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const payload = buildPayload();
    if (!payload) {
      setFormError("Vui lòng nhập đầy đủ thông tin bắt buộc (tên, địa điểm, danh mục và các trường số).");
      return;
    }

    setSaving(true);
    try {
      if (form.tour_id) {
        await updateTour(form.tour_id, payload);
      } else {
        await createTour(payload);
      }
      resetForm();
      await loadData();
    } catch {
      setFormError("Không thể lưu tour. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (tour: Tour) => {
    if (!confirm(`Xóa tour “${tour.name}”?`)) return;

    try {
      await deleteTour(tour.tour_id);
      await loadData();
    } catch {
      setError("Không thể xóa tour. Vui lòng thử lại.");
    }
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredTours = useMemo(() => {
    if (!normalizedQuery) return tours;

    return tours.filter((tour) => {
      const name = tour.name?.toLowerCase() ?? "";
      const place = tour.place?.name?.toLowerCase() ?? "";
      const category = tour.category?.name?.toLowerCase() ?? "";
      return (
        name.includes(normalizedQuery) ||
        place.includes(normalizedQuery) ||
        category.includes(normalizedQuery)
      );
    });
  }, [normalizedQuery, tours]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        webName="TravelBuddy"
        subtitle="Trang quản trị"
        itemOnNav={[
          { itemName: "Trang chủ", linkTo: "/" },
          { itemName: "Tour", linkTo: "/tours" },
          { itemName: "Quản lý tour", linkTo: "/tours" },
        ]}
      />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {adminLoading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-600">Đang kiểm tra quyền truy cập...</p>
          </div>
        ) : !isAdmin ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
            <h1 className="text-lg font-semibold text-rose-700">Bạn không phải admin</h1>
            <p className="mt-1 text-sm text-rose-600">
              Vui lòng đăng nhập bằng tài khoản quản trị để truy cập trang này.
            </p>
          </div>
        ) : (
        <>
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Quản lý tour</h1>
              <p className="mt-1 text-sm text-gray-600">
                Tạo mới, cập nhật và xóa tour du lịch.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:border-gray-300"
              >
                + Tạo tour mới
              </button>
            </div>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="h-fit space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">
                {isEditing ? "Cập nhật tour" : "Tạo tour"}
              </h2>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg px-2 py-1 text-xs font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  Hủy chỉnh sửa
                </button>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600">Tên tour *</label>
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none ring-0 focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                placeholder="Ví dụ: Tour phượt Đà Lạt"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600">Mô tả</label>
              <textarea
                value={form.description}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                className="min-h-[100px] w-full resize-y rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                placeholder="Mô tả ngắn về tour"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Địa điểm *</label>
                <select
                  value={form.place_id}
                  onChange={(event) => setForm((prev) => ({ ...prev, place_id: event.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                >
                  <option value="">Chọn địa điểm</option>
                  {placeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Danh mục *</label>
                <select
                  value={form.category_id}
                  onChange={(event) => setForm((prev) => ({ ...prev, category_id: event.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                >
                  <option value="">Chọn danh mục</option>
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Giá cơ bản (VND) *</label>
                <input
                  type="number"
                  min={0}
                  value={form.base_price}
                  onChange={(event) => setForm((prev) => ({ ...prev, base_price: event.target.value }))}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  placeholder="Ví dụ: 1500000"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Trạng thái</label>
                <select
                  value={form.status}
                  onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                >
                  <option value="available">Đang mở (Available)</option>
                  <option value="unavailable">Tạm dừng (Unavailable)</option>
                  <option value="draft">Bản nháp (Draft)</option>
                </select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Số ngày *</label>
                <input
                  type="number"
                  min={1}
                  value={form.days}
                  onChange={(event) => setForm((prev) => ({ ...prev, days: event.target.value }))}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Số đêm *</label>
                <input
                  type="number"
                  min={0}
                  value={form.nights}
                  onChange={(event) => setForm((prev) => ({ ...prev, nights: event.target.value }))}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Khách tối thiểu *</label>
                <input
                  type="number"
                  min={1}
                  value={form.min_guests}
                  onChange={(event) => setForm((prev) => ({ ...prev, min_guests: event.target.value }))}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-600">Khách tối đa *</label>
                <input
                  type="number"
                  min={1}
                  value={form.max_guests}
                  onChange={(event) => setForm((prev) => ({ ...prev, max_guests: event.target.value }))}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600">Ảnh đại diện (URL)</label>
              <input
                value={form.image_url}
                onChange={(event) => setForm((prev) => ({ ...prev, image_url: event.target.value }))}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                placeholder="https://..."
              />
            </div>

            {formError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-70"
            >
              {saving ? "Đang lưu..." : isEditing ? "Cập nhật tour" : "Tạo tour"}
            </button>

            <p className="text-xs text-gray-500">
              Dấu * là bắt buộc. Bạn có thể nhấn “Sửa” ở bảng để chỉnh sửa nhanh.
            </p>
          </form>

          {/* List */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">Danh sách tour</h2>
                <span className="text-xs font-semibold text-gray-500">
                      {filteredTours.length} tour
                </span>
              </div>

              <div className="mt-4">
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                  placeholder="Tìm theo tên tour, địa điểm, danh mục..."
                />
              </div>

              {loading ? (
                <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-6 text-sm text-gray-600">
                  Đang tải dữ liệu...
                </div>
              ) : error ? (
                <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-6 text-sm text-rose-700">
                  {error}
                </div>
              ) : filteredTours.length === 0 ? (
                <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-6 text-sm text-gray-600">
                  Không tìm thấy tour phù hợp.
                </div>
              ) : (
                <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                      <tr>
                        <th className="px-4 py-3 text-left">Tên tour</th>
                        <th className="px-4 py-3 text-left">Địa điểm</th>
                        <th className="px-4 py-3 text-left">Danh mục</th>
                        <th className="px-4 py-3 text-left">Giá</th>
                        <th className="px-4 py-3 text-left">Trạng thái</th>
                        <th className="px-4 py-3 text-right">Hành động</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {filteredTours.map((tour) => (
                        <tr key={tour.tour_id} className="bg-white hover:bg-gray-50/60 transition-colors">
                          <td className="px-4 py-3">
                            <div className="font-semibold text-gray-900">{tour.name}</div>
                            <div className="mt-0.5 text-xs text-gray-500">
                              {tour.days} ngày / {tour.nights} đêm • {tour.min_guests}–{tour.max_guests} khách
                            </div>
                          </td>

                          <td className="px-4 py-3 text-gray-700">
                            {tour.place?.name ?? "-"}
                          </td>

                          <td className="px-4 py-3 text-gray-700">
                            {tour.category?.name ?? "-"}
                          </td>

                          <td className="px-4 py-3 text-gray-700">
                            {formatCurrencyVND(tour.base_price)} VND
                          </td>

                          <td className="px-4 py-3">
                            <StatusBadge status={tour.status ?? "available"} />
                          </td>

                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => startEdit(tour)}
                                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                              >
                                Sửa
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(tour)}
                                className="rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 hover:border-rose-300 hover:bg-rose-50"
                              >
                                Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section> </>
        )}
      </main>
    </div>
  );
}