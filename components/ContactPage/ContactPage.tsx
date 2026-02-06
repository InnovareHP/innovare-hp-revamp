"use client"; // This must be a Client Component to use useState/useEffect

import { ContactFormSubmission } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const formatDate = (dateString: Date | string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

interface ContactPageProps {
  initialSubmissions: ContactFormSubmission[]; // Renamed for clarity
}

const ContactPage = ({ initialSubmissions }: ContactPageProps) => {
  const [data, setData] = useState<ContactFormSubmission[]>(
    initialSubmissions || []
  );
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    if (
      page === 1 &&
      initialSubmissions.length > 0 &&
      data === initialSubmissions
    )
      return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/contact?page=${page}&limit=${limit}`
        );
        const { data, total } = await response.json();
        setData(data);
        setTotal(total);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Contact Submissions
        </h1>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-700 mr-2">Page {page}</span>
          <button
            disabled={page <= 1 || loading}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Prev
          </button>
          <button
            disabled={page >= Math.ceil(total / limit) || loading}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-4 text-blue-700">Loading entries...</div>
      )}

      {!loading && data.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-700">No submissions found.</p>
        </div>
      ) : (
        <div
          className={`relative overflow-x-auto shadow-md sm:rounded-lg ${loading ? "opacity-50" : ""}`}
        >
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
              </tr>
            </thead>
            {/* IMPORTANT: Render 'data', not 'initialSubmissions' */}
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-blue-600 hover:underline">
                    <Link href={`mailto:${item.email}`}>{item.email}</Link>
                  </td>
                  <td className="px-6 py-4 min-w-[300px]">
                    <p className="line-clamp-2" title={item.message}>
                      {item.message}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
