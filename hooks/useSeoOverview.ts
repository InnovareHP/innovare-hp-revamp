import { useQuery } from "@tanstack/react-query";

export const fetchSeoOverview = async () => {
  const response = await fetch("/api/seo/overview");
  return response.json();
};

export const useSeoOverview = () => {
  return useQuery({
    queryKey: ["seo-overview"],
    queryFn: fetchSeoOverview,
  });
};

export const useSeoKeywords = () =>
  useQuery({
    queryKey: ["seo-keywords"],
    queryFn: async () => {
      const res = await fetch("/api/seo/keywords");
      if (!res.ok) throw new Error("Failed to fetch keywords");
      return res.json();
    },
  });

export const useSeoPages = () =>
  useQuery({
    queryKey: ["seo-pages"],
    queryFn: async () => {
      const res = await fetch("/api/seo/pages");
      if (!res.ok) throw new Error("Failed to fetch pages");
      return res.json();
    },
  });

export const useSeoPerformance = () =>
  useQuery({
    queryKey: ["seo-performance"],
    queryFn: async () => {
      const res = await fetch("/api/seo/performance");
      if (!res.ok) throw new Error("Failed to fetch performance");
      return res.json();
    },
  });

export const useSeoIssues = () =>
  useQuery({
    queryKey: ["seo-issues"],
    queryFn: async () => {
      const res = await fetch("/api/seo/issues");
      if (!res.ok) throw new Error("Failed to fetch issues");
      return res.json();
    },
  });
