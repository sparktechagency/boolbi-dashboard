import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    dashboardOverview: builder.query({
      query: ({ userJoinedYear, revenueYear }) => {
        return {
          method: "GET",
          url: `admin?userJoinedYear=${userJoinedYear}&revenueYear=${revenueYear}`,
        };
      },
    }),
    overAllState: builder.query({
      query: ({ range }) => {
        return {
          method: "GET",
          url: `/dashboard/overall-stat?range=${range}`,
        };
      },
    }),

    getPlatformPerformance: builder.query({
      query: ({ range }) => {
        return {
          method: "GET",
          url: `/admin/performance?timeRange=${range}`,
        };
      },
    }),

    engagementData: builder.query({
      query: ({ range }) => {
        return {
          method: "GET",
          url: `admin/engagement?timeRange=${range}`,
        };
      },
    }),

    bestServices: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/best-services",
        };
      },
    }),

    vendorsConversionData: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/vendor-order-conversion-rate",
        };
      },
    }),

    // payment history
    paymentHistory: builder.query({
      query: ({ page, limit }) => {
        return {
          method: "GET",
          url: `/admin/payment?page=${page}&limit=${limit}`,
        };
      },
    }),
  }),
});

export const {
  useDashboardOverviewQuery,
  useOverAllStateQuery,
  useGetPlatformPerformanceQuery,
  useBestServicesQuery,
  useEngagementDataQuery,
  useVendorsConversionDataQuery,
  usePaymentHistoryQuery,
} = dashboardSlice;
