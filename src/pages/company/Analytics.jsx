import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FiUsers,
  FiFileText,
  FiTrendingUp,
  FiSearch,
} from "react-icons/fi";

import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import { useTests } from "../../hooks/useTests";

const Analytics = () => {
  const { id } = useParams();

  const {
    analytics,
    loading,
    fetchTestAnalytics,
  } = useTests();

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [
    percentageFilter,
    setPercentageFilter,
  ] = useState("ALL");

  useEffect(() => {
    if (id) {
      fetchTestAnalytics(id);
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!analytics) {
    return (
      <div className="p-6">
        <PageHeader title="Test Analytics" />

        <EmptyState
          title="No Analytics Found"
          description="No analytics data available for this test."
        />
      </div>
    );
  }

  const attemptedCount =
    analytics.analytics?.filter(
      (candidate) => candidate.attempted
    ).length || 0;

  const averageScore =
    analytics.analytics?.length > 0
      ? (
          analytics.analytics.reduce(
            (sum, candidate) =>
              sum + candidate.percentage,
            0
          ) / analytics.analytics.length
        ).toFixed(1)
      : 0;

  const filteredCandidates =
    analytics.analytics?.filter(
      (candidate) => {
        const matchesSearch =
          candidate.name
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||
          candidate.email
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchesStatus =
          statusFilter === "ALL"
            ? true
            : statusFilter === "ATTEMPTED"
            ? candidate.attempted
            : !candidate.attempted;

        let matchesPercentage = true;

        if (percentageFilter === "HIGH") {
          matchesPercentage =
            candidate.percentage >= 70;
        }

        if (
          percentageFilter === "MEDIUM"
        ) {
          matchesPercentage =
            candidate.percentage >= 40 &&
            candidate.percentage < 70;
        }

        if (percentageFilter === "LOW") {
          matchesPercentage =
            candidate.percentage < 40;
        }

        return (
          matchesSearch &&
          matchesStatus &&
          matchesPercentage
        );
      }
    ) || [];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Test Analytics"
        subtitle="Track candidate registrations and performance"
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">
        <p className="uppercase tracking-wider text-indigo-100 text-sm">
          Assessment Analytics
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-2">
          {analytics.testTitle}
        </h1>

        <p className="mt-3 text-indigo-100 max-w-2xl">
          Monitor registrations,
          participation rates, and
          candidate performance from a
          single dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Total Registered
              </p>

              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {analytics.totalRegistered}
              </h3>
            </div>

            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
              <FiUsers className="text-blue-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Attempted
              </p>

              <h3 className="text-3xl font-bold text-green-600 mt-2">
                {attemptedCount}
              </h3>
            </div>

            <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
              <FiFileText className="text-green-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Average Score
              </p>

              <h3 className="text-3xl font-bold text-purple-600 mt-2">
                {averageScore}%
              </h3>
            </div>

            <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
              <FiTrendingUp className="text-purple-600 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search by candidate name or email..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">
              All Status
            </option>

            <option value="ATTEMPTED">
              Attempted
            </option>

            <option value="NOT_ATTEMPTED">
              Not Attempted
            </option>
          </select>

          {/* Score */}
          <select
            value={percentageFilter}
            onChange={(e) =>
              setPercentageFilter(
                e.target.value
              )
            }
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">
              All Scores
            </option>

            <option value="HIGH">
              High (70%+)
            </option>

            <option value="MEDIUM">
              Medium (40%-69%)
            </option>

            <option value="LOW">
              Low (&lt;40%)
            </option>
          </select>
        </div>
      </div>

      {/* Candidate Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">
            Candidate Performance
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Showing{" "}
            {filteredCandidates.length} of{" "}
            {
              analytics.analytics.length
            }{" "}
            candidates
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                <th className="text-left px-6 py-4">
                  Candidate
                </th>

                <th className="text-left px-6 py-4">
                  Email
                </th>

                <th className="text-center px-6 py-4">
                  Status
                </th>

                <th className="text-center px-6 py-4">
                  Score
                </th>

                <th className="text-center px-6 py-4">
                  Percentage
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCandidates.length >
              0 ? (
                filteredCandidates.map(
                  (candidate) => (
                    <tr
                      key={
                        candidate.userId
                      }
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">
                          {
                            candidate.name
                          }
                        </p>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {
                          candidate.email
                        }
                      </td>

                      <td className="px-6 py-4 text-center">
                        {candidate.attempted ? (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            Attempted
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                            Not Attempted
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-center font-semibold text-gray-800">
                        {
                          candidate.score
                        }
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`font-bold ${
                            candidate.percentage >=
                            70
                              ? "text-green-600"
                              : candidate.percentage >=
                                40
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {
                            candidate.percentage
                          }
                          %
                        </span>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-12 text-gray-500"
                  >
                    No candidates match
                    the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default Analytics;