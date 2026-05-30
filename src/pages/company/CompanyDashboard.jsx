import React from "react";
import PageHeader from "../../components/common/PageHeader";

const CompanyDashboard = () => {
  const stats = [
    {
      title: "Questions",
      value: 245,
    },
    {
      title: "Tests",
      value: 18,
    },
    {
      title: "Attempts",
      value: 432,
    },
    {
      title: "Candidates",
      value: 156,
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Manage assessments and monitor candidate performance."
      />

      <div className="grid grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white border border-neutral-200 rounded-2xl p-6"
          >
            <p className="text-neutral-500 text-sm">
              {item.title}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl p-6">
        <h2 className="font-semibold text-xl mb-4">
          Recent Activity
        </h2>

        <div className="space-y-3">
          <div>
            New test created: Java Assessment
          </div>

          <div>
            23 candidates attempted React Test
          </div>

          <div>
            New question added to DBMS category
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;