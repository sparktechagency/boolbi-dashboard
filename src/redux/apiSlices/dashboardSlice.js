import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    dashboardOverview: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin",
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

    engagementData: builder.query({
      query: ({ year }) => {
        return {
          method: "GET",
          url: `admin/engagement?year=${year}`,
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
  }),
});

export const {
  useDashboardOverviewQuery,
  useOverAllStateQuery,
  useBestServicesQuery,
  useEngagementDataQuery,
  useVendorsConversionDataQuery,
} = dashboardSlice;
