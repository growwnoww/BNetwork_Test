"use client";

import React, { useEffect, useState } from "react";


type Props = {
  user: string;
};

const DirectTeam: React.FC<Props> = ({ user }) => {
  const [data, setData] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <span className="text-center ">{0}</span>
    </div>
  );
};

export default DirectTeam;
