import React, { useState } from "react";
import historyData from "../../constants/History.json";
import NewTable from "../common/tables/NewTable";
import FancyDropdown from "../common/ui/Dropdown";

const columns = [
  { key: "orderId", label: "Order ID" },
  { key: "dateStr", label: "Date" },
  { key: "timeStr", label: "Time" },
  { key: "dayOfWeek", label: "Day" },
  { key: "amount", label: "Amount (₹)" },
  { key: "action", label: "Action" },
];

const tableData = historyData.map((row) => {
  const dateObj = new Date(row.date);
  return {
    orderId: row.orderId,
    dateStr: dateObj.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    timeStr: dateObj.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    dayOfWeek: row.dayOfWeek,
    amount: `₹${row.amount.toLocaleString("en-IN")}`,
    action: (
      <button className="text-red-500 hover:bg-red-50 border border-red-200 rounded-full px-3 py-1 text-sm font-medium transition-colors">
        Delete
      </button>
    ),
    dateObj, // for filtering
  };
});

export default function HistoryDisplay() {
  const [historyFilter, setHistoryFilter] = useState("all");

  // Today's date (ignore time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filtered data
  const filteredData = tableData.filter((row) => {
    if (historyFilter === "today") {
      const rowDate = new Date(row.dateObj);
      rowDate.setHours(0, 0, 0, 0);
      return rowDate.getTime() === today.getTime();
    }
    return true;
  });

  const historyOptions = [
    { value: "all", label: "All History" },
    { value: "today", label: "Today's History" },
  ];

  // Dropdown for history filter
  const historyDropdown = (
    <FancyDropdown
      options={historyOptions}
      value={historyFilter}
      onChange={setHistoryFilter}
      placeholder="Filter History"
    />
  );

  return (
    <NewTable
      columns={columns}
      data={filteredData}
      searchPlaceholder="Search by Order ID, Date, Day, Amount..."
      rightContent={historyDropdown}
    />
  );
}
