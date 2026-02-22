// import { Box } from "@mui/material";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid
// } from "recharts";

// const TopVendorsChart = ({ vendors }) => {
//   if (!vendors || vendors.length === 0) return null;

//   const data = vendors.map((vendor) => ({
//     name: vendor.name || vendor.vendorName,
//     value: vendor.amount || vendor.total || 0
//   }));

//   return (
//     <Box sx={{ width: "100%", height: 320 }}>
//       <ResponsiveContainer>
//         <BarChart
//           data={data}
//           margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" vertical={false} />

//           <XAxis
//             dataKey="name"
//             tick={{ fontSize: 12 }}
//           />

//           <YAxis
//             tickFormatter={(value) => `₹${value / 1000}k`}
//           />

//           <Tooltip
//             formatter={(value) =>
//               `₹ ${value.toLocaleString()}`
//             }
//           />

//           <Bar
//             dataKey="value"
//             fill="#1976d2"
//             radius={[8, 8, 0, 0]}
//             barSize={40}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </Box>
//   );
// };

// export default TopVendorsChart;





import { Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Dot
} from "recharts";

const TopVendorsChart = ({ vendors }) => {
  if (!vendors || vendors.length === 0) return null;

  const data = vendors
    .map((vendor) => ({
      name: vendor.name || vendor.vendorName,
      value: vendor.amount || vendor.total || 0
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <Box sx={{ width: "100%", height: 380 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 30, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

          {/* X Axis */}
          <XAxis
            dataKey="name"
            interval={0}
            angle={-20}
            textAnchor="end"
            height={60}
            tick={{ fontSize: 13 }}
          />

          {/* Y Axis */}
          <YAxis
            tickFormatter={(value) =>
              `₹${(value / 1000).toFixed(0)}k`
            }
            tick={{ fontSize: 13 }}
          />

          {/* Tooltip */}
          <Tooltip
            formatter={(value) =>
              `₹ ${value.toLocaleString()}`
            }
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#1976d2"
            strokeWidth={3}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TopVendorsChart;