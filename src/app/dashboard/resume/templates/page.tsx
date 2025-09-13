"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaPencilAlt, FaDownload, FaTrash } from "react-icons/fa";
import { FaWandMagic } from "react-icons/fa6";
import Image from "next/image";

type Template = {
  _id: string;
  title: string;
  description: string;
  link: string; // Cloudinary URL from backend
  category?: string;
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("az");
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/resume-templates")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTemplates(data);
        } else {
          setTemplates([]);
        }
      })
      .catch(() => {
        setTemplates([]);
      });
  }, []);

  // Filter & sort
  const filteredTemplates = templates
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => (filter === "All" ? true : t.category === filter))
    .sort((a, b) => (sort === "az" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));

  return (
    <div className="flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <div className="sticky top-0 z-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-green-200 dark:border-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-800 bg-clip-text text-transparent">
              Choose a Resume Template
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Select from our collection of professionally designed templates</p>
          </div>

          {/* Controls */}
          <div className="bg-white/80 dark:bg-gray-800/80 dark:border dark:border-green-800 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-200 flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="h-5 w-5 text-green-500 dark:text-green-400 absolute top-3.5 left-4 z-10" />
              <input
                type="text"
                value={search}
                placeholder="Search templates..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-green-200 dark:border-green-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border-2 border-green-200 dark:border-green-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200"
            >
              <option>All</option>
              <option>Professional</option>
              <option>Creative</option>
              <option>Simple</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border-2 border-green-200 dark:border-green-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200"
            >
              <option value="az">Sort A–Z</option>
              <option value="za">Sort Z–A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template._id}
                className="group bg-white dark:bg-gray-900 border-2 dark:border-green-800 border-green-200 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 overflow-hidden cursor-pointer"
                onClick={() => router.push(`/dashboard/resume/create?templateId=${template._id}`)}
              >
                <div className="relative aspect-[3/4] bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={template.link}
                    alt={template.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/default-template.png";
                    }}
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{template.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{template.description}</p>
                  <button
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg py-3 text-center font-semibold transition-shadow shadow"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/resume/create?templateId=${template._id}`);
                    }}
                  >
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-20 bg-white dark:bg-gray-800 rounded-lg border border-green-300 dark:border-green-700 text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">No templates found</h3>
            <p className="max-w-md text-gray-700 dark:text-gray-300">
              Try adjusting your search criteria or filters to find templates.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
