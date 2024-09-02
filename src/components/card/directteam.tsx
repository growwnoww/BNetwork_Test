"use client";

import React, { useEffect, useState } from "react";
import { getDirectTeam } from "@/actions/dashboardhome";

type Props = {
  user: string;
};

const DirectTeam: React.FC<Props> = ({ user }) => {
  const [data, setData] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getDirectTeam(user);
        setData(result);
      } catch (err) {
        console.error("Error fetching direct team data:", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]); // Dependency array includes `user` to refetch if it changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <span className="text-center">{data}</span>
    </div>
  );
};

export default DirectTeam;
