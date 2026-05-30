import React from "react";

import PageHeader from "../../components/common/PageHeader";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Candidate performance and assessment insights."
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white border border-neutral-200 rounded-2xl p-6">
          <p className="text-neutral-500">
            Total Attempts
          </p>

          <h2 className="text-4xl font-bold mt-2">
            432
          </h2>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-6">
          <p className="text-neutral-500">
            Average Score
          </p>

          <h2 className="text-4xl font-bold mt-2">
            72%
          </h2>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-6">
          <p className="text-neutral-500">
            Pass Rate
          </p>

          <h2 className="text-4xl font-bold mt-2">
            68%
          </h2>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl p-10">
        <h2 className="text-xl font-semibold mb-4">
          Performance Overview
        </h2>

        <div className="h-96 flex items-center justify-center text-neutral-400">
          Chart Component Here
        </div>
      </div>
    </div>
  );
};

export default Analytics;